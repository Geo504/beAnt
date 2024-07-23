import { UserEntity } from "../entities/user.entities";
import { ProfileEntity } from "../entities/profile.entities";

import { RegisterUserDto } from "../dtos/register_user.dto";
import { LoginUserDto } from "../dtos/login_user.dto";
import { UpdateUserDto } from "../dtos/update_user.dto";



export abstract class AuthDataSource {
  abstract registerUser(registerUserDto: RegisterUserDto): Promise<UserEntity>;

  abstract loginUser(loginUserDto: LoginUserDto): Promise<UserEntity>;

  abstract validateEmail(email: string): Promise<boolean>;

  abstract getUser(id: string): Promise<UserEntity>;

  abstract updateUser(updateUserDto: UpdateUserDto, id: string): Promise<ProfileEntity>;

  abstract deleteUser(id: string): Promise<boolean>;
}