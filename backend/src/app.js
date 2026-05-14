import express from 'express';
import helmet from 'helmet';
import xss from 'xss-clean';
import mongoSanitize from 'express-mongo-sanitize';
import compression from 'compression';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { StatusCodes } from 'http-status-codes';

import env from './config/env.js';
import logger from './config/logger.js';
import { errorConverter, errorHandler } from './middleware/errorMiddleware.js';
import morgan from './config/morgan.js';
import observability from './middlewares/observability.js';
import ApiError from './utils/ApiError.js';
import routes from './routes/v1/index.js';

const app = express();

// Set security HTTP headers
app.use(helmet());

// Morgan logger for requests
if (env.NODE_ENV !== 'test') {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

// Observability Layer
app.use(observability);

// Parse json request body
app.use(express.json());

// Parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// Parse cookies
app.use(cookieParser());

// Sanitize request data
app.use(xss());
app.use(mongoSanitize());

// Gzip compression
app.use(compression());

// Enable CORS
app.use(cors({
  origin: env.CORS_ORIGIN,
  credentials: true,
}));

// Health check
app.get('/health', (req, res) => {
  res.status(StatusCodes.OK).send({ status: 'UP', timestamp: new Date().toISOString() });
});

// Legacy & Compatibility Routes
import { getAvailability, createBooking } from './controllers/booking.controller.js';
app.get('/api/availability', getAvailability);
app.post('/api/book', createBooking);

// API v1 routes
app.use('/api/v1', routes);

// Send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(StatusCodes.NOT_FOUND, 'Not found'));
});

// Convert error to ApiError, if needed
app.use(errorConverter);

// Handle error
app.use(errorHandler);

export default app;
