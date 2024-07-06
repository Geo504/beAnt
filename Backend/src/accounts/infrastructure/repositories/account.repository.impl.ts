import { AccountDataSource, AccountEntity, AccountRepository, CreateAccountDto } from "../../domain";



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
}