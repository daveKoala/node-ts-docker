import express, { Request, Response } from "express";
import { checkCache, checkCachePerson } from "./starwars.middleware";
import { findStarship, findPerson } from "./starwars.service";

export const starwarsRouter = express.Router();

// https://itnext.io/learn-to-cache-your-nodejs-application-with-redis-in-6-minutes-745a574a9739
// https://codewithhugo.com/setting-up-express-and-redis-with-docker-compose/

starwarsRouter.get("/starship/:id", checkCache, async (req: Request, res: Response) => {
  try {
    const data = await findStarship(req.params.id);
    return res.json({ source: "fetch", data });
  }
  catch (error) {
    return res.status(500).json(error);
  }
});

starwarsRouter.get("/people/:id", checkCachePerson, async (req: Request, res: Response) => {
  try {
    const data = await findPerson(req.params.id);
    return res.json({ source: "fetch", data });
  }
  catch (error) {
    return res.status(500).json(error);
  }
});