import { Request, Response, NextFunction, } from "express";
import errors from "../lib/errors";

export default (err: any, req: Request, res: Response, next: NextFunction) => {

  if (err instanceof errors.BaseError) {
    if (err.message) {
      // @ts-ignore
      err.info.message = err.message;
    }
    // @ts-ignore
    res.status(err.statusCode).json(err.info);
  } else {
    // @ts-ignore
    const internalServerError = new errors.InternalServerError();
    if (err.message) {
      internalServerError.info.message = err.message;
    }

    res.status(internalServerError.statusCode).json({ data: internalServerError.info });
  }
};