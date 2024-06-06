import { CustomError } from "../../domain";

export class UserMapper {
  static userEntityFromObject(object: { [key: string]: any }) {
    const { id, _id, name, email, password, verify } = object;

    if (!id && !_id) throw CustomError.badRequest('Id is required');
    if (!name) throw CustomError.badRequest('Name is required');
    if (!email) throw CustomError.badRequest('Email is required');
    if (!password) throw CustomError.badRequest('Password is required');

    return {
      id: id || _id,
      name,
      email,
      password,
      verify,
    };
  }
}