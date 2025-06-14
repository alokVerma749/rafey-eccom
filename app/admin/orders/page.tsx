'use client'

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "@/hooks/use-toast";
import { UserAccount } from "@/models/user_model";
import { Order } from "@/types/order";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import Loader from "@/app/components/Loader";
import Shimmer from "@/app/components/Admin/Orders/Shimmer";

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [originalOrders, setOriginalOrders] = useState<Order[]>([]); // Store the original list of orders
  const [users, setUsers] = useState<Record<string, UserAccount>>({});
  const [loading, setLoading] = useState(true);
  const [searchId, setSearchId] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/admin/order');
        const data = await response.json();

        const userResponses = await Promise.all(
          data.order.map((order: Order) => fetch(`/api/admin/user?userId=${order.user}`))
        );
        const userData = await Promise.all(userResponses.map((res) => res.json()));

        const usersMap = userData.reduce(
          (acc, user) => ({ ...acc, [user.user._id]: user.user }),
          {}
        );

        setOrders(data.order);
        setOriginalOrders(data.order);
        setUsers(usersMap);

        toast({
          title: data.message,
        });
      } catch (error) {
        console.error("Error fetching orders or users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleSort = (status: string) => {
    setOrders(originalOrders.filter((order) => order.orderStatus === status));
  };

  const handleOrderSearch = () => {
    if (!searchId) {
      return toast({
        title: "Please enter order id to search",
      });
    }

    const order = originalOrders.find((order) => order._id === searchId);
    if (!order) {
      return toast({
        title: "Order not found",
      });
    }

    setOrders([order]);
  };

  const resetOrderList = () => {
    setOrders(originalOrders);
    setSearchId("");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full w-full">
        <Loader />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 min-h-screen relative font-marcellus w-[80%]">
      <div className="min-h-screen relative w-full my-6">
        <h2 className="font-semibold text-2xl my-2">Order List</h2>
        {/* order search */}
        <div className="flex justify-between items-center my-8">
          <div className="flex gap-x-2">
            <input
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              type="text"
              placeholder="Search Order By Id"
              className="px-2 py-1 border border-gray-300 rounded-md"
            />
            <button onClick={handleOrderSearch} className="bg-blue-600 text-white px-2 py-1 rounded-md">
              Search Order
            </button>
            <button onClick={resetOrderList} className="bg-gray-600 text-white px-2 py-1 rounded-md">
              Reset List
            </button>
          </div>
        </div>
        <div className="shadow-lg border p-4 rounded-lg">
          {loading ? (
            <Shimmer />
          ) : (
            <>
              <div className="flex justify-between items-center pb-4">
                <h3 className="text-xl font-semibold py-2">Recent Purchases</h3>
                <div className="flex-1 flex justify-end items-center gap-x-6">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="bg-gray-300 px-2 py-1 rounded-md">Sort By</DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleSort("processing")}>Processing</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleSort("shipped")}>Shipped</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleSort("delivered")}>Delivered</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleSort("cancelled")}>Cancelled</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              <Separator />
              <Table>
                <TableHeader>
                  <TableRow className="text-base font-semibold">
                    <TableHead>S.No.</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Customer Name</TableHead>
                    <TableHead>Order Status</TableHead>
                    <TableHead>Payment Status</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead className="text-right">Total Amount</TableHead>
                    <TableHead className="text-right">Payable Amount</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.length > 0 ? (
                    orders.map((order, idx) => {
                      const products = order.products;
                      return (
                        <TableRow key={order._id} className="text-base">
                          <TableCell>{idx + 1}</TableCell>
                          <TableCell>{new Date(order.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "2-digit" })}</TableCell>
                          <TableCell>
                            <div className="flex justify-start items-center">
                              <Image src={users[order.user]?.image} alt="user" height={50} width={50} className="h-8 w-8 rounded-full border mr-2" />
                              {users[order.user]?.name.slice(0, 10)}
                            </div>
                          </TableCell>
                          <TableCell>{order.orderStatus}</TableCell>
                          <TableCell>{order.paymentStatus}</TableCell>
                          <TableCell>{products.length || 0}</TableCell>
                          <TableCell className="text-right">₹{(order.totalAmount).toFixed(2)}</TableCell>
                          <TableCell className="text-right">₹{(order.payableAmount).toFixed(2)}</TableCell>
                          <TableCell className="text-blue-600 text-right cursor-pointer">
                            <Link href={`/admin/orders/${order._id}`}>View</Link>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-4">
                        No products found in this order.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </>
          )}
          {/* <Pagination>
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
      </div>
    </div>
  );
}
