import { AuthDataSource, AuthRepository, LoginUserDto, ProfileEntity, RegisterUserDto, UpdateUserDto, UserEntity } from "../../domain";



export class AuthRepositoryImpl<T> implements AuthRepository<T> {
  constructor(
    private readonly authDataSource: AuthDataSource<T>,
  ) {}


  registerUser(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    return this.authDataSource.registerUser(registerUserDto);
  }

  loginUser(loginUserDto: LoginUserDto): Promise<UserEntity> {
    return this.authDataSource.loginUser(loginUserDto);
  }

  validateEmail(email: string): Promise<boolean> {
    return this.authDataSource.validateEmail(email);
  }

  getUser(userId: string): Promise<UserEntity> {
    return this.authDataSource.getUser(userId);
  }

  getUserProfile(userId: string): Promise<T> {
    return this.authDataSource.getUserProfile(userId);
  }

  updateUser(updateUserDto: UpdateUserDto, userId: string): Promise<ProfileEntity> {
    return this.authDataSource.updateUser(updateUserDto, userId);
  }

  deleteUser(userId: string): Promise<boolean> {
    return this.authDataSource.deleteUser(userId);
  }

}