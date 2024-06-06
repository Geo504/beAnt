import { RegisterUserDto } from "../dtos/register_user.dto";
import { LoginUserDto } from "../dtos/login_user.dto";
import { UserEntity } from "../entities/user.entities";


export abstract class AuthRepository {
  abstract registerUser(registerUserDto: RegisterUserDto): Promise<UserEntity>;

  abstract loginUser(loginUserDto: LoginUserDto): Promise<UserEntity>;
}