import { Resend } from "resend";
import SendOTPMail from "@/components/Emails/SendOTPMail";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail({
  email,
  subject,
  template,
  data,
}: {
  email: string;
  subject: string;
  template: "confirmEmail";
  data: any;
}) {
  const templates = {
    confirmEmail: SendOTPMail,
  };

  const EmailComponent = templates[template];
  if (!EmailComponent) throw new Error("Invalid template");

  return resend.emails.send({
    from: "Floosy <floosy@yassin.icu>",
    to: [email],
    subject,
    react: EmailComponent(data),
  });
}
