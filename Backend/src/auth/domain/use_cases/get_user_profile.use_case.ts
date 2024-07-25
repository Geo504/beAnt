import { AuthRepository } from "../repositories/auth.repository";
import { UserEntity } from "../entities/user.entities";



interface UserProfileResponse {
  user: UserEntity;
  lastName?: string;
  profession?: string;
  phone?: string;
  birth?: Date;
}

interface GetUserProfileUseCase {
  execute(userId: string): Promise<UserProfileResponse>;
}

export class GetUserProfile implements GetUserProfileUseCase {
  constructor(
    private readonly authRepository: AuthRepository<UserProfileResponse>,
  ){}

  async execute(userId: string): Promise<UserProfileResponse> {
    // Get user
    const userProfile = await this.authRepository.getUserProfile(userId);

    return {
      user: userProfile.user,
      lastName: userProfile.lastName,
      profession: userProfile.profession,
      phone: userProfile.phone,
      birth: userProfile.birth,
    }
  }
}