"use client";

import { effectiveHeroSrc, heroUsesRasterImage } from "@/lib/preview-stock-photos";
import { resolveServiceVariant } from "@/lib/preview-service-variant";
import type { PreviewConfig } from "@/lib/preview-types";
import type { PaletteDef } from "@/lib/preview-templates/registry";
import { PREVIEW_SECTION_IDS } from "../PreviewInteractContext";
import {
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

export function RetailPreview({ config, palette }: Props) {
  const showroom = config.archetypeId?.includes("showroom");
  const heroSrc = effectiveHeroSrc(config.heroImageUrl, "retail");
  const heroRaster = heroUsesRasterImage(heroSrc) ? heroSrc : null;
  const heroGradient = `linear-gradient(145deg, ${palette.primary} 0%, ${palette.primary}dd 100%)`;
  const serviceVariant = resolveServiceVariant(palette, "rows");

  return (
    <div
      id={PREVIEW_SECTION_IDS.top}
      className="relative flex min-h-[580px] flex-col"
      style={{ background: palette.bg, color: palette.text }}
    >
      <SiteNavBar
        config={config}
        palette={palette}
        links={["Shop", "Visit", "Contact"]}
        variant={palette.feel.navOnDarkHero}
      />
      <SiteHeroPanel
        config={config}
        palette={palette}
        heroRasterSrc={heroRaster}
        heroGradient={heroGradient}
        eyebrow="Retail"
        subtext={showroom ? "See products in person · Expert staff on the floor" : "In-stock favorites · Pickup & special orders"}
      />
      <TrustAndServicesOrder
        palette={palette}
        trust={
          <SiteTrustStrip
            palette={palette}
            items={
              showroom
                ? (["Floor models", "Delivery help", "Trade accounts"] as const)
                : (["Local stock", "Easy returns", "Rewards"] as const)
            }
          />
        }
        services={
          <SiteServiceSection
            config={config}
            palette={palette}
            title={showroom ? "Showroom & services" : "Popular right now"}
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
