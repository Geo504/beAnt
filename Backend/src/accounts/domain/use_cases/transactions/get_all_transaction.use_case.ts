import { PaginationDto } from "../../dtos/shared/pagination.dto";
import { GetAllQueriesDto } from "../../dtos/transaction/get_all_transaction_queries.dto";

import { TransactionRepository } from "../../repositories/transaction.repository";



interface GetAllTransactionsUseCase {
  execute(paginationDto: PaginationDto, userId: string): Promise<object>
}



export class GetAllTransactions implements GetAllTransactionsUseCase {
  constructor(
    private readonly transactionRepository: TransactionRepository,
  ){}

  async execute(paginationDto: PaginationDto, userId: string, getAllQueriesDto?: GetAllQueriesDto): Promise<object> {
    const userTransactionsAccounts = await this.transactionRepository.getAllTransactions(paginationDto, userId, getAllQueriesDto);
    
    return userTransactionsAccounts
  }
}