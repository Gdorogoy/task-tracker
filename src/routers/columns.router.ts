import { ColumnIdParmas } from './../types/common/id.params';
import express,{Request, Response}  from "express";
import { columnsRepository } from "../database/columns-repository";
import { Column, ColumnsResponse, CreateColumnRequest } from "../types/columns";
import { randomUUID } from "node:crypto";
import { validateColumnInput } from "./validation/validate-column-input";
import { BoardIdParmas } from "../types/common";

export const columnsRouter=express.Router({mergeParams:true });
const columnRepo=columnsRepository();

columnsRouter.get('/', async (req : Request<BoardIdParmas>, res : Response<ColumnsResponse>)=>{
    const boards= await columnRepo.getColumns(req.params.boardId);
    res.status(200).send(boards);
});

columnsRouter.get('/:columnId', async (req :Request<ColumnIdParmas> , res : Response<Column | null>)=>{
    const column=await columnRepo.getColumn(req.params.columnId,req.params.boardId);
    res.status(200).send(column);
});

columnsRouter.post('/', validateColumnInput,async (req : Request<BoardIdParmas,Column,CreateColumnRequest>, res: Response<Column>)=>{
    const column={
        id:randomUUID(),
        name: req.body.name,
        boardId:req.params.boardId
    }
    await columnRepo.createColumn(column);
    res.status(201).send(column);
});

columnsRouter.put('/:columnId', async (req : Request<ColumnIdParmas,CreateColumnRequest,Column>, res : Response<Column> )=>{
    const column : Column={
        id:req.params.columnId,
        name: req.body.name,
        boardId:req.params.boardId
    }
    await columnRepo.updateColumn(column);
    res.status(201).send(column);
});

columnsRouter.delete('/:columnId', async(req: Request<ColumnIdParmas>, res: Response<void>)=>{
    await columnRepo.deleteColumn(req.params.columnId,req.params.boardId);
    res.status(203);
});