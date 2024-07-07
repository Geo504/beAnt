import { AccountModel, UserModel } from "../../../data";

import { CustomError } from "../../../auth/domain";
import { AccountDataSource, AccountEntity, CreateAccountDto } from "../../domain";



export class AccountDatasourceImpl implements AccountDataSource {
  constructor(
  
  ) {}

  async createAccount(createAccountDto: CreateAccountDto, userId: string): Promise<AccountEntity> {
    const { name, balance, favorite, currency } = createAccountDto;

    try {
      const accountCount = await AccountModel.countDocuments({ user: userId });
      if (accountCount >= 3) throw CustomError.forbidden('You can only have 3 accounts');

      const account = new AccountModel({
        name: name,
        balance: balance,
        favorite: favorite,
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



  async getAllAccounts(userId: string): Promise<AccountEntity[]> {
    try {
      const accounts = await AccountModel.find({ users: userId })
        .populate('users', 'name email');

      return accounts.map(account => AccountEntity.fromObject(account));

    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      console.log(error);
      throw CustomError.internalServer();
    }
  }
}