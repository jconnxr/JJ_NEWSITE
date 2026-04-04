import { NextResponse } from "next/server";
import { contactInboxReady, sendSiteEmail } from "@/lib/site-mail";
import { getStripe } from "@/lib/stripe-server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const stripe = getStripe();
  const whSecret = process.env.STRIPE_WEBHOOK_SECRET?.trim();
  if (!stripe || !whSecret) {
    return NextResponse.json({ error: "Webhook not configured" }, { status: 503 });
  }

  const sig = request.headers.get("stripe-signature");
  if (!sig) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  const buf = await request.text();
  let event: import("stripe").Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(buf, sig, whSecret);
  } catch (err) {
    console.error("[stripe webhook] signature:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as import("stripe").Stripe.Checkout.Session;
    const email = session.customer_email || session.customer_details?.email || "";
    const meta = session.metadata || {};
    const lines = [
      `Stripe checkout completed`,
      ``,
      `Mode: ${session.mode}`,
      `Customer email: ${email || "(none)"}`,
      `Amount total: ${session.amount_total != null ? session.amount_total / 100 : "?"}`,
      `Currency: ${session.currency || ""}`,
      ``,
      `Metadata:`,
      JSON.stringify(meta, null, 2),
      ``,
      `Session id: ${session.id}`,
    ];
    if (contactInboxReady()) {
      try {
        await sendSiteEmail({
          to: process.env.CONTACT_TO!.trim(),
          subject: `[J&J Stripe] Checkout complete — ${meta.product || session.mode}`,
          text: lines.join("\n"),
          ...(email ? { replyTo: email } : {}),
        });
      } catch (e) {
        console.error("[stripe webhook] email failed:", e);
      }
    } else {
      console.log("[stripe webhook] checkout.session.completed (no SMTP):", session.id);
    }
  }

  return NextResponse.json({ received: true });
}
