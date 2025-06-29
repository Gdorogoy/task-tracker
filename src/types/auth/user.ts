import { Roles } from "./roles"

export type User={
    id:string,
    role:Roles,
    username:string,
    password:string,
    refreshToken?: string;
}