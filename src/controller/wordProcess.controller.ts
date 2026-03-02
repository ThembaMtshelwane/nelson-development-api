import expressAsyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { Data } from "../types";
import { wordToSortedLetters } from "../services/word.process.service";
import { HTTP_CODES } from "../constants/http.const";
import { HttpError } from "../middleware/error.handling";

export const wordProcess = expressAsyncHandler(
  (req: Request, res: Response) => {
    //This is the data sent by the client in the format {data: "example"}
    const data: Data = req.body;
    
    if (
      !data ||
      !data.data ||
      typeof data.data !== "string" ||
      data.data.trim() === ""
    ) {
      throw new HttpError(
        HTTP_CODES.BAD_REQUEST,
        "Invalid input: 'data' must be a non-empty string.",
      );
    }

    // This will return an array of characters sorted in alphabetical order
    const orderedLetters = wordToSortedLetters(data.data);

    if (orderedLetters.length) {
      res.status(HTTP_CODES.OK).json({
        word: orderedLetters,
      });
    } else {
      throw new HttpError(
        HTTP_CODES.INTERNAL_SERVER_ERROR,
        "An error occurred while processing the word.",
      );
    }
  },
);
