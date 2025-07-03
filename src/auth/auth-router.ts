import { verifyJwt } from './../middleware/jwt-guard';
import { AuthRepository} from './auth-repositroy';
import express,{ Response ,Request} from "express";
import { User, UserLogin, UserRegister } from "../types/auth";
import { randomUUID } from 'node:crypto';
import { Roles } from '../types/auth/roles';
import { SALT,REFRESH_SECRET,SECRET } from '../config';
import { JwtPayload } from 'jsonwebtoken';


export const authRouter=express.Router();
const authRepository=AuthRepository();
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken');

authRouter.post("/register", async (req: Request<{}, {}, UserRegister>, res: Response) :Promise<void> => {
    const data : unknown = await authRepository.findByUserame(req.body.username)

    if (isUser(data)) {
        res.status(409).json({ message: "Username is already in use." });
        return;
    }

    if(!req.body.password || !req.body.username){
        res.status(400).json({message: "Username And Password Requierd."});
        return;
    }
    try{
        const encryptedPassword= await bcrypt.hash(req.body.password,SALT);
        const user:User={
            id:randomUUID(),
            role:Roles.USER,
            username:req.body.username,
            password:encryptedPassword,
            refreshToken:""
        }
        await authRepository.createUser(user);
        res.status(201).json({message:`User ${user.username} With The Role ${Roles[user.role]} Has Been Created`});
    }catch (err){
        res.status(500).json({message: String(err)});
        return;
    }
});

authRouter.post("/login",async(req: Request<{},{},UserLogin>, res: Response ):Promise<void>=>{
    if(!req.body.password || !req.body.username){
        res.status(400).json({message: "Username And Password Requierd."});
        return;
    }
    try{
        const user: unknown= await authRepository.findByUserame(req.body.username);
        if(isUser(user)){
            if(await bcrypt.compare(req.body.password,user.password)){
                const accessToken = jwt.sign(
                { id: user.id, username: user.username },
                SECRET,
                { expiresIn: "5m" }
                );

                const refreshToken = jwt.sign(
                { id: user.id, username: user.username },
                REFRESH_SECRET,
                { expiresIn: "12h" }
                );

                await authRepository.updateUserRefreshToken(user.id,user.username,refreshToken);
                res.cookie('jwt',refreshToken,{httpOnly:true, maxAge:24*60*60*5000});
                res.json({accessToken});
            }
            else{
                res.status(401).json({message: "Incorrect Password/Username"});
                return;
            }

        }else{
            res.status(403).json({message: "Incorrect Username"});
            return;

        }
    } catch(err){
        res.status(500).json({message: err});
        return;
    }

});

authRouter.post('/logout', async(req: Request<{ id: string, username: string }>,res:Response)=>{
    const user=await authRepository.findById(req.params.id);
    if(isUser(user)){
        authRepository.updateUserRefreshToken(req.params.id,req.body.username,"");
        res.status(200).json({message:`logout succses`});
    }else{
        res.status(404).json({ message: "User not found" });
    }
});

authRouter.get("/refresh",async(req: Request<{}, {}, { refreshToken: string }>, res: Response)=>{
    const token = req.cookies.jwt;
    if(!token){
        res.status(403).json({ message: "Error in token" });
    }

    try{
        const payload=jwt.verify(token,REFRESH_SECRET) as JwtPayload;
        if(!payload.id){
            res.sendStatus(500).json({message:"Error in payload"});
        }
        const user : unknown= await authRepository.findById(payload.id);
        if(!isUser(user)){
            res.sendStatus(500).json({message:"Error in fetching user"});
        }
        else{
            const accessToken=jwt.sign(
                    {"username": user.username},
                    SECRET,
                    {expiresIn: '5m'}

            );
            res.status(200).json({ accessToken });
        }
        

    }catch(err){
        res.sendStatus(500).json({message:`Error : ${String(err)}`});
    }

});




function isUser(data: unknown): data is User {
    return (
        typeof data === 'object' &&
        data !== null &&
        'id' in data &&
        'username' in data &&
        'password' in data &&
        'role' in data
    );
}

