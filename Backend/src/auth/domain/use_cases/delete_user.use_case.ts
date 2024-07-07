import { AuthRepository } from "../repositories/auth.repository";



interface DeleteUserUseCase {
  execute(userId: string): Promise<boolean>;
}



export class DeleteUser implements DeleteUserUseCase {
  constructor(
    private readonly authRepository: AuthRepository,
  ){}

  async execute(userId: string): Promise<boolean> {
    // Delete user
    await this.authRepository.deleteUser(userId);

    return true;
  }
}