import {Database } from 'sqlite3'
import { SQLITE_PATH } from '../config';

const db= new Database(SQLITE_PATH,(error)=>{
    if(error){
        console.error(error);
        process.exit(1);
    }
    console.log("Database connected.")
});


//run to run in db
//get to get one row from db
//all to get many rows from db

export const sqliteRun =(sql:string , params?:unknown[]): Promise<void>=>{
    return new Promise((resolve,reject) =>{
        db.run(sql,params,(error: unknown , data: unknown) =>{
            if(error){
                return reject(error);
            }
            resolve();
        })
    });
}

export const sqliteGet =(sql:string , params?:unknown[]): Promise<unknown>=>{
    return new Promise((resolve,reject) =>{
        db.get(sql,params,(error: unknown , data: unknown) =>{
            if(error){
                return reject(error);
            }
            resolve(data);
        })
    });
}

export const sqliteAll =(sql:string , params?:unknown[]): Promise<unknown[]>=>{
    return new Promise((resolve,reject) =>{
        db.all(sql,params,(error: unknown , data: unknown[]) =>{
            if(error){
                return reject(error);
            }
            resolve(data);
        })
    });
}


