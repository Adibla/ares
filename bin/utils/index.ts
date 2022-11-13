import fs from "fs";

import * as pack from '../../package.json';
import { validateContent } from "./validation";
import { groupBy } from "./array-utils";
import { generateChecksum } from "./crypto-utils";
import { MigrationData } from "../interfaces";

const formatDirContentBeforeStore = async (dirContent: string[], dirPath: string): Promise<MigrationData[]> => {
  const mappedJsonFile = dirContent.map(async (file: string) => {
    const fileContent = await fs.promises.readFile(dirPath + '/' + file);
    const validatedContent = await validateContent(JSON.parse(fileContent.toString()));
    const splitKey = file.split('.json')[0];
    const splittedName = splitKey.split('-');
    const id = splittedName.length > 0 ? splittedName[0] : splitKey;
    const title = splittedName.length > 1 ? splittedName[1] : validatedContent?.title; // Get title from filename
    const author = splittedName.length > 2 ? splittedName[2] : validatedContent?.author; //Get author from filename (or in file content)

    const migration: MigrationData = {
      id,
      author,
      dbms: validatedContent.dbms,
      title,
      tag: validatedContent.tag,
      labels: validatedContent.labels,
      comment: validatedContent.comment,
      up: validatedContent.up,
      down: validatedContent.down,
      ares_version: pack.version,
      status: "PENDING", //todo: move in enum: PENDING, EXECUTED, ROLLED_BACK
      outcome: "NONE", //todo: move in enum: NONE, COMPLETE_ERROR, COMPLETE_SUCCESS
      filename: file,
      description: validatedContent.description,
      checksum: generateChecksum(JSON.stringify(validatedContent)),
      created_at: new Date()
    }
    return migration;
  })
  return Promise.all(mappedJsonFile);
}

const loadDirData = async (dir: string) => {
  return await fs.promises.readdir(dir);
}


export {
  generateChecksum,
  groupBy,
  validateContent,
  formatDirContentBeforeStore,
  loadDirData
}
