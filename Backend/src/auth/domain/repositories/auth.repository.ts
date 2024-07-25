import { UserEntity } from "../entities/user.entities";
import { ProfileEntity } from "../entities/profile.entities";

import { RegisterUserDto } from "../dtos/register_user.dto";
import { LoginUserDto } from "../dtos/login_user.dto";
import { UpdateUserDto } from "../dtos/update_user.dto";



export abstract class AuthRepository<T> {
  abstract registerUser(registerUserDto: RegisterUserDto): Promise<UserEntity>;

  abstract loginUser(loginUserDto: LoginUserDto): Promise<UserEntity>;

  abstract validateEmail(email: string): Promise<boolean>;

  abstract getUser(userId: string): Promise<UserEntity>;

  abstract getUserProfile(id: string): Promise<T>;

  abstract updateUser(updateUserDto: UpdateUserDto, id: string): Promise<ProfileEntity>;

  abstract deleteUser(userId: string): Promise<boolean>;
}