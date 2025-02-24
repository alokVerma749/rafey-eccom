import { NextRequest, NextResponse } from "next/server";
import connect_db from "@/config/db";
import Contact from "@/models/contact";

export async function POST(req: NextRequest) {
  try {
    await connect_db();
    const body = await req.json();
    const contact = await Contact.create(body);
    return NextResponse.json(contact, { status: 201 });
  } catch (error) {
    console.error("Error creating contact:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
