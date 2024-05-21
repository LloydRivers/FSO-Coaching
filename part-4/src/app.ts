import config from "./utils/config";
import express from "express";
const app = express();
import blogRouter from "./controllers/blogs";
import cors from "cors";
import middleware from "./utils/middleware";
import logger from "./utils/logger";
import mongoose from "mongoose";

mongoose.set("strictQuery", false);
logger.info("Attemtping to connect to MongoDB");

const connect = async () => {
  const uri = config.MONGODB_URI;

  if (!uri) {
    logger.error("MONGODB_URI is undefined");
    throw new Error("MONGODB_URI must be defined");
  }

  try {
    await mongoose.connect(uri);
    logger.info("Connected to MongoDB");
  } catch (error) {
    logger.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

const startServer = async () => {
  await connect();

  app.use(cors());
  app.use(express.static("dist"));
  app.use(express.json());
  app.use(middleware.requestLogger);
  app.use("/api/blogs", blogRouter);
  app.use(middleware.unknownEndpoint);
  app.use(middleware.errorHandler);
};

startServer();

export default app;
