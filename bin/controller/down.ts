import { migrationExec } from "./common";
import { CommandlineArgs, Operation } from "../interfaces";

const down = async(args: CommandlineArgs) => {
  return migrationExec(Operation.DOWN, args);
}
export {
    down
}
