import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  category: { type: String, enum: ['candles', 'ceramic art', 'resin art'], required: true },
  tags: [{ type: String }], // For ceramic art and resin art
  variations: [{ type: String }], // For candles (fragrances)
  images: {
    thumbnail: { type: String, required: true }, // Small-sized image (e.g., 150x150)
    medium: { type: String, required: true }, // Medium-sized image (e.g., 300x300)
    large: { type: String, required: true }, // High-resolution image (e.g., 1024x1024)
  },
  discount: {
    percentage: { type: Number, default: 0 }, // Discount percentage (e.g., 20 for 20%)
    startDate: { type: Date }, // Optional: Discount start date
    endDate: { type: Date }, // Optional: Discount end date
  },
  createdAt: { type: Date, default: Date.now },
});

const Products = mongoose.models.Product || mongoose.model('Product', ProductSchema);
export default Products;
