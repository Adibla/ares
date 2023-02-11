import chalk from "chalk";

import {close} from "./service";
import { create, down, up } from "./controller";
import { CommandlineArgs, Operation } from "./interfaces";

const start = async(args: CommandlineArgs) => {
  let mapControllerOperation: any = {
    [Operation.CREATE]: create,
    [Operation.DOWN]: down,
    [Operation.UP]: up,
  }
  try{
      const savedOperations = await mapControllerOperation[args.o](args);
      return (args.o !== Operation.CREATE && savedOperations[0]?.dbms) ? await close(savedOperations[0].dbms) : false;
  }catch (e: any){
    console.log(chalk.red('ERROR IN FLOW => ', e.message));
    throw e;
  }
}

export {
  start
}
