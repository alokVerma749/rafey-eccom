import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import connect_db from "@/config/db";
import Products from "@/models/product_model";
import SubCategory from "@/models/sub_category";
import Tag from "@/models/tag_schema";

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

    // Fetch subcategory IDs from names
    const subCategoryIds = await Promise.all(
      (body.subCategory || []).map(async (name: string) => {
        const subCategory = await SubCategory.findOne({ name });
        return subCategory ? subCategory._id : null;
      })
    );

    // Fetch tag IDs from names
    const tagIds = await Promise.all(
      (body.tags || []).map(async (name: string) => {
        const tag = await Tag.findOne({ name });
        return tag ? tag._id : null;
      })
    );

    // Filter out null values (invalid/missing entries)
    const validSubCategoryIds = subCategoryIds.filter((id) => id !== null);
    const validTagIds = tagIds.filter((id) => id !== null);

    const newProduct = new Products({
      name: body.name,
      description: body.description,
      height: body.height,
      width: body.width,
      weight: body.weight,
      fragrance: body?.fragrance || '',
      price: body.price,
      stock: body.stock,
      category: body.category,
      subCategories: validSubCategoryIds,
      tags: validTagIds,
      images: body.images,
      discount: {
        percentage: body.discount || 0,
        startDate: new Date(),
        endDate: null,
      },
      onSale: body.onSale || false,
      isCustomizable: body.iscustomizable || false,
    });

    const savedProduct = await newProduct.save();

    return NextResponse.json({ message: "Product listed successfully", product: savedProduct });
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { _id, ...updateData } = body;

    if (!mongoose.isValidObjectId(_id)) {
      return NextResponse.json({ error: "Invalid product ID" }, { status: 400 });
    }

    await connect_db();

    const subCategoryIds = (body.subCategories || [])
      .map((id: string) => (mongoose.isValidObjectId(id) ? new mongoose.Types.ObjectId(id) : null))
      .filter((id: mongoose.Types.ObjectId | null): id is mongoose.Types.ObjectId => id !== null);

    const tagIds = (body.tags || [])
      .map((id: string) => (mongoose.isValidObjectId(id) ? new mongoose.Types.ObjectId(id) : null))
      .filter((id: mongoose.Types.ObjectId | null): id is mongoose.Types.ObjectId => id !== null);

    const updatedProduct = await Products.findByIdAndUpdate(
      _id,
      {
        ...updateData,
        subCategories: subCategoryIds,
        tags: tagIds,
        discount: updateData.discount !== undefined
          ? {
            percentage: Number(updateData.discount.percentage) ?? 0,
            startDate: updateData.discount.startDate ? new Date(updateData.discount.startDate) : new Date(),
            endDate: updateData.discount.endDate ? new Date(updateData.discount.endDate) : null,
          }
          : undefined,
        onSale: updateData.onSale || false,
      },
      { new: true }
    );

    if (!updatedProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Product updated successfully", product: updatedProduct });
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { id } = body;

    if (!mongoose.isValidObjectId(id)) {
      return NextResponse.json({ error: "Invalid product ID" }, { status: 400 });
    }

    await connect_db();

    const deletedProduct = await Products.findByIdAndDelete(id);
    if (!deletedProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
