"use client"
import { CircleCheck, Truck, Package } from "lucide-react"

type DeliveryTrackerProps = {
  orderStatus: string
}

export function DeliveryTracker({ orderStatus }: DeliveryTrackerProps) {
  const getProgressDetails = () => {
    switch (orderStatus) {
      case "processing":
        return { progress: 10, status: "Order Received" }
      case "shipped":
        return { progress: 50, status: "Dispatched" }
      case "delivered":
        return { progress: 100, status: "Delivered" }
      case "cancelled":
        return { progress: 0, status: "Cancelled" }
      default:
        return { progress: 10, status: "Order Received" }
    }
  }

  const { progress, status } = getProgressDetails()
  console.log(progress, status, '###')

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mb-4">
      <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">Delivery Tracker</h2>

      <div className="flex items-center justify-between text-sm text-gray-700 mb-4">
        <div className="flex flex-col items-center">
          <Package className={`w-6 h-6 ${progress >= 10 ? "text-indigo-600" : "text-gray-400"}`} />
          <span className="font-medium hidden sm:block">Order Received</span>
        </div>
        <div className="flex-1 h-1 bg-gray-300 mx-2 relative">
          <div
            className={`absolute left-0 top-0 h-1 bg-indigo-600 transition-all duration-500`}
            style={{ width: `${progress >= 10 ? "100%" : "0%"}` }}
          ></div>
        </div>

        <div className="flex flex-col items-center">
          <Truck className={`w-6 h-6 ${progress >= 50 ? "text-indigo-600" : "text-gray-400"}`} />
          <span className="font-medium hidden sm:block">Dispatched</span>
        </div>
        <div className="flex-1 h-1 bg-gray-300 mx-2 relative">
          <div
            className={`absolute left-0 top-0 h-1 bg-indigo-600 transition-all duration-500`}
            style={{ width: `${progress >= 50 ? "100%" : "0%"}` }}
          ></div>
        </div>

        <div className="flex flex-col items-center">
          <CircleCheck className={`w-6 h-6 ${progress === 100 ? "text-green-600" : "text-gray-400"}`} />
          <span className="font-medium hidden sm:block">Delivered</span>
        </div>
      </div>

      <div className="text-center mt-2 text-gray-700 text-sm">
        Current Status: <span className="font-semibold text-indigo-600">{status}</span>
      </div>
    </div>
  )
}
