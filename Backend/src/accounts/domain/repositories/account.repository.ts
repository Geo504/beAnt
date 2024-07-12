import { CreateAccountDto } from "../dtos/account/create_account.dto";
import { UpdateAccountDto } from "../dtos/account/update_account.dto";

import { AccountEntity } from "../entities/account.entities";



export abstract class AccountRepository<T> {
  abstract createAccount(createAccountDto: CreateAccountDto, userId: string): Promise<AccountEntity>;

  abstract getAllAccounts(userId: string): Promise<T>;

  abstract getAccountById(accountId: string, userId: string): Promise<AccountEntity>;

  abstract updateAccount(updateAccountDto: UpdateAccountDto, userId: string): Promise<AccountEntity>;

  abstract deleteAccount(accountId: string, userId: string): Promise<boolean>;

  abstract updateFavoriteAccount(accountId: string, userId: string): Promise<boolean>;

}