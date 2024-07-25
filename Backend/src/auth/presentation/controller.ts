import { Request, Response } from "express";
import { envs } from "../../config";

import { AuthRepository, CustomError, LoginUser, LoginUserDto, RegisterUser, RegisterUserDto, ValidateEmail, GetUser, UpdateUser, UpdateUserDto, DeleteUser, GetUserProfile } from "../domain";



export class AuthController {
  constructor(
    private readonly authRepository: AuthRepository<any>,
  ) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.code).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Internal server error' });
  };



  registerUser = (req: Request, res: Response) => {
    const [error, registerUserDto] = RegisterUserDto.create(req.body);
    if (error) return res.status(400).json({ error });

    return new RegisterUser(this.authRepository)
      .execute(registerUserDto!)
      .then((data) => res.json(data))
      .catch((error) => this.handleError(error, res));
  }



  loginUser = (req: Request, res: Response) => {
    const [error, loginUserDto] = LoginUserDto.create(req.body);
    if (error) return res.status(400).json({ error });

    return new LoginUser(this.authRepository)
      .execute(loginUserDto!)
      .then((data) => {
        res.cookie('access_token', data.token, {
          httpOnly: true,
          secure: envs.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 1000 * 60 * 60, //1h
        });
        res.json({user: data.user})
      })
      .catch((error) => this.handleError(error, res));
  }



  validateEmail = async (req: Request, res: Response) => {
    const { token } = req.params;

    return new ValidateEmail(this.authRepository)
      .execute(token)
      .then(() => res.redirect(`${envs.FRONTEND_URL}/login`))
      .catch((error) => this.handleError(error, res));
  }



  getUser = async (req: Request, res: Response) => {
    const userId = req.user!;

    return new GetUser(this.authRepository)
      .execute(userId)
      .then((data) => res.json(data))
      .catch((error) => this.handleError(error, res));
  }



  getUserProfile = async (req: Request, res: Response) => {
    const userId = req.user!;

    return new GetUserProfile(this.authRepository)
      .execute(userId)
      .then((data) => res.json(data))
      .catch((error) => this.handleError(error, res));
  }



  updateUser = async (req: Request, res: Response) => {
    const userId = req.user!;

    const [error, updateUserDto] = UpdateUserDto.create(req.body);
    if (error) return res.status(400).json({ error });

    return new UpdateUser(this.authRepository)
      .execute(updateUserDto!, userId)
      .then((data) => res.json(data))
      .catch((error) => this.handleError(error, res));
  }



  deleteUser = async (req: Request, res: Response) => {
    const userId = req.user!;

    return new DeleteUser(this.authRepository)
      .execute(userId)
      .then(() => res.status(204).send())
      .catch((error) => this.handleError(error, res));
  }
}