'use client';

import { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { CartState, CartAction } from '@/types/cart';
import debounce from 'lodash.debounce';

const initialState: CartState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
};

const CartContext = createContext<{ state: CartState; dispatch: React.Dispatch<CartAction> } | undefined>(undefined);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM':
      const existingItemIndex = state.items.findIndex(item => item.productId === action.payload.productId);
      if (existingItemIndex !== -1) {
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex].quantity += action.payload.quantity;
        updatedItems[existingItemIndex].total = updatedItems[existingItemIndex].price * updatedItems[existingItemIndex].quantity;
        return {
          ...state,
          items: updatedItems,
          totalQuantity: state.totalQuantity + action.payload.quantity,
          totalPrice: updatedItems.reduce((total, item) => total + item.total, 0),
        };
      } else {
        const newItem = action.payload;
        return {
          ...state,
          items: [...state.items, newItem],
          totalQuantity: state.totalQuantity + newItem.quantity,
          totalPrice: state.totalPrice + newItem.total,
        };
      }

    case 'REMOVE_ITEM':
      const filteredItems = state.items.filter(item => item.productId !== action.payload.productId);
      return {
        ...state,
        items: filteredItems,
        totalQuantity: filteredItems.reduce((total, item) => total + item.quantity, 0),
        totalPrice: filteredItems.reduce((total, item) => total + item.total, 0),
      };

    case 'UPDATE_ITEM_QUANTITY':
      const updatedCartItems = state.items.map(item =>
        item.productId === action.payload.productId
          ? { ...item, quantity: action.payload.quantity, total: item.price * action.payload.quantity }
          : item
      );
      return {
        ...state,
        items: updatedCartItems,
        totalQuantity: updatedCartItems.reduce((total, item) => total + item.quantity, 0),
        totalPrice: updatedCartItems.reduce((total, item) => total + item.total, 0),
      };

    case 'SET_CART':
      return action.payload;

    default:
      return state;
  }
};

const syncCartWithDB = debounce(async (cart: CartState, userId: string) => {
  if (!userId) return;

  try {
    const response = await fetch('/api/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        items: cart.items,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to sync cart with the database');
    }
  } catch (error) {
    console.error('Error syncing cart with the database:', error);
  }
}, 500);

export const CartProvider = ({ children, session }: { children: ReactNode, session: any }) => {
  const [state, dispatchBase] = useReducer(cartReducer, initialState);
  const userId = session.user.email || null;

  const dispatch = (action: CartAction) => {
    dispatchBase(action);
    const updatedState = cartReducer(state, action);
    if (userId) {
      syncCartWithDB(updatedState, userId);
    }
  };

  useEffect(() => {
    async function fetchCart() {
      if (!userId) return;
      
      try {
        const response = await fetch(`/api/cart?userId=${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch cart');
        }
        const data = await response.json();
        dispatchBase({ type: 'SET_CART', payload: data.cart });
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    }

    fetchCart();
  }, [userId]);

  return <CartContext.Provider value={{ state, dispatch }}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
