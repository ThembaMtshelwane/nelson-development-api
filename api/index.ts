import express, { Request, Response } from "express";
import cors from "cors";

import { PORT } from "../src/constants/env.const";
import { Data } from "../src/types";
import { wordToSortedLetters } from "../src/services/word.process.service";
import { validateDataInput } from "../src/middleware/data.validator";
import expressAsyncHandler from "express-async-handler";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Welocme to the api");
});

app.post(
  "/",
  validateDataInput,
  expressAsyncHandler((req: Request, res: Response) => {
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
  })
);

app.listen(PORT, () => {
  console.log(`Server running: http://localhost:${PORT}`);
});
