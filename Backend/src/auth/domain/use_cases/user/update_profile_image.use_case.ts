import { envs, FileUploaderService } from "../../../../config";

import { UserProfileRepository } from "../../repositories/userProfile.repository";
import { UpdateProfileImageDto } from "../../dtos/update_profile_image.dto";

import { CustomError } from "../../errors/custom.error";





interface UpdateProfileImageResponse {
  url: string;
}

interface UpdateProfileImageUseCase {
  execute(updateProfileImageDto: UpdateProfileImageDto, userId: string): Promise<UpdateProfileImageResponse>
}



export class UpdateProfileImage implements UpdateProfileImageUseCase {
  constructor(
    private readonly userProfileRepository: UserProfileRepository<boolean>,
    private readonly fileUploaderService: FileUploaderService = new FileUploaderService(
      envs.AWS_BUCKET_NAME,
      envs.AWS_BUCKET_REGION,
      envs.AWS_ACCESS_KEY,
      envs.AWS_SECRET_KEY,
    ),
  ){}

  

  async execute(updateProfileImageDto: UpdateProfileImageDto, userId: string): Promise<UpdateProfileImageResponse> {

    const { profileImage } = updateProfileImageDto;

    const url = await this.userProfileRepository.getProfileImage(userId);

    const urlImage = await this.fileUploaderService.uploadFile(profileImage, url);
    if (!urlImage) throw CustomError.internalServer('Error uploading file');

    if (url !== urlImage){
      await this.userProfileRepository.updateProfileImage(urlImage, userId);
    }



    return {
      url: urlImage,
    }
  }
}