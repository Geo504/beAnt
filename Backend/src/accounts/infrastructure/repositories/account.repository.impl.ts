import { AccountDataSource, AccountEntity, AccountRepository, CreateAccountDto, UpdateAccountDto } from "../../domain";



export class AccountRepositoryImpl<T> implements AccountRepository<T> {
  constructor(
    private readonly accountDataSource: AccountDataSource<T>,
  ) {}

  
  createAccount(createAccountDto: CreateAccountDto, userId: string): Promise<AccountEntity> {
    return this.accountDataSource.createAccount(createAccountDto, userId);
  }

  getAllAccounts(userId: string): Promise<T> {
    return this.accountDataSource.getAllAccounts(userId);
  }

  getAccountById(accountId: string, userId: string): Promise<AccountEntity> {
    return this.accountDataSource.getAccountById(accountId, userId);
  }

  updateAccount(updateAccountDto: UpdateAccountDto, userId: string): Promise<AccountEntity> {
    return this.accountDataSource.updateAccount(updateAccountDto, userId);
  }

  deleteAccount(accountId: string, userId: string): Promise<boolean> {
    return this.accountDataSource.deleteAccount(accountId, userId);
  }

}