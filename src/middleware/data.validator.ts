import expressAsyncHandler from "express-async-handler";
import { NextFunction, Response, Request } from "express";
import { dataSchema } from "../schema/word.schema";

export const validateDataInput = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // This ensure the data sent by the clinet is of the structure {data: "example"}
    const result = dataSchema.safeParse(req.body);

    // Returns a Zod error whrn the validation fails
    if (!result.success) {
      return next(result.error);
    }

    req.body = result.data;
    next();
  }
);
