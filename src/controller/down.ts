import { migrationExec } from "./common";
import { CommandlineArgs } from "../interfaces";

const down = async(args: CommandlineArgs) => {
  return migrationExec("down", args);
}
export {
    down
}
