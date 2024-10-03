import { UserProfileRepository } from "../../repositories/userProfile.repository";
import { UpdateUserDto } from "../../dtos/update_user.dto";



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
    private readonly userProfileRepository: UserProfileRepository<UserProfileResponse>,
  ){}

  async execute(updateUserDto: UpdateUserDto, userId: string): Promise<UserProfileResponse> {
    // Update user profile
    const userProfile = await this.userProfileRepository.updateUser(updateUserDto, userId);

    return {
      name: userProfile.name,
      lastName: userProfile.lastName,
      profession: userProfile.profession,
      phone: userProfile.phone,
      birth: userProfile.birth,
    }
  }
}