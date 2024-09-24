import nodemailer from 'nodemailer';
import { SMTP } from '../constants/index.js';
import { envi } from './env.js';

const transporter = nodemailer.createTransport({
  host: envi(SMTP.SMTP_HOST),
  port: Number(envi(SMTP.SMTP_PORT)),
  auth: {
    user: envi(SMTP.SMTP_USER),
    pass: envi(SMTP.SMTP_PASSWORD),
  },
});

export const sendEmail = async (options) => {
  return await transporter.sendMail(options);
};
