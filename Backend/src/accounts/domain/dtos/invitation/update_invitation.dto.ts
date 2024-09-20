import { Validators } from "../../../../config";



export class UpdateInvitationDto {
  private constructor(
    public invitationId: string,
    public status: boolean,
  ) {}

  static create(object: {[key: string]: any}): [string?, UpdateInvitationDto?] {
    let { invitationId, status, ...extraKeys } = object;
    

    const extraKeysArray = Object.keys(extraKeys);
    if (extraKeysArray.length > 0) return [`Invalid keys: ${extraKeysArray.join(', ')}`];

    if (!invitationId) return ['Account id invalid'];
    if (!Validators.isMongoID(invitationId)) return ['Account id invalid'];

    if (typeof status!== 'boolean') return ['Status invalid'];


    return [
      undefined,
      new UpdateInvitationDto( invitationId, status )
    ]
  }
}