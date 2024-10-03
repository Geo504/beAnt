import { ProfileEntity, UpdateUserDto, UserEntity, UserProfileRepository } from "../../domain";



export class UserProfileRepositoryImpl<T> implements UserProfileRepository<T> {
  constructor(
    private readonly userProfileDataSource: UserProfileRepository<T>,
  ) {}

  getUser(userId: string): Promise<UserEntity> {
    return this.userProfileDataSource.getUser(userId);
  }

  getUserProfile(userId: string): Promise<T> {
    return this.userProfileDataSource.getUserProfile(userId);
  }

  updateUser(updateUserDto: UpdateUserDto, userId: string): Promise<ProfileEntity> {
    return this.userProfileDataSource.updateUser(updateUserDto, userId);
  }

  getProfileImage(userId: string): Promise<string> {
    return this.userProfileDataSource.getProfileImage(userId);
  }

  updateProfileImage(urlImage: string, userId: string): Promise<boolean> {
    return this.userProfileDataSource.updateProfileImage(urlImage, userId);
  }

  deleteUser(userId: string): Promise<boolean> {
    return this.userProfileDataSource.deleteUser(userId);
  }

}