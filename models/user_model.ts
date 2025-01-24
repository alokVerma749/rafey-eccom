import mongoose from 'mongoose';

export interface UserAccount {
  name: string;
  email: string;
  image: string;
  role: string;
  address: string;
  country: string;
  state: string;
  pincode: string;
  phone: string;
}

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  image: {
    type: String,
    default: ''
  },
  role: {
    type: String,
    default: 'user',
    enum: ['user', 'admin']
  },
  address: {
    type: String
  },
  country: {
    type: String
  },
  state: {
    type: String
  },
  pincode: {
    type: String
  },
  phone: {
    type: String
  },
}, { timestamps: true });

const UserAccount = mongoose.models.UserAccount || mongoose.model('UserAccount', UserSchema);

export default UserAccount;
