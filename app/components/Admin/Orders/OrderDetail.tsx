import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ContactRound, BriefcaseBusiness } from 'lucide-react'
import { Order } from "@/types/order";
import { UserAccount } from "@/models/user_model";

const OrderDetails = ({ order, user }: { order: Order, user: UserAccount }) => {
  return (
    <div className="p-4 bg-white shadow rounded-lg w-full max-w-5xl mx-auto">
      <div>
        <div className="flex justify-start gap-x-4 items-center pb-2">
          <h2 className="text-lg"><strong>Orders ID: </strong>{order._id}</h2>
          <span className="px-3 py-1 text-sm font-medium text-white bg-yellow-500 rounded">{order.orderStatus}</span>
        </div>
        <div className="flex justify-between items-center pb-4">
          <p className="">{new Date(order.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "2-digit" })} - Feb 22, 2022</p>
          <div className="flex justify-start items-center gap-x-6">
            <DropdownMenu>
              <DropdownMenuTrigger className="bg-gray-300 px-2 py-[6px] rounded-md">Change Status</DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Pending</DropdownMenuItem>
                <DropdownMenuItem>Out For Delivery</DropdownMenuItem>
                <DropdownMenuItem>Delivered</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button>Save</Button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        {/* Customer Info */}
        <div className="p-2 border rounded-lg h-[230px] relative">
          <div className="flex justify-start items-start space-x-2">
            <ContactRound size={36} />
            <div className="font-sans">
              <h3 className="font-bold mb-2 text-xl">Customer</h3>
              <p className="text-base text-gray-700 font-medium">
                <strong>Name:</strong> {user.name}
              </p>
              <p className="text-base text-gray-700 font-medium">
                <strong>Email:</strong> {user.email}
              </p>
              <p className="text-base text-gray-700 font-medium">
                <strong>Phone:</strong> {user.phone}
              </p>
              <p className="text-base text-gray-700 font-medium">
                <strong>Address:</strong> {user.address} {user.pincode} {user.state} {user.country}
              </p>
            </div>
          </div>
          <div className="absolute bottom-2 left-2 right-2">
            <Button className="py-1 w-full bg-[#003f62]">View Profile</Button>
          </div>
        </div>

        {/* Order Info */}
        <div className="p-4 border rounded-lg h-[230px] relative">
          <div className="flex justify-start items-start space-x-2">
            <BriefcaseBusiness size={36} />
            <div className="font-sans">
              <h3 className="font-bold mb-2 text-xl">Order Info</h3>
              <p className="text-base text-gray-700 font-medium">Shipping: Next Express</p>
              <p className="text-base text-gray-700 font-medium">
                <strong>Payment Status:</strong>{" "}
                <span className={`px-2 py-1 my-1 rounded ${order.paymentStatus === "Paid" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                  {order.paymentStatus}
                </span>
              </p>
              <p className="text-base text-gray-700 font-medium">
                <strong>Date: </strong>
                {new Date(order.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "2-digit" })}
              </p>
              <p className="text-base text-gray-700 font-medium">
                <strong>Total Amount:</strong> ${order.totalAmount}
              </p>
            </div>
          </div>
          <div className="absolute bottom-2 left-2 right-2">
            <Button className="py-1 w-full bg-[#003f62]">Download Info</Button>
          </div>
        </div>

        {/* Deliver To */}
        <div className="p-4 border rounded-lg h-[230px] relative">
          <div className="flex justify-start items-start space-x-2">
            <BriefcaseBusiness size={36} />
            <div className="font-sans">
              <h3 className="font-bold mb-2 text-xl">Deliver to</h3>
              <p className="text-base text-gray-700 font-medium">
                <strong>Address:</strong> {user.address}, {user.pincode}, {user.state}, {user.country}
              </p>
            </div>
          </div>
          <div className="absolute bottom-2 left-2 right-2">
            <Button className="py-1 w-full bg-[#003f62]">View Profile</Button>
          </div>
        </div>
      </div>

      {/* Payment Info & Notes */}
      <div className="flex justify-start gap-x-10 mt-4 font-sans">
        <div className="p-4 border rounded-lg w-1/3">
          <h3 className="font-bold mb-2 text-xl">Payment Info</h3>
          <p className="text-base text-gray-700 font-medium"><strong>Payment Method:</strong> {order.paymentId}</p>
          <p className="text-base text-gray-700 font-medium"><strong>Business Name: </strong>{user.name}</p>
          <p className="text-base text-gray-700 font-medium"><strong>Payment Method:</strong> {order.paymentStatus}</p>
        </div>
        <div className="rounded-lg w-2/3">
          <h3 className="font-bold mb-2 text-xl">Note</h3>
          <textarea className="w-full p-2 border rounded text-base font-medium" placeholder="Type some notes"></textarea>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
