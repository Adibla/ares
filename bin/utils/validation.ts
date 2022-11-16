import Ajv, {JSONSchemaType} from "ajv"
import {Args, DbmsSupported, FileData} from "../interfaces";
import {CustomValidationError} from "../errors";
const ajv = new Ajv()

const validateContent = async (content: FileData) => {
  //TODO: improve validation
  //@ts-ignore
  const schema: JSONSchemaType<FileData> = {
    type: "object",
    properties: {
      author: {type: "string", nullable: true},
      dbms: {type: "string"},
      description: {type: "string", nullable: true},
      tag: {type: "string", nullable: true},
      comment: {type: "string", nullable: true},
      labels: {type: "string", nullable: true},
      title: {type: "string", nullable: true}
    },
    required: ["dbms","up","down"],
    additionalProperties: true
  }

  const validate = ajv.compile(schema);
  if (validate(content)) {
    return content;
  } else {
    throw new CustomValidationError(`Validation error => ${validate.errors?.map(el => JSON.stringify(el)).join(",")}`);
  }
}
const validateArgs = async (args: any) => {
  if(args.operation === 'create' && !args.name){
    throw new Error('Argument check failed: You have to pass migration name with --name flag');
  }
  return true;
}

export {
  validateContent,
  validateArgs
}
