import express, { Router } from "express";
// import { EmailService } from "../../config";

interface Options {
  port: number;
  routes: Router;
}

export class Server {
  public readonly app = express();
  private readonly port: number;
  private readonly routes: Router;

  constructor( options: Options) {
    const { port=5000, routes } = options;
    this.port = port;
    this.routes = routes;
  }

  async start() {
    // TODO: Remove this test and implement the EmailService
    // const emailService = new EmailService();
    // emailService.sendEmail({
    //   to: "geovannyvalladares94@gmail.com",
    //   subject: "Test",
    //   htmlBody: `
    //     <h1>Test</h1>
    //     <p>Lorem</p>
    //   `,
    // });

    // Middlewares
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true })); //for parsing x-www-form-urlencoded

    // Routes
    this.app.use(this.routes);

    // Start server
    this.app.listen(this.port, () => {
      console.log(`Server running on port: ${this.port}`);
    });
  }
}
