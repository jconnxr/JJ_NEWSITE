"use client";

import { Fragment } from "react";
import type { PreviewConfig } from "@/lib/preview-types";
import type { PaletteDef } from "@/lib/preview-templates/registry";
import { PREVIEW_SECTION_IDS, usePreviewInteract, type PreviewSectionKey } from "../PreviewInteractContext";

const heroDensityClass: Record<PaletteDef["feel"]["heroDensity"], string> = {
  compact: "px-5 pb-8 pt-7",
  comfortable: "px-5 pb-10 pt-8",
  loft: "px-6 pb-14 pt-11",
};

const heroLightDensityClass: Record<PaletteDef["feel"]["heroDensity"], string> = {
  compact: "px-5 py-8",
  comfortable: "px-5 py-10",
  loft: "px-6 py-12",
};

export function PreviewStars({ className = "" }: { className?: string }) {
  return (
    <p className={`mt-2 text-center text-amber-500 ${className}`} aria-hidden>
      ★★★★★
    </p>
  );
}

const navLinkTargets: readonly PreviewSectionKey[] = ["services", "reviews", "contact"];

type NavProps = {
  config: PreviewConfig;
  palette: PaletteDef;
  links: readonly [string, string, string];
  variant?: "surface" | "glass";
};

export function SiteNavBar({ config, palette, links, variant = "surface" }: NavProps) {
  const { scrollTo } = usePreviewInteract();
  const bg = variant === "glass" ? "rgba(255,255,255,0.12)" : palette.surface;
  const border = variant === "glass" ? "rgba(255,255,255,0.2)" : `${palette.primary}14`;
  const ink = variant === "glass" ? "#fff" : palette.text;
  const muted = variant === "glass" ? "rgba(255,255,255,0.75)" : palette.muted;

  const focusRing =
    variant === "glass"
      ? "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
      : "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent";

  const chipBorder =
    variant === "glass" ? "rgba(255,255,255,0.28)" : `${palette.primary}35`;

  return (
    <nav
      className="flex min-w-0 flex-col border-b"
      style={{ background: bg, borderColor: border }}
    >
      <div className="flex min-w-0 items-center gap-2 px-3 py-2.5">
        <button
          type="button"
          onClick={() => scrollTo("top")}
          className={`min-w-0 flex-1 cursor-pointer truncate rounded-sm text-left font-serif text-sm font-semibold transition hover:opacity-85 active:opacity-75 ${focusRing}`}
          style={{ color: ink }}
        >
          {config.businessName}
        </button>
        <button
          type="button"
          onClick={() => scrollTo("contact")}
          title={config.ctaPrimary}
          className={`max-w-[min(9.5rem,46%)] shrink-0 cursor-pointer truncate rounded-full px-2.5 py-1.5 text-[9px] font-bold uppercase leading-tight tracking-wide text-white shadow-sm transition hover:brightness-110 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent`}
          style={{ background: palette.primary }}
        >
          {config.ctaPrimary}
        </button>
      </div>
      <div
        className="flex min-h-[2.5rem] gap-1.5 overflow-x-auto border-t px-3 py-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{ borderColor: border }}
      >
        {links.map((l, i) => (
          <button
            key={l}
            type="button"
            onClick={() => scrollTo(navLinkTargets[i]!)}
            className={`shrink-0 cursor-pointer rounded-full border px-2.5 py-1.5 text-[9px] font-bold uppercase tracking-wide transition hover:opacity-90 active:scale-[0.98] ${focusRing}`}
            style={{ color: muted, borderColor: chipBorder, background: variant === "glass" ? "rgba(255,255,255,0.08)" : `${palette.primary}08` }}
          >
            {l}
          </button>
        ))}
      </div>
    </nav>
  );
}

type HeroProps = {
  config: PreviewConfig;
  palette: PaletteDef;
  /** When set, shown as full-bleed photo under scrim; otherwise heroGradient fills the hero */
  heroRasterSrc: string | null;
  heroGradient: string;
  eyebrow: string;
  subtext?: string;
  align?: "left" | "center";
};

