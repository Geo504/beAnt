import { Request, Response } from "express";
import { UserModel } from "../../data";
import { envs } from "../../config";

import { AuthRepository, CustomError, LoginUser, LoginUserDto, RegisterUser, RegisterUserDto, ValidateEmail } from "../domain";



export class AuthController {
  constructor(
    private readonly authRepository: AuthRepository,
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



  logoutUser = (_req: Request, res: Response) => {
    res.clearCookie('access_token');
    res.status(204).send();
  }



  validateEmail = (req: Request, res: Response) => {
    const { token } = req.params;

    return new ValidateEmail(this.authRepository)
      .execute(token)
      .then(() => res.redirect(`${envs.FRONTEND_URL}/login`))
      .catch((error) => this.handleError(error, res));
  }



  getUser = (req: Request, res: Response) => {
    // TODO: Take out dependency on UserModel.
    UserModel.findById(req.body.user)
      .then(user => res.json({ user }))
      .catch(() => res.status(500).json({ error: 'Internal server error' }));
  }
}