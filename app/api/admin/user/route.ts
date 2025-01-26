import connect_db from "@/config/db";
import UserAccount from "@/models/user_model";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const userId = url.searchParams.get('userId');

    await connect_db();

    const user = await UserAccount.findOne({ _id: userId });

    return new Response(
      JSON.stringify({ message: 'User retrieved successfully', user }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching user:", error);
  }
}
