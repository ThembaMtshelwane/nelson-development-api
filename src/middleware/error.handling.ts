import { ZodError } from "zod";
import { NextFunction, Request, Response } from "express";
import { ENV_VARS } from "../constants/env.const";
import { ERROR_MESSAGES, HTTP_CODES } from "../constants/http.const";

export class HttpError extends Error {
  statusCode: number;
  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}

const handleZodError = (err: ZodError) => {
  const errors = err.issues.map((issue) => ({
    path: issue.path.join("."),
    message: issue.message,
  }));

  // Standarzing the ZodError to a more user friendly object
  return {
    statusCode: HTTP_CODES.BAD_REQUEST,
    body: {
      success: false,
      errors,
      message: ERROR_MESSAGES.VALIDATION_ERROR,
    },
  };
};

const errorHandler = (
  err: any | Error | ZodError,
  req: Request,
  res: Response,
  next: NextFunction,
): Response | void => {
  if (err instanceof ZodError) {
    const { statusCode, body } = handleZodError(err);
    res.status(statusCode).json(body);
    return;
  }

  // Catch all for other errors if not specified
  res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
    stack: ENV_VARS.NODE_ENV === "development" ? err.stack : null,
  });

  next();
};

export { errorHandler };
