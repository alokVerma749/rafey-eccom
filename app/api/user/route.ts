import connect_db from "@/config/db";
import UserAccount from "@/models/user_model";

export async function GET(request: Request): Promise<Response> {
  try {
    const url = new URL(request.url);
    const email = url.searchParams.get('email');

    if (!email) {
      return new Response(
        JSON.stringify({ error: 'Missing required query parameter: userId' }),
        { status: 400 }
      );
    }

    await connect_db();

    const user = await UserAccount.findOne({ email });

    if (!user) {
      return new Response(
        JSON.stringify({ error: 'User not found for the given email.' }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({ message: 'User retrieved successfully', user }),
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error fetching user:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500 }
    );
  }
}
