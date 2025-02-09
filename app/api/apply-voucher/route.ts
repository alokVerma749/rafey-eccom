import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import connect_db from "@/config/db";
import { authOptions } from "@/lib/authOptions";
import DiscountToken from "@/models/discount_token";

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    await connect_db();

    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { voucherCode, cartTotal } = await request.json();
    const voucher = await DiscountToken.findOne({ code: voucherCode, isActive: true });
    if (!voucher) {
      return NextResponse.json(
        { error: 'Invalid voucher' },
        { status: 400 }
      );
    }

    const currentDate = new Date();
    if (new Date(voucher.validFrom) > currentDate || new Date(voucher.validUntil) < currentDate) {
      return NextResponse.json({ message: 'Voucher is not valid at this time' }, { status: 400 });
    }

    if (voucher.usedCount > voucher.maxUsage) {
      return NextResponse.json({ message: 'Voucher reached its maximum usage' }, { status: 200 });
    }

    const discountAmount = (cartTotal * voucher.percentage) / 100;
    const newTotal = cartTotal - discountAmount;

    const updatedVoucher = await DiscountToken.findOneAndUpdate({ code: voucherCode }, { usedCount: voucher.usedCount + 1 }, { new: true });

    return NextResponse.json(
      { message: 'Voucher applied', discountAmount, newTotal, usageRemaining: updatedVoucher },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error applying voucher:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
