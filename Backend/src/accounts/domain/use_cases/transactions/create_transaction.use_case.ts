import { CreateTransactionDto } from "../../dtos/transaction/create_transaction.dto";
import { TransactionRepository } from "../../repositories/transaction.repository";

import { UserEntity } from "../../../../auth/domain";
import { AccountEntity } from "../../entities/account.entities";



interface Transaction {
  id: string;
  name: string;
  value: number;
  date: Date;
  type: 'Income' | 'Expense';
  category: string;
  status: 'Pending' | 'Send' | 'Paid' | 'Rejected';
  userId: UserEntity;
  accountId: AccountEntity;
}

interface CreateTransactionUseCase {
  execute(createTransactionDto: CreateTransactionDto, userId: string): Promise<Transaction>
}



export class CreateTransaction implements CreateTransactionUseCase {
  constructor(
    private readonly transactionRepository: TransactionRepository,
  ){}

  async execute(createTransactionDto: CreateTransactionDto, userId: string): Promise<Transaction> {

    const transaction = await this.transactionRepository.createTransaction(createTransactionDto, userId);

    return {
      id: transaction.id,
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