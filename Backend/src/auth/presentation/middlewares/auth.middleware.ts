import { Request, Response, NextFunction } from "express";

import { JwtAdapter } from "../../../config";
import { UserModel } from "../../../data";



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

      req.body.user = user;

      return next();

    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

}