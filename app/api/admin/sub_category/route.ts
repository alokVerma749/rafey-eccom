import { NextRequest, NextResponse } from "next/server";
import connect_db from "@/config/db";
import SubCategory from "@/models/sub_category";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connect_db();

    const subCategories = await SubCategory.find({})

    return NextResponse.json(
      { success: true, subCategories },
      { status: 201 }
    );
  } catch (error) {
    console.log(error)
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

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

export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connect_db();

    const category = await req.json()
    const name = req.nextUrl.searchParams.get('name');

    if (!name || !category) {
      return NextResponse.json(
        { success: false, message: "Name and category are required" },
        { status: 400 }
      );
    }

    const deletedSubCategory = await SubCategory.findOneAndDelete({
      name: new RegExp(`^${name}$`, "i"),
      category: new RegExp(`^${category}$`, "i"),
    });

    if (!deletedSubCategory) {
      return NextResponse.json(
        { success: false, message: "Subcategory not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Subcategory deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting subcategory:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
