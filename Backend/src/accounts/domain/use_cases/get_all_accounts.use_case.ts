import { AccountEntity } from "../entities/account.entities";
import { AccountRepository } from "../repositories/account.repository";



interface AllAccountResponse {
  favoriteAccountId: string | null;
  accounts: AccountEntity[];
}

interface GetAllAccountsUseCase {
  execute(userId: string): Promise<AllAccountResponse>;
}



export class GetAllAccounts implements GetAllAccountsUseCase {
  constructor(
    private readonly accountRepository: AccountRepository<AllAccountResponse>,
  ){}

  async execute(userId: string): Promise<AllAccountResponse> {
    const userAccounts = await this.accountRepository.getAllAccounts(userId);

    const accounts = userAccounts.accounts.map(({ transactions, ...account }) =>{ 
      return AccountEntity.fromObject(account)
    });

    return {
      favoriteAccountId: userAccounts.favoriteAccountId,
      accounts: accounts,
    };
  }
}