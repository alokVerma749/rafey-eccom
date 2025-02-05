import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import Tag from "@/models/tag_schema";
import connect_db from "@/config/db";
import { authOptions } from "@/lib/authOptions";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connect_db();

    const tags = await Tag.find({})

    return NextResponse.json(
      { success: true, tags },
      { status: 201 }
    );
  } catch (error) {
    console.log(error)
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
