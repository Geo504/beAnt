import { TransactionRepository } from "../../repositories/transaction.repository";



interface DeleteTransactionUseCase {
  execute(transactionId: string, userId: string): Promise<boolean>
}



export class DeleteTransaction implements DeleteTransactionUseCase {
  constructor(
    private readonly transactionRepository: TransactionRepository,
  ){}

  async execute(transactionId: string, userId: string): Promise<boolean> {
    await this.transactionRepository.deleteTransaction(transactionId, userId);

    return true;
  }
}