import { NextResponse } from "next/server";
import {
  getClientIp,
  parseContactPayload,
  rejectIfRateLimited,
  rejectOversizedBody,
  type ParsedContact,
} from "@/lib/api-guards";
import { contactInboxReady, sendSiteEmail } from "@/lib/site-mail";

export const runtime = "nodejs";

function buildEmailMessage(data: ParsedContact): string {
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
    data.goals || "(none provided)",
  ].join("\n");
}

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

  const parsed = parseContactPayload(json);
  if (parsed instanceof NextResponse) return parsed;

  if (!contactInboxReady()) {
    console.warn("[contact] SMTP not fully configured — submission not sent:", {
      name: parsed.name,
      businessName: parsed.businessName,
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

  const message = buildEmailMessage(parsed);
  const subject = `[J&J Site] Build inquiry — ${parsed.businessName}`;
  const to = process.env.CONTACT_TO!.trim();

  try {
    await sendSiteEmail({
      to,
      subject,
      text: message,
      replyTo: parsed.email,
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
