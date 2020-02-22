import { Request, Response, NextFunction } from "express";
import { logger } from "../lib/logger";

export default (req: Request, res: Response, next: NextFunction) => {
  var message = 'Request: ' + req.method + ' ' + req.url;
  logger.info(message);
  next();
};