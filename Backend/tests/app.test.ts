import { envs } from "../src/config";
import { Server } from "../src/core/presentation/server";
import { MongoDB } from "../src/auth/data/mongodb";


jest.mock("../src/core/presentation/server");
jest.mock("../src/auth/data/mongodb");


describe('App', () => {

  test('Should call the Server and MongoDB', async () => {
    await import("../src/app");

    expect(MongoDB.connect).toHaveBeenCalledTimes(1);
    expect(MongoDB.connect).toHaveBeenCalledWith({
      mongoURL: envs.MONGO_URL,
      dbName: envs.MONGO_DB_NAME,
    });

    expect(Server).toHaveBeenCalledTimes(1);
    expect(Server).toHaveBeenCalledWith({
      port: envs.PORT,
      routes: expect.any(Function)
    });
    expect( Server.prototype.start ).toHaveBeenCalledWith();
  });

});