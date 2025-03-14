import connect_db from "@/config/db";
import UserAccount from "@/models/user_model";
import { sendEmailReply } from "@/utils/mailReply";

interface EmailReplyActionType {
  subject: string;
  msg: string;
  Heading1?: string;
  Heading2?: string;
  userEmail: string;
}

export const send_reply_service = async (props: EmailReplyActionType) => {
  await connect_db();

  try {
    // Fetch all registered users
    const user = await UserAccount.find({ email: props.userEmail }, { email: 1, name: 1 });
    const userEamil = user[0].email || props.userEmail;
    if (!user) throw new Error("No registered user found.");

    // Send emails to all users
    sendEmailReply(userEamil, props.subject, props.msg, props.Heading1, props.Heading2);

    return { success: true, message: "Emails sent successfully!" };
  } catch (error) {
    console.error("Error sending mail:", error);
    return { success: false, error: error instanceof Error ? error.message : "An unknown error occurred." };
  }
};
