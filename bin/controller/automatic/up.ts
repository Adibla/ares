import { migrationExec } from "./common";
import { CommandlineArgs } from "../../interfaces";

const up = async (args: CommandlineArgs) => {
    return migrationExec("up", args);
}
export {
    up
}
