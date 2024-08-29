import { UserEntity } from "../entities/user.entities";
import { ProfileEntity } from "../entities/profile.entities";

import { UpdateUserDto } from "../dtos/update_user.dto";



export abstract class UserProfileRepository<T> {

  abstract getUser(userId: string): Promise<UserEntity>;

  abstract getProfileImage(userId: string): Promise<string>;

  abstract updateProfileImage(urlImage: string, userId: string): Promise<boolean>;

  abstract getUserProfile(id: string): Promise<T>;

  abstract updateUser(updateUserDto: UpdateUserDto, id: string): Promise<ProfileEntity>;

  abstract deleteUser(userId: string): Promise<boolean>;
}