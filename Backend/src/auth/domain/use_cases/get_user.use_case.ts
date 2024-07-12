import { AuthRepository } from "../repositories/auth.repository";



interface UserProfile {
  id: string;
  email: string;
  name: string;
  img?: string;
}

interface GetUserUseCase {
  execute(userId: string): Promise<UserProfile>;
}

export class GetUser implements GetUserUseCase {
  constructor(
    private readonly authRepository: AuthRepository,
  ){}

  async execute(userId: string): Promise<UserProfile> {
    // Get user
    const user = await this.authRepository.getUser(userId);

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      img: user.img,
    }
  }
}