import mongoose, { model } from 'mongoose';

const SubCategorySchema = new mongoose.Schema({
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


const SubCategory = mongoose.models.SubCategory || model('SubCategory', SubCategorySchema);
export default SubCategory;