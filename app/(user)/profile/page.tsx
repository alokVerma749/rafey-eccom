import Image from "next/image";
import Link from "next/link";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { getUser } from "@/db_services/user";
import { UserAccount } from "@/models/user_model";
import { getOrders } from "@/db_services/order";
import { Order } from "@/types/order";
import { PenLine } from 'lucide-react'
import { Button } from "@/components/ui/button";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!["user", "admin"].includes(session.user.role as string)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await getUser(session.user.email);
  const userData: UserAccount = JSON.parse(user);

  const orders = await getOrders(userData._id);
  const ordersData: Order[] = JSON.parse(orders);

  console.log(ordersData, "&&&&&&&&&&&&&&&")

  return (
    <div className="max-w-5xl px-6 py-10">
      {/* Profile Header */}
      <h1 className="text-lg sm:text-xl lg:text-2xl sm:font-semibold">User Profile</h1>
      <div className="bg-white p-6 flex items-center gap-6">
        <Image
          src={userData.image || "/default-avatar.png"} height={200} width={200}
          alt="Profile Picture"
          className="w-20 h-20 rounded-full object-cover"
        />
        <div>
          <h1 className="text-xl font-semibold text-gray-800 mb-2">{userData.name}</h1>
          <p className="text-gray-600 text-sm">{userData.email}</p>
        </div>
        <Button className="mt-4 px-4 py-[2px] bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex justify-start">
          <PenLine />Edit
        </Button>
      </div>

      {/* Order History */}
      

      <div className="flex flex-col gap-4">

        <h1>My Orders</h1>
        {ordersData.map((order) => (
          <Link href={`/orders/${order._id}`} key={order._id} className="flex flex-col gap-2 border border-gray-300 p-4 rounded-md">

            <div className="flex justify-between items-start border">
              {/* <Image src={(order.products[0].images as any).medium} alt={`Product image of ${order.products[0].name}`} height={200} width={200}></Image> */}
            <div className="flex flex-col items-start justify-center gap-y-1">
            <p><strong>Product:</strong> {order.products[0].name}</p>
            <p><strong>Order ID:</strong> {order._id}</p>
            <p><strong>Order Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
            <p><strong>Order status:</strong> {order.orderStatus}</p>
            <p><strong>Total Products:</strong> {order.products.length}</p>
            </div>
            <div className="flex flex-col items-start justify-center gap-y-2">
            <p>Total Amount: {order.totalAmount}</p>
            <p>Payment ID: {order.paymentId}</p>
            <p>Payment Status: {order.paymentStatus}</p>
            </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
