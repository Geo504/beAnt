import { BcryptAdapter } from "../../../config";
import { AccountModel, TransactionModel, UserModel } from "../../../data";

import { AuthDataSource, CustomError, LoginUserDto, RegisterUserDto, UpdateUserDto, UserEntity } from "../../domain";



type HashFunction = (password: string) => string;
type CompareFunction = (password: string, hash: string) => boolean;



export class AuthDataSourceImpl implements AuthDataSource {
  constructor(
    private readonly hashPassword: HashFunction = BcryptAdapter.hash,
    private readonly comparePassword: CompareFunction = BcryptAdapter.compare,
  ) {}


  async registerUser(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    const { email, password } = registerUserDto;
    
    //verify existing email
    const existingMail = await UserModel.findOne({ email });
    if (existingMail) throw CustomError.badRequest('Credentials are wrong');

    try{
      const user = new UserModel(registerUserDto)
      
      //hash password
      user.password = this.hashPassword(password);

      //save user in db
      await user.save();

      return UserEntity.fromObject(user);

    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      console.log(error);
      throw CustomError.internalServer();
    }
  }



  async loginUser(loginUserDto: LoginUserDto): Promise<UserEntity> {
    const { email, password } = loginUserDto;

    try {
      //verify user exists
      const user = await UserModel.findOne({ email });
      if (!user) throw CustomError.badRequest('Credentials are wrong');

      // verify email
      if (!user.verifyEmail) throw CustomError.unauthorized('Email not verified');

      //verify password
      const isPasswordValid = this.comparePassword(password, user.password);
      if (!isPasswordValid) throw CustomError.badRequest('Credentials are wrong');

      return UserEntity.fromObject(user);

    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      console.log(error);
      throw CustomError.internalServer();
    }
  }



  async validateEmail(email: string): Promise<boolean> {
    try {
      //verify user exists
      const user = await UserModel.findOne({ email });
      if (!user) throw CustomError.notFound('User not found');

      //update user
      user.verifyEmail = true;
      await user.save();

      return true;
      
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      console.log(error);
      throw CustomError.internalServer();
    }
  }



  async getUser(userId: string): Promise<UserEntity> {
    try {
      //verify user exists
      const user = await UserModel.findById(userId);
      if (!user) throw CustomError.notFound('User not found');

      return UserEntity.fromObject(user);

    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      console.log(error);
      throw CustomError.internalServer();
    }
  }



  async updateUser(updateUserDto: UpdateUserDto, userId: string): Promise<UserEntity> {
    try {
      const user = await UserModel.findByIdAndUpdate(
        userId, 
        { $set: { name: updateUserDto.name } },
        { new: true }
      );
      if (!user) throw CustomError.notFound('User not found');

      return UserEntity.fromObject(user);

    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      console.log(error);
      throw CustomError.internalServer();
    }
  }



  async deleteUser(userId: string): Promise<boolean> {
    try {
      const accounts = await AccountModel.find({ users: userId }).select('_id');

      // Delete user accounts & transactions
      if (accounts.length > 0) {
        const accountIds = accounts.map(account => account._id);

        const deleteTransactions = TransactionModel.deleteMany({ account: { $in: accountIds } });
        const deleteAccounts = AccountModel.deleteMany({ _id: { $in: accountIds } });
        
        await Promise.all([deleteTransactions, deleteAccounts]);
      }


      const user = await UserModel.findByIdAndDelete(userId);
      if (!user) throw CustomError.notFound('User not found');

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