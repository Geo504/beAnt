import { AccountModel, TransactionModel } from "../../../data";

import { CustomError } from "../../../auth/domain";
import { CreateTransactionDto, TransactionDataSource, TransactionEntity } from "../../domain";



export class TransactionMongoDataSourceImpl implements TransactionDataSource {
  constructor(
  
  ) {}

  async createTransaction(createTransactionDto: CreateTransactionDto, userId: string): Promise<TransactionEntity> {
    const { name, value, category, accountId, date } = createTransactionDto;

    try {
      const account = await AccountModel.findOne({ _id: accountId, users: userId });
      if (!account) throw CustomError.notFound('Account not found');
      
      const transaction = new TransactionModel({
        name: name,
        value: value,
        category: category,
        date: date,
        type: value > 0 ? 'income' : 'expense',
        balanceAccount: account.balance + value,
        status: 'paid',
        account: accountId,
        user: userId
      });
      await transaction.save();
      
      await AccountModel.findOneAndUpdate(
        { _id: accountId , users: userId},
        { $inc: { balance: value }, $push: { transactions: transaction._id } },
        { new: true }
      );
  
      return TransactionEntity.fromObject(transaction);
      

    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      console.log(error);
      throw CustomError.internalServer();
    }
  }

}