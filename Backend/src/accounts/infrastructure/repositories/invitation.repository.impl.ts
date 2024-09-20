import { CreateInvitationDto, DeleteInvitationDto, InvitationDataSource, InvitationEntity, InvitationRepository, UpdateInvitationDto } from "../../domain";




export class InvitationRepositoryImpl implements InvitationRepository {
  constructor(
    private readonly invitationDataSource: InvitationDataSource,
  ) {}

  async createInvitation(createInvitationDto: CreateInvitationDto, userId: string): Promise<InvitationEntity> {
    return this.invitationDataSource.createInvitation(createInvitationDto, userId);
  }

  async getInvitationsReceived(userId: string): Promise<InvitationEntity[]> {
    return this.invitationDataSource.getInvitationsReceived(userId);
  }

  async getInvitationsSent(userId: string): Promise<InvitationEntity[]> {
    return this.invitationDataSource.getInvitationsSent(userId);
  }

  async updateInvitation(updateInvitationDto: UpdateInvitationDto, userId: string): Promise<boolean> {
    return this.invitationDataSource.updateInvitation(updateInvitationDto, userId);
  }

  async deleteInvitation(deleteInvitationDto: DeleteInvitationDto, userId: string): Promise<boolean> {
    return this.invitationDataSource.deleteInvitation(deleteInvitationDto, userId);
  }

}