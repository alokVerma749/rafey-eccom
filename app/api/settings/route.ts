import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import connect_db from "@/config/db";
import AdminSettings from "@/models/admin_settings";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connect_db();

  const settings = await AdminSettings.findOne({});
  if (!settings) {
    return NextResponse.json({ error: "Settings not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Settings fetched successfully", settings });
}
