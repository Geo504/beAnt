import { Validators } from "../../../config";



export class UpdateAccountDto {
  private constructor(
    public accountId: string,
    public name?: string,
    public currency?: string,
  ) {}

  static create(object: {[key: string]: any}, accountId: string): [string?, UpdateAccountDto?] {
    const { name, favorite, currency, ...extraKeys } = object;

    const extraKeysArray = Object.keys(extraKeys);
    if (extraKeysArray.length > 0) return [`Invalid keys: ${extraKeysArray.join(', ')}`];

    if (!name && favorite === undefined && currency === undefined) return ['At least one key is required'];
    if (!accountId) return ['Account id invalid'];
    if (!Validators.isMongoID(accountId)) return ['Account id invalid'];

    
    if (name) {
      if (typeof name !== 'string') return ['name must be a string'];
      if (name.length < 3) return ['name too short'];
    }

    if (favorite) {
      if (typeof favorite !== 'boolean') return ['favorite must be a boolean'];
    }

    if (currency) {
      if (!['€', '$', '£'].includes(currency)) return ['currency is invalid'];
    }

    return [
      undefined,
      new UpdateAccountDto(accountId, name, currency)
    ]
  }
}