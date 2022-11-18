#!/usr/bin/env node
if(!process.env.USE_CUSTOM_CONFIG || process.env.USE_CUSTOM_CONFIG === "false"){
  process.env.NODE_CONFIG_DIR = __dirname+'/../../config'
}

import yargs from "yargs";
import { hideBin } from "yargs/helpers";

import { start } from "./start";
import {CommandlineArgs, DbmsSupported} from "./interfaces";

let argv: any;
if(process.env.NODE_ENV !== 'test' && process.env.AUTOMATIC_MODE !== "true"){
  //TODO: move all labels in config
  argv = yargs(hideBin(process.argv))
    .option('operation', {
      alias: 'o',
      describe: 'operation to execute',
      required: true,
      choices: ['up', 'down', 'create']
    })
    .option('migrations', {
      alias: 'm',
      describe: 'migrations you want to migrate',
      type: 'array'
    })
    .option('name', {
      alias: 'n',
      describe: 'name migration you want to create',
      type: 'string'
    })
    .option('author', {
      alias: 'a',
      describe: 'author migration you want to create',
      type: 'string'
    })
    .option('description', {
      alias: 'd',
      describe: 'description migration you want to create',
      type: 'string'
    })
    .option('dbms', {
      alias: 's',
      describe: 'dbms migration you want to create',
      type: 'string',
      choices: [DbmsSupported.MYSQL, DbmsSupported.MONGODB]
    })
    .option('tags', {
      alias: 't',
      describe: 'tags migration you want to create',
      type: 'array'
    })
    .check((argv: any) => {
      if(argv.operation === 'create' && !argv.name){
        throw new Error('Argument check failed: You have to pass migration name with --name flag');
      }
      return true;
    })
    .argv
}

start(argv)