export function SiteHeroPanel({
  config,
  palette,
  heroRasterSrc,
  heroGradient,
  eyebrow,
  subtext,
  align = "left",
}: HeroProps) {
  const { scrollTo, telHref } = usePreviewInteract();
  const textAlign = align === "center" ? "text-center" : "text-left";
  const mx = align === "center" ? "mx-auto" : "";
  const rowJustify = align === "center" ? "justify-center" : "";
  const pad = heroDensityClass[palette.feel.heroDensity];
  const ctaR = palette.feel.ctaRadius;

  return (
    <header className={`relative min-h-[220px] overflow-hidden ${pad} text-white`}>
      {heroRasterSrc ? (
        <>
          <img
            src={heroRasterSrc}
            alt=""
            className="pointer-events-none absolute inset-0 z-0 h-full min-h-[220px] w-full object-cover"
            decoding="async"
          />
          <div
            className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-black/35 via-black/50 to-black/72"
            aria-hidden
          />
        </>
      ) : (
        <div className="absolute inset-0 z-0 min-h-[220px]" style={{ background: heroGradient }} aria-hidden />
      )}
      <div className={`relative z-[2] ${textAlign}`}>
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/75">{eyebrow}</p>
        <h1 className="mt-2 font-serif text-[1.65rem] font-semibold leading-tight">{config.businessName}</h1>
        <p className={`mt-2 max-w-md text-sm leading-relaxed text-white/90 ${mx}`}>{config.tagline || subtext}</p>
        <div className={`mt-6 flex flex-wrap gap-2 ${rowJustify}`}>
          <button
            type="button"
            onClick={() => scrollTo("contact")}
            className={`inline-flex min-h-[40px] cursor-pointer items-center justify-center px-5 py-2.5 text-xs font-bold shadow-md transition hover:brightness-110 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent ${ctaR}`}
            style={{ background: palette.accent, color: palette.primary }}
          >
            {config.ctaPrimary}
          </button>
          {telHref ? (
            <a
              href={telHref}
              className={`inline-flex min-h-[40px] cursor-pointer items-center justify-center border border-white/45 bg-white/10 px-5 py-2.5 text-xs font-semibold text-white backdrop-blur-sm transition hover:bg-white/18 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent ${ctaR}`}
            >
              {config.ctaSecondary}
            </a>
          ) : (
            <button
              type="button"
              onClick={() => scrollTo("services")}
              className={`inline-flex min-h-[40px] cursor-pointer items-center justify-center border border-white/45 bg-white/10 px-5 py-2.5 text-xs font-semibold text-white backdrop-blur-sm transition hover:bg-white/18 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent ${ctaR}`}
            >
              {config.ctaSecondary}
            </button>
          )}
        </div>
        <p className={`mt-4 text-xs text-white/70 ${mx}`}>
          {telHref ? (
            <a href={telHref} className="rounded-sm underline-offset-2 transition hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent">
              {config.phone}
            </a>
          ) : (
            config.phone
          )}
        </p>
      </div>
    </header>
  );
}

export function SiteTrustStrip({ palette, items }: { palette: PaletteDef; items: [string, string, string] }) {
  const { scrollTo } = usePreviewInteract();
  const style = palette.feel.trustStyle;

  if (style === "rail") {
    return (
      <div
        id={PREVIEW_SECTION_IDS.trust}
        className="flex items-stretch border-y"
        style={{ borderColor: `${palette.primary}18`, background: palette.surface }}
      >
        {items.map((t, i) => (
          <Fragment key={t}>
            {i > 0 ? (
              <div className="w-px shrink-0 self-stretch opacity-20" style={{ background: palette.primary }} aria-hidden />
            ) : null}
            <button
              type="button"
              onClick={() => scrollTo("reviews")}
              className="min-w-0 flex-1 cursor-pointer px-2 py-3.5 text-center transition hover:bg-black/[0.03] active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-black/10"
            >
              <p className="text-[10px] font-bold uppercase leading-tight tracking-wide" style={{ color: palette.text }}>
                {t}
              </p>
            </button>
          </Fragment>
        ))}
      </div>
    );
  }

  if (style === "stack") {
    return (
      <div
        id={PREVIEW_SECTION_IDS.trust}
        className="space-y-2 border-b px-4 py-4"
        style={{ borderColor: `${palette.primary}12`, background: palette.surface }}
      >
        {items.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => scrollTo("reviews")}
            className="w-full cursor-pointer border-l-4 py-2.5 pl-3 text-left transition hover:opacity-90 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/15 focus-visible:ring-offset-2"
            style={{ borderColor: palette.accent, background: palette.bg }}
          >
            <p className="text-xs font-semibold leading-snug" style={{ color: palette.text }}>
              {t}
            </p>
          </button>
        ))}
      </div>
    );
  }

  return (
    <div
      id={PREVIEW_SECTION_IDS.trust}
      className="grid grid-cols-3 gap-1 border-b px-2 py-3 text-center"
      style={{ borderColor: `${palette.primary}10`, background: palette.surface }}
    >
      {items.map((t) => (
        <button
          key={t}
          type="button"
          onClick={() => scrollTo("reviews")}
          className="cursor-pointer rounded-md px-1 py-1 transition hover:bg-black/[0.04] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/15 focus-visible:ring-offset-1"
        >
          <p className="text-[9px] font-bold uppercase leading-tight tracking-wide" style={{ color: palette.muted }}>
            {t}
          </p>
        </button>
      ))}
    </div>
  );
}

