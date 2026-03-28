import { NextResponse } from "next/server";
import { contactInboxReady, sendSiteEmail } from "@/lib/site-mail";

export const runtime = "nodejs";

type Body = {
  name: string;
  email: string;
  phone?: string;
  businessName: string;
  focus: string;
  goals?: string;
  fax?: string;
};

function buildEmailMessage(data: Body): string {
  return [
    `New product / build inquiry from your site`,
    ``,
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone || "(not provided)"}`,
    `Business: ${data.businessName}`,
    `Focus: ${data.focus}`,
    ``,
    `Goals / context:`,
    data.goals?.trim() || "(none provided)",
  ].join("\n");
}

export async function POST(request: Request) {
  let json: Body;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (json.fax?.trim()) {
    return NextResponse.json({ ok: true });
  }

  const { name, email, businessName, focus } = json;
  if (!name?.trim() || !email?.trim() || !businessName?.trim() || !focus?.trim()) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  if (!emailOk) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  if (!contactInboxReady()) {
    console.warn("[contact] SMTP not fully configured — submission not sent:", {
      name: name.trim(),
      businessName: businessName.trim(),
    });
    return NextResponse.json(
      {
        error:
          "Form email is not configured on the server yet. Set SMTP_* and CONTACT_TO environment variables.",
        code: "NOT_CONFIGURED",
      },
      { status: 503 },
    );
  }

  const message = buildEmailMessage(json);
  const subject = `[J&J Site] Build inquiry — ${businessName.trim()}`;
  const to = process.env.CONTACT_TO!.trim();

  try {
    await sendSiteEmail({
      to,
      subject,
      text: message,
      replyTo: email.trim(),
    });
  } catch (err) {
    console.error("[contact] SMTP send failed:", err);
    return NextResponse.json(
      { error: "Could not send your message right now. Try again or call us directly." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
