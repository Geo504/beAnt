import { Request, Response } from "express";

import { CustomError,  GetUser, UpdateUser, UpdateUserDto, DeleteUser, GetUserProfile, UpdateProfileImageDto, UpdateProfileImage, UserProfileRepository } from "../../domain";



export class UserProfileController {
  constructor(
    private readonly userProfileRepository: UserProfileRepository<any>,
  ) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.code).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Internal server error' });
  };



  getUser = async (req: Request, res: Response) => {
    const userId = req.user!;

    return new GetUser(this.userProfileRepository)
      .execute(userId)
      .then((data) => res.json(data))
      .catch((error) => this.handleError(error, res));
  }



  getUserProfile = async (req: Request, res: Response) => {
    const userId = req.user!;

    return new GetUserProfile(this.userProfileRepository)
      .execute(userId)
      .then((data) => res.json(data))
      .catch((error) => this.handleError(error, res));
  }



  updateUser = async (req: Request, res: Response) => {
    const userId = req.user!;

    const [error, updateUserDto] = UpdateUserDto.create(req.body);
    if (error) return res.status(400).json({ error });

    return new UpdateUser(this.userProfileRepository)
      .execute(updateUserDto!, userId)
      .then((data) => res.json(data))
      .catch((error) => this.handleError(error, res));
  }



  updateProfileImage = async (req: Request, res: Response) => {
    const userId = req.user!;
    const profileImage = req.files ;
    
    const [error, updateProfileImageDto] = UpdateProfileImageDto.create(profileImage || {});
    if (error) return res.status(400).json({ error });

    return new UpdateProfileImage(this.userProfileRepository)
      .execute(updateProfileImageDto!, userId)
      .then((data) => res.json(data))
      .catch((error) => this.handleError(error, res));
  }



  deleteUser = async (req: Request, res: Response) => {
    const userId = req.user!;

    return new DeleteUser(this.userProfileRepository)
      .execute(userId)
      .then(() => res.status(204).send())
      .catch((error) => this.handleError(error, res));
  }
}