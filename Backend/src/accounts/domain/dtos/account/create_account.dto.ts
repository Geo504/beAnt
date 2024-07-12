


export class CreateAccountDto {
  private constructor(
    public name: string,
    public balance: number,
    public currency: string,
  ) {}

  static create(object: {[key: string]: any}): [string?, CreateAccountDto?] {
    const { name, currency='€', ...extraKeys } = object;
    const balance = 0;

    const extraKeysArray = Object.keys(extraKeys);
    if (extraKeysArray.length > 0) return [`Invalid keys: ${extraKeysArray.join(', ')}`];
    
    if (!name) return ['name is required'];
    if (typeof name !== 'string') return ['name must be a string'];
    if (name.length < 3) return ['name too short'];

    if (!['€', '$', '£'].includes(currency)) return ['currency is invalid'];

    return [
      undefined,
      new CreateAccountDto(name, balance, currency)
    ]
  }
}