import { Validators } from "../../../../config";



export class UpdateTransactionDto {
  private constructor(
    public transactionId: string,
    public name?: string,
    public value?: number,
    public type?: string,
    public category?: string,
    public date?: Date,
    public accountId?: string,
  ) {}

  static create(object: {[key: string]: any}, transactionId: string): [string?, UpdateTransactionDto?] {
    const { name, value, category, date, accountId, ...extraKeys } = object;
    let type = undefined;

    const extraKeysArray = Object.keys(extraKeys);
    if (extraKeysArray.length > 0) return [`Invalid keys: ${extraKeysArray.join(', ')}`];

    if (name){
      if (typeof name !== 'string') return ['invalid name'];
      if (name.length < 3) return ['invalid name'];
    }


    if (value) {
      if (isNaN(value) || typeof value !== "number") return ['invalid value'];
      type = value < 0 ? 'expense' : 'income';
    }

    if (category) {
      if (typeof category !== 'string') return ['invalid category'];
      if (category.length < 3) return ['category too short'];
    }

    if (!transactionId) return ['Transaction id invalid'];
    if (!Validators.isMongoID(transactionId)) return ['Transaction id invalid'];

    if (date) {
      const parsedDate = new Date(date);
      if (isNaN(parsedDate.getTime())) return ['invalid date'];
    }

    return [
      undefined,
      new UpdateTransactionDto( transactionId, name, value, type, category, date, accountId )
    ]
  }
}