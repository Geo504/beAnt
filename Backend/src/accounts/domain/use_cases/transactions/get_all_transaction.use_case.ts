import { TransactionRepository } from "../../repositories/transaction.repository";



interface GetAllTransactionsUseCase {
  execute(userId: string): Promise<object[]>
}



export class GetAllTransactions implements GetAllTransactionsUseCase {
  constructor(
    private readonly transactionRepository: TransactionRepository,
  ){}

  async execute(userId: string): Promise<object[]> {
    const userTransactionsAccounts = await this.transactionRepository.getAllTransactions(userId);

    return userTransactionsAccounts
  }
}