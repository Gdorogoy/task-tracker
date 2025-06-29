import { verifyJwt } from './middleware/jwt-guard';
import express from 'express'
import {PORT } from './config';
import { cardsRouter } from './routers/cards.router';
import { CreateTables } from './database/create-tables';
import { logger} from './middleware/logger';
import { boardRouter } from './routers/boards.router';
import { columnsRouter } from './routers/columns.router';
import { authRouter } from './auth/auth-router';
import { CreateTablesAuth } from './auth/create-tables';

const run = async (): Promise<void> => {
  await CreateTables(); 
  await CreateTablesAuth();

  const server = express();
  

  
  server.use(express.json());
  server.use(logger);
  server.use('/auth',authRouter)
  server.use('/boards', verifyJwt,boardRouter);
  server.use('/boards/:boardId/columns', verifyJwt,columnsRouter);
  server.use('/boards/:boardId/columns/:columnId/cards', verifyJwt,cardsRouter);

  server.listen(PORT, () => {
    console.log(`SERVER IS RUNNING ON PORT: ${PORT}`);
  });
};

run().catch((error)=>{
    console.error(error);
}); 
