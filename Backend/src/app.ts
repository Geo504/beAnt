import { envs } from "./config";
import { MongoDB } from "./data/mongodb";
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

  new Server({
    port: envs.PORT,
    routes: AppRoutes.routes,
  }).start();
}
