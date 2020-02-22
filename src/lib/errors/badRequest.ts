import BaseError from "./baseError";
import { errors } from "../../config/errors";

class BadRequestError extends BaseError {
  constructor(message: string) {
    super(message);
    // @ts-ignore
    this.info = errors.badRequest;
    // @ts-ignore
    this.statusCode = 400;
  }
}

export default BadRequestError;
