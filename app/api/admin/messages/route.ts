import connect_db from "@/config/db";
import Contact from "@/models/contact";

export async function GET(request: Request) {
  try {
    await connect_db();

    const url = new URL(request.url);
    const msgId = url.searchParams.get("userId");

    let msg;
    if (msgId) {
      msg = await Contact.find({ _id: msgId });
      if (!msg) {
        return new Response(
          JSON.stringify({ message: "User not found" }),
          { status: 404 }
        );
      }
    } else {
      msg = await Contact.find();
    }

    return new Response(
      JSON.stringify({ message: "Message(s) retrieved successfully", msg }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching messages:", error);
    return new Response(
      JSON.stringify({ message: "Internal Server Error" }),
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    await connect_db();

    const url = new URL(request.url);
    const msgId = url.searchParams.get("msgId");

    if (!msgId) {
      return new Response(
        JSON.stringify({ message: "Message ID is required" }),
        { status: 400 }
      );
    }

    const msg = await Contact.findByIdAndDelete(msgId);

    if (!msg) {
      return new Response(
        JSON.stringify({ message: "Message not found" }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({ message: "Message deleted successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting message:", error);
    return new Response(
      JSON.stringify({ message: "Internal Server Error" }),
      { status: 500 }
    );
  }
}
