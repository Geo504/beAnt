import { UploadedFile } from "express-fileupload";


export class UpdateProfileImageDto {

  private constructor(
    public profileImage: UploadedFile,
  ) {}
  
  static create(object: {[key: string]: any}): [string?, UpdateProfileImageDto?] {
    const { profileImage } = object;

    if (!profileImage) return ['profileImage is required'];


    if (profileImage.mimetype !== 'image/jpeg') {
      return ['Invalid file type. Allowed types: png, gif, jpg, jpeg'];
    }

    const allowedExtensions = ['png', 'gif', 'jpg', 'jpeg'];
    const fileExtension = profileImage.name.split('.').pop()?.toLowerCase();
    if (!fileExtension || !allowedExtensions.includes(fileExtension)) {
      return ['Invalid file type. Allowed types: png, gif, jpg, jpeg'];
    }

    if (profileImage.size > 1000 * 1000 * 5) return ['File size too large, 5MB max'];
    
    

    return [
      undefined,
      new UpdateProfileImageDto(profileImage)
    ]
  }
}


