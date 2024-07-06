import { Request, Response } from "express";

import { CreateAccountDto } from "../domain";
import { AccountRepository, CreateAccount, GetAllAccounts } from "../domain";
import { CustomError } from "../../auth/domain";

export class AccountController {
  constructor(
    private readonly accountRepository: AccountRepository,
  ) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.code).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Internal server error' });
  };



  createAccount = (req: Request, res: Response) => {
    const userId = req.user!;

    const [error, createAccountDto] = CreateAccountDto.create(req.body);
    if (error) return res.status(400).json({ error });

    return new CreateAccount(this.accountRepository)
      .execute(createAccountDto!, userId)
      .then((data) => res.json(data))
      .catch((error) => this.handleError(error, res));
  }



  getAllAccounts = (req: Request, res: Response) => {
    const userId = req.user!;

    return new GetAllAccounts(this.accountRepository)
      .execute(userId)
      .then((data) => res.json(data))
      .catch((error) => this.handleError(error, res));
  }


  
  getAccount = (req: Request, res: Response) => {
    const userId = req.user!;
    const { id } = req.params;

    return res.json({ message: `account: ${id}, userId: ${userId}` });
  }
}