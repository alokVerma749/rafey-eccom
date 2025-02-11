import connect_db from "@/config/db";
import Products from "@/models/product_model";
import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse> {
  try {
    await connect_db();
    const sales = await Products.find({ onSale: true }).exec();

    return NextResponse.json({ message: 'Sales retrieved successfully', sales }, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching sales:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
