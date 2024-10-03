import { UpdateInvitationDto } from "../../dtos/invitation/update_invitation.dto";

import { InvitationRepository } from "../../repositories/invitation.repository";



interface UpdateInvitationUseCase {
  execute(updateInvitationDto: UpdateInvitationDto, userId: string): Promise<boolean>;
}



export class UpdateInvitation implements UpdateInvitationUseCase {
  constructor(
    private readonly invitationRepository: InvitationRepository,
  ) {}

  async execute(updateInvitationDto: UpdateInvitationDto, userId: string): Promise<boolean> {
    await this.invitationRepository.updateInvitation(updateInvitationDto, userId);

    return true;
  }
}