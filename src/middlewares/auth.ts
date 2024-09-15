import { NextFunction, Request, Response } from 'express';

export default function authHandler(req: Request, res: Response, next: NextFunction) {
  req.user = {
    // Authorization and registration will be implemented in scope of next task
    _id: '66e59c619c4aa72e1a17c508',
  };

  next();
}
