import { MigrationData, Repo } from "../../../interfaces";
import {Migration} from "../model/migration";


const migrationMysqlRepo: Repo = {
  list: (params: {migration_id:string, page: number, limit: number, status: string, outcome: string[]}) => {
      const query = Migration.query().where("migration_id",params.migration_id);
      params.status ? query.andWhere("status", params.status) : query;
      params.outcome ? query.whereIn("outcome", params.outcome) :  query;
      return query.orderBy("created_at", "desc");
  },

  get: (id: string) => {
      return Migration.query().findById(id);
  },

  save: async (data: MigrationData) => {
      const migrationFound = await Migration.query().findById(data.id);
      if(migrationFound){
        return Migration.query().updateAndFetchById(data.id, data);
      }
      return Migration.query().insert(data);
  },

  saveAll: async (data: MigrationData[]) => {
    const savePromises = data.map(migration => {
      return Migration.query().insert(migration).onConflict("id").merge();
    });
    return Promise.all(savePromises);
  },

  executeRaw(rawOp: string) {
  }

}

export {
  migrationMysqlRepo
}
