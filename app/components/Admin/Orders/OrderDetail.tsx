import { ContactRound, BriefcaseBusiness, MapPin } from 'lucide-react';
import { Order } from "@/types/order";
import { UserAccount } from "@/models/user_model";

const OrderDetails = ({ order, user }: { order: Order, user: UserAccount }) => {
  return (
    <div className="p-4 bg-white shadow rounded-lg w-full mx-auto">
      <div>
        <div className="flex justify-start gap-x-4 items-center pb-2">
          <h2 className="text-lg"><strong>Orders ID: </strong>{order._id}</h2>
          <span className="px-3 py-1 text-sm font-medium text-white bg-yellow-500 rounded">{order.orderStatus}</span>
        </div>

        <div className="flex justify-between items-center pb-4">
          <p> Order Date: {new Date(order.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "2-digit" })}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Customer Info */}
        <div className="p-2 border rounded-lg h-[230px] relative">
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
        <div className="p-4 border rounded-lg h-[230px] relative">
          <div className="flex justify-start items-start space-x-2">
            <BriefcaseBusiness size={28} strokeWidth={1.5} />
            <div className="font-sans flex flex-col gap-y-2">
              <h3 className="font-bold mb-2 text-xl">Order Info</h3>
              <p className="text-sm text-gray-700 font-medium">Shipping: {order.orderStatus === "processing" ? "Processing" : order.orderStatus === "shipped" ? "Shipped" : order.orderStatus === "delivered" ? "Delivered" : "Cancelled"}</p>
              <p className="text-sm text-gray-700 font-medium">
                <strong>Payment Status:</strong>{" "}
                <span className={`px-2 py-1 m-2 rounded ${order.paymentStatus === "captured" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                  {order.paymentStatus}
                </span>
              </p>
              <p className="text-sm text-gray-700 font-medium">
                <strong>Date: </strong>
                {new Date(order.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "2-digit" })}
              </p>
              <p className="text-sm text-gray-700 font-medium">
                <strong>Total Amount:</strong> ₹{order.totalAmount}
              </p>
            </div>
          </div>
        </div>

        {/* Deliver To */}
        <div className="p-4 border rounded-lg h-[230px] relative">
          <div className="flex justify-start items-start space-x-2">
            <MapPin size={96} strokeWidth={1.5} height={28}/>
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
