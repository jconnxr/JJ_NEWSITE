import type { PreviewTemplateId } from "@/lib/preview-types";

/**
 * Self-hosted JPEGs in /public/preview-heroes (reliable; no third-party hotlink issues).
 * Replaceable via hero URL field or upload (https, data URL, or site-relative path).
 */
const STOCK_HERO_BY_TEMPLATE: Record<PreviewTemplateId, string> = {
  restaurant: "/preview-heroes/restaurant.jpg",
  dental: "/preview-heroes/dental.jpg",
  hvac: "/preview-heroes/hvac.jpg",
  retail: "/preview-heroes/retail.jpg",
  professional: "/preview-heroes/professional.jpg",
};

export function stockHeroUrlForTemplate(templateId: PreviewTemplateId): string {
  return STOCK_HERO_BY_TEMPLATE[templateId];
}

/** Resolved hero src for preview rendering and share fallbacks. */
export function effectiveHeroSrc(raw: string | undefined, templateId: PreviewTemplateId): string {
  const t = (raw ?? "").trim();
  if (t) return t;
  return stockHeroUrlForTemplate(templateId);
}

export function heroUsesRasterImage(src: string): boolean {
  return (
    src.startsWith("http://") ||
    src.startsWith("https://") ||
    src.startsWith("/") ||
    src.startsWith("data:")
  );
}
