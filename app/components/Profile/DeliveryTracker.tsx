"use client";
import React, { useState, useEffect } from "react";
import { CircleCheck, Truck, Package } from "lucide-react";

export function DeliveryTracker() {
  const [progress, setProgress] = useState(10);
  const [status, setStatus] = useState("Order Received");

  useEffect(() => {
    const steps = [
      { progress: 10, status: "Order Received" },
      { progress: 50, status: "Dispatched" },
      { progress: 100, status: "Delivered" },
    ];

    let index = 0;
    const timer = setInterval(() => {
      if (index < steps.length) {
        setProgress(steps[index].progress);
        setStatus(steps[index].status);
        index++;
      } else {
        clearInterval(timer);
      }
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">Delivery Tracker</h2>
      
      <div className="flex items-center justify-between text-sm text-gray-700 mb-4">
        <div className="flex flex-col items-center">
          <Package className="w-6 h-6 text-gray-600" />
          <span className="font-medium">Order Received</span>
        </div>
        <div className="flex-1 h-1 bg-gray-300 mx-2 relative">
          <div className={`absolute left-0 top-0 h-1 bg-indigo-600 transition-all duration-500`} style={{ width: `${progress >= 10 ? "100%" : "0%"}` }}></div>
        </div>
        
        <div className="flex flex-col items-center">
          <Truck className={`w-6 h-6 ${progress >= 50 ? "text-indigo-600" : "text-gray-400"}`} />
          <span className="font-medium">Dispatched</span>
        </div>
        <div className="flex-1 h-1 bg-gray-300 mx-2 relative">
          <div className={`absolute left-0 top-0 h-1 bg-indigo-600 transition-all duration-500`} style={{ width: `${progress >= 50 ? "100%" : "0%"}` }}></div>
        </div>

        <div className="flex flex-col items-center">
          <CircleCheck className={`w-6 h-6 ${progress === 100 ? "text-green-600" : "text-gray-400"}`} />
          <span className="font-medium">Delivered</span>
        </div>
      </div>

      <div className="text-center mt-2 text-gray-700 text-sm">
        Current Status: <span className="font-semibold text-indigo-600">{status}</span>
      </div>
    </div>
  );
}
