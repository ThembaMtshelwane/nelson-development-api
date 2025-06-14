import expressAsyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { Data } from "../types";
import { wordToSortedLetters } from "../services/word.process.service";

export const wordProcess = expressAsyncHandler(
  (req: Request, res: Response) => {
    const data: Data = req.body;
    const orderedLetters = wordToSortedLetters(data.data);
    if (orderedLetters.length) {
      res.status(200).json({
        word: orderedLetters,
      });
    } else {
      res.status(500).json({
        message: "Error: No ordered letters",
      });
    }
  }
);
