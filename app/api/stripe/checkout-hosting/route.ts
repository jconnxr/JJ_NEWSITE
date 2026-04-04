import { NextResponse } from "next/server";
import { getClientIp, rejectIfRateLimited, rejectOversizedBody, sanitizeSingleLineField } from "@/lib/api-guards";
import { getSiteUrl } from "@/lib/site-url";
import { getStripe } from "@/lib/stripe-server";

export const runtime = "nodejs";

const MAX_EMAIL = 254;
const MAX_META = 500;

export async function POST(request: Request) {
  const oversized = rejectOversizedBody(request);
  if (oversized) return oversized;
  const limited = rejectIfRateLimited(getClientIp(request));
  if (limited) return limited;

  const stripe = getStripe();
  const priceId = process.env.STRIPE_PRICE_HOSTING?.trim();
  if (!stripe || !priceId) {
    return NextResponse.json(
      { error: "Hosting checkout is not configured. Set STRIPE_SECRET_KEY and STRIPE_PRICE_HOSTING." },
      { status: 503 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  const o = body as Record<string, unknown>;
  const email = typeof o.email === "string" ? o.email.trim() : "";
  if (!email || email.length > MAX_EMAIL || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Valid email required for subscriptions" }, { status: 400 });
  }

  const businessName = typeof o.businessName === "string" ? sanitizeSingleLineField(o.businessName).slice(0, 200) : "";

  const base = getSiteUrl();
  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer_email: email,
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${base}/preview/success?type=hosting&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${base}/preview`,
      metadata: {
        product: "hosting_subscription",
        business_name: businessName.slice(0, MAX_META),
      },
      subscription_data: {
        metadata: {
          business_name: businessName.slice(0, MAX_META),
        },
      },
    });
    if (!session.url) {
      return NextResponse.json({ error: "Could not start checkout" }, { status: 502 });
    }
    return NextResponse.json({ url: session.url });
  } catch (e) {
    console.error("[stripe checkout-hosting]", e);
    return NextResponse.json({ error: "Stripe error" }, { status: 502 });
  }
}
