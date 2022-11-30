import chalk from "chalk";

import config from "config";
import { formatAutomaticDirContentBeforeStore, loadDirData } from "../../utils";
import { connect, executeRaw, initDB } from "../../service";
import { CommandlineArgs, DbmsSupported, MigrationData} from "../../interfaces";
import { save, saveAll, list } from "../../service/migration";

const migrationExec = async () => {
  const finalOutcome: string[] = [
    config.get("app.operationsLabels.outcomeSuccess"),
    config.get("app.operationsLabels.outcomeFailed"),
    config.get("app.operationsLabels.outcomeMissing"),
    config.get("app.operationsLabels.rolledBackFailed"),
    config.get("app.operationsLabels.rolledBackSuccess")
  ]

  const automaticMigrationOperations: {up: string, upWithOverride: string, down: string, downWithOverride: string} = config.get("app.automaticMigrationOperations");
  const upAutomaticMigrations = [automaticMigrationOperations.upWithOverride, automaticMigrationOperations.up];

  const dataLocationDir: string = config.get("app.migrationsDir");
  const data = await loadDirData(dataLocationDir);

  const formattedResultBeforeStore = await formatAutomaticDirContentBeforeStore(data, dataLocationDir);

  let alreadyInitDb = {
    MONGODB: true,
    MYSQL: false
  };
  let alreadyInitConnection = {
    MONGODB: false,
    MYSQL: false
  };

  const listMigrations = [];

  for(let migration of formattedResultBeforeStore){
    const dbms: DbmsSupported = migration.dbms;
    if(!alreadyInitConnection[dbms]){
      await connect(dbms);
      alreadyInitConnection[dbms] = true;
    }
    if(!alreadyInitDb[dbms]){
      await initDB(dbms); //some dbs required migration for create table migration;
      alreadyInitDb[dbms] = true;
    }
    const migrationMatched: any = await list({
      migration_id: migration.migration_id,
      outcome: finalOutcome
    }, dbms)
    const foundMigration = migrationMatched[0];
    const isFoundAndChecksumDifferent = (foundMigration && (foundMigration?.checksum && foundMigration?.checksum !== migration.checksum))
    const isNotFoundAndDownOp = (!foundMigration && (migration.op !== automaticMigrationOperations.up && migration.op !== automaticMigrationOperations.upWithOverride))
    const isFoundAndOutcomeIsSuccessAndOpUp = ((foundMigration && (foundMigration?.outcome === config.get("app.operationsLabels.outcomeSuccess") && (isUpOperation(migration.op)))));
    const isFoundAndOutcomeErrorAndOpOverUp = ((foundMigration && (foundMigration?.outcome === config.get("app.operationsLabels.outcomeFailed") && migration.op !== automaticMigrationOperations.upWithOverride)));
    const isFoundAndOutcomeRolledbackErrorAndOpOverDown = ((foundMigration && (foundMigration?.outcome === config.get("app.operationsLabels.rolledBackFailed") && (migration.op !== automaticMigrationOperations.downWithOverride))));
    const isFoundAndOutcomeRolledbackSuccessAndOpOverDown = ((foundMigration && (foundMigration?.outcome === config.get("app.operationsLabels.rolledBackSuccess") && (migration.op !== automaticMigrationOperations.downWithOverride))));
    const isFoundAndOutcomeNoneAndOpOverUp = ((foundMigration && (foundMigration?.outcome === config.get("app.operationsLabels.outcomeMissing") && (migration.op !== automaticMigrationOperations.upWithOverride))));

    if(foundMigration?.id === migration?.id && isFoundAndChecksumDifferent){
      console.log(chalk.red(`Conflict for id: ${foundMigration.migration_id} you cannot change content of already executed migration, please create a new Migration file`))
    }

    if(!isNotFoundAndDownOp &&
        !isFoundAndOutcomeIsSuccessAndOpUp && !isFoundAndOutcomeErrorAndOpOverUp &&
        !isFoundAndOutcomeRolledbackErrorAndOpOverDown && !isFoundAndOutcomeRolledbackSuccessAndOpOverDown &&
        !isFoundAndOutcomeNoneAndOpOverUp
    ){
      let saved = await save(migration, dbms);
      listMigrations.push(migration);
    }
  }

  if(!listMigrations.length){
    console.log(chalk.yellow("NO NEW MIGRATIONS!"));
    return formattedResultBeforeStore;
  }

  const allOperationsResultsPromises = listMigrations.map(async (el: MigrationData) => {
    try {
      //@ts-ignore
      if((upAutomaticMigrations.includes(el.op) && !el?.up) || (!upAutomaticMigrations.includes(el.op) && !el?.down)){
        return save({...el, status: getStatusFromOperation(el.op), outcome: getOutcomeFromOperation(el.op), description: `Empty ${upAutomaticMigrations.includes(el.op) ? automaticMigrationOperations.up : automaticMigrationOperations.down} attribute `}, el.dbms)
      }
      const executedOperation = await executeRaw(el.dbms, upAutomaticMigrations.includes(el.op) ? el?.up : el?.down);
      return save({...el, status: getStatusFromOperation(el.op), outcome: getOutcomeFromOperation(el.op), description: JSON.stringify(executedOperation)}, el.dbms)
    }catch (e: any){
      return save({...el, status: getStatusFromOperation(el.op), outcome: el.op === automaticMigrationOperations.up || el.op === automaticMigrationOperations.upWithOverride ? config.get("app.operationsLabels.outcomeFailed") : config.get("app.operationsLabels.rolledBackFailed"), description: e.message}, el.dbms);
    }
  })
  //
  const allOperationsResults: any = await Promise.all(allOperationsResultsPromises);
  const message = `MIGRATIONS DONE, ID =>, ${listMigrations.map((e) => e.id)}`
  console.log(chalk.green(message));
  return listMigrations;
}

const getStatusFromOperation = (op: string): string => {
  return isUpOperation(op) ? config.get("app.operationsLabels.statusExecuted") : config.get("app.operationsLabels.statusRolledBack")
}
const getOutcomeFromOperation = (op: string): string => {
  return isUpOperation(op) ? config.get("app.operationsLabels.outcomeSuccess") : config.get("app.operationsLabels.rolledBackSuccess")
}

const isUpOperation = (op: string) => {
  const automaticMigrationOperations: {up: string, upWithOverride: string, down: string, downWithOverride: string} = config.get("app.automaticMigrationOperations");
  const upAutomaticMigrations = [automaticMigrationOperations.upWithOverride, automaticMigrationOperations.up];

  return upAutomaticMigrations.includes(op);
};

export {
  migrationExec,
  getOutcomeFromOperation,
  getStatusFromOperation
}
