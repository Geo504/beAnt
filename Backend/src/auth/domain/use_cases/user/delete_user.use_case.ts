import { UserProfileRepository } from "../../repositories/userProfile.repository";



interface DeleteUserUseCase {
  execute(userId: string): Promise<boolean>;
}



export class DeleteUser implements DeleteUserUseCase {
  constructor(
    private readonly userProfileRepository: UserProfileRepository<boolean>,
  ){}

  async execute(userId: string): Promise<boolean> {
    // Delete user
    await this.userProfileRepository.deleteUser(userId);

    return true;
  }
}