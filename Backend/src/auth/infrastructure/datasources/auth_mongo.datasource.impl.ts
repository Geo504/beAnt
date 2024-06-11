import { BcryptAdapter } from "../../../config";
import { UserModel } from "../../../data/mongodb";

import { AuthDataSource, CustomError, LoginUserDto, RegisterUserDto, UserEntity } from "../../domain";
import { UserMapper } from "../mappers/user.mapper";



type HashFunction = (password: string) => string;
type CompareFunction = (password: string, hash: string) => boolean;



export class AuthDataSourceImpl implements AuthDataSource {
  constructor(
    private readonly hashPassword: HashFunction = BcryptAdapter.hash,
    private readonly comparePassword: CompareFunction = BcryptAdapter.compare,
  ) {}


  async registerUser(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    const { name, email, password } = registerUserDto;

    try{
      //verify existing email
      const existingMail = await UserModel.findOne({ email });
      if (existingMail) throw CustomError.badRequest('Credentials are wrong');

      //hash password
      const user = await UserModel.create({
        name: name,
        email:  email,
        password: this.hashPassword(password),
      });

      //save user in db
      await user.save();

      return UserMapper.userEntityFromObject(user);

    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }


  async loginUser(loginUserDto: LoginUserDto): Promise<UserEntity> {
    const { email, password } = loginUserDto;

    try {
      //verify user exists
      const user = await UserModel.findOne({ email });
      if (!user) throw CustomError.badRequest('Credentials are wrong');

      //verify password
      const isPasswordValid = this.comparePassword(password, user.password);
      if (!isPasswordValid) throw CustomError.badRequest('Credentials are wrong');

      return UserMapper.userEntityFromObject(user);

    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }
}