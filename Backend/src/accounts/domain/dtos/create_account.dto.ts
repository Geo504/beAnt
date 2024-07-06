


export class CreateAccountDto {
  private constructor(
    public name: string,
    public balance: number,
    public favorite: boolean,
    public currency: string,
  ) {}

  static create(object: {[key: string]: any}): [string?, CreateAccountDto?] {
    const { name, favorite=false, currency='€', ...extraKeys } = object;
    const balance = 0;

    const extraKeysArray = Object.keys(extraKeys);
    if (extraKeysArray.length > 0) return [`Invalid keys: ${extraKeysArray.join(', ')}`];
    
    if (!name) return ['name is required'];
    if (typeof name !== 'string') return ['name must be a string'];
    if (name.length < 3) return ['name too short'];

    if (typeof favorite !== 'boolean') return ['favorite must be a boolean'];

    if (!['€', '$', '£'].includes(currency)) return ['currency is invalid'];

    return [
      undefined,
      new CreateAccountDto(name, balance, favorite, currency)
    ]
  }
}