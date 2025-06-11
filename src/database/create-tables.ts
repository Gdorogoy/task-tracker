import { sqliteRun } from "./db-connetion"

export const CreateTables= async ():Promise<void> =>{
    await sqliteRun(`
        CREATE TABLE IF NOT EXISTS cards(
            id TEXT PRIMARY KEY,
            text TEXT NOT NULL
        );
    `);
}
