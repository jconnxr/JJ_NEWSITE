import { NextResponse } from "next/server";
import {
  getClientIp,
  parseBookCallPayload,
  rejectIfRateLimited,
  rejectOversizedBody,
  type ParsedBookCall,
} from "@/lib/api-guards";
import { bookingInboxReady, getBookingRecipient, sendSiteEmail } from "@/lib/site-mail";

export const runtime = "nodejs";

function buildMessage(data: ParsedBookCall): string {
  return [
    `Call scheduling request from your site`,
    ``,
    `Name: ${data.name}`,
    `Business: ${data.businessName}`,
    `Phone: ${data.phone}`,
    `Preferred date: ${data.preferredDate}`,
    ``,
    `Follow up with them to confirm a time.`,
  ].join("\n");
}

function isValidISODate(s: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(s)) return false;
  const d = new Date(s + "T12:00:00");
  return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === s;
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

  const parsed = parseBookCallPayload(json);
  if (parsed instanceof NextResponse) return parsed;

  if (!isValidISODate(parsed.preferredDate)) {
    return NextResponse.json({ error: "Invalid date" }, { status: 400 });
  }

  const chosen = new Date(parsed.preferredDate + "T12:00:00");
  const cutoff = new Date();
  cutoff.setUTCDate(cutoff.getUTCDate() - 1);
  cutoff.setUTCHours(0, 0, 0, 0);
  if (chosen < cutoff) {
    return NextResponse.json({ error: "Please choose a current or future date" }, { status: 400 });
  }

  if (!bookingInboxReady()) {
    console.warn("[book-call] SMTP / inbox not configured");
    return NextResponse.json(
      {
        error: "Scheduling is not configured on the server yet. Call us or email instead.",
        code: "NOT_CONFIGURED",
      },
      { status: 503 },
    );
  }

  const to = getBookingRecipient()!;
  const message = buildMessage(parsed);

  try {
    await sendSiteEmail({
      to,
      subject: `[J&J Site] Call request — ${parsed.businessName} — ${parsed.preferredDate}`,
      text: message,
    });
  } catch (err) {
    console.error("[book-call] SMTP send failed:", err);
    return NextResponse.json(
      { error: "Could not send your request right now. Please call us instead." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
