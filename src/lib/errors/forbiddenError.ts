import BaseError from "./baseError";
import { errors } from "../../config/errors";

class ForbiddenError extends BaseError {
  constructor(message: string) {
    super(message);
    // @ts-ignore
    this.info = errors.forbidden;
    // @ts-ignore
    this.statusCode = 400;
  }
}


export default ForbiddenError;