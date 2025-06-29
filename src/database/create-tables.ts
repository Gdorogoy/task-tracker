import { sqliteRun } from "./db-connetion"

export const CreateTables= async ():Promise<void> =>{
    await sqliteRun(`
        CREATE TABLE IF NOT EXISTS boards(
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL
        );
    `);

    await sqliteRun(`
        CREATE TABLE IF NOT EXISTS columns(
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            board_id TEXT NOT NULL,
            FOREIGN KEY (board_id)
            REFERENCES boards(id)
        );
    `);


    await sqliteRun(`
        CREATE TABLE IF NOT EXISTS cards(
            id TEXT PRIMARY KEY,
            text TEXT NOT NULL,
            columns_id TEXT NOT NULL,
            FOREIGN KEY (columns_id)
            REFERENCES columns(id)
        );
    `);
}