export function SiteServiceSection({
  config,
  palette,
  title,
  variant = "cards",
}: {
  config: PreviewConfig;
  palette: PaletteDef;
  title: string;
  variant?: "cards" | "rows" | "checks";
}) {
  const { scrollTo } = usePreviewInteract();
  const cr = palette.feel.serviceCardRadius;

  return (
    <section id={PREVIEW_SECTION_IDS.services} className="px-5 py-7" style={{ background: palette.surface }}>
      <h2 className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: palette.muted }}>
        {title}
      </h2>
      <div className="mt-4 grid gap-3">
        {config.services.map((s, i) => {
          if (variant === "checks") {
            return (
              <button
                key={i}
                type="button"
                onClick={() => scrollTo("contact")}
                className={`flex w-full cursor-pointer items-start gap-2 px-3 py-2.5 text-left text-sm transition hover:opacity-90 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 focus-visible:ring-offset-2 ${cr}`}
                style={{ background: palette.bg }}
              >
                <span className="font-bold" style={{ color: palette.accent }}>
                  ✓
                </span>
                <span style={{ color: palette.text }}>{s}</span>
              </button>
            );
          }
          if (variant === "rows") {
            return (
              <button
                key={i}
                type="button"
                onClick={() => scrollTo("contact")}
                className={`flex w-full cursor-pointer items-center justify-between border px-3 py-3 text-left text-sm font-medium transition hover:opacity-90 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 focus-visible:ring-offset-2 ${cr}`}
                style={{ borderColor: `${palette.primary}16`, color: palette.text }}
              >
                <span>{s}</span>
                <span style={{ color: palette.accent }}>→</span>
              </button>
            );
          }
          return (
            <button
              key={i}
              type="button"
              onClick={() => scrollTo("contact")}
              className={`w-full cursor-pointer border px-4 py-4 text-left shadow-sm transition hover:opacity-92 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 focus-visible:ring-offset-2 ${cr}`}
              style={{ borderColor: `${palette.primary}12`, background: palette.bg }}
            >
              <p className="text-[10px] font-bold uppercase tracking-wide" style={{ color: palette.accent }}>
                {i === 0 ? "Featured" : i === 1 ? "Popular" : "Ask us"}
              </p>
              <p className="mt-1 text-sm font-semibold" style={{ color: palette.text }}>
                {s}
              </p>
            </button>
          );
        })}
      </div>
    </section>
  );
}

export function SiteQuoteSection({ config, palette }: { config: PreviewConfig; palette: PaletteDef }) {
  const q = palette.feel.quoteStyle;
  const kicker = (
    <p className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: palette.accent }}>
      Loved locally
    </p>
  );
  const quoteBody = (
    <blockquote className="font-serif italic leading-relaxed" style={{ color: palette.text }}>
      “{config.testimonialQuote}”
    </blockquote>
  );
  const attr = (
    <p className="mt-3 text-xs font-medium" style={{ color: palette.muted }}>
      — {config.testimonialAttribution}
    </p>
  );

  if (q === "card") {
    return (
      <section id={PREVIEW_SECTION_IDS.reviews} className="px-5 py-8" style={{ background: palette.bg }}>
        <div
          className="mx-auto max-w-sm rounded-2xl border px-5 py-6 text-center shadow-sm"
          style={{ borderColor: `${palette.primary}14`, background: palette.surface }}
        >
          <div className="text-center">{kicker}</div>
          <div className="mx-auto mt-3 max-w-none text-center text-[0.95rem]">{quoteBody}</div>
          <div className="text-center">{attr}</div>
          <PreviewStars />
        </div>
      </section>
    );
  }

  if (q === "editorial") {
    return (
      <section id={PREVIEW_SECTION_IDS.reviews} className="px-6 py-10" style={{ background: `${palette.primary}08` }}>
        <div className="mx-auto max-w-sm border-l-4 pl-5" style={{ borderColor: palette.accent }}>
          {kicker}
          <blockquote
            className="mt-4 font-serif text-[1.05rem] font-medium leading-snug tracking-tight"
            style={{ color: palette.text }}
          >
            “{config.testimonialQuote}”
          </blockquote>
          <p className="mt-4 text-[10px] font-bold uppercase tracking-widest" style={{ color: palette.muted }}>
            {config.testimonialAttribution}
          </p>
          <PreviewStars className="!mt-2 !text-left" />
        </div>
      </section>
    );
  }

  return (
    <section id={PREVIEW_SECTION_IDS.reviews} className="px-5 py-8" style={{ background: `${palette.primary}0a` }}>
      <div className="text-center">{kicker}</div>
      <blockquote
        className="mx-auto mt-3 max-w-sm text-center font-serif text-[0.95rem] italic leading-relaxed"
        style={{ color: palette.text }}
      >
        “{config.testimonialQuote}”
      </blockquote>
      <div className="text-center">{attr}</div>
      <PreviewStars />
    </section>
  );
}

