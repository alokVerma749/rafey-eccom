import { NextRequest, NextResponse } from "next/server";
import Order from "@/models/order_model";

// save order summary in database
export async function POST(req: NextRequest) {
  const body = await req.json();
  const order = await Order.create(body);
  return NextResponse.json(order);
}

// get user orders
export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get('userId'); //next-auth userId
  const orderId = req.nextUrl.searchParams.get('orderId');

  if (!userId) {
    NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  if (orderId) {
    const order = await Order.findById(orderId);
    console.log(order);
    return NextResponse.json({ message: "Order fetched successfully", order });
  }
  const order = await Order.find({ user: userId });
  return NextResponse.json({ message: "Orders fetched successfully", order });
}
