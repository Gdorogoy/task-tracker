import { Response ,Request} from "express";
import { Board, CreateBoardRequest } from "../../types/boards";
import { BoardIdParmas } from "../../types/common";

export const validateBoardInput = (
    req: Request<BoardIdParmas,Board,CreateBoardRequest>,
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