import { CustomError } from "../errors/custom.error";
import { UserEntity } from "./user.entities";

export class ProfileEntity {
  constructor(
    public name: UserEntity["name"],
    public lastName?: string,
    public profession?: string,
    public phone?: string,
    public birth?: Date,
  ) {}


  static fromObject( object: { [key: string]: any }) {
    const { name, lastName, profession, phone, birth } = object;

    if (!name) throw CustomError.badRequest('Name is required');


    return new ProfileEntity(name, lastName, profession, phone, birth);
  }
}