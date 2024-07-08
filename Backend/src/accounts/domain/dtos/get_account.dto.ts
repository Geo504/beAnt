import { Validators } from "../../../config";



export class GetAccountDto {
  private constructor(
    public accountId: string
  ) {}

  static create(accountId: string): [string?, GetAccountDto?] {
    if (!accountId) return ['Account id is required'];
    if (!Validators.isMongoID(accountId)) return ['Account id invalid'];

    return [undefined, new GetAccountDto(accountId)];
  }
}