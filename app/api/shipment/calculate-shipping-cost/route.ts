import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const d_pin = searchParams.get("d_pin"); // destination pincode
  const cgm = searchParams.get("cgm"); // Charged weight in grams

  if (!d_pin || !cgm) {
    return NextResponse.json({ message: 'Missing required query parameters' }, { status: 400 });
  }

  try {
    const response = await fetch(`https://staging-express.delhivery.com/api/kinko/v1/invoice/charges/.json?md=S&ss=Delivered&d_pin=${d_pin}&o_pin=${process.env.NEXT_PUBLIC_WAREHOUSE_PINCODE}&cgm=${cgm}&pt=Pre-paid&cod=0`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${process.env.DELHIVERY_API_TOKEN_MAIL}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch shipping cost data');
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Error fetching shipping cost data:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
