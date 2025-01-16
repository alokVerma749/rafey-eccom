'use client';

import { useState } from "react";
import { RazorpayOptions, RazorpayPaymentFailedResponse, RazorpayPaymentSuccessResponse } from "@/types/razorpay";
import Script from "next/script";

const CheckoutPage = () => {
  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("");

  const handlePayment = async () => {
    setLoading(true);
    setPaymentStatus("");

    try {
      // Step 1: Create an order from the API
      const response = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          products: [], // Pass products from cart context instead
          currency: "INR",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create order.");
      }

      const { message, payment } = await response.json();
      console.log(message, payment);

      if (!payment.id) {
        throw new Error("Order ID not found.");
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
        // Handle payment failure
        setPaymentStatus("Payment Failed. Please try again.");
        console.error("Payment failed:", response.error);
      });
    } catch (error: any) {
      console.error("Error in payment:", error);
      setPaymentStatus("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Script src='https://checkout.razorpay.com/v1/checkout.js' />
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="max-w-md p-6 bg-white shadow-lg rounded-lg">
          <h2 className="text-xl font-bold mb-4">Checkout</h2>
          <button
            onClick={handlePayment}
            disabled={loading}
            className={`w-full py-2 px-4 text-white rounded-lg font-semibold ${loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"}`}
          >
            {loading ? "Processing..." : "Pay ₹500"}
          </button>
          {paymentStatus && <p className="mt-4 text-center">{paymentStatus}</p>}
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
