import { StatusCodes } from 'http-status-codes';
import env from '../config/env.js';
import logger from '../config/logger.js';
import ApiError from '../utils/ApiError.js';

export const errorConverter = (err, req, res, next) => {
  let error = err;
  if (!(error instanceof ApiError)) {
    let statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
    let message = error.message || StatusCodes[statusCode];

    // Handle Mongoose Validation Error
    if (error.name === 'ValidationError') {
      statusCode = StatusCodes.BAD_REQUEST;
      message = Object.values(error.errors).map(val => val.message).join(', ');
    }
    // Handle Mongoose Cast Error
    else if (error.name === 'CastError') {
      statusCode = StatusCodes.BAD_REQUEST;
      message = `Invalid ${error.path}: ${error.value}`;
    }
    // Handle Mongoose Duplicate Key Error
    else if (error.code === 11000) {
      statusCode = StatusCodes.CONFLICT;
      message = `Duplicate field value entered: ${Object.keys(error.keyValue)}`;
    }

    error = new ApiError(statusCode, message, false, err.stack);
  }
  next(error);
};

export const errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;
  if (env.NODE_ENV === 'production' && !err.isOperational) {
    statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    message = StatusCodes[StatusCodes.INTERNAL_SERVER_ERROR];
  }

  res.locals.errorMessage = err.message;

  const response = {
    success: false,
    code: statusCode,
    message,
    ...(env.NODE_ENV === 'development' && { stack: err.stack }),
  };

  if (env.NODE_ENV === 'production') {
    if (!err.isOperational) {
      logger.error(`CRITICAL_SYSTEM_ERROR: ${err.message}`, { stack: err.stack, path: req.path });
      // Here you would call Sentry.captureException(err);
    } else {
      logger.warn(`API_WARNING: ${err.message} [${statusCode}]`);
    }
  } else {
    console.error('SYSTEM_ERROR_LOG:', err); // ADDED THIS
    logger.error(err);
  }

  res.status(statusCode).send(response);
};
