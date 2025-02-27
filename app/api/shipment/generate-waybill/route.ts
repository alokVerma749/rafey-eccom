import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401 }
      );
    }

    const response = await fetch("https://staging-express.delhivery.com/waybill/api/bulk/json/?count=1", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${process.env.DELHIVERY_API_TOKEN_MAIL}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to generate waybill');
    }

    const data = await response.json();
    return NextResponse.json(
      { message: 'Shipment created', data },
      { status: 201 }
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error creating shipment:', error.message);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    } else {
      console.error('Unknown error:', error);
      return NextResponse.json(
        { error: 'An unknown error occurred' },
        { status: 500 }
      );
    }
  }
}
