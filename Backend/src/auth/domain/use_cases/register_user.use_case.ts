import { EmailService } from "../../../config";
// import { JwtAdapter } from "../../../config";

import { AuthRepository } from "../repositories/auth.repository";
import { RegisterUserDto } from "../dtos/register_user.dto";
import { CustomError } from "../errors/custom.error";



interface User {
  // token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

// type EmailSent = (options: Object) => Promise<boolean>;
// type SignToken = (payload: Object, duration?: string) => Promise<string | null>;



interface RegisterUserUseCase {
  execute(registerUserDto: RegisterUserDto): Promise<User>
}


export class RegisterUser implements RegisterUserUseCase {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly emailService: EmailService = new EmailService(),
    // private readonly signToken: SignToken = JwtAdapter.generateToken,
  ){}

  async execute(registerUserDto: RegisterUserDto): Promise<User> {
    // Create a new user
    const user = await this.authRepository.registerUser(registerUserDto);

    // Send an email
    const emailSent = await this.emailService.sendEmail({
      to: user.email,
      subject: 'Authentication Email',
      htmlBody: `
      <h1>Welcome to BeAnt!</h1>
      <p>
        <b>Estimado/a ${user.name},</b>
        <br><br>
        Estamos encantados de que hayas decidido unirte a nuestra plataforma.
        <br><br>
        Para comenzar a aprovechar al máximo nuestros servicios, es necesario que actives tu cuenta siguiendo unos sencillos pasos.
      </p>
      `,
    });
    if (!emailSent) throw CustomError.internalServer('Error sending email');

    // Generate a token
    // const token = await this.signToken({id: user.id}, '2h');
    // if (!token) throw CustomError.internalServer('Error generating token');
    
    return {
      // token: token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    }
  }
}