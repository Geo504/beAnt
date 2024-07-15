import { CreateTransactionDto } from "../dtos/transaction/create_transaction.dto";

import { TransactionEntity } from "../entities/transaction.entities";


export abstract class TransactionRepository {
  abstract createTransaction(createTransactionDto: CreateTransactionDto, userId: string): Promise<TransactionEntity>;

  abstract getAllTransactions(userId: string): Promise<object[]>;

  abstract getTransactionById(transactionId: string, userId: string): Promise<object>;

  abstract updateTransaction(updateTransactionDto: object, userId: string): Promise<TransactionEntity>;

  abstract deleteTransaction(transactionId: string, userId: string): Promise<boolean>;

}