export type ServicePresentation = "checks" | "rows" | "cards";

export type PaletteFeel = {
  /** One line for the Look & feel picker — what this direction is for */
  pitch: string;
  /** true = trust strip before services (credibility-first). false = services lead (offer-first). */
  trustBeforeServices: boolean;
  /** When set, overrides each template’s default list layout */
  servicePresentation: ServicePresentation | null;
  quoteStyle: "band" | "card" | "editorial";
  trustStyle: "strip" | "rail" | "stack";
  hoursStyle: "solid" | "outlined" | "minimal";
  /** Nav on dark / gradient heroes (restaurant, hvac, retail) */
  navOnDarkHero: "surface" | "glass";
  heroDensity: "compact" | "comfortable" | "loft";
  serviceCardRadius: "rounded-md" | "rounded-lg" | "rounded-xl" | "rounded-2xl";
  ctaRadius: "rounded-md" | "rounded-lg" | "rounded-xl" | "rounded-full";
};

export type PaletteDef = {
  id: string;
  label: string;
  primary: string;
  accent: string;
  bg: string;
  surface: string;
  text: string;
  muted: string;
  feel: PaletteFeel;
};

export const palettes: PaletteDef[] = [
  {
    id: "navy-gold",
    label: "Navy & gold",
    primary: "#1a2744",
    accent: "#c4a86a",
    bg: "#f4f1ea",
    surface: "#ffffff",
    text: "#1a1f2e",
    muted: "#5c6478",
    feel: {
      pitch: "Institutional trust: proof bar before offers, balanced spacing, classic testimonial band.",
      trustBeforeServices: true,
      servicePresentation: null,
      quoteStyle: "band",
      trustStyle: "strip",
      hoursStyle: "solid",
      navOnDarkHero: "surface",
      heroDensity: "comfortable",
      serviceCardRadius: "rounded-xl",
      ctaRadius: "rounded-xl",
    },
  },
  {
    id: "forest-cream",
    label: "Forest & cream",
    primary: "#1e3d32",
    accent: "#d4a574",
    bg: "#faf7f0",
    surface: "#ffffff",
    text: "#1a2420",
    muted: "#5a6b63",
    feel: {
      pitch: "Conversion-first: services before the proof bar, row-style list, quote in a framed card.",
      trustBeforeServices: false,
      servicePresentation: "rows",
      quoteStyle: "card",
      trustStyle: "rail",
      hoursStyle: "outlined",
      navOnDarkHero: "surface",
      heroDensity: "compact",
      serviceCardRadius: "rounded-lg",
      ctaRadius: "rounded-lg",
    },
  },
  {
    id: "slate-copper",
    label: "Slate & copper",
    primary: "#2d3748",
    accent: "#b87333",
    bg: "#f7f8fa",
    surface: "#ffffff",
    text: "#1a202c",
    muted: "#718096",
    feel: {
      pitch: "Modern editorial: stacked trust facts, product-style cards, strong quote column, minimal hours strip.",
      trustBeforeServices: true,
      servicePresentation: "cards",
      quoteStyle: "editorial",
      trustStyle: "stack",
      hoursStyle: "minimal",
      navOnDarkHero: "glass",
      heroDensity: "loft",
      serviceCardRadius: "rounded-md",
      ctaRadius: "rounded-md",
    },
  },
  {
    id: "wine-linen",
    label: "Wine & linen",
    primary: "#4a1e2c",
    accent: "#c9a227",
    bg: "#faf6f2",
    surface: "#ffffff",
    text: "#2d1a22",
    muted: "#6b5a62",
    feel: {
      pitch: "Premium hospitality: offers lead, checklist rhythm, glass nav on rich heroes, pill CTAs.",
      trustBeforeServices: false,
      servicePresentation: "checks",
      quoteStyle: "editorial",
      trustStyle: "rail",
      hoursStyle: "solid",
      navOnDarkHero: "glass",
      heroDensity: "loft",
      serviceCardRadius: "rounded-2xl",
      ctaRadius: "rounded-full",
    },
  },
];

export function getPalette(id: string): PaletteDef {
  return palettes.find((p) => p.id === id) ?? palettes[0]!;
}
