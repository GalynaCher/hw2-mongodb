import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

export function envi(name, defaultValue) {
  // Use process.env to access the PORT variable
  const value = process.env[name];

  if (value) return value;
  if (defaultValue) return defaultValue;

  throw new Error(`Missing: process.env['${name}'].`);
}
