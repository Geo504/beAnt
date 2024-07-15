import { CreateTransactionDto, TransactionDataSource, TransactionEntity, TransactionRepository, UpdateTransactionDto } from "../../domain";



export class TransactionRepositoryImpl implements TransactionRepository {
  constructor(
    private readonly transactionDataSource: TransactionDataSource,
  ) {}

  createTransaction(createTransactionDto: CreateTransactionDto, userId: string): Promise<TransactionEntity> {
    return this.transactionDataSource.createTransaction(createTransactionDto, userId);
  }

  getAllTransactions(userId: string): Promise<object[]> {
    return this.transactionDataSource.getAllTransactions(userId);
  }

  getTransactionById(transactionId: string, userId: string): Promise<object> {
    return this.transactionDataSource.getTransactionById(transactionId, userId);
  }

  updateTransaction(updateTransactionDto: UpdateTransactionDto, userId: string): Promise<TransactionEntity> {
    return this.transactionDataSource.updateTransaction(updateTransactionDto, userId);
  }

  deleteTransaction(transactionId: string, userId: string): Promise<boolean> {
    return this.transactionDataSource.deleteTransaction(transactionId, userId);
  }
}