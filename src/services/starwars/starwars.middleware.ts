import { Request, Response, NextFunction } from "express";
import redis from "redis";
const redis_client = redis.createClient("redis://cache");

export const checkCache = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  redis_client.get(id, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }
    //if no match found
    if (data != null) {
      res.send({ source: "cache", data: JSON.parse(data) });
    } else {
      next();
    }
  });
};
