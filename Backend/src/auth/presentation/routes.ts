import { Router } from "express";

import { AuthController } from "./controller";
import { AuthDataSourceImpl, AuthRepositoryImpl } from "../infrastructure";
import { AuthMiddleware } from "./middlewares/auth.middleware";



export class AuthRoutes {

  static get routes(): Router {
    const router = Router();

    const datasource = new AuthDataSourceImpl();
    const authRepository = new AuthRepositoryImpl(datasource);

    const controller = new AuthController(authRepository);



    router.post('/register', controller.registerUser);
    router.post('/login', controller.loginUser);

    router.get('/validate-email/:token', controller.validateEmail);

    router.get('/user', AuthMiddleware.validateJWT, controller.getUser);
    router.put('/user', AuthMiddleware.validateJWT, controller.updateUser);
    router.delete('/user', AuthMiddleware.validateJWT, controller.deleteUser);

    
    return router;
  }
}