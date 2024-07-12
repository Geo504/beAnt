import express, { Router } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";



interface Options {
  corsURL: string;
  port: number;
  routes: Router;
}

export class Server {
  public readonly app = express();
  private readonly corsURL: string;
  private readonly port: number;
  private readonly routes: Router;

  constructor( options: Options) {
    const { corsURL, port=5000, routes } = options;
    this.corsURL = corsURL;
    this.port = port;
    this.routes = routes;
  }

  async start() {
    // Middlewares
    this.app.use(cors({ origin: this.corsURL, credentials: true}));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true })); //parsing x-www-form-urlencoded
    this.app.use(cookieParser());

    // Routes
    this.app.use(this.routes);

    // Start server
    this.app.listen(this.port, () => {
      console.log(`Server running on port: ${this.port}`);
    });
  }
}
