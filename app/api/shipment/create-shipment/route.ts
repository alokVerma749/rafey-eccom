import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { packageDetails } = await req.json();

    const requestBody = new URLSearchParams();
    requestBody.append("format", "json");
    requestBody.append("data", JSON.stringify(packageDetails));

    const response = await fetch(
      "https://staging-express.delhivery.com/api/cmu/create.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Accept": "application/json",
          "Authorization": `Token ${process.env.DELHIVERY_API_TOKEN_MAIL}`,
        },
        body: requestBody.toString(),
      }
    );


    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Failed to create shipment");
    }

    const data = await response.json();

    return NextResponse.json(
      { message: "Shipment created", data },
      { status: 201 }
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error creating shipment:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      console.error("Unknown error:", error);
      return NextResponse.json(
        { error: "An unknown error occurred" },
        { status: 500 }
      );
    }
  }
}
