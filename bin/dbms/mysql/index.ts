import { Model } from "objection";
import { knex } from 'knex';

import config from "config";
import { Connection } from "../../interfaces";

let connection: any;

const connectMysql: Connection = {
  connect: async () => {
    try {
      connection = knex({
        client: 'mysql2',
        connection: {
          host : config.get("db.connection.host"),
          port : config.get("db.connection.port"),
          user : config.get("db.connection.user"),
          password : config.get("db.connection.password"),
          database : config.get("db.connection.database")
        }
      })

      return Model.knex(connection);
    }catch (e){
      console.log("ERROR", e)
    }
  },
  close: async () => {
    return connection?.destroy()
  },
  initMigrationsDB: async () => {
    //Insert migration up
    return connection.schema.hasTable(config.get("db.migrationsStoreTable.tableName")).then((exists: boolean) => {
      if (!exists) {
        return connection.schema.createTable(config.get("db.migrationsStoreTable.tableName"), (t: any) => {
          t.string('id').primary();
          t.string('author');
          t.string('dbms');
          t.string('tag');
          t.string('description', 1000);
          t.string('comment');
          t.string('title');
          t.string('labels');
          t.string('op');
          t.string('up', 1000);
          t.string('down', 1000);
          t.string('ares_version');
          t.string('status');
          t.string('outcome');
          t.string('filename');
          t.string('checksum');
          t.datetime('created_at');
          t.datetime('rolledback_at');
        });
      }
    });
  },
  executeRaw: async(rawOp: string) => {
    return connection.raw(rawOp);
  }
}

export {
  connectMysql
}
