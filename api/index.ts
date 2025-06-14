import express, { Request, Response } from "express";
import { PORT } from "../src/constants/env.const";

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Welocme to the api");
});
app.listen(PORT, () => {
  console.log(`Server running: http://localhost:${PORT}`);
});
