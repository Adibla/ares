import chalk from "chalk";

import {close} from "./service";
import { manualController, automaticController } from "./controller";
import { CommandlineArgs } from "./interfaces";

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
  return await automaticController.migrationExec();
}

const start = async(args: CommandlineArgs) => {
  try{
    let executedMigrations;
    //Automatic mode
    if(!args){
      executedMigrations = await executeAutomaticMode();
    }else{
      executedMigrations = await executeManualMode(args);
    }
    for (let executed of executedMigrations){
      args?.o !== 'create' && executed?.dbms ? await close(executed.dbms): null;
    }
  }catch (e: any){
    console.log(chalk.red('ERROR IN FLOW => ', e.message));
    throw e;
  }
}

export {
  start
}
