import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Check if the user is authenticated
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Parse the request body
    const requestBody = await req.json();

    // Make the API request to Delhivery
    const response = await fetch(
      "https://staging-express.delhivery.com/api/backend/clientwarehouse/create/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Token ${process.env.DELHIVERY_API_TOKEN_MAIL}`,
        },
        body: JSON.stringify(requestBody),
      }
    );

    // Check if the request was successful
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Failed to create warehouse");
    }

    // Parse the response
    const data = await response.json();

    return NextResponse.json(
      { message: "Warehouse created successfully", data },
      { status: 201 }
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error creating warehouse:", error.message);
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
