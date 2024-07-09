import { CreateAccountDto } from "../dtos/create_account.dto";
import { UpdateAccountDto } from "../dtos/update_account.dto";

import { AccountEntity } from "../entities/account.entities";



export abstract class AccountDataSource<T> {
  abstract createAccount(createAccountDto: CreateAccountDto, userId: string): Promise<AccountEntity>;

  abstract getAllAccounts(userId: string): Promise<T>;

  abstract getAccountById(accountId: string, userId: string): Promise<AccountEntity>;

  abstract updateAccount(updateAccountDto: UpdateAccountDto, userId: string): Promise<AccountEntity>;

  abstract deleteAccount(accountId: string, userId: string): Promise<boolean>;

}