import { AccountModel, TransactionModel } from "../../../data";

import { CustomError } from "../../../auth/domain";
import { CreateTransactionDto, TransactionDataSource, TransactionEntity, UpdateTransactionDto } from "../../domain";



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



  async getAllTransactions(userId: string): Promise<object[]> {
    try {
      const accounts = await AccountModel.find({ users: userId }).select('_id');
      if (!accounts) throw CustomError.notFound('Accounts not found');

      const accountIds = accounts.map(account => account._id);

      const transactions = await TransactionModel.find({ account: { $in: accountIds } })
        .populate('account', 'name currency')
        .populate('user', 'name')
        .sort({ date: -1 });

      return transactions;

    } catch (error) {
      console.log(error);
      throw CustomError.internalServer();
    }
  }



  async getTransactionById(transactionId: string, userId: string): Promise<object> {
    try {
      const accounts = await AccountModel.find({ users: userId }).select('_id');
      if (!accounts) throw CustomError.notFound('Accounts not found');

      const accountIds = accounts.map(account => account._id);

      const transaction = await TransactionModel.findOne({ _id: transactionId, account: { $in: accountIds } })
        .populate('account', 'name currency')
        .populate('user', 'name');
      if (!transaction) throw CustomError.notFound('Transaction not found');

      return transaction;

    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      console.log(error);
      throw CustomError.internalServer();
    }
  }



  async updateTransaction(updateTransactionDto: UpdateTransactionDto, userId: string): Promise<TransactionEntity> {
    try {
      const { transactionId, accountId, ...updateData } = updateTransactionDto;

      // Find the old transaction
      const oldTransaction = await TransactionModel.findOne({ _id: transactionId, user: userId });
      if (!oldTransaction) throw CustomError.notFound('Transaction not found');

      // Check if account change is needed
      if (accountId && accountId !== oldTransaction.account.toString()) {
        const account = await AccountModel.exists({ _id: accountId, users: userId });
        if (!account) throw CustomError.notFound('Account not found');

        await Promise.all([
          AccountModel.bulkWrite([
            {updateOne: {
              filter: { _id: oldTransaction.account },
              update: { 
                $pull: { transactions: transactionId }, 
                $inc: { balance: -oldTransaction.value } 
              }
            }},
            {updateOne: {
              filter: { _id: accountId },
              update: { 
                $addToSet: { transactions: transactionId },
                $inc: { balance: updateData.value || oldTransaction.value } 
              }
            }}
          ]),
          TransactionModel.updateOne({ _id: transactionId }, { $set: { account: accountId } })
        ]);
      } 
      // Update balance if only the value has changed
      else if (updateData.value && (accountId === oldTransaction.account.toString() || !accountId)) {
        await AccountModel.updateOne(
          { _id: oldTransaction.account },
          { $inc: { balance: updateData.value - oldTransaction.value } }
        );
      }
      // Update the transaction
      const updatedTransaction = await TransactionModel.findOneAndUpdate(
        { _id: transactionId },
        { ...updateData },
        { new: true }
      );
      if (!updatedTransaction) throw CustomError.internalServer();

      return TransactionEntity.fromObject(updatedTransaction);

    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      console.log(error);
      throw CustomError.internalServer();
    }
  }

}