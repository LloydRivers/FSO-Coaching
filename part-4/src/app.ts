import config from "./utils/config";
import express from "express";
const app = express();
import blogRouter from "./routes/blogs";
import cors from "cors";
import middleware from "./utils/middleware";
import logger from "./utils/logger";
import mongoose from "mongoose";
const uri = config.MONGODB_URI ? config.MONGODB_URI : "";

mongoose.set("strictQuery", false);
logger.info("Attemtping to connect to MongoDB");

mongoose
  .connect(uri)
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connecting to MongoDB:", error.message);
    process.exit(1);
  });

app.use(cors());
app.use(express.static("dist"));
app.use(express.json());
app.use(middleware.requestLogger);
app.use("/api/blogs", blogRouter);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

export default app;
