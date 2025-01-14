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
  totalQuantity: number;
  totalPrice: number;
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
  totalQuantity: { type: Number, required: true, default: 0 },
  totalPrice: { type: Number, required: true, default: 0 },
});

cartSchema.pre('save', function (next) {
  const cart = this as Cart;

  cart.totalQuantity = cart.items.reduce((sum, item) => sum + item.quantity, 0);
  cart.totalPrice = cart.items.reduce((sum, item) => sum + item.total, 0);

  next();
});

const CartModel = mongoose.models.Cart || mongoose.model<Cart>('Cart', cartSchema);

export default CartModel;
