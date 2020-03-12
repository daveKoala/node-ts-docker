import { Request, Response } from "express";
import express from "express";
import bodyParser from "body-parser";
import { cache } from "./lib/redis";

import { starwarsRouter } from "./services/starwars/starwars.router";

import { ApolloServer } from "apollo-server-express";
import { ApolloGateway } from "@apollo/gateway";

const PORT = 8080;
const HOST = "0.0.0.0";
const app = express();

cache.init("redis://cache")

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
app.use("/starwars", starwarsRouter);

// Test
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World.");
});

try {
  const gateway = new ApolloGateway({
    serviceList: [
      { name: 'users', url: 'http://localhost:61105/graphql' },
      // more services
    ],
  });

  const graphQLServer = new ApolloServer({
    gateway,

    // Disable subscriptions (not currently supported with ApolloGateway)
    subscriptions: false,
  });

  const options = { app, path: "/graphql" };
  graphQLServer.applyMiddleware(options);
} catch (err) {
  console.error(err.message);
}
app.listen(PORT, HOST);
console.log(`Running on: //${HOST}:${PORT}`);
