import chalk from "chalk";

import config from "config";
import { formatDirContentBeforeStore, loadDirData } from "../utils";
import { connect, executeRaw, initDB } from "../service";
import { CommandlineArgs, DbmsSupported, MigrationData} from "../interfaces";
import { save, saveAll, list } from "../service/migration";

const migrationExec = async (op:string, args: CommandlineArgs) => {
  const dataLocationDir: string = config.get("app.migrationsDir");
  const data = await loadDirData(dataLocationDir);
  const formattedResultBeforeStore = await formatDirContentBeforeStore(data, dataLocationDir);
  const finalOutcome: string[] = [
    config.get("app.operationsLabels.outcomeSuccess"),
    config.get("app.operationsLabels.outcomeFailed"),
    config.get("app.operationsLabels.outcomeMissing"),
    config.get("app.operationsLabels.rolledBackFailed"),
    config.get("app.operationsLabels.rolledBackSuccess")
  ]

  const filteredResults = formattedResultBeforeStore.filter((e: any) => e && (args?.m?.length ?  args?.m?.includes(e.id) : e));

  //todo: mantain only check on line 58
  if(!filteredResults.length){
    const message = (!isUpOperation(op)) ? 'NO NEW MIGRATIONS TO ROLLBACK! (you can only rollback migrations in outcome success)' : 'NO NEW MIGRATIONS!';
    console.log(chalk.yellow(message));
    return true;
  }
  const dbms: DbmsSupported = filteredResults[0].dbms;
  const connection = await connect(dbms);
  const initDb = dbms === DbmsSupported.MYSQL ? await initDB(dbms): null; //some dbs required migration for create table migration

  const listPromises = filteredResults.map(async (migration) => {
    const migrationMatched: any = await list({
      id: migration.id,
      outcome: finalOutcome
    }, dbms)

    const foundMigration = migrationMatched[0];
    const isDownOpAndMigrationNotFound = (!foundMigration && !isUpOperation(op));
    const isFoundAndOutcomeNotSuccessAndOpDown = ((foundMigration && (foundMigration?.outcome !== config.get("app.operationsLabels.outcomeSuccess") && args.o === 'down')));
    const isFoundAndOutcomeNotSuccessAndOpUp = ((foundMigration && (foundMigration?.outcome !== config.get("app.operationsLabels.outcomeSuccess") && args.o === 'up')));
    const isFoundAndOpUp = ((foundMigration && isUpOperation(op)));
    const isFoundAndOutcomeIsSuccessAndOpDown = ((foundMigration && (foundMigration?.outcome === config.get("app.operationsLabels.outcomeSuccess") && args.o === 'down')));

    if(isFoundAndOutcomeNotSuccessAndOpUp || isFoundAndOpUp || isDownOpAndMigrationNotFound || isFoundAndOutcomeNotSuccessAndOpDown){
      return null;
    }

    if(isFoundAndOutcomeIsSuccessAndOpDown) {
      return migration;
    }

    return migration;
  })
  const allResult: any = await Promise.all(listPromises);

  const resultsCleared: MigrationData[] = allResult.filter((mig: MigrationData) => mig);
  if(!resultsCleared.length){
    const message = (!isUpOperation(op)) ? 'NO NEW MIGRATIONS TO ROLLBACK! (you can only rollback migrations in outcome success)' : 'NO NEW MIGRATIONS!';
    console.log(chalk.yellow(message));
    return filteredResults;
  }

  const resultToSave: MigrationData[] = resultsCleared.map((res: MigrationData) => {
    if(isUpOperation(op)){
      return res;
    }
    const {created_at, ...resWithNoCreation} = res;
    return resWithNoCreation
  })

  const saveAllResult: MigrationData[] = await saveAll(resultToSave, dbms);
  const allOperationsResultsPromises = saveAllResult.map(async (el: MigrationData) => {
    try {
      if((isUpOperation(op) && !el?.up) || (!isUpOperation(op) && !el?.down)){
        return save({...el, status: getStatusFromOperation(args.o), outcome: getOutcomeFromOperation(args.o), description: `Empty ${args.o === 'up' ? 'up':'down'} attribute `}, dbms)
      }
      const executedOperation = await executeRaw(dbms, isUpOperation(op) ? el?.up : el?.down);
      return save({...el, status: getStatusFromOperation(args.o), rolledback_at: !isUpOperation(op) ? new Date() : null, outcome: getOutcomeFromOperation(args.o), description: JSON.stringify(executedOperation)}, dbms)
    }catch (e: any){
      //If err, update record with status failed
      return save({...el, status: getStatusFromOperation(args.o), rolledback_at: !isUpOperation(op) ? new Date() : null,  outcome: args.o === 'up' ? config.get("app.operationsLabels.outcomeFailed") : config.get("app.operationsLabels.rolledBackFailed"), description: e.message}, dbms);
    }
  })

  const allOperationsResults: any = await Promise.all(allOperationsResultsPromises);
  const message = args.o === 'up' ? `MIGRATIONS DONE, ID =>, ${saveAllResult.map((e) => e.id)}` : `MIGRATIONS ROLLED BACK, ID =>, ${saveAllResult.map((e) => e.id)}`
  console.log(chalk.green(message));
  return saveAllResult;
}

const getStatusFromOperation = (op: string): string => {
  return op === 'up' ? config.get("app.operationsLabels.statusExecuted") : config.get("app.operationsLabels.statusRolledBack")
}
const getOutcomeFromOperation = (op: string): string => {
  return op === 'up' ? config.get("app.operationsLabels.outcomeSuccess") : config.get("app.operationsLabels.rolledBackSuccess")
}

const isUpOperation = (op: string) => op === 'up';

export {
  migrationExec
}
