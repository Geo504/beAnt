import { CreateInvitationDto } from "../dtos/invitation/create_invitation.dto";
import { UpdateInvitationDto } from "../dtos/invitation/update_invitation.dto";

import { InvitationEntity } from "../entities/invitation.entities";



export abstract class InvitationRepository {
  abstract createInvitation(createInvitationDto: CreateInvitationDto, userId: string): Promise<InvitationEntity>;

  abstract getInvitationsReceived(userId: string): Promise<InvitationEntity[]>;

  abstract getInvitationsSent(userId: string): Promise<InvitationEntity[]>;

  abstract updateInvitation(updateInvitationDto: UpdateInvitationDto, userId: string): Promise<boolean>;

}