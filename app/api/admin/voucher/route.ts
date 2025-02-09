import connect_db from "@/config/db";
import { authOptions } from "@/lib/authOptions";
import DiscountToken from "@/models/discount_token";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    const { user } = session;
    const body = await request.json();
    const { code, percentage, maxUsage, validUntil, minCartValue } = body;

    await connect_db();

    const newVoucher = new DiscountToken({
      code,
      percentage,
      maxUsage,
      validUntil,
      minCartValue,
      createdBy: user.email,
    });
    const savedVoucher = await newVoucher.save();

    return NextResponse.json({ message: "Voucher added successfully", voucher: savedVoucher.code });
  } catch (error) {
    console.error("Error creating vocher:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
