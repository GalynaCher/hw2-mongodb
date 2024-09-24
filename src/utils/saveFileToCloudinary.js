import fs from 'node:fs/promises';
import cloudinary from 'cloudinary';
import { envi } from './env.js';
import { CLOUDINARY } from '../constants/index.js';

cloudinary.v2.config({
  secure: true,
  cloud_name: envi(CLOUDINARY.CLOUD_NAME),
  api_key: envi(CLOUDINARY.API_KEY),
  api_secret: envi(CLOUDINARY.API_SECRET),
});

export const saveFileToCloudinary = async (file) => {
  const response = await cloudinary.v2.uploader.upload(file.path);
  await fs.unlink(file.path); // delete file from local dir using its file.path
  console.log('saveFileToCloudinary >> response: ', response);
  return response.secure_url; // file URL uploaded to Cloudinary
};
