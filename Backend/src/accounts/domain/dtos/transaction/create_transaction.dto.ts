import { Validators } from "../../../../config";



export class CreateTransactionDto {
  private constructor(
    public name: string,
    public value: number,
    public category: string,
    public accountId: string,
    public date: Date,
  ) {}

  static create(object: {[key: string]: any}): [string?, CreateTransactionDto?] {
    const { name, value, category, accountId, date=new Date(), ...extraKeys } = object;

    const extraKeysArray = Object.keys(extraKeys);
    if (extraKeysArray.length > 0) return [`Invalid keys: ${extraKeysArray.join(', ')}`];

    if (!name) return ['invalid name'];
    if (typeof name !== 'string') return ['invalid name'];
    if (name.length < 3) return ['invalid name'];

    if (!value) return ['invalid value'];
    if (isNaN(value) || typeof value !== "number") return ['invalid value'];
    if (parseFloat(value.toFixed(2)) !== value) return ['invalid value'];

    if (!category) return ['invalid category'];
    if (typeof category !== 'string') return ['invalid category'];
    if (category.length < 3) return ['category too short'];

    if (!accountId) return ['Account id invalid'];
    if (!Validators.isMongoID(accountId)) return ['Account id invalid'];

    if (date) {
      if (isNaN(date.getTime())) return ['invalid date'];
    }

    return [
      undefined,
      new CreateTransactionDto( name, value, category, accountId, date )
    ]
  }
}