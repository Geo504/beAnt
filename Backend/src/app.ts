import { envs } from "./config";
import { MongoDB } from "./auth/data/mongodb";
import { AppRoutes } from "./core/presentation/routes";
import { Server } from "./core/presentation/server";

(() => {
  main();
})();

async function main() {

  await MongoDB.connect({
    mongoURL: envs.MONGO_URL,
    dbName: envs.MONGO_DB_NAME,
  })

  new Server({
    port: envs.PORT,
    routes: AppRoutes.routes,
  }).start();
}
