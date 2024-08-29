import { Router } from "express";

import { AuthController } from "./controller";
import { AuthDataSourceImpl, AuthRepositoryImpl } from "../infrastructure";
import { AuthMiddleware } from "./middlewares/auth.middleware";
import { UserProfileRoutes } from "./user/routes";



export class AuthRoutes {

  static get routes(): Router {
    const router = Router();

    const datasource = new AuthDataSourceImpl();
    const authRepository = new AuthRepositoryImpl(datasource);

    const controller = new AuthController(authRepository);

    
    router.use('/user', AuthMiddleware.validateJWT, UserProfileRoutes.routes)

    router.post('/register', controller.registerUser);
    router.post('/login', controller.loginUser);
    router.get('/validate-email/:token', controller.validateEmail);


    
    return router;
  }
}