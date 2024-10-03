import { CustomError, UserEntity } from "../../../auth/domain";
import { AccountEntity } from "./account.entities";



export enum Role {
  Admin = 'admin',
  Guest = 'guest',
}


export class InvitationEntity {

  constructor(
    public id: string,
    public sender: UserEntity,
    public guest: UserEntity,
    public role: Role,
    public account: AccountEntity,
    public createdAt: Date,
  ) {}

  static fromObject( object: { [key: string]: any }) {
    const { id, _id, sender, guest, role, account, createdAt } = object;

    if (!id && !_id) throw CustomError.badRequest('Id is required');
    if (!sender) throw CustomError.badRequest('Sender is required');
    if (!guest) throw CustomError.badRequest('Guest is required');
    if (!role) throw CustomError.badRequest('Role is required');
    if (!account) throw CustomError.badRequest('Account is required');
    if (!createdAt) throw CustomError.badRequest('CreatedAt is required');



    return new InvitationEntity(id || _id, sender, guest, role, account, createdAt);
  }
}