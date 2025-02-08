'use client'

import { useState } from "react";
import Script from "next/script";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useCart } from "@/context/cartContext";
import { CartList } from "@/app/components/Cart/CartList";
import { toast } from "@/hooks/use-toast";
import { getUser, getUserAccount, updateUser } from "@/db_services/user";
import { RazorpayOptions, RazorpayPaymentFailedResponse, RazorpayPaymentSuccessResponse } from "@/types/razorpay";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ProcessingAnimation } from "@/app/components/PrcessingAnimation";
import Loader from "@/app/components/Loader";

interface orderTypes {
  user: string;
  paymentId: string;
  products: { product: string, quantity: number }[];
  totalAmount: number;
  razorpayOrderId: string;
  paymentStatus: string;
  orderStatus: string;
  address: string;
  pincode: string;
  phone: string;
}

function Cart() {
  const { state } = useCart();
  const session = useSession();
  const router = useRouter()
  const { dispatch } = useCart()

  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("");
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [mobile, setMobile] = useState("");
  const [country, setCountry] = useState("");
  const [countryState, setCountryState] = useState("");
  const [showProcessing, setShowProcessing] = useState(false);

  //clear cart
  const clearCart = async ({ userEmail }: { userEmail: string }) => {
    const response = await fetch("/api/cart", {
      method: "DELETE",
      body: JSON.stringify({ userEmail }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to clear cart");
    }

    const data = await response.json();
    console.log(data.message);
  };

  // update the stock of the product
  const updateProductStock = async ({ productId, quantityPurchased }: { productId: string, quantityPurchased: number }) => {
    const response = await fetch(`/api/product`, {
      method: "PUT",
      body: JSON.stringify({ productId, quantityPurchased }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to update stock");
    }

    const data = await response.json();
    console.log(data.message);
  };

  // add address to the database
  const handleSaveAddress = async () => {
    if (!address || !pincode || !mobile || !country || !countryState) {
      toast({
        title: 'Validation Error',
        description: 'Address, pincode and mobile number cannot be empty',
      });
      return;
    }

    try {
      const response = await updateUser(session.data?.user?.email || "", { address, pincode, phone: mobile, country, state: countryState });
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

  // create order
  const createOrder = async (orderDetails: orderTypes) => {
    const order = await fetch("/api/order", {
      method: "POST",
      body: JSON.stringify(orderDetails),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!order) {
      throw new Error("Failed to create order");
    }
    return order;
  };

  // Handle Checkout
  const handleCheckout = async () => {
    try {
      if (!session.data?.user?.email) {
        toast({
          title: 'Please login',
          description: 'You need to be logged in to checkout',
        });
        return;
      }

      setLoading(true);
      setPaymentStatus("");

      // Fetch user account for address
      const userAccount = await getUserAccount(session.data.user.email);
      const userAccountData = JSON.parse(userAccount);

      if (!userAccountData?.address || !userAccountData?.pincode || !userAccountData?.phone) {
        setIsAddressModalOpen(true);
        toast({
          title: 'Add Address Required',
          description: 'Please provide your address, pincode, and mobile number to proceed',
        });
        return;
      }

      // Fetch user next-auth user id
      const user = await getUser(session.data.user.email);
      const userData = JSON.parse(user);

      // Proceed with payment setup
      const response = await fetch('/api/payment/create-order', {
        method: 'POST',
        body: JSON.stringify({
          products: state.items,
          currency: 'INR',
          userEmail: session.data?.user?.email,
          address: userAccountData.address,
          pincode: userAccountData.pincode,
          country: userAccountData.country,
          state: userAccountData.state,
          phone: userAccountData.phone,
          name: session.data?.user?.name,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create order.");
      }

      const { payment } = await response.json();

      if (!payment._id) {
        throw new Error("Payment ID not found.");
      }

      // Save order details in the database
      await createOrder({
        user: userData._id,
        paymentId: payment._id,
        razorpayOrderId: payment.orderId,
        products: state.items.map(item => ({
          product: item.productId,
          quantity: item.quantity,
        })),
        totalAmount: payment.amount || 0,
        paymentStatus: "pending",
        orderStatus: 'processing',
        address: userAccountData.address,
        pincode: userAccountData.pincode,
        phone: userAccountData.phone,
      });

      // Step 2: Initialize Razorpay payment
      const options: RazorpayOptions = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "",
        amount: payment.amount,
        currency: payment.currency,
        name: "Wonders Tapestry",
        description: "Payment for your order",
        order_id: payment.orderId,
        handler: async (response: RazorpayPaymentSuccessResponse) => {
          console.log(response, "Payment successful");
          try {
            setPaymentStatus("Payment Successful!");
            setShowProcessing(true);

            // Clear the cart after payment is successful
            await clearCart({ userEmail: session.data?.user?.email || "" });
            toast({
              title: "Cart cleared successfully",
              description: "Your cart has been cleared.",
            });

            // Update stock after payment
            for (const product of state.items) {
              await updateProductStock({ productId: product.productId, quantityPurchased: product.quantity });
            }

            // Shipment

            // Wait for animation to complete before redirecting
            setTimeout(() => {
              dispatch({ type: 'CLEAR_CART' });
            }, 3000); // 3-second delay for animation

          } catch (error) {
            console.error("Error clearing cart:", error);
            toast({
              title: "Error",
              description: "Failed to clear cart. Please try again.",
            });
          }
        },
        prefill: {
          name: payment.notes?.name,
          email: payment.notes?.email,
          contact: payment.notes?.phone,
        },
        theme: {
          color: "#6366F1",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();

      razorpay.on("payment.failed", (response: RazorpayPaymentFailedResponse) => {
        setPaymentStatus("Payment Failed. Please try again.");
        console.error("Payment failed:", response.error);
      });

      toast({
        title: 'Payment successful',
        description: 'Your order has been placed',
      });
    } catch (error) {
      toast({
        title: 'Payment failed',
        description: 'Please try again',
      });
      console.error("Error in payment:", error);
      setPaymentStatus("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading && <Loader />}
      {showProcessing && <ProcessingAnimation doneDelay={3} onComplete={() => router.push("/")} />}
      <Script src='https://checkout.razorpay.com/v1/checkout.js' />
      <div className="bg-gray-50 pb-6">

        <CartList />

        {
          !loading && (
            <div className="p-2 shadow rounded-lg">
              <button onClick={handleCheckout} className="bg-green-600 text-white px-10 py-2 rounded flex-1 justify-center ml-10" >
                Place Order
              </button>
            </div>
          )
        }
      </div>
      {paymentStatus && <p className="mt-4 text-center">{paymentStatus}</p>}

      {/* Address Modal */}
      <Dialog open={isAddressModalOpen} onOpenChange={setIsAddressModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Address</DialogTitle>
            <DialogDescription>
              Please add your address and pincode to proceed with checkout.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="mobile" className="text-right">
                Mobile
              </Label>
              <Input
                id="mobile"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="Enter your mobile number"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="country" className="text-right">
                Country
              </Label>
              <Input
                id="country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="Enter your country"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="state" className="text-right">
                State
              </Label>
              <Input
                id="state"
                value={countryState}
                onChange={(e) => setCountryState(e.target.value)}
                placeholder="Enter your state"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="address" className="text-right">
                Address
              </Label>
              <Input
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter your address"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="pincode" className="text-right">
                Pincode
              </Label>
              <Input
                id="pincode"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                placeholder="Enter your pincode"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" onClick={handleSaveAddress}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Cart
