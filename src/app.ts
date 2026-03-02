import express, { Response } from "express";
import cors from "cors";
import { validateDataInput } from "../src/middleware/data.validator";
import { wordProcess } from "../src/controller/wordProcess.controller";
import { errorHandler } from "../src/middleware/error.handling";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_, res: Response) => {
  res.send(
    "Welcome to the Word Processing API! Send a POST request to / with a JSON body like {data: 'yourword'} to get the sorted letters.",
  );
});

app.post("/", validateDataInput, wordProcess);

app.use(errorHandler);

export default app;
