import { MigrationData, Repo } from "../../../interfaces";
import {Migration} from "../model/migration";


const migrationMysqlRepo: Repo = {
  list: (params: {id:string, page: number, limit: number, status: string, outcome: string[]}) => {
      const query = Migration.query().where("id",params.id);
      params.status ? query.andWhere("status", params.status) : query;
      params.outcome ? query.whereIn("outcome", params.outcome) :  query;
      return query;
  },

  get: (id: string) => {
      return Migration.query().findById(id);
  },

  save: async (data: MigrationData) => {
      const migrationFound = Migration.query().findById(data.id);
      if(migrationFound){
        return migrationFound.patch(data);
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
