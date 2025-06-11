import express,{Response,Request} from 'express'
import { Card, GetCardsResponse, CreateCardRequest } from '../types/cards';
import { IdParams } from '../types/common';
import { CardsRepository } from '../database/cards-repository';
import { randomUUID } from 'crypto';


export const cardsRouter=express.Router();
const cardRepo=CardsRepository();

cardsRouter.get('/', async (req : Request<{},{}> ,res : Response<GetCardsResponse>)=>{
    const cards=await cardRepo.GetManyCards();
    res.send(cards).status(200);
});

cardsRouter.get('/:id',async (req : Request<IdParams,{}> ,res : Response<Card | string,{}>)=>{
    const card=await cardRepo.GetCard(req.params.id);
    if(!card){
        res.sendStatus(404).send('Card Not Found');
        return;
    }
    res.send(card).status(200);


});
cardsRouter.post('/',async (req : Request<{},Card,CreateCardRequest> ,res : Response<Card>)=>{
    const card:Card={
        text:req.body.text,
        id:randomUUID()
    }

    await cardRepo.CreateCard(card);

    res.send(card).status(201);

});
cardsRouter.put('/:id',async(req : Request<IdParams,Card,CreateCardRequest> ,res : Response<Card>)=>{
    const card:Card={
        id:req.params.id,
        text:req.body.text
    }
    await cardRepo.UpdateCard(card);

    res.send(card).status(203);

});
cardsRouter.delete('/:id',async (req : Request<IdParams> ,res : Response<void>)=>{
    await cardRepo.DeleteCard(req.params.id);
    res.sendStatus(204);
});