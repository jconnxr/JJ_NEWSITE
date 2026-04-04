export type CategoryId = "products" | "services" | "restaurants";

/** Which visual template the preview uses (maps to React layout). */
export type PreviewTemplateId = "restaurant" | "dental" | "hvac" | "retail" | "professional";

/** Serializable subset for URL sharing (no huge data URLs). v2 preferred; v1 supported for old links. */
export type PreviewSharePayloadV2 = {
  v: 2;
  categoryId: CategoryId;
  nicheId: string;
  nicheLabel: string;
  templateId: PreviewTemplateId;
  /** Layout variant inside the template (same as config.archetypeId). */
  layoutId: string;
  paletteId: string;
  businessName: string;
  tagline: string;
  phone: string;
  address: string;
  services: [string, string, string];
  heroImageUrl: string;
  ctaPrimary?: string;
  ctaSecondary?: string;
  testimonialQuote?: string;
  testimonialAttribution?: string;
  hoursLine?: string;
};

/** @deprecated Legacy share links */
export type PreviewSharePayloadV1 = {
  v: 1;
  industryId: "restaurant" | "dental" | "hvac";
  archetypeId: string;
  paletteId: string;
  businessName: string;
  tagline: string;
  phone: string;
  address: string;
  services: [string, string, string];
  heroImageUrl: string;
};

export type PreviewSharePayload = PreviewSharePayloadV2 | PreviewSharePayloadV1;

export type PreviewConfig = {
  categoryId: CategoryId | null;
  nicheId: string | null;
  nicheLabel: string;
  templateId: PreviewTemplateId | null;
  /** Layout variant (e.g. restaurant-menu, hvac-emergency). */
  archetypeId: string | null;
  paletteId: string;
  businessName: string;
  tagline: string;
  phone: string;
  address: string;
  services: [string, string, string];
  heroImageUrl: string;
  ctaPrimary: string;
  ctaSecondary: string;
  testimonialQuote: string;
  testimonialAttribution: string;
  hoursLine: string;
};

export function createEmptyPreviewConfig(): PreviewConfig {
  return {
    categoryId: null,
    nicheId: null,
    nicheLabel: "",
    templateId: null,
    archetypeId: null,
    paletteId: "navy-gold",
    businessName: "Your business name",
    tagline: "",
    phone: "(405) 555-0100",
    address: "Oklahoma City, OK",
    services: ["First service", "Second service", "Third service"],
    heroImageUrl: "",
    ctaPrimary: "Get started",
    ctaSecondary: "Learn more",
    testimonialQuote: "Professional, fast, and easy to work with—we’d recommend them to anyone.",
    testimonialAttribution: "Happy customer · Oklahoma",
    hoursLine: "Open weekdays 9–5",
  };
}

export function toSharePayload(config: PreviewConfig): PreviewSharePayloadV2 | null {
  if (!config.templateId || !config.nicheId || !config.archetypeId || !config.categoryId) return null;
  const url = config.heroImageUrl.trim();
  const safeHero =
    url.startsWith("http://") || url.startsWith("https://") || url.startsWith("/") ? url : "";
  return {
    v: 2,
    categoryId: config.categoryId,
    nicheId: config.nicheId.slice(0, 80),
    nicheLabel: config.nicheLabel.slice(0, 120),
    templateId: config.templateId,
    layoutId: config.archetypeId.slice(0, 80),
    paletteId: config.paletteId,
    businessName: config.businessName.trim().slice(0, 120) || "Your business name",
    tagline: config.tagline.trim().slice(0, 200),
    phone: config.phone.trim().slice(0, 60),
    address: config.address.trim().slice(0, 200),
    services: [
      config.services[0]!.slice(0, 120),
      config.services[1]!.slice(0, 120),
      config.services[2]!.slice(0, 120),
    ],
    heroImageUrl: safeHero.slice(0, 2000),
    ctaPrimary: config.ctaPrimary.slice(0, 80),
    ctaSecondary: config.ctaSecondary.slice(0, 80),
    testimonialQuote: config.testimonialQuote.slice(0, 320),
    testimonialAttribution: config.testimonialAttribution.slice(0, 120),
    hoursLine: config.hoursLine.slice(0, 120),
  };
}
