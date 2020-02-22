import NotFoundError from "../lib/errors/notFoundError";
import { Request, Response, NextFunction } from "express";
import { logger } from "../lib/logger";

export default (req: Request, res: Response, next: NextFunction) => {
  logger.debug('%s %d %s', req.method, res.statusCode, req.url);
  // @ts-ignore
  return next(new NotFoundError());
};