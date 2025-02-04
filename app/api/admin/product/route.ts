import connect_db from "@/config/db";
import Products from "@/models/product_model";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    await connect_db();
    const url = new URL(request.url);
    const productId = url.searchParams.get('productId');
    const query = productId ? { _id: productId } : {};
    const product = await Products.find(query);
    return NextResponse.json({ message: "Product fetched successfully", product });
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    await connect_db();

    const subCategoryIds = (body.subCategories || []).map((id: string) =>
      mongoose.isValidObjectId(id) ? new mongoose.Types.ObjectId(id) : null
    ).filter((id: string) => id !== null);

    const tagIds = (body.tags || []).map((id: string) =>
      mongoose.isValidObjectId(id) ? new mongoose.Types.ObjectId(id) : null
    ).filter((id: string) => id !== null);

    const newProduct = new Products({
      name: body.name,
      description: body.description,
      price: body.price,
      stock: body.stock,
      category: body.category,
      subCategories: subCategoryIds,
      tags: tagIds,
      images: {
        thumbnail: body.image,
        medium: body.image,
        large: body.image,
      },
      discount: {
        percentage: body.discount || 0,
        startDate: new Date(),
        endDate: null,
      },
    });

    console.log(newProduct, '###')

    const savedProduct = await newProduct.save();

    return NextResponse.json({ message: "Product listed successfully", product: savedProduct });
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
