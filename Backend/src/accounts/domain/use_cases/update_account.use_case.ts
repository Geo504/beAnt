import { AccountRepository, UpdateAccountDto } from "..";



interface Account {
  id: string;
  name?: string;
  currency?: string;
}

interface UpdateAccountUseCase {
  execute(createAccountDto: UpdateAccountDto, userId: string): Promise<Account>
}


export class UpdateAccount implements UpdateAccountUseCase {
  constructor(
    private readonly accountRepository: AccountRepository<Account>,
  ){}

  async execute(updateAccountDto: UpdateAccountDto, userId: string): Promise<Account> {

    const account = await this.accountRepository.updateAccount(updateAccountDto, userId);

    return {
      id: account.id,
      name: account.name,
      currency: account.currency,
    }
  }
}