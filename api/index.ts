import express, { Request, Response } from "express";
import cors from "cors";

import { PORT } from "../src/constants/env.const";
import { Data } from "../src/types";
import { wordToSortedLetters } from "../src/services/word.process.service";
import { validateDataInput } from "../src/middleware/data.validator";
import expressAsyncHandler from "express-async-handler";
import { errorHandler } from "../src/middleware/error.handling";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Welocme to the api");
});

app.post("/", validateDataInput);

app.use(errorHandler as unknown as express.ErrorRequestHandler);

app.listen(PORT, () => {
  console.log(`Server running: http://localhost:${PORT}`);
});
