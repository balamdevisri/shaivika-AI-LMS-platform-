import { Request, Response, NextFunction } from 'express';
import logger from '../config/logger';
import { ApiError } from '../utils/ApiError';

export const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
  let { statusCode, message } = err;
  
  if (!(err instanceof ApiError)) {
    statusCode = 500;
    message = 'Internal Server Error';
  }

  res.locals.errorMessage = err.message;
  
  logger.error(`${'${statusCode}'} - ${'${message}'} - ${'${req.originalUrl}'} - ${'${req.method}'} - ${'${req.ip}'}`);
  
  res.status(statusCode).json({
    success: false,
    message
  });
};