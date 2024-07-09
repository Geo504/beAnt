import { AccountModel, TransactionModel, UserModel } from "../../../data";

import { CustomError } from "../../../auth/domain";
import { AccountDataSource, AccountEntity, CreateAccountDto, UpdateAccountDto } from "../../domain";



export class AccountDatasourceImpl<T> implements AccountDataSource<T> {
  constructor(
  
  ) {}

  async createAccount(createAccountDto: CreateAccountDto, userId: string): Promise<AccountEntity> {
    const { name, balance, currency } = createAccountDto;

    try {
      const accountCount = await AccountModel.countDocuments({ users: userId });
      if (accountCount >= 3) throw CustomError.forbidden('You can only have 3 accounts');

      const account = new AccountModel({
        name: name,
        balance: balance,
        currency: currency,
        users: userId
      });
  
      await account.save();

      await UserModel.findByIdAndUpdate(
        userId,
        { $push: { accounts: account._id } },
        { new: true, safe: true, upsert: false }
      );
  
      return AccountEntity.fromObject(account);

    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      console.log(error);
      throw CustomError.internalServer();
    }
  }



  async getAllAccounts(userId: string): Promise<T> {
    try {
      const [accounts, user] = await Promise.all([
        AccountModel.find({ users: userId })
          .populate('users', 'name email')
          .select('-transactions')
          .lean(),
        UserModel.findById(userId).select('favoriteAccount')
      ]);
      const userFavoriteId = user?.favoriteAccount?.toString() ?? null;

      return {
        favoriteAccountId: userFavoriteId,
        accounts: accounts
      } as T;

    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      console.log(error);
      throw CustomError.internalServer();
    }
  }



  async getAccountById(accountId: string, userId: string): Promise<AccountEntity> {
    try {
      const account = await AccountModel.findOne({ _id: accountId, users: userId })
        .populate('users', 'name email')
        .populate('transactions', 'name value date category status type');
      
      if (!account) throw CustomError.notFound('Account not found');

      return AccountEntity.fromObject(account);

    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      console.log(error);
      throw CustomError.internalServer();
    }
  }



  async updateAccount(updateAccountDto: UpdateAccountDto, userId: string): Promise<AccountEntity> {
    const {accountId, ...updateData } = updateAccountDto;

    try {
      const updatedAccount = await AccountModel.findOneAndUpdate(
        { _id: accountId, users: userId },
        updateData,
        { new: true }
      );
      if (!updatedAccount) throw CustomError.notFound('Account not found');

      await updatedAccount.save();

      return AccountEntity.fromObject(updatedAccount);

    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      console.log(error);
      throw CustomError.internalServer();
    }
  }



  async deleteAccount(accountId: string, userId: string): Promise<boolean> {
    try {
      const accountExists = await AccountModel.findOne({ _id: accountId, users: userId });
      if (!accountExists) throw CustomError.notFound('Account not found');
      
      await Promise.all([
        AccountModel.findOneAndDelete({ _id: accountId, users: userId }),
        TransactionModel.deleteMany({ account: accountId }),
        UserModel.updateOne({ _id: userId }, { $pull: { accounts: accountId } })
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