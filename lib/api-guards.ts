import { NextResponse } from "next/server";

/** Reject JSON bodies larger than this (forms stay tiny). */
export const MAX_JSON_BODY_BYTES = 32_768;

const RATE_WINDOW_MS = 60_000;
const RATE_MAX_PER_WINDOW = 20;
const rateStore = new Map<string, { count: number; resetAt: number }>();

export function getClientIp(request: Request): string {
  const xf = request.headers.get("x-forwarded-for");
  if (xf) {
    const first = xf.split(",")[0]?.trim();
    if (first) return first.slice(0, 128);
  }
  const real = request.headers.get("x-real-ip")?.trim();
  if (real) return real.slice(0, 128);
  return "unknown";
}

/** Returns 413 Response if Content-Length exceeds cap (when header is present). */
export function rejectOversizedBody(request: Request): NextResponse | null {
  const cl = request.headers.get("content-length");
  if (!cl) return null;
  const n = Number(cl);
  if (!Number.isFinite(n) || n < 0) return null;
  if (n > MAX_JSON_BODY_BYTES) {
    return NextResponse.json({ error: "Request body too large" }, { status: 413 });
  }
  return null;
}

/**
 * Soft per-IP limit. On multi-instance serverless each instance has its own map, but this still
 * curbs bursts and accidental loops from one edge path.
 */
export function rejectIfRateLimited(ip: string): NextResponse | null {
  const now = Date.now();
  const entry = rateStore.get(ip);
  if (!entry || now > entry.resetAt) {
    rateStore.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    pruneRateStore(now);
    return null;
  }
  if (entry.count >= RATE_MAX_PER_WINDOW) {
    const retryAfter = Math.max(1, Math.ceil((entry.resetAt - now) / 1000));
    return NextResponse.json(
      { error: "Too many requests. Please wait a moment and try again." },
      { status: 429, headers: { "Retry-After": String(retryAfter) } },
    );
  }
  entry.count += 1;
  return null;
}

function pruneRateStore(now: number) {
  if (rateStore.size < 400) return;
  for (const [key, v] of rateStore) {
    if (now > v.resetAt) rateStore.delete(key);
  }
}

/** Mitigate SMTP header injection in Subject / similar single-line fields. */
export function sanitizeSingleLineField(s: string): string {
  return s
    .replace(/[\r\n\x00-\x08\x0b\x0c\x0e-\x1f\u2028\u2029]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const LIMITS = {
  contact: {
    name: 150,
    email: 254,
    phone: 60,
    businessName: 200,
    focus: 400,
    goals: 8000,
  },
  bookCall: {
    name: 150,
    businessName: 200,
    phone: 60,
    preferredDate: 12,
  },
} as const;

export type ParsedContact = {
  name: string;
  email: string;
  phone: string;
  businessName: string;
  focus: string;
  goals: string;
};

export type ParsedBookCall = {
  name: string;
  businessName: string;
  phone: string;
  preferredDate: string;
};

function emailLooksValid(email: string): boolean {
  if (email.length > LIMITS.contact.email || /[\r\n]/.test(email)) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function parseContactPayload(body: unknown): ParsedContact | NextResponse {
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  const o = body as Record<string, unknown>;
  const fax = typeof o.fax === "string" ? o.fax : "";
  if (fax.trim()) {
    return NextResponse.json({ ok: true });
  }

  const name = typeof o.name === "string" ? o.name.trim() : "";
  const email = typeof o.email === "string" ? o.email.trim() : "";
  const phone = typeof o.phone === "string" ? o.phone.trim() : "";
  const businessName = typeof o.businessName === "string" ? o.businessName.trim() : "";
  const focus = typeof o.focus === "string" ? o.focus.trim() : "";
  const goals = typeof o.goals === "string" ? o.goals.trim() : "";

  if (!name || !email || !businessName || !focus) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const L = LIMITS.contact;
  if (name.length > L.name) {
    return NextResponse.json({ error: `Name must be at most ${L.name} characters` }, { status: 400 });
  }
  if (!emailLooksValid(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }
  if (phone.length > L.phone) {
    return NextResponse.json({ error: `Phone must be at most ${L.phone} characters` }, { status: 400 });
  }
  if (businessName.length > L.businessName) {
    return NextResponse.json(
      { error: `Business name must be at most ${L.businessName} characters` },
      { status: 400 },
    );
  }
  if (focus.length > L.focus) {
    return NextResponse.json({ error: `Focus field is too long` }, { status: 400 });
  }
  if (goals.length > L.goals) {
    return NextResponse.json({ error: `Message is too long (max ${L.goals} characters)` }, { status: 400 });
  }

  return {
    name: sanitizeSingleLineField(name),
    email,
    phone: sanitizeSingleLineField(phone),
    businessName: sanitizeSingleLineField(businessName),
    focus: sanitizeSingleLineField(focus),
    goals,
  };
}

export function parseBookCallPayload(body: unknown): ParsedBookCall | NextResponse {
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  const o = body as Record<string, unknown>;
  const fax = typeof o.fax === "string" ? o.fax : "";
  if (fax.trim()) {
    return NextResponse.json({ ok: true });
  }

  const name = typeof o.name === "string" ? o.name.trim() : "";
  const businessName = typeof o.businessName === "string" ? o.businessName.trim() : "";
  const phone = typeof o.phone === "string" ? o.phone.trim() : "";
  const preferredDate = typeof o.preferredDate === "string" ? o.preferredDate.trim() : "";

  if (!name || !businessName || !phone || !preferredDate) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const L = LIMITS.bookCall;
  if (name.length > L.name) {
    return NextResponse.json({ error: `Name must be at most ${L.name} characters` }, { status: 400 });
  }
  if (businessName.length > L.businessName) {
    return NextResponse.json(
      { error: `Business name must be at most ${L.businessName} characters` },
      { status: 400 },
    );
  }
  if (phone.length > L.phone) {
    return NextResponse.json({ error: `Phone must be at most ${L.phone} characters` }, { status: 400 });
  }
  if (preferredDate.length > L.preferredDate) {
    return NextResponse.json({ error: "Invalid date" }, { status: 400 });
  }

  return {
    name: sanitizeSingleLineField(name),
    businessName: sanitizeSingleLineField(businessName),
    phone: sanitizeSingleLineField(phone),
    preferredDate,
  };
}
