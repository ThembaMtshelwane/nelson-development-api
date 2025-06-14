import { ZodError } from "zod";
import { Request, Response } from "express";
import { NextFunction } from "connect";
import { NODE_ENV } from "../constants/env.const";

const handleZodError = (err: ZodError) => {
  const errors = err.issues.map((issue) => ({
    path: issue.path.join("."),
    message: issue.message,
  }));

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
  res: Response
): Response | void => {
  if (err instanceof ZodError) {
    const { statusCode, body } = handleZodError(err);
    return res.status(statusCode).json(body);
  }

  return res.status(500).json({
    success: false,
    message: "Server error",
    stack: NODE_ENV === "development" ? err.stack : null,
  });
};

export { errorHandler };
