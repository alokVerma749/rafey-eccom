'use client'

import { useState } from "react";
import Script from "next/script";
import { RazorpayOptions, RazorpayPaymentFailedResponse, RazorpayPaymentSuccessResponse } from "@/types/razorpay";
import { CartList } from "@/app/components/Cart/CartList"
import { useSession } from "next-auth/react";
import { useCart } from "@/context/cartContext";
import { toast } from "@/hooks/use-toast";


function Cart() {
  const session = useSession();
  const { state } = useCart();
  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("");

  const handleCheckout = async () => {
    try {
      setLoading(true);
      setPaymentStatus("");

      const response = await fetch('/api/payment/create-order', {
        method: 'POST',
        body: JSON.stringify({ products: state.items, currency: 'INR', userEmail: session.data?.user?.email }),
      });

      if (!response.ok) {
        throw new Error("Failed to create order.");
      }

      const { payment } = await response.json();

      if (!payment._id) {
        throw new Error("Payment ID not found.");
      }

      // Step 2: Initialize Razorpay payment
      const options: RazorpayOptions = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "",
        amount: payment.amount,
        currency: payment.currency,
        name: "Wonders Tapestry",
        description: "Payment for your order",
        order_id: payment.orderId,
        handler: (response: RazorpayPaymentSuccessResponse) => {
          setPaymentStatus("Payment Successful!");
          console.log("Payment success:", response);
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
      })

      // step 3: get address for the users
      // step 4: update the payment status in the database(use webhook to update the payment status)
      // await updatePaymentStatus(payment._id, 'success');
      // step 5: clear the cart
      // clearCart();
      // step 6: create shipment
      // createShipment(payment._id);
      // step 7: send email to the user
      // sendEmail(payment._id);
      // step 8: redirect to the home page
      // router.push('/');
    } catch (error) {
      toast({
        title: 'Payment failed',
        description: 'Please try again',
      })
      console.error("Error in payment:", error);
      setPaymentStatus("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <Script src='https://checkout.razorpay.com/v1/checkout.js' />
      <CartList />
      <button onClick={handleCheckout}>
        {loading ? "Processing..." : 'Place Order'}
      </button>
      {paymentStatus && <p className="mt-4 text-center">{paymentStatus}</p>}
    </div>
  )
}

export default Cart
