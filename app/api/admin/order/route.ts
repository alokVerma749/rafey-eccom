import { NextResponse } from "next/server";
import Order from "@/models/order_model";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

declare module "next-auth" {
  interface Session {
    user: {
      email?: string | null;
      name?: string | null;
      image?: string | null;
      role?: string;
    }
  }
}

// fetch all orders
export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  } else if (session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = new URL(request.url);
  const orderId = url.searchParams.get('orderId');
  const query = orderId ? { _id: orderId } : {};
  const order = await Order.find(query).sort({ createdAt: -1 });
  return NextResponse.json({ message: "Order fetched successfully", order });
}
