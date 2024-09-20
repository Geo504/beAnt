import mongoose from "mongoose";

import { AccountModel, TransactionModel, UserModel, UsersAccountsModel } from "../../../data";

import { CustomError } from "../../../auth/domain";
import { AccountDataSource, AccountEntity, CreateAccountDto, UpdateAccountDto } from "../../domain";



export class AccountDatasourceImpl<T> implements AccountDataSource<T> {

  async createAccount(createAccountDto: CreateAccountDto, userId: string): Promise<AccountEntity> {
    const { name, balance, currency } = createAccountDto;

    try {
      const accountCount = await UsersAccountsModel.countDocuments({ user: userId, role: 'admin' });
      if (accountCount >= 4) throw CustomError.forbidden('You can only have 4 accounts');

      const account = new AccountModel({
        name: name,
        balance: balance,
        currency: currency,
      });
      await account.save();

      const userAccount = new UsersAccountsModel({
        user: userId,
        account: account._id,
        role: 'admin',
      });
      await userAccount.save();

      await AccountModel.findByIdAndUpdate(
        account._id,
        { $push: { users: userAccount._id } },
        { new: true, safe: true, upsert: false }
      );
      
      await UserModel.findByIdAndUpdate(
        userId,
        {
          $push: { accounts: account._id },
          ...(accountCount === 0 && { favoriteAccount: account._id })
        },
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
        AccountModel.aggregate([
          { $lookup: {
            from: 'usersaccounts',
            let: { accountId: '$_id' },
            pipeline: [
              { $match: { $expr: { $eq: ['$account', '$$accountId'] } } },
              { $lookup: {
                  from: 'users',
                  let: { userId: '$user' },
                  pipeline: [
                    { $match: { $expr: { $eq: ['$_id', '$$userId'] } } },
                    { $project: { _id: 0, name: 1, email: 1 } }
                  ],
                  as: 'userDetails'
                }},
              { $unwind: '$userDetails' },
            ],
            as: 'userAccounts'
          }},
          { $project: {
            _id: 1,
            name: 1,
            balance: 1,
            currency: 1,
            userAccount: {
              $arrayElemAt: [
                {
                  $filter: {
                    input: '$userAccounts',
                    as: 'userAccount',
                    cond: { $eq: ['$$userAccount.user', new mongoose.Types.ObjectId(userId)] }
                  }
                },
                0
              ]
            },
            users: {
              $map: {
                input: '$userAccounts',
                as: 'userAccount',
                in: {
                  name: '$$userAccount.userDetails.name',
                  email: '$$userAccount.userDetails.email',
                  role: '$$userAccount.role',
                }
              }
            }
          }},
          { $match: {'userAccount': { $ne: null }} },
          { $project: {
            _id: 1,
            name: 1,
            balance: 1,
            currency: 1,
            createdAt: '$userAccount.createdAt',
            users: 1
          }},
          { $sort: { createdAt: 1 } }
        ]),
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
      const account = await AccountModel.aggregate([
        { $match: { _id: new mongoose.Types.ObjectId(accountId) } },
        {
          $lookup: {
            from: 'usersaccounts',
            let: { accountId: '$_id' },
            pipeline: [
              { $match: { $expr: { $eq: ['$account', '$$accountId'] } } },
              {
                $lookup: {
                  from: 'users',
                  let: { userId: '$user' },
                  pipeline: [
                    { $match: { $expr: { $eq: ['$_id', '$$userId'] } } },
                    { $project: { _id: 0, name: 1, email: 1 } }
                  ],
                  as: 'userDetails'
                }
              },
              { $unwind: '$userDetails' }
            ],
            as: 'userAccounts'
          }
        },
        { $unwind: '$userAccounts' },
        {
          $group: {
            _id: '$_id',
            name: { $first: '$name' },
            balance: { $first: '$balance' },
            currency: { $first: '$currency' },
            users: {
              $push: {
                name: '$userAccounts.userDetails.name',
                email: '$userAccounts.userDetails.email',
                role: '$userAccounts.role'
              }
            },
            userIds: { $addToSet: '$userAccounts.user' }
          }
        },
        { $match: {userIds: new mongoose.Types.ObjectId(userId)} },
        {
          $project: {
            _id: 1,
            name: 1,
            balance: 1,
            currency: 1,
            users: 1
          }
        }
      ]);
  
      if (!account.length) throw CustomError.notFound('Account not found');

      return AccountEntity.fromObject(account[0]);

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
      const userAccount = await UsersAccountsModel.findOne({ user: userId, account: accountId, role: 'admin' });
      if (!userAccount) throw CustomError.notFound('Account not found');

      const updatedAccount = await AccountModel.findOneAndUpdate(
        { _id: accountId },
        updateData,
        { new: true, select: '-transactions' }
      );

      return AccountEntity.fromObject(updatedAccount!);

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
      const [accountExists, user] = await Promise.all([
        UsersAccountsModel.exists({ account: accountId, user: userId, role: 'admin' }),
        UserModel.findById(userId)
      ]);
      
      if (!accountExists) throw CustomError.notFound('Account not found');
      if (!user) throw CustomError.notFound('User not found');

      if (user.favoriteAccount && user.favoriteAccount.toString() === accountId) {
        const otherUserAccount = await UsersAccountsModel.findOne(
          { user: userId, account: { $ne: accountId } },
          'account'
        );

        user.favoriteAccount = otherUserAccount?.account || null;
        await user.save();
      }
      
      await Promise.all([
        UsersAccountsModel.deleteMany({ account: accountId }),
        AccountModel.findOneAndDelete({ _id: accountId }),
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



  async updateFavoriteAccount(accountId: string, userId: string): Promise<boolean> {
    try {
      const accountExists = await UsersAccountsModel.exists({ account: accountId, user: userId });
      if (!accountExists) throw CustomError.notFound('Account not found');

      await UserModel.findByIdAndUpdate(
        userId,
        { favoriteAccount: accountId },
        { new: true, safe: true, upsert: false }
      );

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