import { AccountRepository } from "../repositories/account.repository";



interface Account {
  id: string;
  name: string;
  balance: number;
  currency: string;
  users: object[];
}

interface GetAllAccountsUseCase {
  execute(userId: string): Promise<Account[]>;
}

export class GetAllAccounts implements GetAllAccountsUseCase {
  constructor(
    private readonly accountRepository: AccountRepository,
  ){}

  async execute(userId: string): Promise<Account[]> {
    const accounts = await this.accountRepository.getAllAccounts(userId);

    return accounts.map(account => ({
      id: account.id,
      name: account.name,
      balance: account.balance,
      currency: account.currency,
      users: account.users,
    }));
  }
}