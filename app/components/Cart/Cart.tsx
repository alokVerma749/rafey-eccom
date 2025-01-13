'use client'

import { CartList } from "./CartList";

export const CartComponent = () => {

  const handleAddToCart = () => {
  };

  const handleRemoveFromCart = () => {
  };

  const handleClearCart = () => {
  };

  return (
    <div>
      <h1>Cart</h1>
      <CartList />
      <button onClick={handleAddToCart}>Add Item</button>
      <button onClick={handleRemoveFromCart}>Remove Item</button>
      <button onClick={handleClearCart}>Clear Cart</button>
    </div>
  );
};
