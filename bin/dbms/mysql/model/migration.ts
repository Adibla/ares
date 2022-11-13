import { Model } from 'objection';
import config from "config";

class Migration extends Model {
  static tableName: string = config.get("db.migrationsStoreTable.tableName"); // database table name
  static idColumn: string = config.get("db.migrationsStoreTable.tableId"); // id column name
}

export {
  Migration
}
