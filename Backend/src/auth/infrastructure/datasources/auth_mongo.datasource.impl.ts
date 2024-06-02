import { BcryptAdapter } from "../../../config";

import { UserModel } from "../../data/mongodb";
import { AuthDataSource, CustomError, RegisterUserDto, UserEntity } from "../../domain";
import { UserMapper } from "../mappers/user.mapper";



export class AuthDataSourceImpl implements AuthDataSource {

  async registerUser(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    const { name, email, password } = registerUserDto;

    try{
      //verificar correo existente
      const existingMail = await UserModel.findOne({ email });
      if (existingMail) throw CustomError.badRequest('Email already exists');

      //encriptar contraseña

      //guardar usuario en la base de datos
      const user = await UserModel.create({
        name: name,
        email:  email,
        password: BcryptAdapter.hash(password),
      });
      await user.save();


      return UserMapper.userEntityFromObject(user);

    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }
}