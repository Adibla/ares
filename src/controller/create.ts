import * as fs from "fs";
import * as crypto from "crypto";

import { CommandlineArgs } from "../interfaces";
import { generateSchemaFromResults } from "../templating";
import chalk from "chalk";

const create = async (args: CommandlineArgs) => {
    const filename = args.n;
    const author = args.a;
    const id = crypto.randomUUID().replaceAll("-", "");

    const filenameToUse = author ? `${id}-${filename}-${author}.json` : `${id}-${filename}.json`
    const schemaGen = await generateSchemaFromResults(filenameToUse, args);
    //todo: move in config all labels
    console.log(chalk.blue("NEW FILE MIGRATION CREATED WITH SUCCESS!"));
    return schemaGen;
}
export {
    create
}
