import { Validators } from "../../../../config";



export class GetAllQueriesDto {
  private constructor(
    public name?: string,
    public accountId?: string,
  ) {}

  static create(name?: string, accountId?: string): [string?, GetAllQueriesDto?] {
    if (name) {
      if (typeof name !== 'string') return ['invalid name'];
    }
    if (accountId) {
      if (!Validators.isMongoID(accountId)) return ['invalid account id'];
    }
    if (name === undefined && accountId === undefined) {
      return [undefined, undefined];
    }

    return [
      undefined,
      new GetAllQueriesDto( name, accountId )
    ]
  }
}