import { siteDefaultsForLayout } from "@/lib/preview-site-defaults";
import type { CategoryId, PreviewConfig, PreviewSharePayload } from "@/lib/preview-types";

function sliceField(s: string | undefined, max: number, fallback: string): string {
  if (typeof s !== "string") return fallback;
  const t = s.trim();
  if (!t) return fallback;
  return t.slice(0, max);
}

export function applySharePayloadToConfig(base: PreviewConfig, payload: PreviewSharePayload): PreviewConfig {
  if (payload.v === 2) {
    const d = siteDefaultsForLayout(payload.templateId, payload.layoutId);
    return {
      ...base,
      categoryId: payload.categoryId,
      nicheId: payload.nicheId,
      nicheLabel: payload.nicheLabel,
      templateId: payload.templateId,
      archetypeId: payload.layoutId,
      paletteId: payload.paletteId,
      businessName: payload.businessName,
      tagline: payload.tagline,
      phone: payload.phone,
      address: payload.address,
      services: [...payload.services] as [string, string, string],
      heroImageUrl: payload.heroImageUrl,
      ctaPrimary: sliceField(payload.ctaPrimary, 80, d.ctaPrimary),
      ctaSecondary: sliceField(payload.ctaSecondary, 80, d.ctaSecondary),
      testimonialQuote: sliceField(payload.testimonialQuote, 320, d.testimonialQuote),
      testimonialAttribution: sliceField(payload.testimonialAttribution, 120, d.testimonialAttribution),
      hoursLine: sliceField(payload.hoursLine, 120, d.hoursLine),
    };
  }
  const categoryId: CategoryId = payload.industryId === "restaurant" ? "restaurants" : "services";
  const d = siteDefaultsForLayout(payload.industryId, payload.archetypeId);
  return {
    ...base,
    categoryId,
    nicheId: "imported-link",
    nicheLabel: "Imported preview",
    templateId: payload.industryId,
    archetypeId: payload.archetypeId,
    paletteId: payload.paletteId,
    businessName: payload.businessName,
    tagline: payload.tagline,
    phone: payload.phone,
    address: payload.address,
    services: [...payload.services] as [string, string, string],
    heroImageUrl: payload.heroImageUrl,
    ctaPrimary: d.ctaPrimary,
    ctaSecondary: d.ctaSecondary,
    testimonialQuote: d.testimonialQuote,
    testimonialAttribution: d.testimonialAttribution,
    hoursLine: d.hoursLine,
  };
}

export function mergeSharePayloadIntoConfig(base: PreviewConfig, payload: PreviewSharePayload): PreviewConfig {
  return applySharePayloadToConfig(base, payload);
}
