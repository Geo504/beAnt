import { Router } from "express";

import { AuthRoutes } from "../auth/presentation/routes";
import { AccountRoutes } from "../accounts/presentation/routes";



export class AppRoutes {

  static get routes(): Router {
    const router = Router();

    router.use('/api/auth', AuthRoutes.routes);
    router.use('/api/account', AccountRoutes.routes);

    return router;
  }
}