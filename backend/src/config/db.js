import mongoose from "mongoose";

import { env } from "./env.js";

export const connectDatabase = async () => {
  if (!env.mongodbUri) {
    throw new Error("MONGODB_URI is missing");
  }

  mongoose.set("strictQuery", true);
  await mongoose.connect(env.mongodbUri);
};
