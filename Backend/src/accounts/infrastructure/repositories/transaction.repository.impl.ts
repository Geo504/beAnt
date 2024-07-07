import { CreateTransactionDto, TransactionDataSource, TransactionEntity, TransactionRepository } from "../../domain";



export class TransactionRepositoryImpl implements TransactionRepository {
  constructor(
    private readonly transactionDataSource: TransactionDataSource,
  ) {}

  createTransaction(createTransactionDto: CreateTransactionDto, userId: string): Promise<TransactionEntity> {
    return this.transactionDataSource.createTransaction(createTransactionDto, userId);
  }
}