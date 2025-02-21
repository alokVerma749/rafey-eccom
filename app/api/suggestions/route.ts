import connect_db from "@/config/db";
import Products from "@/models/product_model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const url = new URL(request.url);
    const query = url.searchParams.get("q");

    if (!query) {
      return NextResponse.json({ error: "Missing query parameter: q" }, { status: 400 });
    }

    await connect_db();

    const products = await Products.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } }
      ]
    })
      .select("name category")
      .limit(10);

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error("Error fetching product suggestions:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
