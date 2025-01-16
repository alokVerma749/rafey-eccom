import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    console.log(req, "Webhook received");
  } catch (error) {
    console.log(error);
  }
}