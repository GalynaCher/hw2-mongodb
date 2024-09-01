import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import { envi } from './utils/env.js';
import contactsRouter from './routers/contacts.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';

const PORT = Number(envi('PORT', '3000')); // const PORT = Number(process.env.PORT);

const setupServer = () => {
  const app = express();

  // Middleware for logging
  app.use(pino({ transport: { target: 'pino-pretty' } }));

  // Вбудований у express middleware для обробки (парсингу)
  // JSON - даних у запитах наприклад, у запитах POST або PATCH
  app.use(express.json());
  // Middleware for CORS
  app.use(cors());

  // GET to check server is running
  app.get('/', (req, res) => {
    res.json({ message: 'Hello...' });
  });

  // Router middleware
  app.use(contactsRouter);

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
