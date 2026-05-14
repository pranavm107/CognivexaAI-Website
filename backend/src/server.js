import { createServer } from 'http';
import app from './app.js';
import connectDB from './config/db.js';
import logger from './config/logger.js';
import env from './config/env.js';
import { initSocket } from './services/socket.service.js';
// import './workers/index.js'; // Disabled for dev stability (Redis dependency)

let server;

const startServer = async () => {
  // Connect to Database
  await connectDB();

  const httpServer = createServer(app);
  
  // Initialize Socket.io
  initSocket(httpServer);

  server = httpServer.listen(env.PORT, () => {
    logger.info(`Server listening on port ${env.PORT} in ${env.NODE_ENV} mode`);
  });
};

startServer();

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});
