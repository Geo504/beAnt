import { CreateTransactionDto, GetAllQueriesDto, PaginationDto, TransactionDataSource, TransactionEntity, TransactionRepository, UpdateTransactionDto } from "../../domain";



export class TransactionRepositoryImpl implements TransactionRepository {
  constructor(
    private readonly transactionDataSource: TransactionDataSource,
  ) {}

  createTransaction(createTransactionDto: CreateTransactionDto, userId: string): Promise<TransactionEntity> {
    return this.transactionDataSource.createTransaction(createTransactionDto, userId);
  }

  getAllTransactions( paginationDto: PaginationDto,userId: string, getAllQueriesDto?: GetAllQueriesDto): Promise<object> {
    return this.transactionDataSource.getAllTransactions(paginationDto, userId, getAllQueriesDto);
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