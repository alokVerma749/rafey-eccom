import { NextRequest, NextResponse } from "next/server";
import connect_db from "@/config/db";
import SubCategory from "@/models/sub_category";

export async function POST(req: NextRequest) {
  try {
    await connect_db();
    const subCategory = await req.json()

    if (!subCategory.name || !subCategory.category) {
      return NextResponse.json(
        { success: false, message: "Name and category are required" },
        { status: 400 }
      );
    }

    const existingSubCategory = await SubCategory.findOne({
      name: new RegExp(`^${subCategory.name}$`, 'i'),
      category: new RegExp(`^${subCategory.category}$`, 'i')
    });

    if (existingSubCategory) {
      return NextResponse.json(
        { success: false, message: "Subcategory already exists" },
        { status: 400 }
      );
    }

    const newSubCategory = new SubCategory(subCategory);
    await newSubCategory.save();

    return NextResponse.json(
      { success: true, subCategory: newSubCategory },
      { status: 201 }
    );
  } catch (error) {
    console.log(error)
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
