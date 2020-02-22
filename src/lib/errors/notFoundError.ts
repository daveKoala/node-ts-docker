import BaseError from "./baseError";
import { errors } from "../../config/errors";

class NotFoundError extends BaseError {
  constructor(message: string) {
    super(message);
    // @ts-ignore
    this.info = errors.notFound;
    // @ts-ignore
    this.statusCode = 404;
  }
}

export default NotFoundError;
