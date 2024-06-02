import { Router } from "express";
import { AuthRoutes } from "../../auth/presentation/routes";



export class AppRoutes {

  static get routes(): Router {
    const router = Router();

    router.use('/api/auth', AuthRoutes.routes);
    // router.use('/api/user');

    return router;
  }
}