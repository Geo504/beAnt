import { Validators } from "../../../../config";



export class GetAllQueriesDto {
  private constructor(
    public search?: string,
    public accountId?: string,
  ) {}

  static create(search?: string, accountId?: string): [string?, GetAllQueriesDto?] {

    if (search) {
      if (typeof search !== 'string') return ['invalid name'];
    }
    if (accountId) {
      if (!Validators.isMongoID(accountId)) return ['invalid account id'];
    }
    if (search === undefined && accountId === undefined) {
      return [undefined, undefined];
    }

    return [
      undefined,
      new GetAllQueriesDto( search, accountId )
    ]
  }
}