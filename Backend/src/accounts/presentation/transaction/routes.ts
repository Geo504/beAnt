import { Router } from "express";

import { TransactionMongoDataSourceImpl, TransactionRepositoryImpl } from "../../infrastructure";
import { TransactionController } from "./controller";



export class TransactionRoutes {

  static get routes(): Router {
    const router = Router();

    const datasource = new TransactionMongoDataSourceImpl();
    const transactionRepository = new TransactionRepositoryImpl(datasource);

    const controller = new TransactionController(transactionRepository);

    router.post('/', controller.createTransaction);
    router.get('/', controller.getAllTransactions);
    router.get('/:transactionId', controller.getTransactionById);
    router.put('/:transactionId', controller.updateTransaction);

    
    return router;
  }
}