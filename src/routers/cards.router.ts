import express,{Response,Request} from 'express'
import { Card, GetCardsResponse, CreateCardRequest } from '../types/cards';
import { IdParams } from '../types/common';



export const cardsRouter=express.Router();


cardsRouter.get('/',(req : Request<{},{}> ,res : Response<Card>)=>{

});

cardsRouter.get('/:id',(req : Request<IdParams,{}> ,res : Response<GetCardsResponse>)=>{

});
cardsRouter.post('/',(req : Request<{},CreateCardRequest> ,res : Response<Card>)=>{

});
cardsRouter.put('/:id',(req : Request<IdParams,Card> ,res : Response<Card>)=>{

});
cardsRouter.delete('/:id',(req : Request<IdParams> ,res : Response<void>)=>{

});