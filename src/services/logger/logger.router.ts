import express, { Request, Response, NextFunction } from "express";
import { client } from "../../elasticSearch";
export const loggerRouter = express.Router();

loggerRouter.get("/test", async (req: Request, resp: Response, next: NextFunction) => {
  const { body } = await client.search({
    index: "game-of-thrones",
    body: {
      query: {
        match: {
          quote: "dave"
        }
      }
    }
  });

  resp.status(200).json(body);
})