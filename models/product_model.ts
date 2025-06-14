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
  height: {
    type: String,
    required: true
  },
  width: {
    type: String,
    required: true
  },
  weight: {
    type: String,
    required: true
  },
  fragrance: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  stock: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    enum: ['candles', 'ceramic art', 'resin art'],
    required: true,
    index: true
  },
  subCategories: [
    {
      type: Schema.Types.ObjectId,
      ref: "SubCategory",
      index: true,
    },
  ],
  tags: [
    {
      type: Schema.Types.ObjectId,
      ref: "Tag",
      index: true,
    },
  ],
  images: {
    type: [String],
    required: true
  },
  discount: {
    percentage: { type: Number, default: 0 },
    startDate: {
      type: Date,
      default: Date.now
    },
    endDate: {
      type: Date
    },
  },
  onSale: {
    type: Boolean,
    default: false,
  },
  isCustomizable: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
});

const Products = mongoose.models.Product || mongoose.model('Product', ProductSchema);
export default Products;
