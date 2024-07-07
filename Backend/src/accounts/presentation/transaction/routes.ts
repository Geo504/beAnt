import { Router } from "express";

// import { AuthMiddleware } from "../../../auth/presentation/middlewares/auth.middleware";
import { TransactionMongoDataSourceImpl, TransactionRepositoryImpl } from "../../infrastructure";
import { TransactionController } from "./controller";



export class TransactionRoutes {

  static get routes(): Router {
    const router = Router();

    const datasource = new TransactionMongoDataSourceImpl();
    const transactionRepository = new TransactionRepositoryImpl(datasource);

    const controller = new TransactionController(transactionRepository);

    router.post('/', controller.createTransaction);

    
    return router;
  }
}