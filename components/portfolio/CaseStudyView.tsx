"use client";

import type { ComponentType } from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { PortfolioProject } from "@/lib/portfolio-data";
import { getPreviewVariantLabels, PREVIEW_VARIANT_COUNT } from "@/lib/portfolio-variants";
import type { PreviewProps } from "./previews/types";
import { BrowserChrome } from "./BrowserChrome";
import { RedDirtRoofingPreview } from "./previews/RedDirtRoofing";
import { SummitDentalPreview } from "./previews/SummitDental";
import { BricktownBistroPreview } from "./previews/BricktownBistro";
import { PrairieHvacAdsPreview } from "./previews/PrairieHvacAds";

const mockUrls: Record<string, string> = {
  "red-dirt-roofing": "https://reddirtroofing.example.com/storm-help",
  "summit-family-dental": "https://book.summitfamilydental.example.com",
  "bricktown-bistro": "https://bricktownbistro.example.com",
  "prairie-hvac-ads": "https://ads.dashboard.prairiehvac.example.com/summer",
};

const PreviewBySlug: Record<string, ComponentType<PreviewProps>> = {
  "red-dirt-roofing": RedDirtRoofingPreview,
  "summit-family-dental": SummitDentalPreview,
  "bricktown-bistro": BricktownBistroPreview,
  "prairie-hvac-ads": PrairieHvacAdsPreview,
};

const categoryStyles: Record<string, string> = {
  website: "bg-[var(--color-navy)]/10 text-[var(--color-navy)] ring-1 ring-[var(--color-navy)]/15",
  booking: "bg-teal-50 text-teal-900 ring-1 ring-teal-200/60",
  ads: "bg-violet-50 text-violet-900 ring-1 ring-violet-200/60",
};

type Props = {
  project: PortfolioProject;
};

export function CaseStudyView({ project }: Props) {
  const Preview = PreviewBySlug[project.slug];
  const mockUrl = mockUrls[project.slug] ?? "https://example.com";
  const variantLabels = getPreviewVariantLabels(project.slug);
  const [previewVariant, setPreviewVariant] = useState(0);

  useEffect(() => {
    setPreviewVariant(0);
  }, [project.slug]);

  return (
    <div className="min-h-dvh bg-[var(--color-cream)] pb-16 pt-[calc(5.5rem+env(safe-area-inset-top,0px))] sm:pt-24">
      <motion.div
        className="mx-auto max-w-5xl px-4 sm:px-6"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <Link
          href="/#portfolio"
          className="inline-flex min-h-12 items-center gap-2 text-base font-medium text-[var(--color-accent)] transition hover:text-[var(--color-navy)] sm:text-sm"
        >
          <span aria-hidden>←</span> Back to work samples
        </Link>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${categoryStyles[project.category] ?? categoryStyles.website}`}
          >
            {project.categoryLabel}
          </span>
          <span className="text-sm text-[var(--color-muted)]">
            {project.client} · {project.location}
          </span>
        </div>

        <h1 className="mt-4 font-serif text-3xl font-semibold tracking-tight text-[var(--color-ink-deep)] sm:text-4xl">
          {project.title}
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-[var(--color-muted)]">{project.excerpt}</p>

        <div className="mt-10 grid gap-6 rounded-2xl border border-[var(--color-border)] bg-white/80 p-6 shadow-sm backdrop-blur sm:grid-cols-2 sm:p-8">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-[0.15em] text-[var(--color-muted)]">Context</h2>
            <p className="mt-2 text-sm leading-relaxed text-[var(--color-ink)]">{project.challenge}</p>
          </div>
          <div>
            <h2 className="text-xs font-bold uppercase tracking-[0.15em] text-[var(--color-muted)]">What we’d ship</h2>
            <p className="mt-2 text-sm leading-relaxed text-[var(--color-ink)]">{project.outcome}</p>
          </div>
        </div>

        <div id="preview-variants" className="mt-10 scroll-mt-28">
          <h2 className="font-serif text-xl font-semibold text-[var(--color-ink-deep)]">Interactive preview</h2>
          <p className="mt-2 text-sm text-[var(--color-muted)]">
            Sample concept (not a real business) · Same project, four different layouts and color directions—pick a look
            below, then scroll inside the frame.
          </p>

          <div
            className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"
            role="radiogroup"
            aria-label="Preview style"
          >
            {variantLabels.map((label, i) => (
              <button
                key={label}
                type="button"
                role="radio"
                aria-checked={previewVariant === i}
                onClick={() => setPreviewVariant(i)}
                className={`min-h-[44px] rounded-xl border px-4 py-2.5 text-left text-sm font-medium transition sm:min-h-0 ${
                  previewVariant === i
                    ? "border-[var(--color-navy)] bg-[var(--color-navy)] text-white shadow-md shadow-[var(--color-navy)]/15"
                    : "border-[var(--color-border)] bg-white/90 text-[var(--color-ink)] hover:border-[var(--color-accent)]/35"
                }`}
              >
                <span className="text-[10px] font-bold uppercase tracking-wide opacity-80">Look {i + 1}</span>
                <span className="mt-0.5 block">{label}</span>
              </button>
            ))}
          </div>

          <div className="mt-6">
            <BrowserChrome url={`${mockUrl}${previewVariant > 0 ? `#style-${previewVariant + 1}` : ""}`}>
              {Preview ? <Preview variant={previewVariant % PREVIEW_VARIANT_COUNT} /> : null}
            </BrowserChrome>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <span
              key={t}
              className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] px-3 py-1 text-xs font-medium text-[var(--color-muted)]"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-[var(--color-border)] pt-10 sm:flex-row sm:flex-wrap">
          <Link
            href="/#contact"
            className="inline-flex min-h-[48px] w-full items-center justify-center rounded-xl bg-[var(--color-navy)] px-8 text-base font-semibold text-white shadow-lg shadow-[var(--color-navy)]/15 transition hover:bg-[var(--color-navy-deep)] sm:w-auto sm:text-sm"
          >
            Talk about your project
          </Link>
          <Link
            href="/#portfolio"
            className="inline-flex min-h-[48px] w-full items-center justify-center rounded-xl border border-[var(--color-border)] bg-white px-8 text-base font-semibold text-[var(--color-navy)] sm:w-auto sm:text-sm"
          >
            More project samples
          </Link>
          <Link
            href="#preview-variants"
            className="inline-flex min-h-[48px] w-full items-center justify-center rounded-xl border border-dashed border-[var(--color-border)] bg-[var(--color-surface-alt)] px-8 text-base font-semibold text-[var(--color-muted)] sm:w-auto sm:text-sm"
          >
            Switch look above
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
