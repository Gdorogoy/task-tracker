import express from 'express'
import { ADMIN_LOGIN, ADMIN_PASSWORD, PORT } from './config';
import { cardsRouter } from './routers/cards.router';
import { CreateTables } from './database/create-tables';
import basicAuth from 'express-basic-auth';

const run = async (): Promise<void> => {
  await CreateTables(); 

  const server = express();
  server.use(express.json());
  server.use('/cards', cardsRouter);
  server.use(basicAuth({
    users:{ [ADMIN_LOGIN ]: ADMIN_PASSWORD},
    challenge: true
  }));

  server.listen(PORT, () => {
    console.log(`SERVER IS RUNNING ON PORT: ${PORT}`);
  });
};

run().catch((error)=>{
    console.error(error);
}); 
