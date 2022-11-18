import fs from "fs";

import config from "config";
import * as pack from '../../package.json';
import {validateContent} from "./validation";
import {groupBy} from "./array-utils";
import {generateChecksum} from "./crypto-utils";
import {DbmsSupported, MigrationData} from "../interfaces";

const formatManualDirContentBeforeStore = async (dirContent: string[], dirPath: string): Promise<MigrationData[]> => {
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
      op: "",
      tag: validatedContent.tag,
      labels: validatedContent.labels,
      comment: validatedContent.comment,
      up: validatedContent.up,
      down: validatedContent.down,
      ares_version: pack.version,
      status: config.get("app.operationsLabels.statusPending"),
      outcome: config.get("app.operationsLabels.outcomeMissing"),
      filename: file,
      description: validatedContent.description,
      checksum: generateChecksum(JSON.stringify(validatedContent)),
      created_at: new Date(),
      rolledback_at: null
    }
    return migration;
  })
  return Promise.all(mappedJsonFile);
}
const formatAutomaticDirContentBeforeStore = async (dirContent: string[], dirPath: string): Promise<MigrationData[]> => {
  const mappedJsonFile = dirContent.map(async (file: string) => {
    const fileContent = await fs.promises.readFile(dirPath + '/' + file);
    const splittedFilename = file.split("-") //op --> u, uu, d,dd
    //TODO: add validation on required properties filename and throw error required fields
    const op = splittedFilename.length > 0 ? splittedFilename[0] : "u";
    const id = splittedFilename.length > 1 ? splittedFilename[1] : "generated";
    const author = splittedFilename.length > 2 ? splittedFilename[2] : "Andrea"
    const title = splittedFilename.length > 3 ? splittedFilename[3] : "title"
    const dbms = splittedFilename.length > 4 ? splittedFilename[4] : DbmsSupported.MYSQL

    const migration: MigrationData = {
      id,
      author,
      dbms: dbms === 'MYSQL'? DbmsSupported.MYSQL : DbmsSupported.MONGODB,
      title,
      // tag: validatedContent.tag,
      // labels: validatedContent.labels,
      // comment: validatedContent.comment,
      op,
      up: ['uu', 'u'].includes(op) ? fileContent.toString(): "",
      down: ['dd', 'd'].includes(op) ? fileContent.toString(): "",
      ares_version: pack.version,
      status: config.get("app.operationsLabels.statusPending"),
      outcome: config.get("app.operationsLabels.outcomeMissing"),
      filename: file,
      // description: validatedContent.description,
      checksum: generateChecksum(JSON.stringify(fileContent.toString())),
      created_at: new Date(),
      rolledback_at: null
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
  formatManualDirContentBeforeStore,
  formatAutomaticDirContentBeforeStore,
  loadDirData
}
