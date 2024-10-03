import { Router } from "express";

import { UserProfileDataSourceImpl, UserProfileRepositoryImpl } from "../../infrastructure";
import { UserProfileController } from "./controller";



export class UserProfileRoutes {

  static get routes(): Router {
    const router = Router();

    const datasource = new UserProfileDataSourceImpl();
    const userProfileRepository = new UserProfileRepositoryImpl(datasource);

    const controller = new UserProfileController(userProfileRepository);


    router.get('/', controller.getUser);
    router.get('/profile', controller.getUserProfile);
    router.put('/', controller.updateUser);
    router.post('/profile_image', controller.updateProfileImage);
    router.delete('/', controller.deleteUser);

    
    
    return router;
  }
}