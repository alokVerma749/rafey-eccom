import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Star, Search, Circle } from "lucide-react";
import Image from "next/image";

const orders = [
  {
    id: 1,
    status: "Track your order",
    estimatedDelivery: "24 July",
    orderNumber: "0000002285",
    orderDate: "01/07/2023",
    items: 1,
    totalAmount: "₹ 2,45,999",
    statusColor: "text-gray-500",
  },
  {
    id: 2,
    status: "Delivered",
    estimatedDelivery: "31 June",
    orderNumber: "0000002285",
    orderDate: "01/03/2024",
    items: 1,
    totalAmount: "₹ 2,45,999",
    statusColor: "text-green-500",
  },
  {
    id: 3,
    status: "Canceled",
    estimatedDelivery: "",
    orderNumber: "0000002285",
    orderDate: "01/03/2024",
    items: 1,
    totalAmount: "₹ 2,45,999",
    statusColor: "text-red-500",
  },
];

const OrderHistory = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          ORDER HISTORY <span className="text-gray-500">(3 Products Delivered)</span>
        </h2>
        <div className="relative">
          <Search className="absolute left-3 top-3 text-gray-500 w-4 h-4" />
          <Input className="pl-10" placeholder="Search" />
        </div>
      </div>

      {/* Order List */}
      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order.id} className="border border-gray-300 rounded-lg p-4 shadow-sm w-full">
            {/* Status Header */}
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                <Circle className={`${order.statusColor} w-4 h-4`} />
                <span className="font-semibold text-gray-700">{order.status}</span>
              </div>
              {order.estimatedDelivery && (
                <span className="text-sm text-gray-500">Estimated Delivery {order.estimatedDelivery}</span>
              )}
            </div>

            {/* Order Details */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
              {/* Product Image */}
              <div className="md:col-span-1">
                <Image
                  src="/ring.png"
                  alt="Product"
                  className="w-20 h-20 object-cover rounded-md"
                  height={200} width={200}
                />
              </div>

              {/* Order Info */}
              <div className="md:col-span-3 text-sm text-gray-700">
                <p>
                  <strong>Order Number:</strong> {order.orderNumber}
                </p>
                <p>
                  <strong>Order Date:</strong> {order.orderDate}
                </p>
                <p>
                  <strong>No of Item:</strong> {order.items}
                </p>
                <p>
                  <strong>Total Amount:</strong> {order.totalAmount}
                </p>
              </div>

              {/* More Details Button */}

            </div>

            {/* Star Rating */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1 mt-3">
                <span className="text-gray-700 text-sm">Rate the product:</span>
                {[...Array(5)].map((_, index) => (
                  <Star key={index} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <div className="md:col-span-1 flex justify-end">
                <Button variant="link" className="text-blue-600">
                  more details
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;
