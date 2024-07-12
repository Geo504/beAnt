import { AccountRepository } from "../..";



interface UpdateFavoriteAccountUseCase {
  execute(accountId: string, userId: string): Promise<boolean>;
}

export class UpdateFavoriteAccount implements UpdateFavoriteAccountUseCase {
  constructor(
    private readonly accountRepository: AccountRepository<boolean>,
  ){}

  async execute(accountId: string, userId: string): Promise<boolean> {
    // Update favorite account
    await this.accountRepository.updateFavoriteAccount(accountId, userId);

    return true;
  }
}