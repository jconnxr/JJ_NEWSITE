"use client";

import { effectiveHeroSrc, heroUsesRasterImage } from "@/lib/preview-stock-photos";
import { resolveServiceVariant } from "@/lib/preview-service-variant";
import type { PreviewConfig } from "@/lib/preview-types";
import type { PaletteDef } from "@/lib/preview-templates/registry";
import { PREVIEW_SECTION_IDS } from "../PreviewInteractContext";
import {
  SiteFooterFull,
  SiteHeroLight,
  SiteHoursBand,
  SiteNavBar,
  SiteQuoteSection,
  SiteServiceSection,
  SiteStickyCta,
  SiteTrustStrip,
} from "./preview-blocks";
import { TrustAndServicesOrder } from "./PreviewSectionOrder";

type Props = {
  config: PreviewConfig;
  palette: PaletteDef;
};

export function ProfessionalPreview({ config, palette }: Props) {
  const expertise = config.archetypeId?.includes("expertise");
  const heroSrc = effectiveHeroSrc(config.heroImageUrl, "professional");
  const heroRaster = heroUsesRasterImage(heroSrc) ? heroSrc : null;
  const heroGradient = `linear-gradient(165deg, ${palette.surface} 0%, ${palette.bg} 100%)`;
  const serviceVariant = resolveServiceVariant(palette, "rows");

  return (
    <div
      id={PREVIEW_SECTION_IDS.top}
      className="relative flex min-h-[580px] flex-col"
      style={{ background: palette.bg, color: palette.text }}
    >
      <SiteNavBar config={config} palette={palette} links={["About", "Services", "Contact"]} variant="surface" />
      <SiteHeroLight
        config={config}
        palette={palette}
        heroRasterSrc={heroRaster}
        heroGradient={heroGradient}
        eyebrow="Professional services"
        support={
          expertise
            ? "Scoped projects, transparent timelines, and senior attention when it matters."
            : "Book a consultation—we’ll confirm fit and next steps before any commitment."
        }
      />
      <TrustAndServicesOrder
        palette={palette}
        trust={
          <SiteTrustStrip palette={palette} items={["Oklahoma-based", "Clear agreements", "Responsive team"] as const} />
        }
        services={
          <SiteServiceSection
            config={config}
            palette={palette}
            title={expertise ? "Capabilities" : "What to expect"}
            variant={serviceVariant}
          />
        }
      />
      <SiteQuoteSection config={config} palette={palette} />
      <SiteHoursBand config={config} palette={palette} />
      <SiteFooterFull config={config} palette={palette} />
      <SiteStickyCta config={config} palette={palette} />
    </div>
  );
}
