import { JwtAdapter } from "../../../config";

import { AuthRepository } from "../repositories/auth.repository";
import { LoginUserDto } from "../dtos/login_user.dto";
import { CustomError } from "../errors/custom.error";



interface UserToken {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

type SignToken = (payload: Object, duration?: string) => Promise<string | null>;



interface LoginUserUseCase {
  execute(loginUserDto: LoginUserDto): Promise<UserToken>;
}


export class LoginUser implements LoginUserUseCase {
  constructor(
    private readonly authRepository: AuthRepository<UserToken>,
    private readonly signToken: SignToken = JwtAdapter.generateToken,
  ){}

  async execute(loginUserDto: LoginUserDto): Promise<UserToken> {
    // Create a new user
    const user = await this.authRepository.loginUser(loginUserDto);

    // Generate a token
    const token = await this.signToken({id: user.id}, '2h');
    if (!token) throw CustomError.internalServer('Error generating token');
    
    return {
      token: token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    }
  }
}