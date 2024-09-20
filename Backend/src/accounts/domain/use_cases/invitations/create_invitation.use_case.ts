import { UserEntity } from "../../../../auth/domain";
import { AccountEntity } from "../../entities/account.entities";

import { CreateInvitationDto } from "../../dtos/invitation/create_invitation.dto";
import { InvitationRepository } from "../../repositories/invitation.repository";


interface Invitation {
  id: string;
  sender: UserEntity;
  guest: UserEntity;
  account: AccountEntity;
  role: 'admin' | 'guest';
  createdAt: Date;
}

interface CreateInvitationUseCase {
  execute(createInvitationDto: CreateInvitationDto, userId: string): Promise<Invitation>;
}



export class CreateInvitation implements CreateInvitationUseCase {
  constructor(
    private readonly invitationRepository: InvitationRepository,
  ) {}

  async execute(createInvitationDto: CreateInvitationDto, userId: string): Promise<Invitation> {
    const invitation = await this.invitationRepository.createInvitation(createInvitationDto, userId);

    return {
      id: invitation.id,
      sender: invitation.sender,
      guest: invitation.guest,
      account: invitation.account,
      role: invitation.role,
      createdAt: invitation.createdAt,
    };
  }
}