"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Product } from "@/types/product_type";
import { UserAccount } from "@/models/user_model";
import { Order } from "@/types/order";
import OrderDetails from "@/app/components/Admin/Orders/OrderDetail";
import OrderListTable from "@/app/components/Admin/Orders/OrderListTable";
import Loader from "@/app/components/Loader";

export default function OrderPage() {
  const { order_id } = useParams();
  const [order, setOrder] = useState<Order | null>(null);
  const [user, setUser] = useState<UserAccount | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalWeight, setTotalWeight] = useState(0);

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
    return (
      <div className="flex justify-center items-center h-full w-full">
        <Loader />
      </div>
    );
  }

  if (!order) {
    return <p>No order details found.</p>;
  }

  return (
    <div className="p-6 space-y-4 w-full">
      {user && <OrderDetails order={order} user={user} totalWeight={totalWeight} />}
      <OrderListTable order={order} products={products} setTotalWeight={setTotalWeight} />
    </div>
  )
}
