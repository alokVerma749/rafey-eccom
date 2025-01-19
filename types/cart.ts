// types/cart.ts
export interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  stock: number;
  images: {
    thumbnail: string;
    large: string;
    medium: string;
  };
  discount?: {
    percentage: number;
  };
  _id: string;
}

export interface CartItemStore {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  stock: number;
  images: {
    thumbnail: string;
    large: string;
    medium: string;
  };
  discount?: {
    percentage: number;
  };
  _id: string;// unnecessary caused sue to merge product data with quantity
  total: number;
}

export interface CartState {
  items: CartItemStore[];
  totalQuantity: number;
  totalPrice: number;
}

export type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: { productId: string } }
  | { type: 'UPDATE_ITEM_QUANTITY'; payload: { productId: string; quantity: number } }
  | { type: 'SET_CART'; payload: { items: CartItem[]; totalQuantity: number; totalPrice: number } }
  | { type: 'CLEAR_CART' };
