import express, { Request, Response } from "express";
import cors from "cors";

import { PORT } from "../src/constants/env.const";

import { validateDataInput } from "../src/middleware/data.validator";
import { wordProcess } from "../src/controller/wordProcess.controller";

import { errorHandler } from "../src/middleware/error.handling";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Welocme to the api");
});

app.post("/", validateDataInput, wordProcess);

app.use(errorHandler as unknown as express.ErrorRequestHandler);

app.listen(PORT, () => {
  console.log(`Server running: http://localhost:${PORT}`);
});
