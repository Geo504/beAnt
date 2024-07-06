import { AccountRepository, CreateAccountDto } from "../../domain";



interface Account {
  id: string;
  name: string;
  balance: number;
  favorite: boolean;
  currency: string;
}

interface CreateAccountUseCase {
  execute(createAccountDto: CreateAccountDto, userId: string): Promise<Account>
}


export class CreateAccount implements CreateAccountUseCase {
  constructor(
    private readonly accountRepository: AccountRepository,
  ){}

  async execute(createAccountDto: CreateAccountDto, userId: string): Promise<Account> {

    const account = await this.accountRepository.createAccount(createAccountDto, userId);

    return {
      id: account.id,
      name: account.name,
      balance: account.balance,
      favorite: account.favorite,
      currency: account.currency,
    }
  }
}