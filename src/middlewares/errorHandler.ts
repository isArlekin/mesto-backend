import { NextFunction, Request, Response } from 'express';
import BackendError from '../errors/BackendError';
import GeneralError from '../errors/GeneralError';

export default function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  let error: BackendError;

  if (err instanceof BackendError) {
    error = err;
  } else {
    error = new GeneralError();
  }

  const { statusCode } = error;
  return res.status(statusCode).send(error.format());
}
