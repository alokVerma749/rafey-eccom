import mongoose, { Schema, Document } from "mongoose";

export interface IContact extends Document {
  name: string;
  email: string;
  message: string;
}

const ContactSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    match: [/\S+@\S+\.\S+/, 'is invalid'],
  },
  message: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const Contact = mongoose.models.Contact || mongoose.model<IContact>("Contact", ContactSchema);

export default Contact;
