import * as fs from 'fs';
import * as Handlebars from 'handlebars';

import { CommandlineArgs } from "../interfaces";
import { SchemaMigrationGenerationError } from "../errors";
import { registerCustomHelpers } from "./utils";

registerCustomHelpers();

const generateSchemaFromResults = async (filename: string, content?: CommandlineArgs) => {
  try{
    const baseTemplate = await fs.promises.readFile("./src/templating/base/schema.hbs");
    const template = Handlebars.compile(baseTemplate.toString());
    const context = {
      results: content
    }
    const cont = template(context)
    return fs.promises.writeFile("./src/data/"+filename, cont);
  }catch (e: any){
    throw new SchemaMigrationGenerationError(e.message);
  }

}

export {
  generateSchemaFromResults
}
