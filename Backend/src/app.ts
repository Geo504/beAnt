import { envs } from "./config";
import { MongoDB } from "./data";
import { AppRoutes } from "./core/routes";
import { Server } from "./core/server";

(() => {
  main();
})();

async function main() {

  await MongoDB.connect({
    mongoURL: envs.MONGO_URL,
    dbName: envs.MONGO_DB_NAME,
  })

  const server = new Server({
    corsURL: envs.FRONTEND_URL,
    port: envs.PORT,
    routes: AppRoutes.routes,
  });

  server.start();
}
