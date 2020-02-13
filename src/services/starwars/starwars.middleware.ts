import { Request, Response, NextFunction } from "express";
import { cache } from "../../lib/redis";
import e = require('express');

export const checkCache = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  if (cache.isLive) {

    cache.fetch(`starship:${ id }`, (err, data) => {
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
  } else {
    next();
  }
};

export const checkCachePerson = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  if (cache.isLive) {
    cache.fetch(`person:${ id }`, (err, data) => {
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
  } else {
    next();
  }
};
