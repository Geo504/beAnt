import { Request, Response } from "express";

import { CreateAccountDto, DeleteAccount, GetAccount, UpdateAccount, UpdateAccountDto, UpdateFavoriteAccount, ValidateMongoIdDto } from "../domain";
import { AccountRepository, CreateAccount, GetAllAccounts } from "../domain";
import { CustomError } from "../../auth/domain";



export class AccountController {
  constructor(
    private readonly accountRepository: AccountRepository<any>,
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



  getAllAccounts = async (req: Request, res: Response) => {
    const userId = req.user!;

    return new GetAllAccounts(this.accountRepository)
      .execute(userId)
      .then((data) => res.json(data))
      .catch((error) => this.handleError(error, res));
  }


  
  getAccountById = async (req: Request, res: Response) => {
    const userId = req.user!;
    const accountId = req.params.id;

    const [error, validateMongoIdDto] = ValidateMongoIdDto.create(accountId);
    if (error) return res.status(400).json({ error });

    return new GetAccount(this.accountRepository)
      .execute(validateMongoIdDto!.mongoId, userId)
      .then((data) => res.json(data))
      .catch((error) => this.handleError(error, res));
  }



  updateAccount = async (req: Request, res: Response) => {
    const userId = req.user!;
    const accountId = req.params.id;

    const [error, updateAccountDto] = UpdateAccountDto.create(req.body, accountId);
    if (error) return res.status(400).json({ error });

    return new UpdateAccount(this.accountRepository)
      .execute(updateAccountDto!, userId)
      .then((data) => res.json(data))
      .catch((error) => this.handleError(error, res));
  }



  deleteAccount = async (req: Request, res: Response) => {
    const userId = req.user!;
    const accountId = req.params.id;

    const [error, validateMongoIdDto] = ValidateMongoIdDto.create(accountId);
    if (error) return res.status(400).json({ error });

    return new DeleteAccount(this.accountRepository)
      .execute(validateMongoIdDto!.mongoId, userId)
      .then(() => res.status(204).send())
      .catch((error) => this.handleError(error, res));
  }



  updateFavoriteAccount = async (req: Request, res: Response) => {
    const userId = req.user!;
    const accountId = req.params.id;

    const [error, validateMongoIdDto] = ValidateMongoIdDto.create(accountId);
    if (error) return res.status(400).json({ error });

    return new UpdateFavoriteAccount(this.accountRepository)
      .execute(validateMongoIdDto!.mongoId, userId)
      .then(() => res.status(204).send())
      .catch((error) => this.handleError(error, res));
  }
}