import { Router } from "express";

import { AuthMiddleware } from "../../auth/presentation/middlewares/auth.middleware";
import { AccountDatasourceImpl, AccountRepositoryImpl } from "../infrastructure";
import { AccountController } from "./controller";
import { TransactionRoutes } from "./transaction/routes";




export class AccountRoutes {

  static get routes(): Router {
    const router = Router();

    const datasource = new AccountDatasourceImpl();
    const accountRepository = new AccountRepositoryImpl(datasource);

    const controller = new AccountController(accountRepository);

    router.post('/', AuthMiddleware.validateJWT, controller.createAccount);
    router.get('/', AuthMiddleware.validateJWT, controller.getAllAccounts);
    router.get('/:id', AuthMiddleware.validateJWT, controller.getAccountById);
    router.put('/:id', AuthMiddleware.validateJWT, controller.updateAccount);
    router.delete('/:id', AuthMiddleware.validateJWT, controller.deleteAccount);

    router.use('/transaction', AuthMiddleware.validateJWT, TransactionRoutes.routes)

    
    return router;
  }
}