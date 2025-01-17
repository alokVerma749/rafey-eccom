import connect_db from "@/config/db";
import { authOptions } from "@/lib/authOptions";
import Products from "@/models/product_model";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function GET(request: Request): Promise<Response> {
  try {
    const url = new URL(request.url);
    const productId = url.searchParams.get('productId');

    if (!productId) {
      return new Response(
        JSON.stringify({ error: 'Missing required query parameter: productId' }),
        { status: 400 }
      );
    }

    await connect_db();
    const product = await Products.findOne({ _id: productId }).exec();

    if (!product) {
      return new Response(
        JSON.stringify({ error: 'Product not found for the given productId.' }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({ message: 'Product retrieved successfully', product }),
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error fetching product:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500 }
    );
  }
}

// Update Product Stock (PUT)
export async function PUT(request: NextRequest): Promise<NextResponse> {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { productId, quantityPurchased } = await request.json();

    const product = await Products.findById(productId);
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Ensure stock doesn't go negative
    if (product.stock < quantityPurchased) {
      return NextResponse.json({ error: 'Not enough stock available' }, { status: 400 });
    }

    const updatedStock = product.stock - quantityPurchased;
    await Products.updateOne({ _id: productId }, { $set: { stock: updatedStock } });

    return NextResponse.json({ message: 'Product stock updated' }, { status: 200 });
  } catch (error) {
    console.error("Error updating product stock:", error);
    return NextResponse.json({ message: 'Failed to update product stock' }, { status: 500 });
  }
}
