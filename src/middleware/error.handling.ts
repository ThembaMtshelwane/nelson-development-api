import { ZodError } from "zod";
import { NextFunction, Request, Response } from "express";
import { NODE_ENV } from "../constants/env.const";

const handleZodError = (err: ZodError) => {
  const errors = err.issues.map((issue) => ({
    path: issue.path.join("."),
    message: issue.message,
  }));

  // Standarzing the ZodError to a more user friendly object
  return {
    statusCode: 400,
    body: {
      success: false,
      errors,
      message: "Validation Error",
    },
  };
};

const errorHandler = (
  err: any | Error | ZodError,
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  if (err instanceof ZodError) {
    const { statusCode, body } = handleZodError(err);
    res.status(statusCode).json(body);
    return;
  }

  // Catch all for other errors if not specified
  res.status(500).json({
    success: false,
    message: "Server error",
    stack: NODE_ENV === "development" ? err.stack : null,
  });

  next();
};

export { errorHandler };
