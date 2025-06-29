import { zstdCompress } from "node:zlib";
import { User} from "../types/auth";
import { sqliteGet, sqliteRun } from "./db-connection"

export const AuthRepository=()=>{


    const findByUserame=async (username:string) :Promise<User | null>=>{
        const row=await sqliteGet(
            `SELECT * FROM users 
            WHERE username = ? ;`,[username]);
        if (isUser(row)) return row;
        return null;
    }

    const findById=async (id:string) :Promise<User | null>=>{
        const row=await sqliteGet(
            `SELECT * FROM users 
            WHERE id = ? ;`,[id]);
        if (isUser(row)) return row;
        return null;
    }

    const createUser=async(user:User) :Promise<void>=>{
        await sqliteRun(`
            INSERT INTO users(id,role,username,password,refreshToken)
            VALUES(?,?,?,?,?);
            `,[user.id,user.role,user.username,user.password,user.refreshToken]);
    }
    const UpdateUserPassword=async(id:string,user:User): Promise<void>=>{
        await sqliteRun(`
            UPDATE users SET password = ?
            WHERE id = ?`,[user.password,id]);
    }
    const UpdateUserRole=async(id:string,user:User): Promise<void>=>{
        await sqliteRun(`
            UPDATE users SET role = ? 
            WHERE id = ?`,[user.role,id]);
    }
    const deleteUser=async (id : string) :Promise<void>=>{  
        await sqliteRun(`
            DELETE FROM users WHERE id = ?; 
            `,[id]); 
    }
    const updateUserRefreshToken=async(id:string,username:string,token: string): Promise<void> =>{
        await sqliteRun(`
            UPDATE users SET refreshToken = ?
            WHERE username = ? AND id = ?;
            `,[token,username,id]);
    }

    const isUser=(data:unknown): data is User=>{
        const user=data as User;
        return Boolean(user && typeof user==='object' &&
            user.id && user.password && user.username && user.role
        );
    }

    return{
        deleteUser,
        findByUserame,
        UpdateUserPassword,
        UpdateUserRole,
        createUser,
        updateUserRefreshToken,
        findById
    }


}