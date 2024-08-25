import mongoose from 'mongoose';
import { envi } from '../utils/env.js';

export const initMongoConnection = async () => {
  try {
    const user = envi('MONGODB_USER');
    const pwd = envi('MONGODB_PASSWORD');
    const url = envi('MONGODB_URL');
    const db = envi('MONGODB_DB');

    await mongoose.connect(
      `mongodb+srv://${user}:${pwd}@${url}/${db}?retryWrites=true&w=majority`,
    );

    console.log('Connection to MongoDB successfully established');
  } catch (error) {
    console.log('Error while setting up mongo connection', error);
    throw error;
  }
};
