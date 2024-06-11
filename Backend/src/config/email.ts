import nodemailer from "nodemailer";
import { envs } from "./envs";

interface SendEmailOptions {
  to: string | string[];
  subject: string;
  htmlBody: string;
  text?: string;
}



export class EmailService {

  private transporter = nodemailer.createTransport({
    service: envs.EMAIL_SERVICE,
    auth: {
      user: envs.EMAIL_NAME,
      pass: envs.EMAIL_PASSWORD,
    },
  });


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
