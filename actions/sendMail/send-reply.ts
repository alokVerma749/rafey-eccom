'use server';

import { send_reply_service } from "@/services/mail/send_reply-service";

export interface EmailActionType {
  subject: string;
  msg: string;
  Heading1?: string;
  Heading2?: string;
  userEmail: string
}

const sendReplyAction = async (props: EmailActionType): Promise<string> => {
  try {
    if (!props.subject || !props.msg || !props.userEmail) throw new Error("Subject, message and email are required.");

    const res = await send_reply_service(props);
    return JSON.stringify(res);
  } catch (error) {
    console.error("Error in sendReplyAction:", error);
    return JSON.stringify({ error: error instanceof Error ? error.message : "An unknown error occurred." });
  }
};

export default sendReplyAction;
