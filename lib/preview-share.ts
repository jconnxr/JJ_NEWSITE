import type {
  CategoryId,
  PreviewSharePayload,
  PreviewSharePayloadV1,
  PreviewSharePayloadV2,
  PreviewTemplateId,
} from "@/lib/preview-types";

/** Standard base64 → base64url (avoid Buffer "base64url" — unsupported in browser polyfills / older Node). */
function toBase64UrlChars(b64: string): string {
  return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function utf8ToBase64Url(json: string): string {
  if (typeof Buffer !== "undefined") {
    const b64 = Buffer.from(json, "utf8").toString("base64");
    return toBase64UrlChars(b64);
  }
  const bytes = new TextEncoder().encode(json);
  let binary = "";
  bytes.forEach((b) => {
    binary += String.fromCharCode(b);
  });
  const b64 = btoa(binary);
  return toBase64UrlChars(b64);
}

function base64UrlToUtf8(b64url: string): string {
  const pad = b64url.length % 4 === 2 ? "==" : b64url.length % 4 === 3 ? "=" : "";
  const b64 = b64url.replace(/-/g, "+").replace(/_/g, "/") + pad;
  if (typeof Buffer !== "undefined") {
    return Buffer.from(b64, "base64").toString("utf8");
  }
  const binary = atob(b64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return new TextDecoder().decode(bytes);
}

function isCategoryId(x: unknown): x is CategoryId {
  return x === "products" || x === "services" || x === "restaurants";
}

function isTemplateId(x: unknown): x is PreviewTemplateId {
  return (
    x === "restaurant" ||
    x === "dental" ||
    x === "hvac" ||
    x === "retail" ||
    x === "professional"
  );
}

function parseTriplet(services: unknown): [string, string, string] {
  if (!Array.isArray(services) || services.length < 3) return ["", "", ""];
  return [
    String(services[0]).slice(0, 120),
    String(services[1]).slice(0, 120),
    String(services[2]).slice(0, 120),
  ];
}

function parseV2(o: Record<string, unknown>): PreviewSharePayloadV2 | null {
  if (!isCategoryId(o.categoryId)) return null;
  const nicheId = typeof o.nicheId === "string" ? o.nicheId.slice(0, 80) : "";
  if (!nicheId) return null;
  const layoutId = typeof o.layoutId === "string" ? o.layoutId.slice(0, 80) : "";
  if (!layoutId) return null;
  if (!isTemplateId(o.templateId)) return null;
  return {
    v: 2,
    categoryId: o.categoryId,
    nicheId,
    nicheLabel: typeof o.nicheLabel === "string" ? o.nicheLabel.slice(0, 120) : "",
    templateId: o.templateId,
    layoutId,
    paletteId: typeof o.paletteId === "string" ? o.paletteId.slice(0, 40) : "navy-gold",
    businessName: typeof o.businessName === "string" ? o.businessName.slice(0, 120) : "",
    tagline: typeof o.tagline === "string" ? o.tagline.slice(0, 200) : "",
    phone: typeof o.phone === "string" ? o.phone.slice(0, 60) : "",
    address: typeof o.address === "string" ? o.address.slice(0, 200) : "",
    services: parseTriplet(o.services),
    heroImageUrl: typeof o.heroImageUrl === "string" ? o.heroImageUrl.slice(0, 2000) : "",
    ctaPrimary: typeof o.ctaPrimary === "string" ? o.ctaPrimary.slice(0, 80) : undefined,
    ctaSecondary: typeof o.ctaSecondary === "string" ? o.ctaSecondary.slice(0, 80) : undefined,
    testimonialQuote: typeof o.testimonialQuote === "string" ? o.testimonialQuote.slice(0, 320) : undefined,
    testimonialAttribution:
      typeof o.testimonialAttribution === "string" ? o.testimonialAttribution.slice(0, 120) : undefined,
    hoursLine: typeof o.hoursLine === "string" ? o.hoursLine.slice(0, 120) : undefined,
  };
}

function parseV1(o: Record<string, unknown>): PreviewSharePayloadV1 | null {
  const industryId = o.industryId;
  if (industryId !== "restaurant" && industryId !== "dental" && industryId !== "hvac") return null;
  const archetypeId = typeof o.archetypeId === "string" ? o.archetypeId.slice(0, 80) : "";
  if (!archetypeId) return null;
  return {
    v: 1,
    industryId,
    archetypeId,
    paletteId: typeof o.paletteId === "string" ? o.paletteId.slice(0, 40) : "navy-gold",
    businessName: typeof o.businessName === "string" ? o.businessName.slice(0, 120) : "",
    tagline: typeof o.tagline === "string" ? o.tagline.slice(0, 200) : "",
    phone: typeof o.phone === "string" ? o.phone.slice(0, 60) : "",
    address: typeof o.address === "string" ? o.address.slice(0, 200) : "",
    services: parseTriplet(o.services),
    heroImageUrl: typeof o.heroImageUrl === "string" ? o.heroImageUrl.slice(0, 2000) : "",
  };
}

export function encodePreviewSharePayload(payload: PreviewSharePayloadV2): string {
  return utf8ToBase64Url(JSON.stringify(payload));
}

export function decodePreviewShareParam(param: string): PreviewSharePayload | null {
  if (!param || param.length > 14_000) return null;
  try {
    const raw = base64UrlToUtf8(param.trim());
    const data = JSON.parse(raw) as unknown;
    if (!data || typeof data !== "object") return null;
    const o = data as Record<string, unknown>;
    if (o.v === 2) return parseV2(o);
    if (o.v === 1) return parseV1(o);
    return null;
  } catch {
    return null;
  }
}
