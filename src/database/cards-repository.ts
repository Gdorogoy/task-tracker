import { Card } from "../types/cards"
import { sqliteAll, sqliteGet, sqliteRun } from "./db-connetion"

export const CardsRepository=()=>{
    //Create
    const CreateCard= async (card:Card) :Promise<void> =>{
        await sqliteRun(`
            INSERT INTO cards(id,text,columns_id)
            VALUES(?,?,?);
            `,[card.id,card.text,card.columnId]);
    }
    //Update
    const UpdateCard= async (card:Card) :Promise<void> =>{
        await sqliteRun(`
            UPDATE cards SET text = ?
            WHERE id =? AND columns_id = ?;
            `,[card.text,card.id,card.columnId]);
    }
    //Delete
    const DeleteCard= async (id:string , columnId:string) :Promise<void> =>{
        await sqliteRun(`
            DELETE FROM cards WHERE id = ? AND columns_id= ?;
            `,[id,columnId]);
    }
    //GetOne
    const GetCard= async (id:string, columnId:string) :Promise<Card | null> =>{
        const data=await sqliteGet(`
            SELECT id,name,columns_id AS "columnId" FROM cards 
            WHERE id = ? AND columns_id = ?;
            `,[id, columnId]);

        if( isCard(data)){
            return data;
        }
        
        return null;

    }


    //GetMany

    const GetManyCards= async (columnId : string) : Promise<Card[]> =>{
        const data=await sqliteAll(`
            SELECT id,name,columns_id AS "columnId" FROM cards 
            WHERE board_id = ?;
            `,[columnId]);

        if(!Array.isArray(data)){
            console.error(`'Unknown data format on GetMany ${data}'`)
            throw new Error(`'Unknown data format on GetMany `);
        }
        
        return data.map((one)=>{
            if(isCard(one)){
                return one;
            }
            return undefined;
        }).filter((one)=> one !==undefined );


    }



    const isCard= (data: unknown): data is Card =>{
        const card=data as Card;
        return Boolean(card && typeof card==='object' && card.id && card.text);
    }

    return{
        UpdateCard,
        CreateCard,
        DeleteCard,
        GetCard,
        GetManyCards
    }
}