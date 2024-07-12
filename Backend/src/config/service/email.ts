import nodemailer, { Transporter } from "nodemailer";



interface SendEmailOptions {
  to: string | string[];
  subject: string;
  htmlBody: string;
  text?: string;
}



export class EmailService {

  private transporter: Transporter;

  constructor(
    emailService: string,
    emailName: string,
    emailPassword: string,
  ){
    this.transporter = nodemailer.createTransport({
      service: emailService,
      auth: {
        user: emailName,
        pass: emailPassword,
      },
    });
  }



  async sendEmail(options: SendEmailOptions): Promise<boolean> {
    
    const { to, subject, htmlBody, text } = options;

    try {
      await this.transporter.sendMail({
        to: to,
        subject: subject,
        html: htmlBody,
        text: text,
      });

      return true;
      
    } catch (error) {
      return false;
    }
  }
}
