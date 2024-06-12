import { CustomError } from "../errors/custom.error";

export class UserEntity {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public password: string,
    public verifyEmail: boolean,
    public img?: string,
  ) {}


  static fromObject( object: { [key: string]: any }) {
    const { id, _id, name, email, password, verifyEmail, img } = object;

    if (!id && !_id) throw CustomError.badRequest('Id is required');
    if (!name) throw CustomError.badRequest('Name is required');
    if (!email) throw CustomError.badRequest('Email is required');
    if (!password) throw CustomError.badRequest('Password is required');
    if (verifyEmail === undefined) throw CustomError.badRequest('Verify email is required');

    return new UserEntity(id || _id, name, email, password, verifyEmail, img);
  }
}