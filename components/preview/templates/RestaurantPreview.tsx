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

export function RestaurantPreview({ config, palette }: Props) {
  const isMenu = config.archetypeId?.includes("menu");
  const heroSrc = effectiveHeroSrc(config.heroImageUrl, "restaurant");
  const heroRaster = heroUsesRasterImage(heroSrc) ? heroSrc : null;
  const heroGradient = `linear-gradient(135deg, ${palette.primary} 0%, ${palette.primary}dd 100%)`;
  const serviceVariant = resolveServiceVariant(palette, "cards");

  return (
    <div
      id={PREVIEW_SECTION_IDS.top}
      className="relative flex min-h-[580px] flex-col"
      style={{ background: palette.bg, color: palette.text }}
    >
      <SiteNavBar
        config={config}
        palette={palette}
        links={["Menu", "Visit", "Contact"]}
        variant={palette.feel.navOnDarkHero}
      />
      <SiteHeroPanel
        config={config}
        palette={palette}
        heroRasterSrc={heroRaster}
        heroGradient={heroGradient}
        eyebrow="Restaurant"
        subtext={isMenu ? "Chef-driven plates · Oklahoma hospitality" : "Reservations, events & nights out"}
      />
      <TrustAndServicesOrder
        palette={palette}
        trust={
          <SiteTrustStrip
            palette={palette}
            items={
              isMenu
                ? (["Fresh daily", "Local partners", "Family friendly"] as const)
                : (["Table service", "Private dining", "Catering"] as const)
            }
          />
        }
        services={
          <SiteServiceSection
            config={config}
            palette={palette}
            title={isMenu ? "Signatures & specials" : "What guests love"}
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
