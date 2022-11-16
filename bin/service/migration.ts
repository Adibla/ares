
import { migrationMongoRepo } from "../dbms/mongo/repo"
import { migrationMysqlRepo } from "../dbms/mysql/repo"
import {DbmsSupported, ListParams, MigrationData, Repo} from "../interfaces";

const getMatchingDbms = (dbms: DbmsSupported): Repo => {
    const mapDbms:{[k in DbmsSupported]?:Repo } = {
        MYSQL: migrationMysqlRepo,
        MONGODB: migrationMongoRepo,
    }
    const matchingRepo: Repo|undefined = mapDbms[dbms];
    if(matchingRepo){
        return matchingRepo;
    }
    throw new Error("Invalid dbms passed");
}

const list = (params: ListParams, dbms: DbmsSupported) => {
  const repoToUse:Repo = getMatchingDbms(dbms);
  return repoToUse.list(params);
}

const get = (id: string, dbms: DbmsSupported) => {
    const repoToUse:Repo = getMatchingDbms(dbms);
    return repoToUse.get(id);
}

const save = (params: MigrationData, dbms: DbmsSupported) => {
  const repoToUse:Repo = getMatchingDbms(dbms);
  return repoToUse.save(params);
}

const saveAll = async (params: MigrationData[], dbms: DbmsSupported) => {
    const repoToUse:Repo = getMatchingDbms(dbms);
    const saved = await repoToUse.saveAll(params);
    return saved;
}


export {
  list, save, saveAll, get
}
