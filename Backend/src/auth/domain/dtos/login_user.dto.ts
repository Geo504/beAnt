import { Validators } from "../../../config";



export class LoginUserDto {
  private constructor(
    public email: string,
    public password: string,
  ) {}

  static create(object: {[key: string]: any}): [string?, LoginUserDto?] {
    const { email, password, ...extraKeys } = object;

    const extraKeysArray = Object.keys(extraKeys);
    if (extraKeysArray.length > 0) return [`Invalid keys: ${extraKeysArray.join(', ')}`];
    
    if (!email) return ['email is required'];
    if (!Validators.email.test(email)) return ['email is invalid'];
    if (!password) return ['password is required'];
    if (password.length < 6) return ['password too short'];

    return [
      undefined,
      new LoginUserDto(email.toLowerCase(), password)
    ]
  }
}