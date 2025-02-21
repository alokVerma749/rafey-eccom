import { EmailActionType } from "@/actions/sendMail/send-mail";
import connect_db from "@/config/db";
import UserAccount from "@/models/user_model";
import { sendEmail } from "@/utils/mail";

export const send_mail_service = async (props: EmailActionType) => {
  await connect_db();

  try {
    // Fetch all registered users
    const users = await UserAccount.find({}, { email: 1, name: 1 });

    if (!users.length) throw new Error("No registered users found.");

    // Send emails to all users
    const emailPromises = users.map((user) =>
      sendEmail(user.email, user.name, props.subject, props.msg, props.imageLink, props.couponCode, props.Heading1, props.Heading2)
    );

    await Promise.all(emailPromises);
    return { success: true, message: "Emails sent successfully!" };
  } catch (error) {
    console.error("Error sending mail:", error);
    return { success: false, error: error instanceof Error ? error.message : "An unknown error occurred." };
  }
};
