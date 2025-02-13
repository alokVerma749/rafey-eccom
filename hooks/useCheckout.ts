import { useState } from "react";
import { useSession } from "next-auth/react";
import { useCart } from "@/context/cartContext";
import { toast } from "@/hooks/use-toast";
import { getUser, getUserAccount, updateUser } from "@/db_services/user";
import { RazorpayOptions, RazorpayPaymentFailedResponse, RazorpayPaymentSuccessResponse } from "@/types/razorpay";

export function useCheckout() {
  const session = useSession();
  const { state, dispatch } = useCart();

  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("");
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [showProcessing, setShowProcessing] = useState(false);

  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [mobile, setMobile] = useState("");
  const [country, setCountry] = useState("");
  const [countryState, setCountryState] = useState("");

  // Clear Cart
  const clearCart = async (userEmail: string) => {
    try {
      const response = await fetch("/api/cart", {
        method: "DELETE",
        body: JSON.stringify({ userEmail }),
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error("Failed to clear cart");
      console.log("Cart cleared successfully");
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  // Update product stock
  const updateProductStock = async (productId: string, quantityPurchased: number) => {
    try {
      const response = await fetch(`/api/product`, {
        method: "PUT",
        body: JSON.stringify({ productId, quantityPurchased }),
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error("Failed to update stock");
      console.log("Stock updated successfully");
    } catch (error) {
      console.error("Error updating stock:", error);
    }
  };

  // Save Address
  const handleSaveAddress = async () => {
    if (!address || !pincode || !mobile || !country || !countryState) {
      toast({ title: "Validation Error", description: "All fields are required." });
      return;
    }

    try {
      await updateUser(session.data?.user?.email || "", { address, pincode, phone: mobile, country, state: countryState });
      toast({ title: "Address Saved", description: "You can now proceed with checkout" });
      setIsAddressModalOpen(false);
    } catch (error) {
      console.error("Error updating address:", error);
      toast({ title: "Error", description: "Failed to save address. Please try again" });
    }
  };

  // Create Order
  const createOrder = async (orderDetails: any) => {
    try {
      const response = await fetch("/api/order", {
        method: "POST",
        body: JSON.stringify(orderDetails),
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error("Failed to create order");
      console.log("Order created successfully");
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  // Handle Checkout
  const handleCheckout = async (finalPrice: number) => {
    try {
      if (!session.data?.user?.email) {
        toast({ title: "Please login", description: "You need to be logged in to checkout" });
        return;
      }

      setLoading(true);
      setPaymentStatus("");

      // Fetch user account
      const userAccount = await getUserAccount(session.data.user.email);
      const userAccountData = JSON.parse(userAccount);

      if (!userAccountData?.address || !userAccountData?.pincode || !userAccountData?.phone) {
        setIsAddressModalOpen(true);
        toast({ title: "Add Address Required", description: "Please provide your address, pincode, and mobile number" });
        return;
      }

      // Fetch user ID
      const user = await getUser(session.data.user.email);
      const userData = JSON.parse(user);

      // Create Razorpay order
      const response = await fetch('/api/payment/create-order', {
        method: "POST",
        body: JSON.stringify({
          products: state.items,
          currency: "INR",
          userEmail: session.data.user.email,
          address: userAccountData.address,
          pincode: userAccountData.pincode,
          phone: userAccountData.phone,
          name: session.data.user.name,
          finalPrice,
        }),
      });

      if (!response.ok) throw new Error("Failed to create order.");

      const { payment } = await response.json();
      if (!payment._id) throw new Error("Payment ID not found.");

      // Save Order
      await createOrder({
        user: userData._id,
        paymentId: payment._id,
        razorpayOrderId: payment.orderId,
        products: state.items.map((item) => ({ product: item.productId, quantity: item.quantity })),
        totalAmount: payment.amount || 0,
        paymentStatus: "pending",
        orderStatus: "processing",
        address: userAccountData.address,
        pincode: userAccountData.pincode,
        phone: userAccountData.phone,
      });

      // Initialize Razorpay
      const options: RazorpayOptions = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "",
        amount: payment.amount,
        currency: payment.currency,
        name: "Wonders Tapestry",
        description: "Payment for your order",
        order_id: payment.orderId,
        handler: async (response: RazorpayPaymentSuccessResponse) => {
          setPaymentStatus("Payment Successful!");
          setShowProcessing(true);
          await clearCart(session.data?.user?.email || "");

          for (const product of state.items) {
            await updateProductStock(product.productId, product.quantity);
          }

          toast({ title: "Payment successful", description: "Your order has been placed" });

          setTimeout(() => {
            dispatch({ type: "CLEAR_CART" });
          }, 3000);
        },
        prefill: {
          name: payment.notes?.name,
          email: payment.notes?.email,
          contact: payment.notes?.phone,
        },
        theme: { color: "#6366F1" },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();

      razorpay.on("payment.failed", (response: RazorpayPaymentFailedResponse) => {
        setPaymentStatus("Payment Failed. Please try again.");
        console.error("Payment failed:", response.error);
      });
    } catch (error) {
      toast({ title: "Payment failed", description: "Please try again" });
      console.error("Error in payment:", error);
      setPaymentStatus("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    paymentStatus,
    isAddressModalOpen,
    showProcessing,
    handleCheckout,
    handleSaveAddress,
    setIsAddressModalOpen,
    address,
    setAddress,
    pincode,
    setPincode,
    mobile,
    setMobile,
    country,
    setCountry,
    countryState,
    setCountryState,
  };
}
