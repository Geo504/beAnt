import { Request, Response } from "express";

import { CreateInvitation, CreateInvitationDto, DeleteInvitation, DeleteInvitationDto, GetInvitationsReceived, GetInvitationsSent, InvitationRepository, UpdateInvitation, UpdateInvitationDto } from "../../domain";
import { CustomError } from "../../../auth/domain";



export class InvitationController {
  constructor(
    private readonly invitationRepository: InvitationRepository,
  ) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.code).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Internal server error' });
  };

  

  createInvitation = (req: Request, res: Response) => {
    const userId = req.user!;

    const [error, createInvitationDto] = CreateInvitationDto.create(req.body);
    if (error) return res.status(400).json({ error });

    return new CreateInvitation(this.invitationRepository)
      .execute(createInvitationDto!, userId)
      .then((data) => res.json(data))
      .catch((error) => this.handleError(error, res));
  }



  getInvitationsReceived = (req: Request, res: Response) => {
    const userId = req.user!;

    return new GetInvitationsReceived(this.invitationRepository)
      .execute(userId)
      .then((data) => res.json(data))
      .catch((error) => this.handleError(error, res));
  }



  getInvitationsSent = (req: Request, res: Response) => {
    const userId = req.user!;

    return new GetInvitationsSent(this.invitationRepository)
      .execute(userId)
      .then((data) => res.json(data))
      .catch((error) => this.handleError(error, res));
  }



  updateInvitation = (req: Request, res: Response) => {
    const userId = req.user!;
    const { invitationId } = req.params;
    const status = req.query.status === 'true';

    const [error, updateInvitationDto] = UpdateInvitationDto.create({invitationId, status});
    if (error) return res.status(400).json({ error });

    return new UpdateInvitation(this.invitationRepository)
      .execute(updateInvitationDto!, userId)
      .then(() => res.status(204).send())
      .catch((error) => this.handleError(error, res));
  }



  deleteInvitation = (req: Request, res: Response) => {
    const userId = req.user!;
    const { invitationId } = req.params;

    const [error, deleteInvitationDto] = DeleteInvitationDto.create({invitationId});
    if (error) return res.status(400).json({ error });

    return new DeleteInvitation(this.invitationRepository)
      .execute(deleteInvitationDto!, userId)
      .then(() => res.status(204).send())
      .catch((error) => this.handleError(error, res));
  }


}