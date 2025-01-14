import mongoose, { Schema, Document } from 'mongoose';

export interface CartItem {
  productId: string;
  name: string;
  imageUrl: string;
  price: number;
  quantity: number;
  total: number;
}

export interface Cart extends Document {
  userId: string;
  items: CartItem[];
}

const cartItemSchema = new Schema<CartItem>({
  productId: { type: String, required: true },
  imageUrl: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  total: { type: Number, required: true },
});

const cartSchema = new Schema<Cart>({
  userId: { type: String, required: true, unique: true },
  items: { type: [cartItemSchema], default: [] },
});

const CartModel = mongoose.models.Cart || mongoose.model<Cart>('Cart', cartSchema);

export default CartModel;
