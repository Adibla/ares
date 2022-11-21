import { Connection } from "../../interfaces";
import {MongoClient, RunCommandOptions} from "mongodb";

import config from "config";
import { Db } from "./model/migration";

const param = `mongodb://${config.get("db.connection.MONGODB.user")}:${config.get("db.connection.MONGODB.password")}@${config.get("db.connection.MONGODB.host")}:${config.get("db.connection.MONGODB.port")}/${config.get("db.connection.MONGODB.database")}?authMechanism=${config.get("db.connection.MONGODB.authMechanism")}&authSource=${config.get("db.connection.MONGODB.authSource")}`;

const client = new MongoClient(param);

const connectMongo: Connection = {
  connect: async () => {
    const connection = await client.connect();
    const db = connection.db(config.get("db.connection.MONGODB.database"));
    console.log(
      `Successfully connected to db ${db.databaseName}`);
    return db;
  },
  close: async () =>{
    return client.close();
  },
  initMigrationsDB: async () => {
    //For mongo it's not necessary
    return true;
  },
  executeRaw: async(rawOpCommand: RunCommandOptions) => {
    const connection = await client.connect();
    const db = connection.db(config.get("db.connection.MONGODB.database"));
    const op = await db.command(rawOpCommand)
    return op;
  }
}

export {
  connectMongo,
  client
}
