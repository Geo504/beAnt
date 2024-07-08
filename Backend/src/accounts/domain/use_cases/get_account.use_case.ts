import { AccountRepository } from "../repositories/account.repository";

interface Account {
  id: string;
  name: string;
  balance: number;
  currency: string;
  users: object[];
  transactions?: object[];
}

interface GetAccountUseCase {
  execute(accountId: string, userId: string): Promise<Account>;
}

export class GetAccount implements GetAccountUseCase {
  constructor(
    private readonly accountRepository: AccountRepository,
  ){}

  async execute(accountId: string, userId: string): Promise<Account> {
    const account = await this.accountRepository.getAccountById(accountId, userId);

    return {
      id: account.id,
      name: account.name,
      balance: account.balance,
      currency: account.currency,
      users: account.users,
      transactions: account.transactions,
    };
  }
}