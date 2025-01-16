'use client';

import { useCart } from '@/context/cartContext';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { CartItem } from '@/types/cart';
import { CartItem as CartItemModel } from '@/models/cart-model';

export const CartList = () => {
  const { dispatch } = useCart();
  const [cart, setCart] = useState<CartItemModel[]>([]);
  const [cartProducts, setCartProducts] = useState<(CartItem & { quantity: number })[]>([]);
  const session = useSession();

  useEffect(() => {
    const fetchCart = async () => {
      if (!session.data?.user?.email) return;
      const cartResponse = await fetch(`/api/cart?userId=${session.data.user.email}`);
      const cartData = await cartResponse.json();
      setCart(cartData.cart.items);
    };

    fetchCart();
  }, [session.data?.user?.email]);

  useEffect(() => {
    const fetchCartProducts = async () => {
      const products = await Promise.all(
        cart.map(async (item: CartItemModel) => {
          const productResponse = await fetch(`/api/product?productId=${item.productId}`);
          const productData = await productResponse.json();

          // Merge product data with quantity
          return {
            ...productData.product,
            quantity: item.quantity,
          };
        })
      );
      setCartProducts(products);
    };

    if (cart.length > 0) {
      fetchCartProducts();
    }
  }, [cart]);

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemove(productId);
      return;
    }

    // Update cart and cartProducts state
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.productId.toString() === productId ? { ...item, quantity: newQuantity } : item
      )
    );
    setCartProducts((prevProducts) =>
      prevProducts.map((product) =>
        product._id === productId ? { ...product, quantity: newQuantity } : product
      )
    );

    // Sync with backend if necessary
    dispatch({ type: 'UPDATE_ITEM_QUANTITY', payload: { productId, quantity: newQuantity } });
  };

  const handleRemove = (productId: string) => {
    // Remove from cart and cartProducts state
    setCart((prevCart) => prevCart.filter((item) => item.productId.toString() !== productId));
    setCartProducts((prevProducts) => prevProducts.filter((product) => product._id !== productId));

    // Sync with backend if necessary
    dispatch({ type: 'REMOVE_ITEM', payload: { productId } });
  };

  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cartProducts
    .reduce((total, item) => total + item.price * item.quantity, 0)
    .toFixed(2);

  return (
    <div>
      <h1>Shopping Cart</h1>
      {cartProducts.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <ul>
          {cartProducts.map((item) => (
            <li key={item._id}>
              <Image src={item.images.thumbnail} alt={item.name} width={150} height={150} />
              <p>{item.name}</p>
              <p>Price: ${item.price.toFixed(2)}</p>
              <p>
                Quantity:
                <input
                  type="number"
                  value={item.quantity}
                  min="1"
                  onChange={(e) => handleQuantityChange(item._id, parseInt(e.target.value, 10))}
                />
              </p>
              <p>Discount: {item.discount?.percentage}%</p>
              <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
              <button onClick={() => handleRemove(item._id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
      <p>Total Quantity: {totalQuantity}</p>
      <p>Total Price: ${totalPrice}</p>
    </div>
  );
};
