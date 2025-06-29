import {sqliteRun } from "./db-connection";

export const CreateTablesAuth= async ():Promise<void> =>{
    await sqliteRun(`
        CREATE TABLE IF NOT EXISTS users(
            id TEXT PRIMARY KEY,
            role TEXT NOT NULL,
            username TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,
            refreshToken TEXT
        );
    `);

    
}
