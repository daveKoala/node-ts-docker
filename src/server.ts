import { Request, Response, NextFunction } from "express";
import express from "express";
import bodyParser from "body-parser";
import { starwarsRouter } from "./services/starwars/starwars.router";

// Constants
const PORT = 8080;
const HOST = "0.0.0.0";
const PORT_REDIS = process.env.PORT || "6379";

// App
const app = express();
// const redis_client = redis.createClient("redis://cache");

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
app.use("/starwars", starwarsRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World......");
});





app.listen(PORT, HOST);
console.log(`Running on: //${ HOST }:${ PORT }`);
