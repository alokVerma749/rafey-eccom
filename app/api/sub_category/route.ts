import { NextResponse } from "next/server";
import connect_db from "@/config/db";
import SubCategory from "@/models/sub_category";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const url = new URL(request.url);
    const category = url.searchParams.get('category');

    await connect_db();

    const query = category ? { category } : {};
    const subCategories = await SubCategory.find(query).sort({ createdAt: -1 });

    return NextResponse.json(
      { success: true, subCategories },
      { status: 201 }
    );
  } catch (error) {
    console.log(error)
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
