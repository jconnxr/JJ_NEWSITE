"use client";

import { effectiveHeroSrc, heroUsesRasterImage } from "@/lib/preview-stock-photos";
import { resolveServiceVariant } from "@/lib/preview-service-variant";
import type { PreviewConfig } from "@/lib/preview-types";
import type { PaletteDef } from "@/lib/preview-templates/registry";
import { PREVIEW_SECTION_IDS } from "../PreviewInteractContext";
import {
  SiteEmergencyBanner,
  SiteFooterFull,
  SiteHeroPanel,
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

export function HvacPreview({ config, palette }: Props) {
  const install = config.archetypeId?.includes("install");
  const emergency = !install;
  const heroSrc = effectiveHeroSrc(config.heroImageUrl, "hvac");
  const heroRaster = heroUsesRasterImage(heroSrc) ? heroSrc : null;
  const heroGradient = `linear-gradient(120deg, ${palette.primary}, ${palette.primary}cc)`;
  const serviceVariant = resolveServiceVariant(palette, "checks");

  return (
    <div
      id={PREVIEW_SECTION_IDS.top}
      className="relative flex min-h-[580px] flex-col"
      style={{ background: palette.bg, color: palette.text }}
    >
      {emergency ? (
        <SiteEmergencyBanner text="Same-day service available · Oklahoma metro" palette={palette} />
      ) : null}
      <SiteNavBar
        config={config}
        palette={palette}
        links={["Services", "Financing", "Contact"]}
        variant={palette.feel.navOnDarkHero}
      />
      <SiteHeroPanel
        config={config}
        palette={palette}
        heroRasterSrc={heroRaster}
        heroGradient={heroGradient}
        eyebrow="Home comfort"
        subtext={install ? "Efficient installs · Honest quotes · Licensed crews" : "Fast relief when the weather turns"}
      />
      <TrustAndServicesOrder
        palette={palette}
        trust={
          <SiteTrustStrip
            palette={palette}
            items={["Licensed & insured", "Written estimates", "Local dispatch"] as const}
          />
        }
        services={
          <SiteServiceSection
            config={config}
            palette={palette}
            title={install ? "Install & maintenance" : "Repairs we handle"}
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
