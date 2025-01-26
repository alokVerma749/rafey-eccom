"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Product } from "@/types/product_type";
import { UserAccount } from "@/models/user_model";
import { Order } from "@/types/order";

export default function OrderPage() {
  const { order_id } = useParams();
  const [order, setOrder] = useState<Order | null>(null);
  const [user, setUser] = useState<UserAccount | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const orderResponse = await fetch(`/api/admin/order?orderId=${order_id}`);
        const orderData = await orderResponse.json();
        const fetchedOrder = orderData.order;
        setOrder(fetchedOrder[0]);

        // Fetch user details
        const userResponse = await fetch(`/api/admin/user?userId=${fetchedOrder[0].user}`);
        const userData = await userResponse.json();
        setUser(userData.user);

        // Fetch products for the order
        const productResponses = await Promise.all(
          fetchedOrder[0].products.map((product: any) =>
            fetch(`/api/admin/product?productId=${product.product}`)
          )
        );
        const productData = await Promise.all(productResponses.map((res) => res.json()));
        setProducts(productData.map((data) => data.product));

        setLoading(false);
      } catch (error) {
        console.error("Error fetching order details:", error);
        setLoading(false);
      }
    };

    fetchOrder();
  }, [order_id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!order) {
    return <p>No order details found.</p>;
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Order Details</h1>
      <div className="space-y-2">
        <p><strong>Order ID:</strong> {order._id}</p>
        <p><strong>Total Amount:</strong> ${order.totalAmount}</p>
        <p>
          <strong>Payment Status:</strong>{" "}
          <span
            className={`px-2 py-1 rounded ${order.paymentStatus === "Paid" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
              }`}
          >
            {order.paymentStatus}
          </span>
        </p>
        <p><strong>Payment ID:</strong> {order.paymentId}</p>
        <p><strong>Razorpay Order ID:</strong> {order.razorpayOrderId}</p>
        <p><strong>Created At:</strong> {new Date(order.createdAt).toLocaleString()}</p>
      </div>
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">User Details</h2>
        {user ? (
          <>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.phone}</p>
            <p><strong>Address:</strong> {user.address}</p>
            <p><strong>Country:</strong> {user.country}</p>
            <p><strong>State:</strong> {user.state}</p>
            <p><strong>Pincode:</strong> {user.pincode}</p>
          </>
        ) : (
          <p>Loading user details...</p>
        )}
      </div>
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Products</h2>
        {products.length > 0 ? (
          <ul className="list-disc pl-6">
            {products.map((product) => (
              <li key={product._id}>
                <strong>{product.name}</strong> - Quantity:{" "}
                {
                  order.products.find((p: any) => p.product === product._id)?.quantity || 0
                }
              </li>
            ))}
          </ul>
        ) : (
          <p>No products found in this order.</p>
        )}
      </div>
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">More Information  </h2>
        <p><strong>Order Status:</strong> {order.orderStatus}</p>
        <p><strong>Payment Method:</strong> {order.paymentStatus}</p>
        <p><strong>Payment Method:</strong> {order.paymentId}</p>
        {/* <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
        <p><strong>Shipping Method:</strong> {order.shippingMethod}</p>
        <p><strong>Shipping Address:</strong> {order.shippingAddress}</p>
        <p><strong>Shipping City:</strong> {order.shippingCity}</p>
        <p><strong>Shipping State:</strong> {order.shippingState}</p>
        <p><strong>Shipping Zip Code:</strong> {order.shippingZipCode}</p> */}
      </div>
    </div>
  )
}

