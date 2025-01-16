import mongoose, { Schema, Document } from 'mongoose';

export interface CartItem {
  productId: mongoose.Types.ObjectId;
  name: string;
  quantity: number;
}

export interface Cart extends Document {
  email: string;
  items: CartItem[];
}

const cartItemSchema = new Schema<CartItem>({
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    required: true
  }
});

const cartSchema = new Schema<Cart>({
  email: {
    type: String,
    required: true,
    unique: true
  },
  items: {
    type: [cartItemSchema],
    default: []
  },
});

const CartModel = mongoose.models.Cart || mongoose.model<Cart>('Cart', cartSchema);

export default CartModel;
