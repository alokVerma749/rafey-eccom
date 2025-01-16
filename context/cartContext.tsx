'use client';

import { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { CartState, CartAction, CartItemStore } from '@/types/cart';
import debounce from 'lodash.debounce';
import { toast } from '@/hooks/use-toast';

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
        const newItem: CartItemStore = {
          ...action.payload,
          total: action.payload.price * action.payload.quantity
        };
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
      return {
        ...action.payload,
        items: action.payload.items.map(item => ({
          ...item,
          total: item.price * item.quantity
        }))
      };

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
        email: userId,
        items: cart.items,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to sync cart with the database');
    }
  } catch (error) {
    toast({
      title: 'Error syncing cart with the database'
    })
    console.error('Error syncing cart with the database:', error);
  }
}, 500);

export const CartProvider = ({ children, session }: { children: ReactNode; session: any }) => {
  const [state, dispatchBase] = useReducer(cartReducer, initialState);
  const userId = session?.user?.email || null;

  const dispatch = (action: CartAction) => {
    dispatchBase(action);
    const updatedState = cartReducer(state, action);
    if (userId) {
      try {
        syncCartWithDB(updatedState, userId);
      } catch (error) {
        console.error('Error syncing cart with database:', error);
        toast({
          title: 'Sync Error',
          description: 'Failed to sync cart with the server.',
        });
      }
    }
  };

  useEffect(() => {
    async function fetchCart() {
      if (!userId) {
        toast({
          title: 'Login Required',
          description: 'Please log in to access your cart.',
        });
        return;
      }

      try {
        const response = await fetch(`/api/cart?userId=${userId}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch cart: ${response.statusText}`);
        }
        const data = await response.json();
        dispatchBase({ type: 'SET_CART', payload: data.cart });
        toast({
          title: 'Cart Loaded',
          description: 'Your cart has been successfully loaded.',
        });
      } catch (error) {
        toast({
          title: 'Fetch Error',
          description: 'Unable to load your cart. Please try again later.',
        });
      }
    }
    fetchCart();
  }, [userId]);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
