import { Request, NextFunction, Response } from "express";
import logger from "../utils/logger";

const requestLogger = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  logger.info("Method:", request.method);
  logger.info("Path:  ", request.path);
  logger.info("Body:  ", request.body);
  logger.info("---");

  next();
};

const unknownEndpoint = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const error = new Error(`Not Found - ${request.originalUrl}`);
  logger.info(`Request Method: ${request.method}`);
  logger.info(`Request URL: ${request.originalUrl}`);
  logger.info(`Timestamp: ${new Date().toISOString()}`);
  response.status(404);
  next(error);
};

const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error(
    "error handler: ",
    req.method,
    req.url,
    error,
    `>${error.name}<`,
    error.message
  );

  switch (error.name) {
    case "ValidationError":
      return res.status(400).json({ message: error.message });
    case "CastError":
      return res.status(400).json({ message: "malformed id" });
    case "TypeError":
      return res.status(400).json({ message: "malformed request" });
    case "JsonWebTokenError":
      return res.status(401).json({ message: "invalid token" });
    case "MongoServerError":
      return res.status(400).json({ message: "duplicate key error" });
    case "JsonWebTokenError":
      return res.status(401).json({ message: "invalid token" });
    case "TokenExpiredError":
      return res.status(401).json({ message: "token expired" });
  }

  next(error);
};

export default { requestLogger, unknownEndpoint, errorHandler };
