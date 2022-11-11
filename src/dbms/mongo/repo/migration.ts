import { Db, Migration } from "../model/migration";

import { MigrationData, Repo } from "../../../interfaces";

const migrationMongoRepo: Repo = {
  list: async (params: {page: number, limit: number, outcome: string[]}) => {
    return Migration.find({...params, outcome: {$in: params.outcome}}).toArray()
  },
  get: async (id: string) => {
    return Migration.findOne({id: id});
  },
  save: async(data: MigrationData) => {
    const query = { id: data.id };
    const update = { $set: data};
    const options = { upsert: true };
    return Migration.updateOne(query, update, options);
  },
  saveAll: async(data: MigrationData[]) => {
    const ops = data.map(item => {
      return {
        updateOne: {
          filter: { id: item.id },
          update: {
            $set: item
          },
          upsert: true
        }
      }
    })
    const dataSaved = await Migration.bulkWrite(ops);
    return data;
  },
  executeRaw: async(rawOp: string) => {}
}

export {
  migrationMongoRepo
}
