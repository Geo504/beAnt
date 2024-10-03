import { Validators } from "../../../../config";



export class CreateInvitationDto {
  private constructor(
    public guest: string,
    public accountId: string,
    public role: "admin" | "guest",
  ) {}

  static create(object: {[key: string]: any}): [string?, CreateInvitationDto?] {
    let { guest, accountId, role="guest", ...extraKeys } = object;
    

    const extraKeysArray = Object.keys(extraKeys);
    if (extraKeysArray.length > 0) return [`Invalid keys: ${extraKeysArray.join(', ')}`];

    if (!guest) return ['invalid guest email'];
    if (typeof guest !== 'string') return ['invalid guest email'];
    if (!Validators.email.test(guest)) return ['email is invalid'];

    if (!accountId) return ['Account id invalid'];
    if (!Validators.isMongoID(accountId)) return ['Account id invalid'];

    if (role) {
      if (typeof role !== 'string') return ['role must be a string'];
      if (!['admin', 'guest'].includes(role)) return ['role must be admin or guest'];
    }

    return [
      undefined,
      new CreateInvitationDto( guest, accountId, role )
    ]
  }
}