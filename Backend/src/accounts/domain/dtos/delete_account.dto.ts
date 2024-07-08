import { Validators } from "../../../config";



export class DeleteAccountDto {
  private constructor(
    public accountId: string
  ) {}

  static create(accountId: string): [string?, DeleteAccountDto?] {
    if (!accountId) return ['Account id is required'];
    if (!Validators.isMongoID(accountId)) return ['Account id invalid'];

    return [undefined, new DeleteAccountDto(accountId)];
  }
}