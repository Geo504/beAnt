import { Validators } from "../../../../config";



export class ValidateAccountIdDto {
  private constructor(
    public accountId: string
  ) {}

  static create(accountId: string): [string?, ValidateAccountIdDto?] {
    if (!accountId) return ['Account id is required'];
    if (!Validators.isMongoID(accountId)) return ['Account id invalid'];

    return [undefined, new ValidateAccountIdDto(accountId)];
  }
}