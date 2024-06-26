import { AuthDataSource, AuthRepository, LoginUserDto, RegisterUserDto, UserEntity } from "../../domain";



export class AuthRepositoryImpl implements AuthRepository {
  constructor(
    private readonly authDataSource: AuthDataSource,
  ) {}


  registerUser(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    return this.authDataSource.registerUser(registerUserDto);
  }

  loginUser(loginUserDto: LoginUserDto): Promise<UserEntity> {
    return this.authDataSource.loginUser(loginUserDto);
  }

}