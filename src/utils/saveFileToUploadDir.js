import path from 'node:path';
import fs from 'node:fs/promises';
import { TEMP_UPLOAD_DIR, UPLOAD_DIR } from '../constants/index.js';
import { envi } from './env.js';

export const saveFileToUploadDir = async (file) => {
  // Move file from temp upload dir to upload dir
  await fs.rename(
    path.join(TEMP_UPLOAD_DIR, file.filename), // "from" path
    path.join(UPLOAD_DIR, file.filename), // "to" path
  );

  return `${envi('APP_DOMAIN')}/uploads/${file.filename}`; // URL-address to access file
};
