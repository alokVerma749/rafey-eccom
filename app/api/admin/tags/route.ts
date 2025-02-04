import { NextRequest, NextResponse } from "next/server";
import Tag from "@/models/tags_model";
import connect_db from "@/config/db";

export async function POST(req: NextRequest) {
  try {
    await connect_db();
    const tag = await req.json()

    if (!tag.name || !tag.category) {
      return NextResponse.json(
        { success: false, message: "Name and category are required" },
        { status: 400 }
      );
    }

    const existingtag = await Tag.findOne({
      name: new RegExp(`^${tag.name}$`, 'i'),
      category: new RegExp(`^${tag.category}$`, 'i')
    });

    if (existingtag) {
      return NextResponse.json(
        { success: false, message: "tag already exists" },
        { status: 400 }
      );
    }

    const newtag = new Tag(tag);
    await newtag.save();

    return NextResponse.json(
      { success: true, tag: newtag },
      { status: 201 }
    );
  } catch (error) {
    console.log(error)
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
