import "express-async-errors";
import config from "./utils/config";
import express from "express";
import blogRouter from "./routes/blogs";
import userRouter from "./routes/users";
import loginRouter from "./routes/login";
import cors from "cors";
import middleware from "./utils/middleware";
import logger from "./utils/logger";
import mongoose from "mongoose";
const uri = config.MONGODB_URI ? config.MONGODB_URI : "";

const app = express();

app.get("/health", (_req, res) => {
  res.send("ok");
});

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

// routes
app.use("/api/login", loginRouter);
app.use("/api/blogs", blogRouter);
app.use("/api/users", userRouter);

// middleware
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

export default app;
