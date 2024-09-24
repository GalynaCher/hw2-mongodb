import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import cookieParser from 'cookie-parser';
import { envi } from './utils/env.js';
// import contactsRouter from './routers/contacts.js';
import router from './routers/index.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { UPLOAD_DIR } from './constants/index.js';

const PORT = Number(envi('PORT', '3000')); // const PORT = Number(process.env.PORT);

const setupServer = () => {
  const app = express();

  // Middleware for logging
  app.use(pino({ transport: { target: 'pino-pretty' } }));

  // Built-in express middleware for handling (parsing)
  // JSON data in requests, for example, in POST or PATCH requests
  app.use(express.json());

  // Middleware for CORS
  app.use(cors());
  app.use(cookieParser());

  // GET to check server is running
  app.get('/', (req, res) => {
    res.json({ message: 'Hello...' });
  });

  // Router middleware
  // app.use(contactsRouter);
  app.use(router);

  // upload
  app.use('/uploads', express.static(UPLOAD_DIR));

  // Middleware for logging request time
  app.use((req, res, next) => {
    console.log(`Time: ${new Date().toLocaleString()}`);
    next();
  });

  // Middleware for error handling for 404 status (catch-all for routes that don't exist)
  app.use(notFoundHandler);

  // Middleware for error handling for 500 status
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
};

export default setupServer;
