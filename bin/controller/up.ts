import { migrationExec } from "./common";
import { CommandlineArgs, Operation } from "../interfaces";

const up = async (args: CommandlineArgs) => {
    return migrationExec(Operation.UP, args);
}
export {
    up
}
