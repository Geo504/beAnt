import { Validators } from "../../../config";

export class RegisterUserDto {
  private constructor(
    public name: string,
    public email: string,
    public password: string,
  ) {}

  static create(object: {[key: string]: any}): [string?, RegisterUserDto?] {
    const { name, email, password, ...extraKeys } = object;

    const extraKeysArray = Object.keys(extraKeys);
    if (extraKeysArray.length > 0) return [`Invalid keys: ${extraKeysArray.join(', ')}`];
    
    if (!name) return ['name is required'];
    if (typeof name !== 'string') return ['name must be a string'];
    if (name.length < 2) return ['name too short'];

    if (!email) return ['email is required'];
    if (typeof email !== 'string') return ['email must be a string'];
    if (!Validators.email.test(email)) return ['email is invalid'];

    if (!password) return ['password is required'];
    if (typeof password !== 'string') return ['password must be a string'];
    if (password.length < 6) return ['password too short'];

    return [
      undefined,
      new RegisterUserDto(name, email, password)
    ]
  }
}