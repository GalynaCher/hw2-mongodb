import { model, Schema } from 'mongoose';

const contactsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: false,
    },
    isFavourite: {
      type: Boolean,
      default: false,
    },
    contactType: {
      type: String,
      required: true,
      enum: ['work', 'home', 'personal'],
      default: 'personal',
    },
    userId: {
      type: String,
      required: true,
    },
  },
  {
    // Adding fields createdAt and updatedAt
    timestamps: true,
    // Disable the creation of a document version field
    versionKey: false,
  },
);

export const ContactsCollection = model('contacts', contactsSchema);
