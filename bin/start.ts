import chalk from "chalk";

import {close, connect, executeRaw, initDB} from "./service";
import { manualController, automaticController } from "./controller";
import {CommandlineArgs, DbmsSupported, MigrationData} from "./interfaces";
import config from "config";
import {formatAutomaticDirContentBeforeStore, formatManualDirContentBeforeStore, loadDirData} from "./utils";
import {list, save, saveAll} from "./service/migration";
import {getOutcomeFromOperation, getStatusFromOperation} from "./controller/automatic/common";

const executeManualMode = async (args: CommandlineArgs) => {
  let mapControllerOpManualMode: any = {
    "create": manualController.create,
    "down": manualController.down,
    "up": manualController.up,
  }
  const savedOperations = await mapControllerOpManualMode[args.o](args);
  return savedOperations;
}

const executeAutomaticMode = async () => {
  const finalOutcome: string[] = [
    config.get("app.operationsLabels.outcomeSuccess"),
    config.get("app.operationsLabels.outcomeFailed"),
    config.get("app.operationsLabels.outcomeMissing"),
    config.get("app.operationsLabels.rolledBackFailed"),
    config.get("app.operationsLabels.rolledBackSuccess")
  ]

  const dataLocationDir: string = config.get("app.migrationsDir");
  const data = await loadDirData(dataLocationDir);

  const formattedResultBeforeStore = await formatAutomaticDirContentBeforeStore(data, dataLocationDir);

  const dbms: DbmsSupported = formattedResultBeforeStore[0].dbms;

  const connection = await connect(dbms);
  const initDb = dbms === DbmsSupported.MYSQL ? await initDB(dbms): null; //some dbs required migration for create table migration

  const listPromises = formattedResultBeforeStore.map(async (migration) => {
    const migrationMatched: any = await list({
      id: migration.id,
      outcome: finalOutcome
    }, dbms)

    const foundMigration = migrationMatched[0];
    const isNotFoundAndDownOp = (!foundMigration && (migration.op !== 'u' && migration.op !== 'uu'))
    const isFoundAndOutcomeIsSuccessAndOpUp = ((foundMigration && (foundMigration?.outcome === config.get("app.operationsLabels.outcomeSuccess") && (migration.op === 'u'))));
    const isFoundAndOutcomeErrorAndOpOverUp = ((foundMigration && (foundMigration?.outcome === config.get("app.operationsLabels.outcomeFailed") && migration.op !== 'uu')));
    const isFoundAndOutcomeRolledbackErrorAndOpOverDown = ((foundMigration && (foundMigration?.outcome === config.get("app.operationsLabels.rolledBackFailed") && (migration.op === 'dd'))));
    const isFoundAndOutcomeRolledbackSuccessAndOpOverDown = ((foundMigration && (foundMigration?.outcome === config.get("app.operationsLabels.rolledBackSuccess") && (migration.op === 'dd'))));
    const isFoundAndOutcomeNoneAndOpOverUp = ((foundMigration && (foundMigration?.outcome === config.get("app.operationsLabels.outcomeMissing") && (migration.op !== 'uu'))));

    if(isNotFoundAndDownOp || isFoundAndOutcomeIsSuccessAndOpUp || isFoundAndOutcomeErrorAndOpOverUp || isFoundAndOutcomeRolledbackErrorAndOpOverDown || isFoundAndOutcomeRolledbackSuccessAndOpOverDown || isFoundAndOutcomeNoneAndOpOverUp){
      return null;
    }
    return migration;
  })
  const allResult: any = await Promise.all(listPromises);

  const resultsCleared: MigrationData[] = allResult.filter((mig: MigrationData) => mig);

  if(!resultsCleared.length){
    console.log(chalk.yellow("NO NEW MIGRATIONS!"));
    return formattedResultBeforeStore;
  }
  //
  const resultToSave: MigrationData[] = resultsCleared.map((res: MigrationData) => {
    //TODO: to implement logic of removing created at
    return res
  })
  //
  const saveAllResult: MigrationData[] = await saveAll(resultToSave, dbms);

  const allOperationsResultsPromises = saveAllResult.map(async (el: MigrationData) => {
    try {
      //@ts-ignore
      if((['u', 'uu'].includes(el.op) && !el?.up) || (!['u', 'uu'].includes(el.op) && !el?.down)){
        return save({...el, status: getStatusFromOperation(el.op), outcome: getOutcomeFromOperation(el.op), description: `Empty ${el.op === 'u' || el.op === 'uu' ? 'up':'down'} attribute `}, dbms)
      }
      const executedOperation = await executeRaw(dbms, ['u', 'uu'].includes(el.op) ? el?.up : el?.down);
      return save({...el, status: getStatusFromOperation(el.op), rolledback_at: !['u', 'uu'].includes(el.op) ? new Date() : null, outcome: getOutcomeFromOperation(el.op), description: JSON.stringify(executedOperation)}, dbms)
    }catch (e: any){
      return save({...el, status: getStatusFromOperation(el.op), rolledback_at: !['u', 'uu'].includes(el.op) ? new Date() : null,  outcome: el.op === 'u' || el.op === 'uu' ? config.get("app.operationsLabels.outcomeFailed") : config.get("app.operationsLabels.rolledBackFailed"), description: e.message}, dbms);
    }
  })
  //
  const allOperationsResults: any = await Promise.all(allOperationsResultsPromises);
  const message = `MIGRATIONS DONE, ID =>, ${saveAllResult.map((e) => e.id)}`
  console.log(chalk.green(message));
  return saveAllResult;
}

const start = async(args: CommandlineArgs) => {
  try{
    let execution;
    //Automatic mode
    if(!args){
      execution = await executeAutomaticMode();
    }else{
      execution = await executeManualMode(args);
    }
    return execution[0]?.dbms ? await close(execution[0].dbms): null;
    // return (args.o !== 'create' && execution[0]?.dbms) ? await close(execution[0].dbms) : false;
  }catch (e: any){
    console.log(chalk.red('ERROR IN FLOW => ', e.message));
    throw e;
  }
}

export {
  start
}
