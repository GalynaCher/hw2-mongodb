import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import { envi } from './utils/env.js';
import { getAllContacts, getContactById } from './services/contacts.js';

const PORT = Number(envi('PORT', '3000')); // const PORT = Number(process.env.PORT);

const setupServer = () => {
  const app = express();

  // Middleware for logging
  app.use(pino({ transport: { target: 'pino-pretty' } }));

  // Middleware for CORS
  app.use(cors());

  // GET to check server is running
  app.get('/', (req, res) => {
    res.json({ message: 'Hello...' });
  });

  // GET all contacts
  app.get('/contacts', async (req, res) => {
    const contacts = await getAllContacts();
    res.status(200).json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  });

  // GET contact by ID
  app.get('/contacts/:contactId', async (req, res, next) => {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);

    if (!contact) {
      res.status(404).json({
        message: 'Contact not found!',
      });
      return;
    }
    res.status(200).json({
      status: 200,
      message: 'Successfully found contact with id {contactId}!',
      data: contact,
    });
  });

  // Middleware for logging request time
  app.use((req, res, next) => {
    console.log(`Time: ${new Date().toLocaleString()}`);
    next();
  });

  // Middleware for error handling for 404 status (catch-all for routes that don't exist)
  app.use((req, res, next) => {
    res.status(404).json({
      message: '404: Route Not Found.',
      error: 'The requested route does not exist.',
    });
  });

  // Middleware for error handling for 500 status
  app.use((err, req, res, next) => {
    res.status(500).json({
      message: '500: Server error, please try again later.',
      error: err.message,
    });
    next();
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
};

export default setupServer;
