'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useCart } from '@/context/cartContext';
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { updateUser } from '@/db_services/user';
import { Input } from '@/components/ui/input';
import Shimmer from '../../Shimmer';
import { AdressDialog } from '../AddressDialog';
import { useCartData } from '@/hooks/useCartData';
import { Personalize } from '../../Product/Personalize';
import EmptyCart from './EmptyCart';
import Whatsapp from '@/public/whatsapp.svg';

interface CartListProps {
  setFinalAmount: (amount: number) => void;
}

export const CartList: React.FC<CartListProps> = ({ setFinalAmount }) => {
  const { dispatch } = useCart();
  const session = useSession();
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [customization, setCustomization] = useState("");

  const {
    cart,
    cart_id,
    cartProducts,
    user,
    threshold,
    loading,
    voucherCode,
    setVoucherCode,
    voucherDiscount,
    setVoucherDiscount,
    voucherError,
    setVoucherError,
    setUser,
    setCart,
    setCartProducts,
    shippingCost,
  } = useCartData();

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    const product = cartProducts.find((product) => product._id === productId);
    if (product?.stock && product.stock < newQuantity) {
      toast({
        title: "Out of stock",
        description: "We have only " + product.stock + " items in stock",
      });
      return;
    }
    if (newQuantity <= 0) {
      handleRemove(productId);
      return;
    }

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

    dispatch({ type: 'UPDATE_ITEM_QUANTITY', payload: { productId, quantity: newQuantity } });
  };

  const handleRemove = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.productId.toString() !== productId));
    setCartProducts((prevProducts) => prevProducts.filter((product) => product._id !== productId));

    dispatch({ type: 'REMOVE_ITEM', payload: { productId } });
  };

  const handleSaveAddress = async () => {
    if (!user?.address || !user?.pincode || !user?.phone || !user?.country || !user?.state || !user.city) {
      toast({
        title: 'Validation Error',
        description: 'Address, pincode and mobile number cannot be empty',
      });
      return;
    }

    try {
      const response = await updateUser(session.data?.user?.email || "", { address: user?.address, pincode: user?.pincode, phone: user?.phone, country: user?.country, state: user?.state, city: user?.city });
      const userData = JSON.parse(response);
      console.log("Address updated:", userData);
      toast({
        title: 'Address Saved',
        description: 'You can now proceed with checkout',
      });
      setIsAddressModalOpen(false);
    } catch (error) {
      console.error("Error updating address:", error);
      toast({
        title: 'Error',
        description: 'Failed to save address. Please try again',
      });
    }
  };

  const handleApplyVoucher = async () => {
    if (!voucherCode) {
      setVoucherError('Please enter a voucher code.');
      return;
    }

    try {
      const response = await fetch('/api/apply-voucher', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ voucherCode, cartTotal: finalPrice }),
      });
      const data = await response.json();

      if (!response.ok) {
        setVoucherError('Invalid or expired voucher.');
        return;
      }

      setVoucherDiscount(data.discountAmount);
      toast({ title: "Voucher Applied", description: `₹${data.discountAmount} off applied!` });
      setVoucherError('');
      setVoucherCode('');
    } catch (error) {
      console.error("Error applying voucher:", error);
      setVoucherError('Failed to validate voucher. Try again.');
    }
  };

  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cartProducts
    .reduce((total, item) => total + (item.price - (item.price * (item.discount?.percentage ?? 0)) / 100) * item.quantity, 0)
    .toFixed(2);

  // Calculate final price
  const finalPrice = threshold !== null && Number(totalPrice) >= threshold ? totalPrice : totalPrice + shippingCost;

  // Update setFinalAmount whenever finalPrice or shippingCost changes
  useEffect(() => {
    setFinalAmount(voucherDiscount ? Number(finalPrice) - voucherDiscount + (shippingCost ?? 0) : Number(finalPrice) + (shippingCost ?? 0));
  }, [finalPrice, voucherDiscount, shippingCost, setFinalAmount]);

  if (loading) {
    return <Shimmer />;
  }

  if (cartProducts.length === 0 && !loading) {
    return <EmptyCart />;
  }

  return (
    <>
      <div className="px-2 sm:px-10 py-6">
        <div className="mx-auto">

          {/* Address Section */}
          <div className="my-2 shadow rounded-lg p-6 bg-white">
            <div className="flex justify-between items-center">
              <p className="text-lg font-semibold">
                Deliver to: <span className="font-normal">{user?.name}, {user?.phone}</span>
              </p>
              <Button
                className="text-blue-500 font-semibold uppercase px-6 py-1 bg-white rounded-sm border shadow-none hover:bg-indigo-500 hover:text-white"
                onClick={() => setIsAddressModalOpen(true)}
              >
                CHANGE
              </Button>
            </div>
            {user?.address && user?.state && user?.pincode && user?.country ? (
              <p className="text-sm text-gray-500">
              Full Address: {user.address}, {user.state}, {user.pincode}, {user.country}
              </p>
            ) : (
              <p className="text-sm text-red-500">
              Please fill in the address details.
              </p>
            )}
          </div>

          {/* Cart Items */}
          <div className="flex flex-col lg:flex-row justify-between items-start gap-4 ">
            <div className="flex justify-between items-start flex-col gap-4 bg-white shadow rounded-md p-6 w-full lg:w-2/3">
              {cartProducts.map((item) => (
                <div
                  key={item._id}
                  className="flex flex-col sm:flex-row justify-between items-start rounded-lg border w-full"
                >
                  <Link href={`/product/${item._id}`}>
                    <Image src={item.images?.[0]} alt={item.name} width={200} height={250} className='object-contain object-top h-full w-full' />
                  </Link>
                  <div className="sm:ml-4 flex-1 p-2">
                    <h3 className="text-lg uppercase">{item.name}</h3>
                    <p className="text-sm text-gray-500 mt-1 flex flex-wrap whitespace-normal break-words">{item.description}</p>

                    <div className="flex justify-between items-center gap-x-4 font-medium py-2">
                      <div className='flex flex-col gap-y-1 sm:flex-row sm:gap-x-4'>
                        <p className="text-base font-semibold text-black">
                          ₹{Math.round(item.price - (item.price * (item.discount?.percentage ?? 0)) / 100)}
                        </p>
                        <p className="text-gray-600 text-sm line-through">MRP ₹{item.price}</p>
                        <p className="text-orange-500 text-sm font-medium">(₹{((item.price * (item.discount?.percentage ?? 0)) / 100).toFixed(2)} OFF)</p>
                      </div>
                    </div>
                    <div className="flex justify-start items-center w-fit rounded-md">
                      <div
                        className="px-2 border py-1 cursor-pointer mx-1 rounded"
                        onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                      >
                        <Minus size={20} />
                      </div>
                      <span className="text-base px-4 border py-[2px] rounded">{item.quantity}</span>
                      <div
                        className="px-2 border-l-2 py-1 cursor-pointer border mx-1 rounded"
                        onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                      >
                        <Plus size={20} />
                      </div>
                      <Trash2
                        className="text-red-500 mt-auto mb-1 mx-2 cursor-pointer"
                        onClick={() => handleRemove(item._id)}
                      />
                    </div>

                    {
                      (item?.isCustomizable) && <div>
                        <div className="flex justify-between items-start gap-x-4 pt-2">
                          <Personalize product={item} cart_id={cart_id} customization={customization} setCustomization={setCustomization} />
                          {/* Whatsapp Button */}
                          <Link href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`}
                            target="_blank">
                            <Image src={Whatsapp} alt="Whatsapp" width={28} height={28} className='h-12 w-16'/> 
                          </Link>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                          Customize Your Product By Adding Your Name For A Personal Touch
                        </p>
                        <p className="text-gray-600 text-sm">
                          <span className='font-semibold text-green-300'>Customization: </span> {customization ? customization : item.customization ? item.customization : "No Personalization"}
                        </p>
                      </div>
                    }
                  </div>
                </div>
              ))}
            </div>

            {/* Price Details Section */}
            <div className="border rounded-lg p-6 space-y-4 bg-white shadow pb-20 w-full lg:w-1/3 h-fit">
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

                {/* voucher discount */}
                {voucherDiscount > 0 && (<div className="flex justify-between text-gray-700">
                  <span>Voucher Discount</span>
                  <span className="text-green-600">
                    -₹{voucherDiscount.toFixed(2)}
                  </span>
                </div>)}

                {/* Delivery Fee */}
                <div className="flex justify-between text-gray-700">
                  <span>Delivery Fee</span>
                  <span className="text-gray-700">
                    {threshold !== null && Number(totalPrice) >= threshold ? "+₹0.00" : `+₹${shippingCost}.00`}
                  </span>
                </div>

                {/* Total Amount */}
                <div className="border-t pt-2 flex justify-between text-gray-700 font-semibold">
                  <span>Total Amount</span>
                  <span>₹{voucherDiscount ? (Number(finalPrice) - voucherDiscount + (shippingCost ?? 0)).toFixed(2) : (Number(finalPrice) + (shippingCost ?? 0)).toFixed(2)}</span>
                </div>
              </div>

              {/* Savings */}
              <p className="text-green-600 text-sm">
                You Will Save ₹{(cartProducts.reduce((total, item) => total + (item.price * (item.discount?.percentage ?? 0)) / 100 * item.quantity, 0) + voucherDiscount).toFixed(2) || 0} On This Order
              </p>

              {/* Voucher Section */}
              <div className="my-4 p-4 bg-white shadow rounded-md">
                <p className="font-semibold mb-2">Apply Voucher</p>
                <div className="flex items-center gap-2">
                  <Input
                    type="text"
                    placeholder="Enter voucher code"
                    value={voucherCode}
                    onChange={(e) => setVoucherCode(e.target.value)}
                  />
                  <Button onClick={handleApplyVoucher} className="bg-blue-600 text-white">Apply</Button>
                </div>
                {voucherError && <p className="text-red-500 text-sm mt-2">{voucherError}</p>}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Address Modal */}
      <AdressDialog
        isOpen={isAddressModalOpen}
        onClose={setIsAddressModalOpen}
        user={user}
        setUser={setUser}
        handleSaveAddress={handleSaveAddress}
      />
    </>
  );
};
