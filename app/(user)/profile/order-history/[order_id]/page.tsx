"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import type { Product } from "@/types/product_type"
import { toast } from "@/hooks/use-toast"
import Loader from "@/app/components/Loader"
import type { UserAccount } from "@/models/user_model"
import { useSession } from "next-auth/react"
import { getUserAccount } from "@/db_services/user"
import { Badge } from "@/components/ui/badge"
import { DeliveryTracker } from "@/app/components/Profile/DeliveryTracker"

type OrderData = {
  _id: string
  createdAt: string
  orderStatus: string
  products: { product: string; quantity: number }[]
  totalAmount: number
  payableAmount: number
  paymentId: string
  paymentStatus: string
}

const OrderDetails = () => {
  const [orderData, setOrderData] = useState<{ order: OrderData; productDetails: Product[] } | null>(null);
  const [user, setUser] = useState<UserAccount | null>(null);
  const { order_id } = useParams();
  const session = useSession();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(`/api/order?orderId=${order_id}`);

        if (!response.ok) {
          throw new Error("Failed to fetch order data.");
        }

        const fetchedOrder: { message: string; order: OrderData; productDetails: Product[] } = await response.json();
        setOrderData(fetchedOrder);

        toast({
          title: fetchedOrder.message,
          description: fetchedOrder.order.orderStatus,
        });
      } catch (err: any) {
        toast({
          title: "Error",
          description: err.message || "Failed to fetch order data.",
        });
      }
    };

    const fetchUser = async () => {
      try {
        const userAccount = await getUserAccount(session.data?.user?.email ?? "");
        const userAccountData = JSON.parse(userAccount);
        setUser(userAccountData);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    }

    fetchOrder();
    if (session.status === "authenticated") {
      fetchUser();
    }
  }, [order_id, session.data?.user?.email, session.status])

  if (!orderData) {
    return (
      <div>
        <Loader />
      </div>
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "processing":
        return "bg-yellow-500 text-white"
      case "shipped":
        return "bg-blue-500 text-white"
      case "delivered":
        return "bg-green-500 text-white"
      case "cancelled":
        return "bg-red-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  return (
    <div className="max-w-5xl mx-auto p-6 rounded-lg shadow-md my-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold">
            <strong>ORDER ID: </strong>
            {orderData.order._id}
          </h2>
          <Badge className={getStatusColor(orderData.order.orderStatus)}>
            {orderData.order.orderStatus.toUpperCase()}
          </Badge>
        </div>
      </div>

      <DeliveryTracker orderStatus={orderData.order.orderStatus} />

      <h3 className="text-md font-semibold mb-3">ORDER SUMMARY</h3>
      {orderData.productDetails.map((product, index) => {
        const orderProduct = orderData.order.products.find((p) => p.product === product._id)
        const discountPercentage = product.discount?.percentage || 0
        const discountedPrice = (product.price - (product.price * discountPercentage) / 100).toFixed(2)

        return (
          <div
            key={index}
            className="flex flex-col md:flex-row items-start justify-between border border-gray-300 rounded-lg mb-4 md:p-4"
          >
            <div className="flex flex-col md:flex-row justify-start items-start">
              <Image
                src={product.images?.[0] || "/placeholder.svg"}
                alt={product.name}
                height={80}
                width={80}
                className="object-contain rounded-md"
              />
              <div className="flex-1 text-base text-gray-700 p-2">
                <p className="font-semibold">{product.name}</p>
                <p>
                  <strong>Category: </strong>
                  {product.category}
                </p>
                <p>
                  <strong>Order Date: </strong>
                  {new Date(orderData.order.createdAt).toLocaleDateString()}
                </p>
                <p>
                  <strong>Quantity: </strong>
                  {orderProduct?.quantity}
                </p>
                <p>{product.description}</p>
              </div>
            </div>
            {discountPercentage >= 0 && (
              <div className="flex flex-col items-start justify-start gap-x-4 font-medium p-2">
                <p className="font-semibold text-black text-base line-through">₹{product.price}</p>
                <p className="text-green-600 text-base">{discountPercentage} % OFF</p>
                <p className="text-base font-semibold text-green-600"> ₹{discountedPrice}</p>
              </div>
            )}
          </div>
        )
      })}

      <div className="text-base text-gray-700 mb-4">
        <div className="flex justify-between">
          <span>Subtotal:</span>
          <span className="text-green-600">₹{orderData.order.totalAmount} </span>
        </div>
        <hr className="my-2" />
        <div className="flex justify-between font-semibold">
          <span>TOTAL AMOUNT:</span>
          <div>
            <span className="text-base font-semibold pr-4 text-green-600">
              {" "}
              ₹{orderData.order.payableAmount.toFixed(2)}
            </span>
            <span className="text-base font-semibold pr-4 line-through">
              {" "}
              ₹{orderData.order.totalAmount.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      <div className="text-base text-gray-700 mb-4">
        <p> <strong>User Contact:</strong> {user?.email} | {user?.phone}</p>
      </div>

      <div className="text-base text-gray-700 mb-4">
        <p className="font-semibold">Delivering at:</p>
        <p>{user?.address}</p>
        <p>Phone: {user?.phone}</p>
      </div>

      <div className="text-base text-gray-700 mb-6">
        <p className="font-semibold">Payment Status:</p>
        <p className={`${orderData.order.paymentStatus === "captured" ? "text-green-600" : "text-red-600"} font-medium`}>
          {orderData.order.paymentStatus.toUpperCase()}
        </p>
      </div>
    </div>
  );
};

export default OrderDetails;
