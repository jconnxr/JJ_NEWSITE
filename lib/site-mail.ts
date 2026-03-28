import nodemailer from "nodemailer";

/** SMTP credentials + from address (shared by all outbound site mail). */
export function smtpAuthConfigured(): boolean {
  const { SMTP_HOST, SMTP_USER, SMTP_PASS, SMTP_FROM } = process.env;
  return Boolean(SMTP_HOST && SMTP_USER && SMTP_PASS && SMTP_FROM);
}

export function contactInboxReady(): boolean {
  return smtpAuthConfigured() && Boolean(process.env.CONTACT_TO?.trim());
}

/** Booking emails go here if set; otherwise same inbox as product inquiries. */
export function getBookingRecipient(): string | undefined {
  const booking = process.env.BOOKING_TO?.trim();
  if (booking) return booking;
  return process.env.CONTACT_TO?.trim();
}

export function bookingInboxReady(): boolean {
  return smtpAuthConfigured() && Boolean(getBookingRecipient());
}

export async function sendSiteEmail(params: {
  to: string;
  subject: string;
  text: string;
  replyTo?: string;
}): Promise<void> {
  const port = Number(process.env.SMTP_PORT || "587");
  const secure = process.env.SMTP_SECURE === "true" || port === 465;

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: params.to,
    ...(params.replyTo ? { replyTo: params.replyTo } : {}),
    subject: params.subject,
    text: params.text,
  });
}
