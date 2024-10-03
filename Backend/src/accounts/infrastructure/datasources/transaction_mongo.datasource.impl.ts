import { AccountModel, TransactionModel, UsersAccountsModel } from "../../../data";

import { CustomError } from "../../../auth/domain";
import { CreateTransactionDto, GetAllQueriesDto, PaginationDto, TransactionDataSource, TransactionEntity, UpdateTransactionDto } from "../../domain";



export class TransactionMongoDataSourceImpl implements TransactionDataSource {
  constructor() {}

  async createTransaction(createTransactionDto: CreateTransactionDto, userId: string): Promise<TransactionEntity> {
    const { name, value, category, accountId, date } = createTransactionDto;

    try {
      const account = await UsersAccountsModel.findOne({ account: accountId, user: userId })
        .select('account')
        .populate<{account: {balance: number}}>('account', 'balance');
      if (!account) throw CustomError.notFound('Account not found');

      const newBalance = +(account.account.balance + value).toFixed(2);
      
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
        { _id: accountId },
        { $set: { balance: newBalance }, $push: { transactions: transaction._id } },
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




  async getAllTransactions(paginationDto: PaginationDto, userId: string, getAllQueriesDto?: GetAllQueriesDto ): Promise<object> {
    const { page, limit } = paginationDto;

    async function getFilter(userId: string, accountId?: string): Promise<any> {
      const accounts = await UsersAccountsModel.find({ user: userId }).select('account');
      if (!accounts.length) throw CustomError.notFound('Accounts not found');
      const accountIds = accounts.map(account => account.account.toString())
    
      if (accountId && !accountIds.includes(accountId)) {
        throw CustomError.notFound('Account not found');
      }
    
      return { account: accountId || { $in: accountIds } };
    }


    try {
      let filter = await getFilter(userId, getAllQueriesDto?.accountId);
      
      if (getAllQueriesDto?.search) {
        const searchRegex = { $regex: new RegExp(getAllQueriesDto.search, 'i') };
        filter.$or = [
          { name: searchRegex },
          { category: searchRegex }
        ];
      }

      const [transactions, total] = await Promise.all([
        TransactionModel.find(filter)
          .populate('account', 'name currency')
          .populate('user', 'name img email')
          .select('-createdAt')
          .sort({ date: -1 })
          .skip((page - 1) * limit)
          .limit(limit),
        TransactionModel.countDocuments(filter)
      ]);

      return {
        totalItems: total,
        actualPage: page,
        totalPages: Math.ceil(total / limit),
        limitPerPage: limit,
        transactions: transactions
      };

    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      console.log(error);
      throw CustomError.internalServer();
    }
  }



  async getTransactionById(transactionId: string, userId: string): Promise<object> {
    try {
      const accounts = await UsersAccountsModel.find({ user: userId }).select('account');
      if (!accounts.length) throw CustomError.notFound('Accounts not found');

      const accountIds = accounts.map(account => account.account);

      const transaction = await TransactionModel.findOne({ _id: transactionId, account: { $in: accountIds } })
        .populate('account', 'name currency')
        .populate('user', 'name img email')
        .select('-createdAt');
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
    const { transactionId, accountId, ...updateData } = updateTransactionDto;

    try {
      const oldTransaction = await TransactionModel.findOne({ _id: transactionId, user: userId }, { account: 1, value: 1 });
      if (!oldTransaction) throw CustomError.notFound('Transaction not found');

      // Check if account change is needed
      if (accountId && accountId !== oldTransaction.account.toString()) {
        const accounts = await UsersAccountsModel.find({
          user: userId,
          account: { $in: [accountId, oldTransaction.account] }
        }).select('account').populate('account', 'balance');

        
        const accountsMap = new Map(accounts.map(acc => [acc.account._id.toString(), acc.account as any]));
        const account = accountsMap.get(accountId);
        const oldAccount = accountsMap.get(oldTransaction.account.toString());
        if (!account || !oldAccount) throw CustomError.notFound('Account not found');
        
        const oldValue = +oldTransaction.value.toFixed(2);
        const newValue = updateData.value ? +updateData.value.toFixed(2) : oldValue;

        const newBalanceOldAccount = (oldAccount.balance - oldValue).toFixed(2);
        const newBalanceNewAccount = (account.balance + newValue).toFixed(2);

        await AccountModel.bulkWrite([
          {updateOne: {
            filter: { _id: oldTransaction.account },
            update: { $pull: {transactions: transactionId}, $set: {balance: newBalanceOldAccount} }
          }},
          {updateOne: {
            filter: { _id: accountId },
            update: { $addToSet: {transactions: transactionId}, $set: {balance: newBalanceNewAccount} }
          }}
        ]);
      } 

      // Update balance if only the value has changed
      else if (updateData.value && (accountId === oldTransaction.account.toString() || !accountId)) {
        const account: any = await UsersAccountsModel.findOne({ user: userId, account: oldTransaction.account })
          .select('account')
          .populate('account', 'balance');
        if (!account) throw CustomError.notFound('Account not found');

        const balanceChange = +(updateData.value - oldTransaction.value).toFixed(2);
        const newBalance = (account.account.balance + balanceChange).toFixed(2);
        
        await AccountModel.updateOne(
          { _id: oldTransaction.account },
          { $set: { balance: newBalance } }
        );
      }

      // Update the transaction
      const updatedTransaction = await TransactionModel.findOneAndUpdate(
        { _id: transactionId },
        { ...updateData, account: accountId },
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



  async deleteTransaction(transactionId: string, userId: string): Promise<boolean> {
    try {
      const transaction = await TransactionModel.findOne({ _id: transactionId, user: userId });
      if (!transaction) throw CustomError.notFound('Transaction not found');

      await Promise.all([
        AccountModel.updateOne(
          { _id: transaction.account },
          { $pull: { transactions: transactionId }, $inc: { balance: -transaction.value } }
        ),
        TransactionModel.deleteOne({ _id: transactionId })
      ]);

      return true;

    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      console.log(error);
      throw CustomError.internalServer();
    }
  }

}