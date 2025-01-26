'use client'

import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "@/hooks/use-toast";
import { UserAccount } from "@/models/user_model";
import { Order } from "@/types/order";

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [users, setUsers] = useState<Record<string, UserAccount>>({});

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('/api/admin/order');
        const data = await response.json();

        // Fetch users for each order
        const userResponses = await Promise.all(
          data.order.map((order: any) => fetch(`/api/admin/user?userId=${order.user}`))
        );
        const userData = await Promise.all(userResponses.map((res) => res.json()));

        // Map users by their ID for quick access
        const usersMap = userData.reduce(
          (acc, user) => ({ ...acc, [user.user._id]: user.user }),
          {}
        );

        setOrders(data.order);
        setUsers(usersMap);

        toast({
          title: data.message,
        });
      } catch (error) {
        console.error("Error fetching orders or users:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="p-6 space-y-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-gray-800">Orders</h1>
      <div className="grid gap-6">
        {orders.map((order) => (
          <Link
            href={`/admin/orders/${order._id}`}
            key={order._id}
            className="block p-6 bg-white shadow-md rounded-lg hover:bg-gray-50 transition-transform transform"
          >
            <h2 className="text-xl font-semibold text-gray-900">Order ID: {order._id}</h2>
            <p className="text-gray-700">
              <strong>Total Amount:</strong> ${order.totalAmount}
            </p>
            <p className="text-gray-700">
              <strong>Created At:</strong> {new Date(order.createdAt).toLocaleString()}
            </p>
            <div className="mt-4 space-y-1 text-gray-700">
              <h3 className="font-medium">User Details:</h3>
              <p><strong>Name:</strong> {users[order.user]?.name || "Loading..."}</p>
              <p><strong>Email:</strong> {users[order.user]?.email || "Loading..."}</p>
              <p><strong>Phone:</strong> {users[order.user]?.phone || "Loading..."}</p>
              <p><strong>Address:</strong> {users[order.user]?.address || "Loading..."}</p>
              <p><strong>State:</strong> {users[order.user]?.state || "Loading..."}</p>
              <p><strong>Country:</strong> {users[order.user]?.country || "Loading..."}</p>
              <p><strong>Zip:</strong> {users[order.user]?.pincode || "Loading..."}</p>
            </div>
            <p
              className={`mt-4 inline-block px-4 py-2 text-sm font-semibold rounded-full ${order.paymentStatus === "Paid"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
                }`}
            >
              {order.paymentStatus}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
