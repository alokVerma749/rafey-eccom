import connect_db from "@/config/db";
import Product from "@/models/product_model";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    await connect_db();
    const url = new URL(request.url);
    const productId = url.searchParams.get('productId');
    const product = await Product.findOne({ _id: productId });
    return NextResponse.json({ message: "Product fetched successfully", product });
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
