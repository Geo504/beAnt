import { Validators } from "../../../../config";



export class DeleteInvitationDto {
  private constructor(
    public invitationId: string,
  ) {}

  static create(object: {[key: string]: any}): [string?, DeleteInvitationDto?] {
    let { invitationId } = object;
    
    if (!invitationId) return ['Account id invalid'];
    if (!Validators.isMongoID(invitationId)) return ['Account id invalid'];


    return [
      undefined,
      new DeleteInvitationDto( invitationId )
    ]
  }
}