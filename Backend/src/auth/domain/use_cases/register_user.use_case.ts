import { EmailService, JwtAdapter, envs } from "../../../config";

import { AuthRepository } from "../repositories/auth.repository";
import { RegisterUserDto } from "../dtos/register_user.dto";
import { CustomError } from "../errors/custom.error";



interface User {
  user: {
    id: string;
    email: string;
    name: string;
  };
}

interface RegisterUserUseCase {
  execute(registerUserDto: RegisterUserDto): Promise<User>
}



export class RegisterUser implements RegisterUserUseCase {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly emailService: EmailService = new EmailService(
      envs.EMAIL_SERVICE,
      envs.EMAIL_NAME,
      envs.EMAIL_PASSWORD,
    ),
  ){}

  

  async execute(registerUserDto: RegisterUserDto): Promise<User> {
    // Create a new user
    const user = await this.authRepository.registerUser(registerUserDto);

    // Send an email
    await this.sendEmailValidation(user.email, user.name);
    
    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    }
  }



  private sendEmailValidation = async (email: string, name: string) => {
    const token = await JwtAdapter.generateToken({ email }, '1h');
    if (!token) throw CustomError.internalServer('Error generating token');

    const link = ` ${envs.BACKEND_URL}/auth/validate-email/${token}`;
    
    const htmlBody = `
      <h1>Welcome to BeAnt!</h1>
      <p>
        <b>Estimado/a ${name},</b>
        <br><br>
        Estamos encantados de que hayas decidido unirte a nuestra plataforma.
        <br><br>
        Para comenzar a aprovechar al máximo nuestros servicios, es necesario que actives tu cuenta dando click en el siguiente enlace:
      </p>
      <a href="${link}">Validate your email</a>
    `;

    const options = {
      to: email,
      subject: 'Authentication Email',
      htmlBody: htmlBody,
    }

    const isSet = await this.emailService.sendEmail(options);
    if (!isSet) throw CustomError.internalServer('Error sending email');

    return true;
  }
}