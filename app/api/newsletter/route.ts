import { NextResponse } from "next/server";
import { getClientIp, rejectIfRateLimited, rejectOversizedBody } from "@/lib/api-guards";
import { contactInboxReady, sendSiteEmail } from "@/lib/site-mail";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const oversized = rejectOversizedBody(request);
  if (oversized) return oversized;

  const limited = rejectIfRateLimited(getClientIp(request));
  if (limited) return limited;

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const email =
    typeof json === "object" && json !== null && "email" in json && typeof (json as { email: unknown }).email === "string"
      ? (json as { email: string }).email.trim()
      : "";

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Valid email required" }, { status: 400 });
  }

  if (!contactInboxReady()) {
    return NextResponse.json({ error: "Email capture is not connected yet" }, { status: 503 });
  }

  const to = process.env.CONTACT_TO?.trim() ?? "";
  if (!to) {
    return NextResponse.json({ error: "Email capture is not connected yet" }, { status: 503 });
  }
  try {
    await sendSiteEmail({
      to,
      subject: "Website checklist signup",
      text: `Someone requested the Oklahoma small business website checklist.\n\nEmail: ${email}\n`,
      replyTo: email,
    });
  } catch {
    return NextResponse.json({ error: "Could not send" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
