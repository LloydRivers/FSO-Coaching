import { Request, NextFunction, Response } from "express";

const requestLogger = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next();
};

const unknownEndpoint = (request: Request, response: Response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error: Error, request: Request, response: Response) => {
  console.error(error.message);

  if (error.name === "CastError") {
    response.status(400).send({ error: "malformatted id" });
  } else {
    response.status(500).end();
  }
};

export default { requestLogger, unknownEndpoint, errorHandler };
