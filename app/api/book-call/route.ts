import { NextResponse } from "next/server";
import { bookingInboxReady, getBookingRecipient, sendSiteEmail } from "@/lib/site-mail";

export const runtime = "nodejs";

type Body = {
  name: string;
  businessName: string;
  phone: string;
  /** ISO date YYYY-MM-DD */
  preferredDate: string;
  fax?: string;
};

function buildMessage(data: Body): string {
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
  let json: Body;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (json.fax?.trim()) {
    return NextResponse.json({ ok: true });
  }

  const { name, businessName, phone, preferredDate } = json;
  if (!name?.trim() || !businessName?.trim() || !phone?.trim() || !preferredDate?.trim()) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  if (!isValidISODate(preferredDate.trim())) {
    return NextResponse.json({ error: "Invalid date" }, { status: 400 });
  }

  const chosen = new Date(preferredDate.trim() + "T12:00:00");
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
  const message = buildMessage({
    name: name.trim(),
    businessName: businessName.trim(),
    phone: phone.trim(),
    preferredDate: preferredDate.trim(),
  });

  try {
    await sendSiteEmail({
      to,
      subject: `[J&J Site] Call request — ${businessName.trim()} — ${preferredDate.trim()}`,
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
