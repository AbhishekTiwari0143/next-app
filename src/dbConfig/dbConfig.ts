import mongoose from "mongoose";

import "dotenv/config";
console.log(process.env.MONGO_URL);

export async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URL!);
    const connection = mongoose.connection;

    connection.once("error", (err) => {
      console.log("Error connecting to MongoDB: " + err);
      // process.exit(1);
    });
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
}
