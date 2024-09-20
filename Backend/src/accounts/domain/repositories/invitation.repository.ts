import {CreateInvitationDto, UpdateInvitationDto, DeleteInvitationDto } from "../../domain";

import { InvitationEntity } from "../entities/invitation.entities";



export abstract class InvitationRepository {
  abstract createInvitation(createInvitationDto: CreateInvitationDto, userId: string): Promise<InvitationEntity>;

  abstract getInvitationsReceived(userId: string): Promise<InvitationEntity[]>;

  abstract getInvitationsSent(userId: string): Promise<InvitationEntity[]>;

  abstract updateInvitation(updateInvitationDto: UpdateInvitationDto, userId: string): Promise<boolean>;

  abstract deleteInvitation(deleteInvitationDto: DeleteInvitationDto, userId: string): Promise<boolean>;

}