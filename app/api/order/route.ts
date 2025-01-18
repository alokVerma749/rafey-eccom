import Order from "@/models/order_model";
import { NextRequest, NextResponse } from "next/server";

// save order summary in database
export async function POST(req: NextRequest) {
  const body = await req.json();
  const order = await Order.create(body);
  return NextResponse.json(order);
}

// get user orders
export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get('userId'); //next-auth userId
  if (!userId) {
    NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }
  const order = await Order.find({ user: userId });
  return NextResponse.json({ message: "Orders fetched successfully", order });
}
