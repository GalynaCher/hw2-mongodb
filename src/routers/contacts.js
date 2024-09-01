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

const router = Router();

// GET all contacts
router.get('/contacts', ctrlWrapper(getContactsController));

// GET contact by ID
router.get('/contacts/:contactId', ctrlWrapper(getContactByIdController));

// POST route - create new contact
router.post('/contacts', ctrlWrapper(createContactController));

// DELETE route by ID
router.delete('/contacts/:contactId', ctrlWrapper(deleteContactController));

// PUT route by Id
router.put('/contacts/:contactId', ctrlWrapper(upsertContactController));

// Patch by Id
router.patch('/contacts/:contactId', ctrlWrapper(patchContactController));

export default router;
