import { NextRequest, NextResponse } from "next/server";
import Order from "@/models/order_model";
import Products from "@/models/product_model";

// save order summary in database
export async function POST(req: NextRequest) {
  const body = await req.json();
  const order = await Order.create(body);
  return NextResponse.json(order);
}

// get user orders
export async function GET(req: NextRequest) {
  const orderId = req.nextUrl.searchParams.get('orderId');

  if (!orderId) {
    NextResponse.json({ error: "Order ID is required" }, { status: 400 });
  }

  const order = await Order.findById(orderId);
  if (!order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  const productDetails = await Promise.all(
    order.products.map(async (item: { product: string, quantity: number }) => {
      const id = item.product
      const product = await Products.findById(id);
      return product ? product.toObject() : null;
    })
  );

  const res = productDetails.filter(Boolean);

  return NextResponse.json({ message: "Order fetched successfully", order, products: res });
}
