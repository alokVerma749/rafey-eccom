import { NextRequest, NextResponse } from 'next/server';

export default async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const awbNumber = searchParams.get('awbNumber');

  if (!awbNumber) {
    return NextResponse.json({ error: 'AWB number is required' }, { status: 400 });
  }

  try {
    // Make the request to the Delhivery API
    const response = await fetch(`https://track.delhivery.com/api/v1/packages/json/?waybill=${awbNumber}`, {
      headers: {
        Authorization: `Token ${process.env.DELHIVERY_API_TOKEN}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to track shipment');
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });

  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error tracking shipment:', error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      console.error('Unknown error:', error);
      return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
    }
  }
}
