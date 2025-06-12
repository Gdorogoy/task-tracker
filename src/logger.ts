import { Response ,Request} from "express";

export const logger =(req: Request, res: Response ,next : ()=> void) : void =>{
    console.log(`${req.method}`);
    next();
}