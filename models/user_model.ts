import mongoose from 'mongoose';

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
  pincode: {
    type: String
  },
  phone: {
    type: String
  },
}, { timestamps: true });

const UserAccount = mongoose.models.UserAccount || mongoose.model('UserAccount', UserSchema);

export default UserAccount;
