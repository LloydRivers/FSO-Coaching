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

const unknownEndpoint = (request: Request, response: Response) => {
  logger.error("Unknown endpoint:", request.path);
  response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error: Error, request: Request, response: Response) => {
  logger.error(error.message);

  if (error.name === "CastError") {
    logger.error("CastError:", error.message);
    response.status(400).send({ error: "malformatted id" });
  } else {
    logger.error("Error:", error.message);
    response.status(500).end();
  }
};

export default { requestLogger, unknownEndpoint, errorHandler };
