import { TransactionRepository } from "../../repositories/transaction.repository";



interface GetTransactionUseCase {
  execute(transactionId: string, userId: string): Promise<object>
}



export class GetTransaction implements GetTransactionUseCase {
  constructor(
    private readonly transactionRepository: TransactionRepository,
  ){}

  async execute(transactionId: string, userId: string): Promise<object> {
    const userTransaction = await this.transactionRepository.getTransactionById(transactionId, userId);

    return userTransaction
  }
}