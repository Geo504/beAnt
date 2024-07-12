import { UpdateTransactionDto } from "../../dtos/transaction/update_transaction.dto";
import { TransactionRepository } from "../../repositories/transaction.repository";


interface TransactionUpdate {
  transactionId: string;
  name: string;
  value: number;
  date: Date;
  type: 'Income' | 'Expense';
  category: string;
  status: 'Pending' | 'Send' | 'Paid' | 'Rejected';
  userId: string;
  accountId: string;
}

interface UpdateTransactionUseCase {
  execute(updateTransactionDto: UpdateTransactionDto, userId: string): Promise<TransactionUpdate>
}



export class UpdateTransaction implements UpdateTransactionUseCase {
  constructor(
    private readonly transactionRepository: TransactionRepository,
  ){}

  async execute(updateTransactionDto: UpdateTransactionDto, userId: string): Promise<TransactionUpdate> {

    const transaction = await this.transactionRepository.updateTransaction(updateTransactionDto, userId);

    return {
      transactionId: transaction.id,
      name: transaction.name,
      value: transaction.value,
      date: transaction.date,
      type: transaction.type,
      category: transaction.category,
      status: transaction.status,
      userId: transaction.user,
      accountId: transaction.account,
    }
  }
}