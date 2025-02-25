import { NextRequest, NextResponse } from "next/server";
import connect_db from "@/config/db";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const pincode = searchParams.get("pincode");

  if (!pincode) {
    return NextResponse.json({ message: 'Pincode is required' }, { status: 400 });
  }

  await connect_db();

  try {
    const response = await fetch(`https://staging-express.delhivery.com/c/api/pin-codes/json/?filter_codes=${pincode}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${process.env.DELHIVERY_API_TOKEN_MAIL}`,
      },
    });


    if (!response.ok) {
      throw new Error('Failed to fetch pincode data');
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Error fetching pincode data:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
