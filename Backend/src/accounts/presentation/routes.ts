import { Router } from "express";

import { AccountController } from "./controller";
import { AuthMiddleware } from "../../auth/presentation/middlewares/auth.middleware";
import { AccountDatasourceImpl, AccountRepositoryImpl } from "../infrastructure";




export class AccountRoutes {

  static get routes(): Router {
    const router = Router();

    const datasource = new AccountDatasourceImpl();
    const accountRepository = new AccountRepositoryImpl(datasource);

    const controller = new AccountController(accountRepository);

    router.post('/', AuthMiddleware.validateJWT, controller.createAccount);
    router.get('/', AuthMiddleware.validateJWT, controller.getAllAccounts);
    router.get('/:id', AuthMiddleware.validateJWT, controller.getAccount);

    
    return router;
  }
}