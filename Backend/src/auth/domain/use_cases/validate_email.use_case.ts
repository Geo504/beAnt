import { JwtAdapter } from "../../../config";

import { CustomError } from "../errors/custom.error";
import { AuthRepository } from "../repositories/auth.repository";



interface ValidateEmailUseCase {
  execute(token: string): Promise<boolean>
}


export class ValidateEmail implements ValidateEmailUseCase {
  constructor(
    private readonly authRepository: AuthRepository,
  ){}
  
  async execute(token: string): Promise<boolean> {
    // Validate token
    const payload = await JwtAdapter.verifyToken(token);
    if (!payload) throw CustomError.unauthorized('Invalid token');

    const { email } = payload as { email: string };
    
    // Update user
    await this.authRepository.validateEmail(email);
    
    return true;
  }
}