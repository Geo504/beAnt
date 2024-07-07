import { CustomError, UserEntity } from "../../../auth/domain";
import { AccountEntity } from "./account.entities";





export class TransactionEntity {
  constructor(
    public id: string,
    public name: string,
    public value: number,
    public date: Date,
    public type: 'Income' | 'Expense',
    public category: string,
    public status: 'Pending' | 'Send' | 'Paid' | 'Rejected',
    public balanceAccount: number,
    public user: UserEntity["id"],
    public account: AccountEntity["id"],
  ) {}

  static fromObject(object: { [key: string]: any }) {
    const { id, _id, name, value, date, type, category, status, balanceAccount, user, account } = object;

    if (!id && !_id) throw CustomError.badRequest('Id is required');
    if (!name) throw CustomError.badRequest('Name is required');
    if (value === undefined) throw CustomError.badRequest('Value is required');
    if (!date) throw CustomError.badRequest('Date is required');
    if (!type) throw CustomError.badRequest('Type is required');
    if (!category) throw CustomError.badRequest('Category is required');
    if (!status) throw CustomError.badRequest('Status is required');
    if (balanceAccount === undefined) throw CustomError.badRequest('Balance account is required');
    if (!user) throw CustomError.badRequest('User is required');
    if (!account) throw CustomError.badRequest('Account is required');
    

    return new TransactionEntity(id || _id, name, value, date, type, category, status, balanceAccount, user, account);
  }
}