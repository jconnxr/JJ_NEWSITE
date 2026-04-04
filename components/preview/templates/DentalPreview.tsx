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

export function DentalPreview({ config, palette }: Props) {
  const cosmetic = config.archetypeId?.includes("cosmetic");
  const heroSrc = effectiveHeroSrc(config.heroImageUrl, "dental");
  const heroRaster = heroUsesRasterImage(heroSrc) ? heroSrc : null;
  const heroGradient = `linear-gradient(160deg, ${palette.surface} 0%, ${palette.bg} 100%)`;
  const serviceVariant = resolveServiceVariant(palette, "rows");

  return (
    <div
      id={PREVIEW_SECTION_IDS.top}
      className="relative flex min-h-[580px] flex-col"
      style={{ background: palette.bg, color: palette.text }}
    >
      <SiteNavBar config={config} palette={palette} links={["Services", "New patients", "Contact"]} variant="surface" />
      <SiteHeroLight
        config={config}
        palette={palette}
        heroRasterSrc={heroRaster}
        heroGradient={heroGradient}
        eyebrow="Dental care"
        support={
          cosmetic
            ? "Consultations for whitening, veneers, and alignment—personalized plans."
            : "Preventive visits, gentle cleanings, and clear treatment plans for every age."
        }
      />
      <TrustAndServicesOrder
        palette={palette}
        trust={
          <SiteTrustStrip palette={palette} items={["Insurance friendly", "Same-week visits", "Oklahoma team"] as const} />
        }
        services={
          <SiteServiceSection config={config} palette={palette} title="Treatments & visits" variant={serviceVariant} />
        }
      />
      <SiteQuoteSection config={config} palette={palette} />
      <SiteHoursBand config={config} palette={palette} />
      <SiteFooterFull config={config} palette={palette} />
      <SiteStickyCta config={config} palette={palette} />
    </div>
  );
}
