import { UserEntity } from "../../../../auth/domain";
import { AccountEntity } from "../../entities/account.entities";

import { InvitationRepository } from "../../repositories/invitation.repository";


interface Invitation {
  id: string;
  sender: UserEntity;
  account: AccountEntity;
  role: 'admin' | 'guest';
  createdAt: Date;
}

interface GetInvitationsReceivedUseCase {
  execute(userId: string): Promise<Invitation[]>;
}



export class GetInvitationsReceived implements GetInvitationsReceivedUseCase {
  constructor(
    private readonly invitationRepository: InvitationRepository,
  ) {}

  async execute(userId: string): Promise<Invitation[]> {
    const invitations = await this.invitationRepository.getInvitationsReceived(userId);

    const filteredInvitations = invitations.map(invitation => {
      const { guest, ...rest } = invitation;
      return rest;
    });

    return filteredInvitations;
  }
}