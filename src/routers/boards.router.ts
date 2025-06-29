import express,{Response,Request} from 'express'
import { BoardsRepository } from '../database/boards-repository';
import { GetBoardsResponse , Board, CreateBoardRequest} from '../types/boards';
import { randomUUID } from 'crypto';
import { validateBoardInput } from './validation/validate-board-input';
import { BoardIdParmas } from '../types/common';


export const boardRouter=express.Router();
const boardRepo= BoardsRepository();
//Request<Params, ResBody, ReqBody, ReqQuery>
//Response<ResBody, ResLocals>

boardRouter.get('/', async (req : Request<{},{}>, res : Response<GetBoardsResponse>)=>{
    const boards= await boardRepo.GetManyBoards();
    res.status(200).send(boards);
});

boardRouter.get('/:boardId', async (req : Request<BoardIdParmas,{}>, res : Response<Board | string ,{}>)=>{
    const board=await boardRepo.GetBoard(req.params.boardId);
    if(!board){
        res.sendStatus(404).send('Card Not Found');
        return;
    }
    res.send(board).status(200);
});

boardRouter.post('/', validateBoardInput,async (req : Request<{},Board , CreateBoardRequest> , res: Response<Board>)=>{
    const board={
        id:randomUUID(),
        name: req.body.name
    }
    boardRepo.CreateBoard(board);
    res.send(board).status(201);
})

boardRouter.put('/:boardId', validateBoardInput,async (req: Request<BoardIdParmas,Board, CreateBoardRequest> , res: Response<Board> )=>{
    const board={
        id:req.params.boardId,
        name:req.body.name
    }
    await boardRepo.UpdateBoard(board);
    res.send(board).status(203);
})

boardRouter.delete('/:boardId' , async(req : Request<BoardIdParmas> ,res : Response<void>) =>{
    await boardRepo.DeleteBoard(req.params.boardId);
    res.sendStatus(204);
})