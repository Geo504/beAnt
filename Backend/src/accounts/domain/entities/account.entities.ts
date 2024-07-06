import { CustomError, UserEntity } from "../../../auth/domain";

export enum Currency {
  Euro = '€',
  Dollar = '$',
  Pound = '£',
}


export class AccountEntity {

  constructor(
    public id: string,
    public name: string,
    public balance: number,
    public favorite: boolean,
    public currency: Currency,
    public user: UserEntity[],
    public transactions?: string[],
  ) {}

  static fromObject( object: { [key: string]: any }) {
    const { id, _id, name, balance, favorite, currency, user, transactions } = object;

    if (!id && !_id) throw CustomError.badRequest('Id is required');
    if (!name) throw CustomError.badRequest('Name is required');
    if (balance === undefined) throw CustomError.badRequest('Balance is required');
    if (favorite === undefined) throw CustomError.badRequest('Favorite is required');
    if (!currency) throw CustomError.badRequest('Currency is required');
    if (!user) throw CustomError.badRequest('User is required');

    return new AccountEntity(id || _id, name, balance, favorite, currency, user, transactions);
  }
}