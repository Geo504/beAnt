import { AuthRepository } from "../repositories/auth.repository";
import { UpdateUserDto } from "../dtos/update_user.dto";
// import { CustomError } from "../errors/custom.error";



interface UserProfile {
  name: string;
}

interface UpdateUserUseCase {
  execute( updateUserDto: UpdateUserDto, userId: string): Promise<UserProfile>;
}



export class UpdateUser implements UpdateUserUseCase {
  constructor(
    private readonly authRepository: AuthRepository,
  ){}

  async execute(updateUserDto: UpdateUserDto, userId: string): Promise<UserProfile> {
    // Update user
    const user = await this.authRepository.updateUser(updateUserDto, userId);

    return {
      name: user.name,
    }
  }
}