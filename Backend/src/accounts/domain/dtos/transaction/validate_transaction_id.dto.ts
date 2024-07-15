import { Validators } from "../../../../config";



export class ValidateTransactionIdDto {
  private constructor(
    public transactionId: string
  ) {}

  static create(transactionId: string): [string?, ValidateTransactionIdDto?] {
    if (!transactionId) return ['Transaction id is required'];
    if (!Validators.isMongoID(transactionId)) return ['Transaction id invalid'];

    return [undefined, new ValidateTransactionIdDto(transactionId)];
  }
}