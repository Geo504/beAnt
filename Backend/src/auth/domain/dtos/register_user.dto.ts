import { Validators } from "../../../config";

export class RegisterUserDto {
  private constructor(
    public name: string,
    public email: string,
    public password: string,
    public img?: string,
  ) {}

  static create(object: {[key: string]: any}): [string?, RegisterUserDto?] {
    const { name, email, password, ...extraKeys } = object;

    const extraKeysArray = Object.keys(extraKeys);
    if (extraKeysArray.length > 0) return [`Invalid keys: ${extraKeysArray.join(', ')}`];
    
    if (!name) return ['name is required'];
    if (!email) return ['email is required'];
    if (!Validators.email.test(email)) return ['email is invalid'];
    if (!password) return ['password is required'];
    if (password.length < 6) return ['password too short'];

    return [
      undefined,
      new RegisterUserDto(name, email.toLowerCase(), password)
    ]
  }
}