import express,{Response,Request} from 'express'
import { Card, GetCardsResponse, CreateCardRequest } from '../types/cards';
import { CardsRepository } from '../database/cards-repository';
import { randomUUID } from 'crypto';
import { validateCardInput } from './validation/validate-card-inputs';
import { CardIdParams, ColumnIdParmas } from '../types/common';


export const cardsRouter=express.Router({mergeParams: true});
const cardRepo=CardsRepository();

cardsRouter.get('/' ,async (req : Request<ColumnIdParmas> ,res : Response<GetCardsResponse>)=>{
    const cards=await cardRepo.GetManyCards(req.params.columnId);
    res.send(cards).status(200);
});

cardsRouter.get('/:id' ,async (req : Request<CardIdParams,{}> ,res : Response<Card | string,{}>)=>{
    const card=await cardRepo.GetCard(req.params.cardId, req.params.columnId);
    if(!card){
        res.sendStatus(404).send('Card Not Found');
        return;
    }
    res.send(card).status(200);


});
cardsRouter.post('/',validateCardInput , async (req : Request<{columnId: string},Card,CreateCardRequest> ,res : Response<Card>)=>{
    const card:Card={
        text:req.body.text,
        id:randomUUID(),
        columnId:req.params.columnId
    }

    await cardRepo.CreateCard(card);

    res.send(card).status(201);

});
cardsRouter.put('/:id',validateCardInput ,async(req : Request<CardIdParams,Card,CreateCardRequest> ,res : Response<Card>)=>{
    const card:Card={
        id:req.params.cardId,
        text:req.body.text,
        columnId:req.params.columnId
    }
    await cardRepo.UpdateCard(card);

    res.send(card).status(203);

});
cardsRouter.delete('/:id' , async (req : Request<CardIdParams> ,res : Response<void>)=>{
    await cardRepo.DeleteCard(req.params.cardId,req.params.columnId);
    res.sendStatus(204);
});