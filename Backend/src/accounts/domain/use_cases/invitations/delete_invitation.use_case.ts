import { DeleteInvitationDto } from "../../../domain";

import { InvitationRepository } from "../../repositories/invitation.repository";



interface DeleteInvitationUseCase {
  execute(deleteInvitationDto: DeleteInvitationDto, userId: string): Promise<boolean>;
}



export class DeleteInvitation implements DeleteInvitationUseCase {
  constructor(
    private readonly invitationRepository: InvitationRepository,
  ) {}

  async execute(deleteInvitationDto: DeleteInvitationDto, userId: string): Promise<boolean> {
    await this.invitationRepository.deleteInvitation(deleteInvitationDto, userId);

    return true;
  }
}