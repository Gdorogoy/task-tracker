import { Response ,Request} from "express";
import { ColumnIdParmas } from "../../types/common";
import { Column, CreateColumnRequest } from "../../types/columns";

export const validateColumnInput = (
    req: Request<ColumnIdParmas,Column,CreateColumnRequest>,
    res: Response ,
    next: ()=> void): void => {
    if(typeof req.body !== 'object' || !req.body.name || typeof req.body.name !== 'string' ){
        res.status(400).send({
            error: 'Validation error'
        });
        return;
    }

    next();
}