import { Column } from './../types/columns/column';
import { sqliteAll, sqliteGet, sqliteRun } from "../database/db-connetion";

export const columnsRepository=()=>{
    

    const isColumn=(data : unknown) : data is Column =>{
        const column= data as Column;
        return Boolean(column && typeof column ==='object' && column.id && column.name);
    }
    
    const createColumn=async (column : Column) :Promise<void>=>{  
        await sqliteRun(`
            INSERT INTO columns(id,name,board_id)
            VALUES(?,?,?);
            `,[column.id,column.name,column.boardId]); 
    }

    const updateColumn=async (column : Column) :Promise<void>=>{  
        await sqliteRun(`
            UPDATE columns SET name = ?
            WHERE id = ? AND board_id = ?;
            `,[column.name,column.id,column.boardId]); 
    }

    const deleteColumn=async (id : string, board_id : string) :Promise<void>=>{  
        await sqliteRun(`
            DELETE FROM columns WHERE id = ? AND board_id = ?; 
            `,[id,board_id]); 
    }

    const getColumn=async (id: string,board_id : string) :Promise<Column | null>=>{  
        const column=await sqliteGet(`
            SELECT id,name,board_id AS "boardId" FROM columns 
            WHERE id = ? AND board_id =?;
            `,[id,board_id]); 
        if(isColumn(column)){
            return column;
        }
        return null;
    }

    const getColumns=async (board_id:string) :Promise<Column[]>=>{  
        const data=await sqliteAll(`
            SELECT id,name,board_id AS "boardId" FROM columns 
            WHERE board_id = ?;
            `,[board_id]); 

        if(!Array.isArray(data)){
            console.error(`'Unknown data format on GetMany ${data}'`)
            throw new Error(`'Unknown data format on GetMany `);
        }

        return data.map((c)=>{
            if(isColumn(c)){
                return c;
            }
            return undefined;
        }).filter((c)=> c !== undefined);

    }

    return {
        getColumns,
        getColumn,
        createColumn,
        deleteColumn,
        updateColumn
    }





}