import { Router } from 'express';
import {
  getContactsController,
  getContactByIdController,
  createContactController,
  deleteContactController,
  upsertContactController,
  patchContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  createContactsSchema,
  updateContactsSchema,
} from '../validation/contacts.js';
import { isValidId } from '../middlewares/isValidId.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = Router();

router.use(authenticate);

// GET all contacts
router.get('/', ctrlWrapper(getContactsController)); // contacts

// GET contact by ID
router.get(
  '/:contactId', // /contacts/:contactId
  isValidId,
  ctrlWrapper(getContactByIdController),
);

// POST route - create new contact
router.post(
  '/register', //  /contacts
  validateBody(createContactsSchema),
  ctrlWrapper(createContactController),
);

// DELETE route by ID
router.delete(
  '/:contactId', // /contacts/:contactId
  isValidId,
  ctrlWrapper(deleteContactController),
);

// PUT route by Id
router.put(
  '/:contactId', // /contacts/:contactId
  isValidId,
  validateBody(updateContactsSchema),
  ctrlWrapper(upsertContactController),
);

// Patch by Id
router.patch(
  '/:contactId', // /contacts/:contactId
  isValidId,
  validateBody(updateContactsSchema),
  ctrlWrapper(patchContactController),
);

export default router;
