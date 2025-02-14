import connect_db from "@/config/db";
import UserAccount from "@/models/user_model";

export async function GET(request: Request) {
  try {
    await connect_db();

    const url = new URL(request.url);
    const userId = url.searchParams.get("userId");

    let user;
    if (userId) {
      user = await UserAccount.findOne({ _id: userId });
      if (!user) {
        return new Response(
          JSON.stringify({ message: "User not found" }),
          { status: 404 }
        );
      }
    } else {
      user = await UserAccount.find();
    }

    return new Response(
      JSON.stringify({ message: "User(s) retrieved successfully", user }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching user:", error);
    return new Response(
      JSON.stringify({ message: "Internal Server Error" }),
      { status: 500 }
    );
  }
}
