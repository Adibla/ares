import {RunCommandOptions, WithId} from "mongodb";
import Objection from "objection";

import { Migration } from "../dbms/mysql/model/migration";

interface MigrationData {
    id: string
    _id?: string
    ares_version: string
    author?: string
    dbms: DbmsSupported,
    labels?: string,
    comment?: string,
    tag?: string,
    checksum?: string,
    outcome?: string,
    status?: string,
    filename?: string,
    up: string|RunCommandOptions,
    down: string|RunCommandOptions,
    description?: string,
    title?: string
    created_at: Date
}

interface FileData {
    author?: string
    dbms: DbmsSupported,
    labels?: string,
    comment?: string,
    tag?: string,
    up: string|RunCommandOptions,
    down: string|RunCommandOptions,
    description?: string,
    title?: string
}

interface Args {
    operation?: string,
    o: string,
    name?: string,
    n?: string,
    m?: string[],
    migrations?: string[]
}



interface Repo {
    saveAll(data: MigrationData[]): any;
    save(data: MigrationData): void;
    get(id: string): Promise<WithId<MigrationData> | null> |  Objection.QueryBuilder<Migration, Migration | undefined>;
    list(params: {page?: number, limit?: number, id?: string, outcome?: string[], status?: string}): Promise<MigrationData[]> | Objection.QueryBuilder<Migration, Migration[] | undefined>;
    executeRaw(rawOp: string): void;
}

interface Connection {
    connect(): void;
    close(): void;
    initMigrationsDB(): void;
    executeRaw(rawOp: string | RunCommandOptions): Promise<boolean>;
}

interface CommandlineArgs {
    o: string,
    operation?: string,
    m?: string[],
    migrations?: string[],
    n?: string,
    name?: string,
    a?: string,
    author?: string,
    d?: string,
    description: string,
    t?: string[],
    tags?: string[]
}

enum DbmsSupported {
    MYSQL="MYSQL",
    MONGODB="MONGODB",
}

export {
    Repo,
    MigrationData,
    FileData,
    Connection,
    Args,
    CommandlineArgs,
    DbmsSupported
}
