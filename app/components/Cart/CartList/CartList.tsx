'use client'

import { useCart } from '@/context/cartContext';
import { CartItem } from '@/types/cart';
import Image from 'next/image';

export const CartList = () => {
  const { state, dispatch } = useCart();
  const handleRemove = (productId: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { productId } });
  };

  const totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = state.items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

  return (
    <div>
      <h1>Shopping Cart</h1>
      {state.items.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <ul>
          {state.items.map((item: CartItem) => (
            <li key={item.productId}>
              <Image src={item.imageUrl} alt={item.name} width={500} height={500}/>
              <p>{item.name}</p>
              <p>Price: ${item.price}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
              <button onClick={() => handleRemove(item.productId)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
      <p>Total Quantity: {totalQuantity}</p>
      <p>Total Price: ${totalPrice}</p>
    </div>
  );
};
