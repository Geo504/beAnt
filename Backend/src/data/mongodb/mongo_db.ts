import mongoose from "mongoose";

interface Options {
  mongoURL: string;
  dbName: string;
}


export class MongoDB {
  static async connect(options: Options) {
    const { mongoURL, dbName } = options;

    try {
      mongoose.connect(mongoURL, {
        dbName: dbName,
      });

      console.log("Connected to MongoDB");
      
    } catch (error) {
      console.error("Error connecting to MongoDB");
      throw error;
    }
  }
}