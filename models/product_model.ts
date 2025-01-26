import mongoose, { Schema } from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  stock: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    enum: ['candles', 'ceramic art', 'resin art'],
    required: true
  },
  subCategory: {
    type: Schema.Types.ObjectId,
    ref: 'SubCategory'
  },
  tags: [{ type: String }],
  variations: [{ type: String }],
  images: {
    thumbnail: {
      type: String,
      required: true
    },
    medium: {
      type: String,
      required: true
    },
    large: {
      type: String,
      required: true
    },
  },
  discount: {
    percentage: { type: Number, default: 0 },
    startDate: { type: Date },
    endDate: { type: Date },
  },
  createdAt: { type: Date, default: Date.now },
});

const Products = mongoose.models.Product || mongoose.model('Product', ProductSchema);
export default Products;
