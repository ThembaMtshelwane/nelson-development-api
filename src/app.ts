import express from "express";
import cors from "cors";
import { validateDataInput } from "../src/middleware/data.validator";
import { wordProcess } from "../src/controller/wordProcess.controller";
import { errorHandler } from "../src/middleware/error.handling";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/", validateDataInput, wordProcess);

app.use(errorHandler);

export default app
