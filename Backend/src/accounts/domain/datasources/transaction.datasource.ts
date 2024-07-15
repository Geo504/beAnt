import { CreateTransactionDto } from "../dtos/transaction/create_transaction.dto";
import { UpdateTransactionDto } from "../dtos/transaction/update_transaction.dto";

import { TransactionEntity } from "../entities/transaction.entities";


export abstract class TransactionDataSource {
  abstract createTransaction(createTransactionDto: CreateTransactionDto, userId: string): Promise<TransactionEntity>;

  abstract getAllTransactions(userId: string): Promise<object[]>;

  abstract getTransactionById(transactionId: string, userId: string): Promise<object>;

  abstract updateTransaction(updateTransactionDto: UpdateTransactionDto, userId: string): Promise<TransactionEntity>;

  abstract deleteTransaction(transactionId: string, userId: string): Promise<boolean>;

}