'use client';

import { useCart } from '@/context/cartContext';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { CartItem } from '@/types/cart';
import { CartItem as CartItemModel } from '@/models/cart-model';
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

export const CartList = () => {
  const { dispatch } = useCart();
  const [cart, setCart] = useState<CartItemModel[]>([]);
  const [cartProducts, setCartProducts] = useState<(CartItem & { quantity: number })[]>([]);
  const session = useSession();

  // fetch user cart
  useEffect(() => {
    const fetchCart = async () => {
      if (!session.data?.user?.email) return;
      const cartResponse = await fetch(`/api/cart?userId=${session.data.user.email}`);
      const cartData = await cartResponse.json();
      setCart(cartData.cart.items);
    };

    fetchCart();
  }, [session.data?.user?.email]);


  // fetch cart products
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
    //if quantity is less than 0, restrict from increasing quantity
    const product = cartProducts.find((product) => product._id === productId);
    if (product?.stock && product.stock < newQuantity) {
      toast({
        title: "Out of stock",
        description: "We have only " + product.stock + " items in stock",
      })
      return;
    }
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
    .reduce((total, item) => total + (item.price - (item.price * (item.discount?.percentage ?? 0)) / 100) * item.quantity, 0)
    .toFixed(2);

  return (
    <div className="px-10 py-6">
      <div className="mx-auto">

        {/* Address Section */}
        <div className="my-2 shadow rounded-lg p-6 bg-white">
          <div className="flex justify-between items-center">
            <p className="text-lg font-semibold">
              Deliver to: <span className="font-normal">Alok, 253146</span>
            </p>
            <Button className="text-blue-500 font-semibold uppercase px-6 py-1 bg-white rounded-sm border shadow-none hover:bg-indigo-500 hover:text-white">CHANGE</Button>
          </div>
          <p className="text-sm text-gray-500">
            Full Address: Lorem Ipsum Dolor Sit Amet Consecutetur...
          </p>
        </div>

        {/* Cart Items */}
        <div className="flex justify-between items-start gap-4 ">
          <div className="flex justify-between items-start flex-col gap-4 bg-white shadow rounded-md p-6">
            {cartProducts.map((item) => (
              <div
                key={item._id}
                className="flex justify-between items-start rounded-lg"
              >
                <Image src={item.images.medium} alt={item.name} width={100} height={100} />
                <div className="ml-4 flex-1 mr-20">
                  <h3 className="text-lg uppercase">{item.name}</h3>
                  <p className="text-sm text-gray-500 mt-1 flex flex-wrap whitespace-normal break-words">
                    Lorem ipsum dolor sit amet consectetur adipisicing Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, alias.
                  </p>

                  <div className="flex justify-between items-center gap-x-4 font-medium py-2">
                    <div className='flex flex-col gap-y-1 md:flex-row md:gap-x-4'>
                    <p className="text-base font-semibold text-black">
                      ${(item.price - (item.price * (item.discount?.percentage ?? 0)) / 100).toFixed(2)}
                    </p>
                    <p className="text-gray-600 text-sm line-through">MRP ${item.price}</p>
                    <p className="text-orange-500 text-sm font-medium">(${((item.price * (item.discount?.percentage ?? 0)) / 100).toFixed(2)} OFF)</p>
                    </div>
                    <p className="text-white bg-green-700 px-2 py-[1px] text-sm rounded-md">1 offer</p>
                  </div>
                </div>
                <div className="flex justify-start items-center w-fit rounded-md mt-auto mb-2">
                  <div
                    className="px-2 border py-1 cursor-pointer text-blue-600 bg-blue-100 mx-1 rounded"
                    onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                  >
                    <Minus size={20} />
                  </div>
                  <span className="text-base px-10 border py-[2px] rounded">{item.quantity}</span>
                  <div
                    className="px-2 border-l-2 py-1 cursor-pointer text-blue-600 bg-blue-100 border mx-1 rounded"
                    onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                  >
                    <Plus size={20} />
                  </div>
                </div>
                <Trash2
                  className="text-red-500 mt-auto mb-3 mx-6 cursor-pointer"
                  onClick={() => handleRemove(item._id)}
                />
              </div>
            ))}
          </div>

          {/* Price Details Section */}
          <div className="border rounded-lg p-6 space-y-4 bg-white shadow pb-20 md:w-1/3 h-fit">
            <h3 className="font-semibold text-lg">PRICE DETAILS</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-gray-700">
                <span>MRP ({totalQuantity} items)</span>
                <span>₹{cartProducts.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</span>
              </div>

              {/* Product Discount */}
              <div className="flex justify-between text-gray-700">
                <span>Product Discount</span>
                <span className="text-green-600">
                  -₹{cartProducts.reduce((total, item) => total + (item.price * (item.discount?.percentage ?? 0)) / 100 * item.quantity, 0).toFixed(2)}
                </span>
              </div>

              {/* Delivery Fee */}
              <div className="flex justify-between text-gray-700">
                <span>Delivery Fee</span>
                <span className="text-gray-700">+₹000.00</span>
              </div>

              {/* Total Amount */}
              <div className="border-t pt-2 flex justify-between text-gray-700 font-semibold">
                <span>Total Amount</span>
                <span>₹{totalPrice}</span>
              </div>
            </div>

            {/* Savings */}
            <p className="text-green-600 text-sm">
              You Will Save ₹{cartProducts.reduce((total, item) => total + (item.price * (item.discount?.percentage ?? 0)) / 100 * item.quantity, 0).toFixed(2)} On This Order
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
