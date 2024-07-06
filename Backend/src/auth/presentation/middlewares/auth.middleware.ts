import { Request, Response, NextFunction } from "express";

import { JwtAdapter, Validators } from "../../../config";
import { UserModel } from "../../../data";

// TODO: Move this to a global file
declare global {
  namespace Express {
    interface Request {
      user?: string;
    }
  }
}



export class AuthMiddleware {

  static async validateJWT(req: Request, res: Response, next: NextFunction) {

    const authorization = req.cookies['access_token'];
    if (!authorization) return res.status(401).json({ error: 'Unauthorized' });

    const token = authorization;

    try {
      const payload = await JwtAdapter.verifyToken<{id: string}>(token);
      if (!payload) return res.status(401).json({ error: 'Invalid token' });


      const user = await UserModel.findById(payload.id);
      if (!user) return res.status(401).json({ error: 'Unauthorize' });
      if (!user.verifyEmail) return res.status(401).json({ error: 'Unauthorize' });
      if (!Validators.isMongoID(user.id)) return res.status(401).json({ error: 'Unauthorize' });

      // req.user = UserEntity.fromObject(user);
      req.user = user.id

      return next();

    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

}