"use client"

import { useState } from "react"
import { ContactRound, BriefcaseBusiness, MapPin } from "lucide-react"
import type { Order } from "@/types/order"
import type { UserAccount } from "@/models/user_model"
import CreateShippment from "../CreateShippment/CreateShippment"
import {
  Select,
  SelectGroup,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectLabel,
  SelectItem,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { toast } from "@/hooks/use-toast"

const OrderDetails = ({ order, user, totalWeight }: { order: Order; user: UserAccount; totalWeight: number }) => {
  const [orderStatus, setOrderStatus] = useState(order.orderStatus)
  const [isUpdating, setIsUpdating] = useState(false)

  const handleStatusChange = async () => {
    if (orderStatus === order.orderStatus) {
      toast({
        title: "No changes",
        description: "Order status is already set to " + orderStatus,
        variant: "destructive",
      })
      return
    }

    try {
      setIsUpdating(true)
      const response = await fetch("/api/admin/order", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: orderStatus,
          orderId: order._id
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Failed to update order status")
      }

      toast({
        title: "Status Updated",
        description: `Order status has been updated to ${orderStatus}`,
        variant: "default",
      })
    } catch (error) {
      console.error("Error updating order status:", error)
      toast({
        title: "Update Failed",
        description: error instanceof Error ? error.message : "Failed to update order status",
        variant: "destructive",
      })
      // Reset to original status on error
      setOrderStatus(order.orderStatus)
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <div className="p-4 bg-white shadow rounded-lg w-full mx-auto">
      <div>
        <div className="flex justify-start gap-x-4 items-center pb-2">
          <h2 className="text-lg">
            <strong>Orders ID: </strong>
            {order._id}
          </h2>
          <span className="px-3 py-1 text-sm font-medium text-white bg-yellow-500 rounded">{orderStatus}</span>
        </div>
        <div className="flex justify-start gap-x-4 items-center pb-2">
          <h2 className="text-lg">
            <strong>WayBill: </strong>
            {order.waybill}
          </h2>
        </div>

        <div className="flex justify-between items-center pb-4">
          <p>
            {" "}
            Order Date:{" "}
            {new Date(order.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "2-digit" })}
          </p>

          <div className="flex items-center space-x-2">
            <Select value={orderStatus} onValueChange={setOrderStatus}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Order Status</SelectLabel>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="shipped">Shipped</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Button
              onClick={handleStatusChange}
              disabled={isUpdating || orderStatus === order.orderStatus}
              variant="outline"
              size="sm"
            >
              {isUpdating ? "Updating..." : "Update Status"}
            </Button>
          </div>
        </div>
      </div>

      <CreateShippment order={order} user={user} totalWeight={totalWeight} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Customer Info */}
        <div className="p-2 border rounded-lg min-h-[300px] relative">
          <div className="flex justify-start items-start space-x-2">
            <ContactRound size={28} strokeWidth={1.5} />
            <div className="font-sans">
              <h3 className="font-bold mb-2 text-xl">Customer</h3>
              <p className="text-sm text-gray-700 font-medium">
                <strong>Name:</strong> {user.name}
              </p>
              <p className="text-base text-gray-700 font-medium">
                <strong>Email:</strong> {user.email}
              </p>
              <p className="text-base text-gray-700 font-medium">
                <strong>Phone:</strong> {user.phone}
              </p>
            </div>
          </div>
        </div>

        {/* Order Info */}
        <div className="p-4 border rounded-lg min-h-[300px] relative">
          <div className="flex justify-start items-start space-x-2">
            <BriefcaseBusiness size={28} strokeWidth={1.5} />
            <div className="font-sans flex flex-col gap-y-2">
              <h3 className="font-bold mb-2 text-xl">Order Info</h3>
              <p className="text-sm text-gray-700 font-medium">
                Shipping:{" "}
                {orderStatus === "processing"
                  ? "Processing"
                  : orderStatus === "shipped"
                    ? "Shipped"
                    : orderStatus === "delivered"
                      ? "Delivered"
                      : "Cancelled"}
              </p>
              <p className="text-sm text-gray-700 font-medium">
                <strong>Payment Status:</strong>{" "}
                <span
                  className={`px-2 py-1 m-2 rounded ${order.paymentStatus === "captured" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                >
                  {order.paymentStatus}
                </span>
              </p>
              <p className="text-sm text-gray-700 font-medium">
                <strong>Date: </strong>
                {new Date(order.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "2-digit",
                })}
              </p>
              <p className="text-sm text-gray-700 font-medium flex flex-col gap-y-2">
                <strong>Total Weight:</strong> {totalWeight.toFixed(2)} gm
                <strong>Total Amount:</strong> ₹{order.totalAmount.toFixed(2)}
                <strong>Payable Amount:</strong> ₹{order.payableAmount.toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        {/* Deliver To */}
        <div className="p-4 border rounded-lg min-h-[300px] relative">
          <div className="flex justify-start items-start space-x-2">
            <MapPin size={28} strokeWidth={1.5} />
            <div className="font-sans">
              <h3 className="font-bold mb-2 text-xl">Deliver to</h3>
              <p className="text-sm text-gray-700 font-medium">
                <strong>Address:</strong> {user.address}, {user.pincode}, {user.state}, {user.country}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
