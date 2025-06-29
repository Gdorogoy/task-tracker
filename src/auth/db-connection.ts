import {Database } from 'sqlite3'

const db= new Database('./auth.db',(error)=>{
    if(error){
        console.error(error);
        process.exit(1);
    }
    console.log("Database connected.")
});


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

