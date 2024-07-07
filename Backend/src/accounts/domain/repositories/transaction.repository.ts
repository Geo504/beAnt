import { CreateTransactionDto } from "../dtos/create_transaction.dto";
import { TransactionEntity } from "../entities/transaction.entities";


export abstract class TransactionRepository {
  abstract createTransaction(createTransactionDto: CreateTransactionDto, userId: string): Promise<TransactionEntity>;

}