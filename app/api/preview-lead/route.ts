import { NextResponse } from "next/server";
import {
  getClientIp,
  parsePreviewLeadPayload,
  rejectIfRateLimited,
  rejectOversizedBody,
  type ParsedPreviewLead,
} from "@/lib/api-guards";
import { contactInboxReady, sendSiteEmail } from "@/lib/site-mail";
import { getSiteUrl } from "@/lib/site-url";

export const runtime = "nodejs";

function buildTeamEmail(data: ParsedPreviewLead): string {
  const previewUrl =
    data.shareToken.length > 0
      ? `${getSiteUrl()}/preview?c=${encodeURIComponent(data.shareToken.slice(0, 8000))}`
      : "(not provided)";
  return [
    `Preview builder — someone is interested`,
    ``,
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone || "(not provided)"}`,
    `Business: ${data.businessName}`,
    `Category: ${data.categoryId || "(unknown)"}`,
    `Niche: ${data.nicheLabel || data.nicheId || "(unknown)"}`,
    `Template: ${data.templateId || "(unknown)"}`,
    `Layout: ${data.layoutId || "(unknown)"}`,
    `Palette: ${data.paletteId || "(unknown)"}`,
    ``,
    `Notes:`,
    data.notes || "(none)",
    ``,
    `Share link (truncated in email if huge):`,
    previewUrl,
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

  const parsed = parsePreviewLeadPayload(json);
  if (parsed instanceof NextResponse) return parsed;

  if (!contactInboxReady()) {
    console.warn("[preview-lead] SMTP not configured:", { email: parsed.email, businessName: parsed.businessName });
    return NextResponse.json(
      {
        error:
          "Email is not configured on the server yet. Set SMTP_* and CONTACT_TO environment variables.",
        code: "NOT_CONFIGURED",
      },
      { status: 503 },
    );
  }

  const to = process.env.CONTACT_TO!.trim();
  const teamBody = buildTeamEmail(parsed);

  try {
    await sendSiteEmail({
      to,
      subject: `[J&J Preview] Interest — ${parsed.businessName}`,
      text: teamBody,
      replyTo: parsed.email,
    });

    await sendSiteEmail({
      to: parsed.email,
      subject: "We received your preview interest — J&J Management Solutions",
      text: [
        `Hi ${parsed.name},`,
        ``,
        `Thanks for trying the site preview builder. We’ll review what you shared and follow up within one business day.`,
        ``,
        `Prefer to talk sooner? Call us at the number on jnjmanagementsolutions.com.`,
        ``,
        `— J&J Management Solutions`,
      ].join("\n"),
    });
  } catch (err) {
    console.error("[preview-lead] SMTP send failed:", err);
    return NextResponse.json(
      { error: "Could not send right now. Try again or call us directly." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
