import express, { Request, Response, NextFunction } from "express";
import { checkCache, checkCachePerson } from "./starwars.middleware";
import { findStarship, findPerson } from "./starwars.service";
import errors from "../../lib/errors";

export const starwarsRouter = express.Router();

// https://itnext.io/learn-to-cache-your-nodejs-application-with-redis-in-6-minutes-745a574a9739
// https://codewithhugo.com/setting-up-express-and-redis-with-docker-compose/

starwarsRouter.get("/starship/:id", checkCache, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await findStarship(req.params.id);
    return res.json({ source: "fetch", data });
  }
  catch (error) {
    return next(new errors.BadRequestError(error.message));
  }
});

starwarsRouter.get("/people/:id", checkCachePerson, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await findPerson(req.params.id);
    return res.json({ source: "fetch", data });
  }
  catch (error) {
    return next(new errors.BadRequestError(error.message));
  }
});
