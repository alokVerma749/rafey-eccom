import mongoose, { Schema } from "mongoose";

const SubCategorySchema = new Schema({
  name: {
    type: String,
    required: true,
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

const SubCategory = mongoose.models.SubCategory || mongoose.model('SubCategory', SubCategorySchema);
export default SubCategory;
