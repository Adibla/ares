import {client} from "../index";
import config from "config";
import {MigrationData} from "../../../interfaces";

const Db = client.db(config.get("db.connection.MONGODB.database"));
const Migration = Db.collection<MigrationData>(config.get("db.migrationsStoreTable.tableName"));

export {
  Db,
  Migration
};
