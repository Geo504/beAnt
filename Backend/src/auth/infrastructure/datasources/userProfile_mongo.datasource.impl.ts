import { AccountModel, TransactionModel, UserModel, UserProfileModel } from "../../../data";

import { CustomError, ProfileEntity, UpdateUserDto, UserEntity, UserProfileDataSource } from "../../domain";




export class UserProfileDataSourceImpl<T> implements UserProfileDataSource<T> {
  constructor() {}



  async getUser(userId: string): Promise<UserEntity> {
    try {
      const user = await UserModel.findById(userId);
      if (!user) throw CustomError.notFound('User not found');

      return UserEntity.fromObject(user);

    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      console.log(error);
      throw CustomError.internalServer();
    }
  }



  async getUserProfile(userId: string): Promise<T> {
    try {
      const userProfile = await UserProfileModel.findOne({ user: userId })
        .populate('user', 'name email img');

      if (!userProfile) {
        const newUserProfile = new UserProfileModel({
          user: userId,
          lastName: '',
          profession: '',
          phone: '',
        });

        const createdUserProfile = await newUserProfile.save();

        return {
          user: createdUserProfile.user,
          lastName: createdUserProfile.lastName ?? undefined,
          profession: createdUserProfile.profession ?? undefined,
          phone: createdUserProfile.phone ?? undefined,
          birth: createdUserProfile.birth ?? undefined,
        } as T;
      };

      return {
        user: userProfile.user,
        lastName: userProfile.lastName ?? undefined,
        profession: userProfile.profession ?? undefined,
        phone: userProfile.phone ?? undefined,
        birth: userProfile.birth ?? undefined,
      } as T;

    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      console.log(error);
      throw CustomError.internalServer();
    }
  }

  

  async updateUser(updateUserDto: UpdateUserDto, userId: string): Promise<ProfileEntity> {
    const {name, ...updateProfile} = updateUserDto;

    try {
      if (name) {
        await UserModel.findByIdAndUpdate(userId, { $set: { name: name } });
      }

      let query = { user: userId };
      let update = updateProfile ? { $set: updateProfile } : undefined;
      let options = { new: true, upsert: !!updateProfile };
    
      const userProfile = await UserProfileModel.findOneAndUpdate(query, update, options)
        .populate('user', 'name').lean() as ProfileEntity & { user: { name: string } };
      if (!userProfile) throw CustomError.notFound('User not found');

      return {
        name: userProfile.user.name,
        lastName: userProfile.lastName ?? undefined,
        profession: userProfile.profession ?? undefined,
        phone: userProfile.phone ?? undefined,
        birth: userProfile.birth ?? undefined,
      };

    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      console.log(error);
      throw CustomError.internalServer();
    }
  }



  async getProfileImage(userId: string): Promise<string> {
    try {
      const user = await UserModel.findById(userId).select('img');
      return user?.img ?? '';

    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      console.log(error);
      throw CustomError.internalServer();
    }
  }



  async updateProfileImage(urlImage: string, userId: string): Promise<boolean> {
    try {
      await UserModel.findByIdAndUpdate(userId, { $set: { img: urlImage } });
      return true;

    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      console.log(error);
      throw CustomError.internalServer();
    }
  }



  async deleteUser(userId: string): Promise<boolean> {
    try {
      const accounts = await AccountModel.find({ users: userId }).select('_id');

      // Delete user accounts & transactions
      if (accounts.length > 0) {
        const accountIds = accounts.map(account => account._id);

        const deleteTransactions = TransactionModel.deleteMany({ account: { $in: accountIds } });
        const deleteAccounts = AccountModel.deleteMany({ _id: { $in: accountIds } });
        
        await Promise.all([deleteTransactions, deleteAccounts]);
      }


      const user = await UserModel.findByIdAndDelete(userId);
      if (!user) throw CustomError.notFound('User not found');

      return true;

    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      console.log(error);
      throw CustomError.internalServer();
    }
  }
} 