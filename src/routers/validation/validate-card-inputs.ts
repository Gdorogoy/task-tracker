import { Response ,Request} from "express";
import { IdParams } from "../../types/common";
import { Card, CreateCardRequest } from "../../types/cards";

export const validateCardInput = (
    req: Request<IdParams,Card,CreateCardRequest>,
    res: Response ,
    next: ()=> void): void => {
    if(typeof req.body !== 'object' || !req.body.text || typeof req.body.text !== 'string' ){
        res.status(400).send({
            error: 'Validation error'
        });
        return;
    }

    next();
}