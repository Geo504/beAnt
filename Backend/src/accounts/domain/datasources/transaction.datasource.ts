import { CreateTransactionDto } from "../dtos/create_transaction.dto";
import { TransactionEntity } from "../entities/transaction.entities";


export abstract class TransactionDataSource {
  abstract createTransaction(createTransactionDto: CreateTransactionDto, userId: string): Promise<TransactionEntity>;

}