export function SiteHoursBand({ config, palette }: { config: PreviewConfig; palette: PaletteDef }) {
  const h = palette.feel.hoursStyle;

  if (h === "outlined") {
    return (
      <div
        id={PREVIEW_SECTION_IDS.contact}
        className="flex flex-col items-center justify-center gap-1.5 border-y-2 px-5 py-5 text-center"
        style={{ borderColor: palette.primary, background: palette.surface, color: palette.primary }}
      >
        <span className="text-[10px] font-bold uppercase tracking-[0.15em] opacity-80">Hours &amp; location</span>
        <span className="text-sm font-semibold leading-snug">{config.hoursLine}</span>
        <span className="text-sm leading-snug opacity-90">{config.address}</span>
      </div>
    );
  }

  if (h === "minimal") {
    return (
      <div
        id={PREVIEW_SECTION_IDS.contact}
        className="flex flex-col items-center justify-center gap-1 border-t px-5 py-4 text-center"
        style={{
          borderColor: `${palette.primary}28`,
          background: `${palette.primary}06`,
          color: palette.text,
        }}
      >
        <span className="text-[10px] font-bold uppercase tracking-[0.15em]" style={{ color: palette.muted }}>
          Hours &amp; location
        </span>
        <span className="text-sm font-semibold leading-snug">{config.hoursLine}</span>
        <span className="text-sm leading-snug" style={{ color: palette.muted }}>
          {config.address}
        </span>
      </div>
    );
  }

  return (
    <div
      id={PREVIEW_SECTION_IDS.contact}
      className="flex flex-col items-center justify-center gap-1.5 px-5 py-4 text-center"
      style={{ background: palette.primary, color: "#fff" }}
    >
      <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/80">Hours &amp; location</span>
      <span className="text-sm font-semibold leading-snug">{config.hoursLine}</span>
      <span className="text-sm leading-snug text-white/90">{config.address}</span>
    </div>
  );
}

export function SiteFooterFull({ config, palette }: { config: PreviewConfig; palette: PaletteDef }) {
  const { telHref } = usePreviewInteract();
  const year = new Date().getFullYear();

  return (
    <footer className="space-y-3 px-5 py-6 text-center text-xs" style={{ color: palette.muted, background: palette.bg }}>
      <p className="font-semibold" style={{ color: palette.text }}>
        {telHref ? (
          <a
            href={telHref}
            className="rounded-sm underline-offset-2 transition hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/25 focus-visible:ring-offset-2"
            style={{ color: palette.text }}
          >
            {config.phone}
          </a>
        ) : (
          config.phone
        )}
      </p>
      <p>{config.address}</p>
      <p className="text-[10px]">
        © {year} {config.businessName}. Preview only.
      </p>
    </footer>
  );
}

export function SiteStickyCta({ config, palette }: { config: PreviewConfig; palette: PaletteDef }) {
  const { scrollTo, telHref } = usePreviewInteract();
  const ctaR = palette.feel.ctaRadius;

  return (
    <div
      className="sticky bottom-0 z-10 border-t px-3 py-2.5 shadow-[0_-8px_24px_rgba(0,0,0,0.12)]"
      style={{
        borderColor: `${palette.primary}18`,
        background: "rgba(255,255,255,0.94)",
        backdropFilter: "blur(8px)",
      }}
    >
      <div className="mx-auto flex max-w-md flex-wrap items-stretch gap-2">
        <button
          type="button"
          onClick={() => scrollTo("contact")}
          className={`min-h-[40px] min-w-[120px] flex-1 cursor-pointer text-xs font-bold text-white shadow-sm transition hover:brightness-110 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30 focus-visible:ring-offset-2 ${ctaR}`}
          style={{ background: palette.primary }}
        >
          {config.ctaPrimary}
        </button>
        {telHref ? (
          <a
            href={telHref}
            className={`inline-flex min-h-[40px] min-w-[96px] flex-1 cursor-pointer items-center justify-center border px-3 text-[10px] font-semibold transition hover:opacity-85 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/25 focus-visible:ring-offset-2 ${ctaR}`}
            style={{ borderColor: `${palette.primary}30`, color: palette.primary }}
          >
            {config.ctaSecondary}
          </a>
        ) : (
          <button
            type="button"
            onClick={() => scrollTo("services")}
            className={`inline-flex min-h-[40px] min-w-[96px] flex-1 cursor-pointer items-center justify-center border px-3 text-[10px] font-semibold transition hover:opacity-85 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/25 focus-visible:ring-offset-2 ${ctaR}`}
            style={{ borderColor: `${palette.primary}30`, color: palette.primary }}
          >
            {config.ctaSecondary}
          </button>
        )}
      </div>
    </div>
  );
}

