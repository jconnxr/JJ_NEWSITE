import { NextResponse } from "next/server";

type Body = {
  name: string;
  email: string;
  phone?: string;
  businessName: string;
  focus: string;
  goals?: string;
};

function buildEmailMessage(data: Body): string {
  return [
    `New product / build inquiry from jjmanagementsolutions.com`,
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
  const key = process.env.WEB3FORMS_ACCESS_KEY;

  let json: Body;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { name, email, businessName, focus } = json;
  if (!name?.trim() || !email?.trim() || !businessName?.trim() || !focus?.trim()) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  if (!emailOk) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  if (!key) {
    console.warn("[contact] WEB3FORMS_ACCESS_KEY not set — submission:", json);
    return NextResponse.json(
      {
        error: "Form delivery is not configured yet. Add WEB3FORMS_ACCESS_KEY on the server.",
        code: "NOT_CONFIGURED",
      },
      { status: 503 },
    );
  }

  const message = buildEmailMessage(json);

  const res = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      access_key: key,
      subject: `[J&J Site] Build inquiry — ${businessName.trim()}`,
      name: name.trim(),
      email: email.trim(),
      message,
    }),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    console.error("[contact] Web3Forms error:", res.status, data);
    return NextResponse.json({ error: "Could not send message. Try again or email us directly." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
