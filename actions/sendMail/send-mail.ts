'use server';

import { send_mail_service } from "@/services/mail/send_mail_service";

export interface EmailActionType {
  subject: string;
  msg: string;
  imageLink?: string;
  couponCode?: string;
  link?: string;
  Heading1?: string;
  Heading2?: string;
}

const sendMailAction = async (props: EmailActionType): Promise<string> => {
  try {
    if (!props.subject || !props.msg) throw new Error("Subject and message are required.");

    const res = await send_mail_service(props);
    return JSON.stringify(res);
  } catch (error) {
    console.error("Error in sendMailAction:", error);
    return JSON.stringify({ error: error instanceof Error ? error.message : "An unknown error occurred." });
  }
};

export default sendMailAction;
