import { Request, Response } from "express";
import express from "express";
import bodyParser from "body-parser";
import { cache } from "./lib/redis";
import mongoose from "mongoose";

import { starwarsRouter } from "./services/starwars/starwars.router";

const PORT = 8080;
const HOST = "0.0.0.0";
const MONGO_CONNECTION_STRING = "mongodb://mongodb/data";
const REDIS_CONNECTION_STRING = "redis://cache";
const app = express();

cache.init(REDIS_CONNECTION_STRING);

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
app.use("/starwars", starwarsRouter);

// Test
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World.");
});
console.group();
console.log(`PORT: ${ PORT }`);
console.log(`HOST: ${ HOST }`);
console.log(`NODE_ENV: ${ process.env.NODE_ENV }`);
console.groupEnd();

mongoose.connect(MONGO_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.group()
    console.log("MongoDB connected");
    console.log(`On: ${ MONGO_CONNECTION_STRING }`);
    console.groupEnd();
  })
  .catch(error => console.log(error));

mongoose.connection.on('error', err => {
  console.log(err);
});

app.listen(PORT, HOST, (error) => {
  if (error) {
    console.group();
    console.log("Error starting app");
    console.log(error);
    console.groupEnd();
  } else {
    console.group();
    console.log(`Running on: //${ HOST }:${ PORT }`);
    console.groupEnd();
  }
});

