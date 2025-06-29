import { sqliteAll, sqliteGet, sqliteRun } from "./db-connetion";
import { Board } from "../types/boards/board";

export const BoardsRepository=()=>{
    //Create
    const CreateBoard= async (board :Board) :Promise<void> =>{
        await sqliteRun(`
            INSERT INTO boards(id,name)
            VALUES(?,?);
            `,[board.id,board.name]);
    }
    //Update
    const UpdateBoard= async (board:Board) :Promise<void> =>{
        await sqliteRun(`
            UPDATE boards SET name = ?
            WHERE id = ?;
            `,[board.name,board.id]);
    }
    //Delete
    const DeleteBoard= async (id:string) :Promise<void> =>{
        await sqliteRun(`
            DELETE FROM boards WHERE id = ?;
            `,[id]);
    }
    //GetOne
    const GetBoard= async (id:string) :Promise<Board | null> =>{
        const data=await sqliteGet(`
            SELECT * FROM boards WHERE id = ?;
            `,[id]);

        if( isBoard(data)){
            return data;
        }
        
        return null;

    }
    //GetMany

    const GetManyBoards= async () : Promise<Board[]> =>{
        const data=await sqliteAll(`
            SELECT * FROM boards;
            `);

        if(!Array.isArray(data)){
            console.error(`'Unknown data format on GetMany ${data}'`)
            throw new Error(`'Unknown data format on GetMany `);
        }
        
        return data.map((one)=>{
            if(isBoard(one)){
                return one;
            }
            return undefined;
        }).filter((one)=> one !==undefined );


    }



    const isBoard= (data: unknown): data is Board =>{
        const board=data as Board;
        return Boolean(board && typeof board==='object' && board.id && board.name);
    }

    return{
        UpdateBoard,
        CreateBoard,
        DeleteBoard,
        GetBoard,
        GetManyBoards
    }
}