import {connectMongo, connectMysql} from "../dbms";
import {Connection, DbmsSupported} from "../interfaces";

let connect = async (dbms: DbmsSupported) => {
    const mapConnection: {[k in DbmsSupported]?:Connection } = {
        MYSQL: connectMysql,
        MONGODB: connectMongo,
    }
    const mappedConnection: Connection|undefined = mapConnection[dbms];

    if(mappedConnection){
        return mappedConnection.connect();
    }
    throw new Error("Invalid dbms passed");
}

let close = async (dbms: DbmsSupported) => {
    const mapDbms: {[k in DbmsSupported]?:Connection } = {
        MYSQL: connectMysql,
        MONGODB: connectMongo,
    }
    const mappedConnection: Connection|undefined = mapDbms[dbms];
    if(mappedConnection){
        return mappedConnection.close();
    }
    throw new Error("Invalid dbms passed");
}

let initDB = async (dbms: DbmsSupported) => {
    const mapDbms: {[k in DbmsSupported]?:Connection } = {
        MYSQL: connectMysql,
        MONGODB: connectMongo,
    }
    const mappedConnection: Connection|undefined = mapDbms[dbms];
    if(mappedConnection){
        return mappedConnection.initMigrationsDB();
    }
    throw new Error("Invalid dbms passed");
}


let executeRaw = async (dbms: DbmsSupported, rawOp: string|object): Promise<boolean> => {
    const mapDbms: {[k in DbmsSupported]?:Connection } = {
        MYSQL: connectMysql,
        MONGODB: connectMongo,
    }
    const mappedConnection: Connection|undefined = mapDbms[dbms];
    if(mappedConnection){
        return mappedConnection.executeRaw(rawOp);
    }
    throw new Error("Invalid dbms passed");
}

export {
    connect,
    close,
    initDB,
    executeRaw
}
