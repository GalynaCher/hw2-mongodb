import createHttpError from 'http-errors';
import {
  getAllContacts,
  getContactById,
  createContact,
  deleteContact,
  updateContact,
} from '../services/contacts.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { envi } from '../utils/env.js';

/////////////////////////////// getContactsController ///////////////////////////////
export const getContactsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortOrder, sortBy } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);
  // console.log('getContactsController >> req.user', req.user);
  filter.userId = req.user._id; // Add userId to filter

  const contacts = await getAllContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
  });

  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

/////////////////////////////// getContactsController ///////////////////////////////
export const getContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;
  const { _id: userId } = req.user;
  // console.log('getContactByIdController >> req.params', req.params);
  // console.log('getContactByIdController >> req.user', req.user);

  const contact = await getContactById(contactId, userId);

  if (!contact) {
    throw createHttpError(404, 'Contact not found!');
  }
  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};

/////////////////////////////// createContactController ///////////////////////////////
export const createContactController = async (req, res) => {
  const userId = req.user._id;
  const userBody = { ...req.body, userId };
  // console.log('createContactController >> { ...req.body, userId }', userBody);
  const photo = req.file;

  let photoUrl;

  if (photo) {
    if (envi('ENABLE_CLOUDINARY') === 'true') {
      photoUrl = await saveFileToCloudinary(photo);
    } else {
      photoUrl = await saveFileToUploadDir(photo);
    }
  }
  console.log('createContactController >> photoUrl: ', photoUrl);

  const contact = await createContact({ ...userBody, photo: photoUrl });

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: contact,
  });
};

/////////////////////////////// deleteContactController ///////////////////////////////
export const deleteContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const { _id: userId } = req.user;

  const contact = await deleteContact(contactId, userId);

  if (!contact) {
    next(createHttpError(404, `Contact ${contactId} not found.`));
    return;
  }

  res.status(204).send();
};

/////////////////////////////// upsertContactController ///////////////////////////////
export const upsertContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const { _id: userId } = req.user;

  const result = await updateContact(contactId, userId, req.body, {
    upsert: true,
  });

  if (!result) {
    next(createHttpError(404, 'Contact not found.'));
    return;
  }

  const status = result.isNew ? 201 : 200;

  res.status(status).json({
    status: status,
    message: 'Successfully upserted a contact.',
    data: result.contact,
  });
};

/////////////////////////////// patchContactController ///////////////////////////////
export const patchContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const { _id: userId } = req.user;
  const photo = req.file;

  let photoUrl;

  if (photo) {
    if (envi('ENABLE_CLOUDINARY') === 'true') {
      photoUrl = await saveFileToCloudinary(photo);
    } else {
      photoUrl = await saveFileToUploadDir(photo);
    }
  }

  const result = await updateContact(contactId, userId, {
    ...req.body,
    photo: photoUrl,
  });

  if (!result) {
    next(createHttpError(404, 'Contact not found.'));
    return;
  }

  res.status(200).json({
    status: 200,
    message: `Successfully patched a contact.`,
    data: result.contact,
  });
};
