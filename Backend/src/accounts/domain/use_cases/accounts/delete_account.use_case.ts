import { AccountRepository } from "../..";



interface DeleteAccountUseCase {
  execute(accountId: string, userId: string): Promise<boolean>;
}

export class DeleteAccount implements DeleteAccountUseCase {
  constructor(
    private readonly accountRepository: AccountRepository<boolean>,
  ){}

  async execute(accountId: string, userId: string): Promise<boolean> {
    // Delete account
    await this.accountRepository.deleteAccount(accountId, userId);

    return true;
  }
}