export function SiteHeroLight({
  config,
  palette,
  heroRasterSrc,
  heroGradient,
  eyebrow,
  support,
}: {
  config: PreviewConfig;
  palette: PaletteDef;
  heroRasterSrc: string | null;
  heroGradient: string;
  eyebrow: string;
  support: string;
}) {
  const { scrollTo, telHref } = usePreviewInteract();
  const pad = heroLightDensityClass[palette.feel.heroDensity];
  const ctaR = palette.feel.ctaRadius;

  return (
    <header className={`relative min-h-[220px] overflow-hidden ${pad} text-center`}>
      {heroRasterSrc ? (
        <>
          <img
            src={heroRasterSrc}
            alt=""
            className="pointer-events-none absolute inset-0 z-0 h-full min-h-[220px] w-full object-cover"
            decoding="async"
          />
          <div
            className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-white/75 via-white/40 to-white/15"
            aria-hidden
          />
        </>
      ) : (
        <>
          <div className="absolute inset-0 z-0 min-h-[220px]" style={{ background: heroGradient }} aria-hidden />
          <div
            className="pointer-events-none absolute inset-0 z-[1] opacity-[0.07]"
            style={{
              backgroundImage: `radial-gradient(circle at 30% 20%, ${palette.accent} 0%, transparent 50%)`,
            }}
            aria-hidden
          />
        </>
      )}
      <div className="relative z-[2]">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: palette.accent }}>
          {eyebrow}
        </p>
        <h1 className="mt-2 font-serif text-[1.5rem] font-semibold leading-tight" style={{ color: palette.text }}>
          {config.tagline || "Care that fits your schedule"}
        </h1>
        <p className="mx-auto mt-3 max-w-xs text-sm" style={{ color: palette.muted }}>
          {support}
        </p>
        <div className="mt-6 flex w-full flex-col items-stretch gap-2 px-1">
          <button
            type="button"
            onClick={() => scrollTo("contact")}
            className={`inline-flex min-h-[42px] w-full max-w-[280px] cursor-pointer items-center justify-center self-center px-6 text-sm font-semibold text-white shadow-md transition hover:brightness-110 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/25 focus-visible:ring-offset-2 ${ctaR}`}
            style={{ background: palette.primary }}
          >
            {config.ctaPrimary}
          </button>
          {telHref ? (
            <a
              href={telHref}
              className={`inline-flex min-h-[42px] w-full max-w-[280px] cursor-pointer items-center justify-center self-center border px-6 text-sm font-semibold transition hover:opacity-90 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/25 focus-visible:ring-offset-2 ${ctaR}`}
              style={{ borderColor: `${palette.primary}35`, color: palette.primary }}
            >
              {config.ctaSecondary}
            </a>
          ) : (
            <button
              type="button"
              onClick={() => scrollTo("services")}
              className={`inline-flex min-h-[42px] w-full max-w-[280px] cursor-pointer items-center justify-center self-center border px-6 text-sm font-semibold transition hover:opacity-90 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/25 focus-visible:ring-offset-2 ${ctaR}`}
              style={{ borderColor: `${palette.primary}35`, color: palette.primary }}
            >
              {config.ctaSecondary}
            </button>
          )}
        </div>
        <p className="mt-4 text-xs" style={{ color: palette.muted }}>
          {telHref ? (
            <a
              href={telHref}
              className="rounded-sm underline-offset-2 transition hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/25 focus-visible:ring-offset-2"
              style={{ color: palette.muted }}
            >
              {config.phone}
            </a>
          ) : (
            config.phone
          )}
        </p>
      </div>
    </header>
  );
}

export function SiteEmergencyBanner({ text, palette }: { text: string; palette: PaletteDef }) {
  return (
    <div
      className="px-4 py-2 text-center text-[10px] font-bold uppercase tracking-wide text-white"
      style={{ background: `linear-gradient(90deg, ${palette.accent}, ${palette.accent}dd)` }}
    >
      {text}
    </div>
  );
}
