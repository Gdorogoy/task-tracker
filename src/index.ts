import express from 'express'
import { PORT } from './config';
import { cardsRouter } from './routers/cards.router';
import { CreateTables } from './database/create-tables';

const run = async (): Promise<void> => {
  await CreateTables(); 

  const server = express();
  server.use(express.json());
  server.use('/cards', cardsRouter);

  server.listen(PORT, () => {
    console.log(`SERVER IS RUNNING ON PORT: ${PORT}`);
  });
};

run().catch((error)=>{
    console.error(error);
}); 
