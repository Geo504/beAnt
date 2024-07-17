import { CreateTransactionDto } from "../dtos/transaction/create_transaction.dto";
import { GetAllQueriesDto } from "../dtos/transaction/get_all_transaction_queries.dto";
import { UpdateTransactionDto } from "../dtos/transaction/update_transaction.dto";
import { PaginationDto } from "../dtos/shared/pagination.dto";

import { TransactionEntity } from "../entities/transaction.entities";


export abstract class TransactionDataSource {
  abstract createTransaction(createTransactionDto: CreateTransactionDto, userId: string): Promise<TransactionEntity>;

  abstract getAllTransactions(paginationDto: PaginationDto, userId: string, getAllQueriesDto?: GetAllQueriesDto): Promise<object>;

  abstract getTransactionById(transactionId: string, userId: string): Promise<object>;

  abstract updateTransaction(updateTransactionDto: UpdateTransactionDto, userId: string): Promise<TransactionEntity>;

  abstract deleteTransaction(transactionId: string, userId: string): Promise<boolean>;

}