import express, { Request, Response, NextFunction, response } from "express";
import { test } from "../../elasticSearch";
export const loggerRouter = express.Router();

loggerRouter.get("/test", async (req: Request, resp: Response, next: NextFunction) => {
  test().catch(console.log)
  resp.status(200).json({ hello: "world" });
})