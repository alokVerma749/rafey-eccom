import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { getUser } from "@/db_services/user";
import { UserAccount } from "@/models/user_model";
import { getOrders } from "@/db_services/order";
import { Order } from "@/types/order";

const OrderHistory = async () => {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email || !["user", "admin"].includes(session.user.role as string)) {
    return <p className="text-red-500 text-center">Unauthorized</p>;
  }

  // Fetch user details
  const user = await getUser(session.user.email);
  if (!user) {
    return <p className="text-red-500 text-center">User not found</p>;
  }

  const userData: UserAccount = JSON.parse(user);

  const orders = await getOrders(userData._id);
  const ordersData: Order[] = JSON.parse(orders);

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-10 shadow-md my-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
          ORDER HISTORY{" "}
          <span className="text-gray-500">({ordersData.length} Orders)</span>
        </h2>
      </div>

      {ordersData.length === 0 ? (
        <p className="text-center text-gray-600">No orders found.</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {ordersData.map((order) => (
            <li key={order._id} className="py-4">
              <div className="flex flex-col sm:flex-row justify-between items-start  ">
                <div>
                  <p className="text-base text-gray-700">
                    Order ID: <span className="font-semibold">{order._id}</span>
                  </p>
                  <p className="text-base text-gray-600">Status: {order.orderStatus}</p>
                  <p className="text-base text-green-600">Total: ₹{order.payableAmount && order.payableAmount.toFixed(2)} <span className="line-through text-gray-600">₹{order.totalAmount.toFixed(2)}</span></p>
                  <p className="text-base text-gray-600">Quantity: {order.products.length}</p>
                  <p className="text-base text-gray-600">
                    Payment:{" "}
                    <span className={`font-semibold ${order.paymentStatus === "pending" ? "text-red-500" : "text-green-500"}`}>
                      {order.paymentStatus}
                    </span>
                  </p>
                  <p className="text-base text-gray-500">
                    Placed on: {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>
                <Link href={`/profile/order-history/${order._id}`} className="text-blue-500 hover:underline">
                  View Details
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* <Pagination className="mt-6">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination> */}
    </div>
  );
};

export default OrderHistory;
