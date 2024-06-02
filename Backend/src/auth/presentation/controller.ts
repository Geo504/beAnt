import { Request, Response } from "express";

import { AuthRepository, RegisterUserDto } from "../domain";



export class AuthController {
  constructor(
    private readonly authRepository: AuthRepository,
  ) {}

  registerUser = (req: Request, res: Response) => {
    const [error, registerUserDto] = RegisterUserDto.create(req.body);
    if (error) return res.status(400).json({ error });

    return this.authRepository.registerUser(registerUserDto!)
      .then(user => res.json(user))
      .catch(err => res.status(500).json( err ));
  }

  loginUser = (req: Request, res: Response) => {
    res.json(req.body);
  }
}