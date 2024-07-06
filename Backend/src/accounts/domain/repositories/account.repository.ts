import { CreateAccountDto } from "../dtos/create_account.dto";
import { AccountEntity } from "../entities/account.entities";



export abstract class AccountRepository {
  abstract createAccount(createAccountDto: CreateAccountDto, userId: string): Promise<AccountEntity>;

  abstract getAllAccounts(userId: string): Promise<AccountEntity[]>;

}