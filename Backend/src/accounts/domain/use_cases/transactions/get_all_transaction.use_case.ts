import { PaginationDto } from "../../dtos/shared/pagination.dto";
import { TransactionRepository } from "../../repositories/transaction.repository";



interface GetAllTransactionsUseCase {
  execute(paginationDto: PaginationDto, userId: string): Promise<object>
}



export class GetAllTransactions implements GetAllTransactionsUseCase {
  constructor(
    private readonly transactionRepository: TransactionRepository,
  ){}

  async execute(paginationDto: PaginationDto, userId: string): Promise<object> {
    const userTransactionsAccounts = await this.transactionRepository.getAllTransactions(paginationDto, userId);

    return userTransactionsAccounts
  }
}