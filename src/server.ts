import { Request, Response } from "express";
import express from "express";
// Constants
const PORT = 8080;
const HOST = "0.0.0.0";

// App
const app = express();
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World......");
});

app.listen(PORT, HOST);
console.log(`Running on: //${ HOST }:${ PORT }`);
