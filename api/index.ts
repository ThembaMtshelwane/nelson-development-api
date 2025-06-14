import express, { Request, Response } from "express";
import cors from "cors";

import { PORT } from "../src/constants/env.const";
import { Data } from "../src/types";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Welocme to the api");
});

app.post("/", (req: Request, res: Response) => {
  const data: Data = req.body;
  const word: string = data.data;
  const letterArray: string[] = word.split("");
  const orderedLetters: string[] = letterArray.sort();

  if (orderedLetters.length) {
    res.status(200).json({
      word: orderedLetters,
    });
  } else {
    res.status(500).json({
      message: "Error: No ordered letters",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running: http://localhost:${PORT}`);
});
