import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401 }
      );
    }
    const { packageDetails } = await req.json(); // e.g., { pickup_address, delivery_address, weight, cod_amount }

    const delhiveryUrl = process.env.DELHIVERY_TESTING_URL;

    if (!delhiveryUrl) {
      throw new Error("DELHIVERY_TESTING_URL is not defined in the environment variables.");
    }

    const response = await fetch(delhiveryUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${process.env.DELHIVERY_API_TOKEN}`,
      },
      body: JSON.stringify(packageDetails),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to create shipment');
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
