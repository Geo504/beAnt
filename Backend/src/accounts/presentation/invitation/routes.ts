import { Router } from "express";

import { InvitationMongoDataSourceImpl, InvitationRepositoryImpl } from "../../infrastructure";
import { InvitationController } from "./controller";



export class InvitationRoutes {

  static get routes(): Router {
    const router = Router();

    const datasource = new InvitationMongoDataSourceImpl();
    const invitationRepository = new InvitationRepositoryImpl(datasource);

    const controller = new InvitationController(invitationRepository);

    router.post('/', controller.createInvitation);
    router.get('/received', controller.getInvitationsReceived);
    router.get('/sent', controller.getInvitationsSent);
    router.put('/id/:invitationId', controller.updateInvitation);


    
    return router;
  }
}