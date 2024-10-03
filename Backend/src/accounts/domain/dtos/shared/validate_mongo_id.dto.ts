import { Validators } from "../../../../config";



export class ValidateMongoIdDto {
  private constructor(
    public mongoId: string
  ) {}

  static create(mongoId: string): [string?, ValidateMongoIdDto?] {
    if (!mongoId) return ['Id is required'];
    if (!Validators.isMongoID(mongoId)) return ['Id invalid'];

    return [undefined, new ValidateMongoIdDto(mongoId)];
  }
}