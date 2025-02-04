import mongoose, { Schema } from "mongoose";

const TagSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ["candles", "ceramic art", "resin art"],
    index: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Tag  =  mongoose.models.Tag || mongoose.model('Tag', TagSchema);
export default Tag;
