import { NextRequest, NextResponse } from "next/server";
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

export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    } else if (session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { status, orderId } = await request.json()

    const validStatuses = ["processing", "shipped", "delivered", "cancelled"]
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ message: "Invalid status value" }, { status: 400 })
    }

    const order = await Order.findById(orderId)

    if (!order) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 })
    }

    order.orderStatus = status
    await order.save()

    return NextResponse.json({
      message: "Order status updated successfully",
      order: {
        _id: order._id,
        orderStatus: order.orderStatus,
        updatedAt: new Date(),
      },
    })
  } catch (error) {
    console.error("Error updating order status:", error)
    return NextResponse.json(
      { message: "Failed to update order status", error: (error as Error).message },
      { status: 500 },
    )
  }
}
