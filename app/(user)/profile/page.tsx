import Link from "next/link";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { getUser } from "@/db_services/user";
import { UserAccount } from "@/models/user_model";
import { getOrders } from "@/db_services/order";
import { Order } from "@/types/order";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  } else if (session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await getUser(session.user.email);
  const userData: UserAccount = JSON.parse(user);

  const orders = await getOrders(userData._id);
  const ordersData: Order[] = JSON.parse(orders);

  return (
    <div>
      <div>
        <h1>Profile</h1>
        <p>{userData.name}</p>
        <p>{userData.email}</p>
        <p>{userData.phone}</p>
        <p>{userData.address}</p>
      </div>

      <div>
        <h1>Orders</h1>
        <div className="flex flex-col gap-4 border border-gray-300 p-4 rounded-md">
          {ordersData.map((order) => (
            <Link href={`/orders/${order._id}`} key={order._id} className="flex flex-col gap-2 border border-gray-300 p-4 rounded-md">
              <p>Order ID: {order._id}</p>
              <p>Order Date: {new Date(order.createdAt).toLocaleDateString()}</p>
              <p>Order Status: {order.orderStatus}</p>
              <p>Total Amount: {order.totalAmount}</p>
              <p>Payment ID: {order.paymentId}</p>
              <p>Payment Status: {order.paymentStatus}</p>
              <p>Total Products: {order.products.length}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}