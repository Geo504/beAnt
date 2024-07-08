import { AccountDataSource, AccountEntity, AccountRepository, CreateAccountDto, UpdateAccountDto } from "../../domain";



export class AccountRepositoryImpl implements AccountRepository {
  constructor(
    private readonly accountDataSource: AccountDataSource,
  ) {}

  
  createAccount(createAccountDto: CreateAccountDto, userId: string): Promise<AccountEntity> {
    return this.accountDataSource.createAccount(createAccountDto, userId);
  }

  getAllAccounts(userId: string): Promise<AccountEntity[]> {
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