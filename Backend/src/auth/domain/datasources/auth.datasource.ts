import { RegisterUserDto } from "../dtos/register_user.dto";
import { UserEntity } from "../entities/user.entities";


export abstract class AuthDataSource {
  abstract registerUser(registerUserDto: RegisterUserDto): Promise<UserEntity>;

  // abstract loginUser(loginUserDto: LoginUserDto): Promise<UserEntity>;
}