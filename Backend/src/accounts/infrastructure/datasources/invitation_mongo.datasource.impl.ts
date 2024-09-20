import { AccountModel, InvitationsAccountModel, UserModel, UsersAccountsModel } from "../../../data";

import { CustomError } from "../../../auth/domain";
import { CreateInvitationDto, InvitationDataSource, InvitationEntity } from "../../domain";
import { UpdateInvitationDto } from "../../domain/dtos/invitation/update_invitation.dto";





export class InvitationMongoDataSourceImpl implements InvitationDataSource {
  constructor() {}

  async createInvitation(createInvitationDto: CreateInvitationDto, userId: string): Promise<InvitationEntity> {
    const { guest, role, accountId } = createInvitationDto;

    try {
      const userGuest = await UserModel.findOne({ email: guest }).select('_id');
      if (!userGuest) throw CustomError.notFound('Guest not found');

      const account = await UsersAccountsModel.exists({ user: userId, account: accountId, role: 'admin' });
      if (!account) throw CustomError.notFound('Account not found or unauthorized');

      const existingInvitation = await InvitationsAccountModel.exists({ guest: userGuest._id, account: accountId });
      if (existingInvitation) throw CustomError.forbidden('Invitation already exists');

      const newInvitation = new InvitationsAccountModel({
        sender: userId,
        guest: userGuest._id,
        role: role,
        account: accountId,
      });
      await newInvitation.save();

      const populatedInvitation = await InvitationsAccountModel.findById(newInvitation._id)
        .populate({ path: 'sender', select: 'name email img -_id' })
        .populate({ path: 'guest', select: 'name email img -_id' })
        .populate({ path: 'account', select: 'name -_id' });
      if (!populatedInvitation) throw CustomError.notFound('Invitation not found');

      
      return InvitationEntity.fromObject(populatedInvitation);
      
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      console.log(error);
      throw CustomError.internalServer();
    }
  }



  async getInvitationsReceived(userId: string): Promise<InvitationEntity[]> {
    try {
      const invitations = await InvitationsAccountModel.find({ guest: userId })
        .populate({ path: 'sender', select: 'name email img -_id' })
        .populate({ path: 'account', select: 'name -_id' });

      return invitations.map(InvitationEntity.fromObject);

    } catch (error) {
      console.log(error);
      throw CustomError.internalServer();
    }
  }



  async getInvitationsSent(userId: string): Promise<InvitationEntity[]> {
    try {
      const invitations = await InvitationsAccountModel.find({ sender: userId })
        .populate({ path: 'guest', select: 'name email img -_id' })
        .populate({ path: 'account', select: 'name -_id' });

      return invitations.map(InvitationEntity.fromObject);

    } catch (error) {
      console.log(error);
      throw CustomError.internalServer();
    }
  }



  async updateInvitation(updateInvitationDto: UpdateInvitationDto, userId: string): Promise<boolean> {
    const { invitationId, status } = updateInvitationDto;

    try {
      const invitation = await InvitationsAccountModel.findOne({ _id: invitationId, guest: userId }).select('account role');
      if (!invitation) throw CustomError.notFound('Invitation not found');

      
      if (!status) {
        await InvitationsAccountModel.deleteOne({ _id: invitationId });
        return true;
      }

      const userAccount = new UsersAccountsModel({
        user: userId,
        account: invitation.account,
        role: invitation.role,
      });
      await userAccount.save();

      await Promise.all([
        AccountModel.findByIdAndUpdate(
          invitation.account,
          { $push: { users: userId } },
          { new: true, safe: true, upsert: false }
        ),
        UserModel.findByIdAndUpdate(
          userId,
          { $push: { accounts: invitation.account } },
          { new: true, safe: true, upsert: false }
        ),
        InvitationsAccountModel.deleteOne({ _id: invitationId })
      ]);


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