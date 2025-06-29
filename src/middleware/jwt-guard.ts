import { JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { SECRET , REFRESH_SECRET } from "../config"
import { User } from "../types/auth";

const jwt=require('jsonwebtoken')

declare module "express-serve-static-core" {
  interface Request {
    user?: User;
  }
}

export const verifyJwt = (req : Request,res : Response,next : NextFunction )=>{
    try{
        const authHeader =req.headers['authorization'];
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            res.status(401).send("Unauthorized");
            return;
        } 

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, SECRET) as JwtPayload;  

        if (!decoded || typeof decoded !== "object" || !decoded.username) {
        res.status(403).send("Invalid token payload");
        return;
        }

        req.user = decoded.username;
        next();

    }catch(err){
        console.error("JWT error:", err);
        res.status(403).send("Forbidden");
    }

}