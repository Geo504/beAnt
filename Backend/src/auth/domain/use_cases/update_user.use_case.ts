import { AuthRepository } from "../repositories/auth.repository";
import { UpdateUserDto } from "../dtos/update_user.dto";


interface UserProfileResponse {
  name: string;
  lastName?: string;
  profession?: string;
  phone?: string;
  birth?: Date;
}

interface UpdateUserUseCase {
  execute( updateUserDto: UpdateUserDto, userId: string): Promise<UserProfileResponse>;
}



export class UpdateUser implements UpdateUserUseCase {
  constructor(
    private readonly authRepository: AuthRepository<UserProfileResponse>,
  ){}

  async execute(updateUserDto: UpdateUserDto, userId: string): Promise<UserProfileResponse> {
    // Update user profile
    const userProfile = await this.authRepository.updateUser(updateUserDto, userId);

    return {
      name: userProfile.name,
      lastName: userProfile.lastName,
      profession: userProfile.profession,
      phone: userProfile.phone,
      birth: userProfile.birth,
    }
  }
}