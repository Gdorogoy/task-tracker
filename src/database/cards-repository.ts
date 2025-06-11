import { Card } from "../types/cards"
import { sqliteAll, sqliteGet, sqliteRun } from "./db-connetion"

export const CardsRepository=()=>{
    //Create
    const CreateCard= async (card:Card) :Promise<void> =>{
        await sqliteRun(`
            INSERT INTO cards(id,text)
            VALUES(?,?);
            `,[card.id,card.text]);
    }
    //Update
    const UpdateCard= async (card:Card) :Promise<void> =>{
        await sqliteRun(`
            UPDATE cards SET text = ?
            WHERE id = ?;
            `,[card.text,card.id]);
    }
    //Delete
    const DeleteCard= async (id:string) :Promise<void> =>{
        await sqliteRun(`
            DELETE FROM cards WHERE id = ?;
            `,[id]);
    }
    //GetOne
    const GetCard= async (id:string) :Promise<Card | null> =>{
        const data=await sqliteGet(`
            SELECT * FROM cards WHERE id = ?;
            `,[id]);

        if( isCard(data)){
            return data;
        }
        
        return null;

    }
    //GetMany

    const GetManyCards= async () : Promise<Card[]> =>{
        const data=await sqliteAll(`
            SELECT * FROM cards;
            `);

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