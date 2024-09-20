import { UserEntity } from "../../../../auth/domain";
import { AccountEntity } from "../../entities/account.entities";

import { InvitationRepository } from "../../repositories/invitation.repository";


interface Invitation {
  id: string;
  sender: UserEntity;
  guest: UserEntity;
  account: AccountEntity;
  role: 'admin' | 'guest';
  createdAt: Date;
}

interface GetInvitationsSentUseCase {
  execute(userId: string): Promise<Invitation[]>;
}



export class GetInvitationsSent implements GetInvitationsSentUseCase {
  constructor(
    private readonly invitationRepository: InvitationRepository,
  ) {}

  async execute(userId: string): Promise<Invitation[]> {
    const invitations = await this.invitationRepository.getInvitationsSent(userId);

    return invitations;
  }
}