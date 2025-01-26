import mongoose, { model } from "mongoose";

const TagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  category: {
    type: String,
    enum: ['candles', 'ceramic art', 'resin art'],
    required: true
  },
}, { timestamps: true });

const Tag = mongoose.models.Tag || model('Tag', TagSchema);
export default Tag;
