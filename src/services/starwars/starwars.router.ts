
import express, { Request, Response, NextFunction } from "express";
import { checkCache } from "./starwars.middleware";
import { findStarship } from "./starwars.service";

export const starwarsRouter = express.Router();

// https://itnext.io/learn-to-cache-your-nodejs-application-with-redis-in-6-minutes-745a574a9739

// https://codewithhugo.com/setting-up-express-and-redis-with-docker-compose/

starwarsRouter.get("/starships/:id", checkCache, async (req, res) => {
  try {
    const data = await findStarship(req.params.id);
    return res.json({ source: "fetch", data });
  }
  catch (error) {
    return res.status(500).json(error);
  }
});
