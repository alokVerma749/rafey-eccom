import { NextRequest, NextResponse } from "next/server";
import connect_db from "@/config/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import Tag from "@/models/tag_schema";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

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

export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connect_db();

    const name = req.nextUrl.searchParams.get('name');
    const category = req.nextUrl.searchParams.get('category');

    if (!name || !category) {
      return NextResponse.json(
        { success: false, message: "Name and category are required" },
        { status: 400 }
      );
    }

    const deletedTag = await Tag.findOneAndDelete({
      name: new RegExp(`^${name}$`, "i"),
      category: new RegExp(`^${category}$`, "i"),
    });

    if (!deletedTag) {
      return NextResponse.json(
        { success: false, message: "Tag not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Tag deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting Tag:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connect_db();

    const tags = await Tag.find({});

    if (!tags) {
      return NextResponse.json(
        { success: false, message: "Error fetching Tags" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Tags fetched successfully", tags },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching Tags:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
