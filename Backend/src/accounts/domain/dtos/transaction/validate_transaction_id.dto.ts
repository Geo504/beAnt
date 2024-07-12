import { Validators } from "../../../../config";



export class ValidateTransactionIdDto {
  private constructor(
    public transactionId: string
  ) {}

  static create(accountId: string): [string?, ValidateTransactionIdDto?] {
    if (!accountId) return ['Account id is required'];
    if (!Validators.isMongoID(accountId)) return ['Account id invalid'];

    return [undefined, new ValidateTransactionIdDto(accountId)];
  }
}