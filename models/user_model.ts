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
  password: {
    type: String
  }, // Optional if using next-auth's provider-based authentication
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

const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;
