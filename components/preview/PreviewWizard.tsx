"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Footer } from "@/components/landing/Footer";
import { Navbar } from "@/components/landing/Navbar";
import { SiteGridBackdrop } from "@/components/landing/SiteGridBackdrop";
import { PrimaryCtaLink } from "@/components/ui/primary-cta";
import { BOOK_CALL_PATH } from "@/lib/constants";
import { previewCategories } from "@/lib/preview-templates/categories";
import type { NicheDef } from "@/lib/preview-templates/niches";
import { getNichesForCategory } from "@/lib/preview-templates/niches";
import { palettes } from "@/lib/preview-templates/registry";
import { stockHeroUrlForTemplate } from "@/lib/preview-stock-photos";
import { mergeSharePayloadIntoConfig } from "@/lib/preview-config-from-share";
import { siteDefaultsForLayout } from "@/lib/preview-site-defaults";
import type { CategoryId } from "@/lib/preview-types";
import { createEmptyPreviewConfig, toSharePayload, type PreviewConfig } from "@/lib/preview-types";
import { decodePreviewShareParam, encodePreviewSharePayload } from "@/lib/preview-share";
import { CrmSandboxDemo } from "./CrmSandboxDemo";
import { PreviewDeviceFrame } from "./PreviewDeviceFrame";
import { PreviewRenderer } from "./PreviewRenderer";

type Step = "category" | "niche" | "customize" | "result";

/** Dark text on white inputs — global `--color-ink` is light for the site chrome. */
const PREVIEW_LIGHT_FIELD =
  "rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-600 shadow-sm focus:border-[var(--color-accent)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/25";

export function PreviewWizard() {
  const searchParams = useSearchParams();
  const [step, setStep] = useState<Step>("category");
  const [config, setConfig] = useState<PreviewConfig>(() => createEmptyPreviewConfig());
  const [nicheQuery, setNicheQuery] = useState("");
  const [leadName, setLeadName] = useState("");
  const [leadEmail, setLeadEmail] = useState("");
  const [leadPhone, setLeadPhone] = useState("");
  const [leadNotes, setLeadNotes] = useState("");
  const [leadStatus, setLeadStatus] = useState<"idle" | "sending" | "ok" | "err">("idle");
  const [leadMsg, setLeadMsg] = useState("");
  const [shareHint, setShareHint] = useState("");
  const [previewTab, setPreviewTab] = useState<"site" | "crm">("site");
  const [previewFrameMode, setPreviewFrameMode] = useState<"phone" | "desktop">("desktop");

  const sharePayload = useMemo(() => toSharePayload(config), [config]);
  const shareToken = useMemo(
    () => (sharePayload ? encodePreviewSharePayload(sharePayload) : ""),
    [sharePayload],
  );

  useEffect(() => {
    const rawParam = searchParams.get("c");
    if (!rawParam) return;
    let decodedParam = rawParam;
    try {
      decodedParam = decodeURIComponent(rawParam);
    } catch {
      return;
    }
    const parsed = decodePreviewShareParam(decodedParam);
    if (!parsed) return;
    setConfig((prev) => mergeSharePayloadIntoConfig(prev, parsed));
    setStep("result");
  }, [searchParams]);

  useEffect(() => {
    if (step !== "result" || typeof window === "undefined" || !shareToken) return;
    const url = new URL(window.location.href);
    url.searchParams.set("c", shareToken);
    window.history.replaceState(null, "", `${url.pathname}?${url.searchParams.toString()}`);
  }, [step, shareToken]);

  const selectCategory = (id: CategoryId) => {
    setConfig((prev) => ({
      ...prev,
      categoryId: id,
      nicheId: null,
      nicheLabel: "",
      templateId: null,
      archetypeId: null,
    }));
    setNicheQuery("");
    setStep("niche");
  };

  const selectNiche = (niche: NicheDef) => {
    const site = siteDefaultsForLayout(niche.templateId, niche.layoutId);
    setConfig((prev) => ({
      ...prev,
      categoryId: niche.categoryId,
      nicheId: niche.id,
      nicheLabel: niche.label,
      templateId: niche.templateId,
      archetypeId: niche.layoutId,
      tagline: niche.defaultTagline,
      services: [...niche.defaultServices] as [string, string, string],
      heroImageUrl: stockHeroUrlForTemplate(niche.templateId),
      ...site,
    }));
    setStep("customize");
  };

  const nichesFiltered = useMemo(() => {
    if (!config.categoryId) return [];
    const list = getNichesForCategory(config.categoryId);
    const q = nicheQuery.trim().toLowerCase();
    if (!q) return list;
    return list.filter((n) => n.label.toLowerCase().includes(q));
  }, [config.categoryId, nicheQuery]);

  const copyShareLink = useCallback(() => {
    if (!shareToken || typeof window === "undefined") return;
    const url = `${window.location.origin}/preview?c=${encodeURIComponent(shareToken)}`;
    void navigator.clipboard.writeText(url).then(() => {
      setShareHint("Link copied to clipboard.");
      setTimeout(() => setShareHint(""), 2500);
    });
  }, [shareToken]);

  const onHeroFile = (file: File | null) => {
    if (!file) return;
    if (file.size > 450_000) {
      setShareHint("Image is too large—try under 450KB or use an image URL instead.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const r = reader.result;
      if (typeof r === "string") {
        setConfig((prev) => ({ ...prev, heroImageUrl: r }));
      }
    };
    reader.readAsDataURL(file);
  };

  const submitLead = async () => {
    setLeadStatus("sending");
    setLeadMsg("");
    try {
      const res = await fetch("/api/preview-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: leadName,
          email: leadEmail,
          phone: leadPhone,
          businessName: config.businessName,
          notes: leadNotes,
          categoryId: config.categoryId ?? "",
          nicheId: config.nicheId ?? "",
          nicheLabel: config.nicheLabel ?? "",
          templateId: config.templateId ?? "",
          layoutId: config.archetypeId ?? "",
          archetypeId: config.archetypeId ?? "",
          paletteId: config.paletteId,
          shareToken,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setLeadStatus("err");
        setLeadMsg(data.error || "Something went wrong.");
        return;
      }
      setLeadStatus("ok");
      setLeadMsg("Thanks—we’ll follow up within one business day. Check your inbox for a short confirmation.");
    } catch {
      setLeadStatus("err");
      setLeadMsg("Network error. Try again or call us.");
    }
  };

  const canAdvanceFromCustomize = config.businessName.trim().length > 0;
  const customizeReady = Boolean(config.templateId && config.nicheId && config.archetypeId);
  const resultReady = customizeReady && sharePayload !== null;

  return (
    <div className="relative min-h-dvh bg-[var(--color-cream)] text-[var(--color-ink)]">
      <SiteGridBackdrop />
      <Navbar />
      <main
        id="main"
        className="relative z-[1] mx-auto max-w-6xl px-4 pb-20 pt-[calc(7rem+env(safe-area-inset-top,0px))] sm:px-6 sm:pb-24"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-gold)]">Site preview builder</p>
        <h1 className="mt-2 font-serif text-3xl font-semibold tracking-tight text-[var(--color-ink-deep)] sm:text-4xl">
          A quick look at what your site could be
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-[var(--color-muted)]">
          Pick your category and business type, then tune the copy and look. This is a fast, illustrative preview—not your
          finished site. For a <strong className="font-semibold text-[var(--color-ink)]">fully customized build you own</strong>
          , contact us or book a call. We can also host and care for the site after launch if you want that—see{" "}
          <Link href="/website-hosting" className="font-semibold text-[var(--color-accent)] underline-offset-2 hover:underline">
            how hosting works
          </Link>
          .
        </p>

        <ol className="mt-8 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-wide text-[var(--color-muted)]">
          {(["category", "niche", "customize", "result"] as const).map((s, i) => {
            const active = step === s;
            const done =
              (s === "category" && step !== "category") ||
              (s === "niche" && (step === "customize" || step === "result")) ||
              (s === "customize" && step === "result");
            const label =
              s === "category" ? "Category" : s === "niche" ? "Niche" : s === "customize" ? "Design" : "Review";
            return (
              <li
                key={s}
                className={`rounded-full px-3 py-1 ${
                  active
                    ? "bg-[var(--color-navy)] text-white"
                    : done
                      ? "bg-[var(--color-accent)]/15 text-[var(--color-accent)]"
                      : "bg-paper/80"
                }`}
              >
                {i + 1}. {label}
              </li>
            );
          })}
        </ol>

        {step === "category" && (
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {previewCategories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => selectCategory(cat.id)}
                className="flex flex-col rounded-2xl border border-[var(--color-border)] bg-paper/80 p-6 text-left shadow-sm transition hover:border-[var(--color-accent)]/40 hover:shadow-md"
              >
                <span className="font-serif text-xl font-semibold text-[var(--color-ink-deep)]">{cat.label}</span>
                <span className="mt-2 text-sm text-[var(--color-muted)]">{cat.description}</span>
                <span className="mt-4 text-sm font-semibold text-[var(--color-accent)]">Choose →</span>
              </button>
            ))}
          </div>
        )}

        {step === "niche" && config.categoryId && (
          <div className="mt-10">
            <button
              type="button"
              className="text-sm font-semibold text-[var(--color-accent)]"
              onClick={() => setStep("category")}
            >
              ← Back
            </button>
            <label className="mt-6 block max-w-md">
              <span className="text-xs font-bold uppercase tracking-wide text-[var(--color-muted)]">
                Filter business types
              </span>
              <input
                type="search"
                className="mt-1 w-full rounded-xl border border-[var(--color-border)] bg-paper px-4 py-3 text-[var(--color-ink)]"
                placeholder="Type to filter…"
                value={nicheQuery}
                onChange={(e) => setNicheQuery(e.target.value)}
              />
            </label>
            {nichesFiltered.length === 0 ? (
              <p className="mt-8 text-[var(--color-muted)]">No matches—try a shorter search.</p>
            ) : (
              <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {nichesFiltered.map((n) => (
                  <li key={n.id}>
                    <button
                      type="button"
                      onClick={() => selectNiche(n)}
                      className="flex h-full w-full flex-col rounded-2xl border border-[var(--color-border)] bg-paper/80 p-4 text-left shadow-sm transition hover:border-[var(--color-accent)]/40"
                    >
                      <span className="font-serif text-base font-semibold text-[var(--color-ink-deep)]">{n.label}</span>
                      <span className="mt-3 text-sm font-semibold text-[var(--color-accent)]">Select →</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {step === "customize" && customizeReady && (
          <div className="mt-10 grid gap-10 xl:grid-cols-[minmax(0,1fr)_min(100%,400px)] xl:items-start xl:gap-14">
            <div className="order-2 space-y-4 xl:sticky xl:top-24 xl:order-1">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.15em] text-[var(--color-gold)]">Live preview</p>
                  <p className="mt-1 font-serif text-lg font-semibold text-[var(--color-ink-deep)]">Your site, updating live</p>
                </div>
                <div className="flex rounded-full border border-[var(--color-border)] bg-paper/90 p-0.5 text-xs font-semibold">
                  <button
                    type="button"
                    onClick={() => setPreviewFrameMode("desktop")}
                    className={`rounded-full px-3 py-1.5 transition ${
                      previewFrameMode === "desktop"
                        ? "bg-[var(--color-navy)] text-white"
                        : "text-[var(--color-muted)]"
                    }`}
                  >
                    Desktop
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewFrameMode("phone")}
                    className={`rounded-full px-3 py-1.5 transition ${
                      previewFrameMode === "phone"
                        ? "bg-[var(--color-navy)] text-white"
                        : "text-[var(--color-muted)]"
                    }`}
                  >
                    Phone
                  </button>
                </div>
              </div>
              <PreviewDeviceFrame mode={previewFrameMode} siteLabel={config.businessName}>
                <PreviewRenderer config={config} />
              </PreviewDeviceFrame>
              <p className="text-xs leading-relaxed text-[var(--color-muted)]">
                Scroll inside the frame to see the full experience—nav, services, testimonial, hours band, and sticky call
                bar—similar to what we ship for real clients.
              </p>
            </div>

            <div className="order-1 space-y-5 xl:order-2 xl:max-h-[calc(100vh-8rem)] xl:overflow-y-auto xl:pr-2">
              <button
                type="button"
                className="text-sm font-semibold text-[var(--color-accent)]"
                onClick={() => setStep("niche")}
              >
                ← Back
              </button>
              <p className="text-sm text-[var(--color-muted)]">
                <span className="font-semibold text-[var(--color-ink)]">{config.nicheLabel}</span>
                {config.categoryId ? (
                  <>
                    {" "}
                    · {previewCategories.find((c) => c.id === config.categoryId)?.label ?? config.categoryId}
                  </>
                ) : null}
              </p>
              <p className="text-sm leading-relaxed text-[var(--color-muted)]">
                Tune every customer-facing line. When you’re ready for a real build you own, use the next step to share this
                preview, send us a note, or book a call.
              </p>

              <fieldset className="rounded-2xl border border-[var(--color-border)] bg-paper/70 p-5 shadow-sm">
                <legend className="px-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--color-gold)]">
                  Brand &amp; contact
                </legend>
                <div className="mt-4 space-y-3">
                  <label className="block">
                    <span className="text-xs font-semibold text-[var(--color-muted)]">Business name</span>
                    <input
                      className={`mt-1 w-full ${PREVIEW_LIGHT_FIELD}`}
                      value={config.businessName}
                      onChange={(e) => setConfig((p) => ({ ...p, businessName: e.target.value }))}
                    />
                  </label>
                  <label className="block">
                    <span className="text-xs font-semibold text-[var(--color-muted)]">Phone</span>
                    <input
                      className={`mt-1 w-full ${PREVIEW_LIGHT_FIELD}`}
                      value={config.phone}
                      onChange={(e) => setConfig((p) => ({ ...p, phone: e.target.value }))}
                    />
                  </label>
                  <label className="block">
                    <span className="text-xs font-semibold text-[var(--color-muted)]">City / service area</span>
                    <input
                      className={`mt-1 w-full ${PREVIEW_LIGHT_FIELD}`}
                      value={config.address}
                      onChange={(e) => setConfig((p) => ({ ...p, address: e.target.value }))}
                    />
                  </label>
                </div>
              </fieldset>

              <fieldset className="rounded-2xl border border-[var(--color-border)] bg-paper/70 p-5 shadow-sm">
                <legend className="px-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--color-gold)]">
                  Hero &amp; main actions
                </legend>
                <div className="mt-4 space-y-3">
                  <label className="block">
                    <span className="text-xs font-semibold text-[var(--color-muted)]">Headline / tagline</span>
                    <input
                      className={`mt-1 w-full ${PREVIEW_LIGHT_FIELD}`}
                      value={config.tagline}
                      onChange={(e) => setConfig((p) => ({ ...p, tagline: e.target.value }))}
                    />
                  </label>
                  <label className="block">
                    <span className="text-xs font-semibold text-[var(--color-muted)]">Primary button</span>
                    <input
                      className={`mt-1 w-full ${PREVIEW_LIGHT_FIELD}`}
                      value={config.ctaPrimary}
                      onChange={(e) => setConfig((p) => ({ ...p, ctaPrimary: e.target.value }))}
                    />
                  </label>
                  <label className="block">
                    <span className="text-xs font-semibold text-[var(--color-muted)]">Secondary button</span>
                    <input
                      className={`mt-1 w-full ${PREVIEW_LIGHT_FIELD}`}
                      value={config.ctaSecondary}
                      onChange={(e) => setConfig((p) => ({ ...p, ctaSecondary: e.target.value }))}
                    />
                  </label>
                  <label className="block">
                    <span className="text-xs font-semibold text-[var(--color-muted)]">Hero image</span>
                    <input
                      className={`mt-1 w-full ${PREVIEW_LIGHT_FIELD}`}
                      placeholder="https://…"
                      value={config.heroImageUrl.startsWith("data:") ? "" : config.heroImageUrl}
                      onChange={(e) => setConfig((p) => ({ ...p, heroImageUrl: e.target.value }))}
                    />
                    <span className="mt-1 block text-[11px] leading-relaxed text-[var(--color-muted)]">
                      Starts with a curated stock photo for this industry. Replace it by pasting an image URL or uploading
                      (~450KB max). Clear the field to fall back to stock again. Data URLs aren’t included in shared links.
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      className="mt-2 block w-full text-xs text-[var(--color-muted)]"
                      onChange={(e) => onHeroFile(e.target.files?.[0] ?? null)}
                    />
                  </label>
                </div>
              </fieldset>

              <fieldset className="rounded-2xl border border-[var(--color-border)] bg-paper/70 p-5 shadow-sm">
                <legend className="px-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--color-gold)]">
                  Page content
                </legend>
                <div className="mt-4 space-y-3">
                  {config.services.map((s, i) => (
                    <label key={i} className="block">
                      <span className="text-xs font-semibold text-[var(--color-muted)]">Highlight {i + 1}</span>
                      <input
                        className={`mt-1 w-full ${PREVIEW_LIGHT_FIELD}`}
                        value={s}
                        onChange={(e) => {
                          const v = e.target.value;
                          setConfig((p) => {
                            const next = [...p.services] as [string, string, string];
                            next[i] = v;
                            return { ...p, services: next };
                          });
                        }}
                      />
                    </label>
                  ))}
                  <label className="block">
                    <span className="text-xs font-semibold text-[var(--color-muted)]">Hours / availability line</span>
                    <input
                      className={`mt-1 w-full ${PREVIEW_LIGHT_FIELD}`}
                      value={config.hoursLine}
                      onChange={(e) => setConfig((p) => ({ ...p, hoursLine: e.target.value }))}
                    />
                  </label>
                </div>
              </fieldset>

              <fieldset className="rounded-2xl border border-[var(--color-border)] bg-paper/70 p-5 shadow-sm">
                <legend className="px-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--color-gold)]">
                  Social proof
                </legend>
                <div className="mt-4 space-y-3">
                  <label className="block">
                    <span className="text-xs font-semibold text-[var(--color-muted)]">Review quote</span>
                    <textarea
                      className={`mt-1 min-h-[72px] w-full ${PREVIEW_LIGHT_FIELD}`}
                      value={config.testimonialQuote}
                      onChange={(e) => setConfig((p) => ({ ...p, testimonialQuote: e.target.value }))}
                    />
                  </label>
                  <label className="block">
                    <span className="text-xs font-semibold text-[var(--color-muted)]">Attribution</span>
                    <input
                      className={`mt-1 w-full ${PREVIEW_LIGHT_FIELD}`}
                      value={config.testimonialAttribution}
                      onChange={(e) => setConfig((p) => ({ ...p, testimonialAttribution: e.target.value }))}
                    />
                  </label>
                </div>
              </fieldset>

              <fieldset className="rounded-2xl border border-[var(--color-border)] bg-paper/70 p-5 shadow-sm">
                <legend className="px-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--color-gold)]">
                  Look &amp; feel
                </legend>
                <p className="mt-2 text-xs leading-relaxed text-[var(--color-muted)]">
                  Each direction changes <span className="font-semibold text-[var(--color-ink)]">layout rhythm</span> (what
                  visitors see first), list style, testimonial treatment, and hero/nav attitude—not only colors.
                </p>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {palettes.map((pal) => (
                    <button
                      key={pal.id}
                      type="button"
                      onClick={() => setConfig((p) => ({ ...p, paletteId: pal.id }))}
                      className={`rounded-xl border-2 p-4 text-left transition ${
                        config.paletteId === pal.id
                          ? "border-[var(--color-accent)] bg-[var(--color-accent)]/12 shadow-md"
                          : "border-[var(--color-border)] bg-white hover:border-[var(--color-muted)]"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span
                          className="h-3 w-3 shrink-0 rounded-full border border-black/10 shadow-sm"
                          style={{ background: `linear-gradient(135deg, ${pal.primary}, ${pal.accent})` }}
                          aria-hidden
                        />
                        <span className="text-sm font-bold text-zinc-900">{pal.label}</span>
                      </span>
                      <span className="mt-2 block text-xs leading-snug text-zinc-600">{pal.feel.pitch}</span>
                    </button>
                  ))}
                </div>
              </fieldset>

              <button
                type="button"
                disabled={!canAdvanceFromCustomize}
                onClick={() => setStep("result")}
                className="w-full rounded-xl bg-[var(--color-navy)] py-4 text-center font-semibold text-white shadow-lg disabled:opacity-40"
              >
                Open full preview &amp; next steps
              </button>
            </div>
          </div>
        )}

        {step === "result" && resultReady && (
          <div className="mt-10 space-y-12">
            <div className="rounded-2xl border border-[var(--color-accent)]/25 bg-[var(--color-navy-deep)]/35 p-6 sm:p-10">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-gold)]">Preview complete</p>
              <h2 className="mt-2 font-serif text-2xl font-semibold tracking-tight text-[var(--color-ink-deep)] sm:text-3xl">
                Here’s a quick look at what your site could be
              </h2>
              <p className="mt-3 max-w-2xl text-lg text-[var(--color-muted)]">
                <span className="font-semibold text-[var(--color-ink)]">{config.businessName}</span> —{" "}
                {config.nicheLabel}. This layout shows the kind of clear navigation, CTAs, trust, and mobile flow we design
                for Oklahoma businesses. Your live site would be fully customized—you own it. To move forward, book a call
                or send us your details below.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <PrimaryCtaLink href={BOOK_CALL_PATH} className="!inline-flex !min-h-11 items-center px-5 text-sm">
                  Book a call
                </PrimaryCtaLink>
                <button
                  type="button"
                  className="text-sm font-semibold text-[var(--color-accent)]"
                  onClick={() => setStep("customize")}
                >
                  ← Refine customization
                </button>
              </div>
            </div>

            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_min(100%,280px)] lg:items-start">
              <div className="min-w-0 space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--color-border)] pb-4">
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => setPreviewTab("site")}
                      className={`rounded-full px-4 py-2 text-sm font-semibold ${
                        previewTab === "site" ? "bg-[var(--color-navy)] text-white" : "bg-paper/80 text-[var(--color-muted)]"
                      }`}
                    >
                      Full website
                    </button>
                    <button
                      type="button"
                      onClick={() => setPreviewTab("crm")}
                      className={`rounded-full px-4 py-2 text-sm font-semibold ${
                        previewTab === "crm" ? "bg-[var(--color-navy)] text-white" : "bg-paper/80 text-[var(--color-muted)]"
                      }`}
                    >
                      CRM demo
                    </button>
                  </div>
                  <div className="flex rounded-full border border-[var(--color-border)] bg-paper/90 p-0.5 text-xs font-semibold">
                    <button
                      type="button"
                      onClick={() => setPreviewFrameMode("desktop")}
                      className={`rounded-full px-3 py-1.5 ${
                        previewFrameMode === "desktop"
                          ? "bg-[var(--color-navy)] text-white"
                          : "text-[var(--color-muted)]"
                      }`}
                    >
                      Desktop
                    </button>
                    <button
                      type="button"
                      onClick={() => setPreviewFrameMode("phone")}
                      className={`rounded-full px-3 py-1.5 ${
                        previewFrameMode === "phone" ? "bg-[var(--color-navy)] text-white" : "text-[var(--color-muted)]"
                      }`}
                    >
                      Phone
                    </button>
                  </div>
                </div>
                {previewTab === "site" ? (
                  <div className="flex justify-center">
                    <PreviewDeviceFrame mode={previewFrameMode} siteLabel={config.businessName}>
                      <PreviewRenderer config={config} />
                    </PreviewDeviceFrame>
                  </div>
                ) : (
                  <CrmSandboxDemo templateId={config.templateId} />
                )}
              </div>

              <aside className="rounded-2xl border border-[var(--color-border)] bg-paper/80 p-5 lg:sticky lg:top-24">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--color-gold)]">Included feel</p>
                <ul className="mt-3 space-y-2 text-sm text-[var(--color-ink)]">
                  <li className="flex gap-2">
                    <span className="text-[var(--color-accent)]">✓</span> Top nav + branded header
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[var(--color-accent)]">✓</span> Hero with dual CTAs
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[var(--color-accent)]">✓</span> Service highlights
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[var(--color-accent)]">✓</span> Testimonial &amp; hours strip
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[var(--color-accent)]">✓</span> Sticky action bar (mobile-style)
                  </li>
                </ul>
                <p className="mt-4 text-xs text-[var(--color-muted)]">
                  A full build includes your content, domain, forms, SEO, and integrations—we scope it on a short call.{" "}
                  <Link href="/website-hosting" className="font-semibold text-[var(--color-accent)] underline-offset-2 hover:underline">
                    Optional hosting
                  </Link>{" "}
                  is available after launch.
                </p>
              </aside>
            </div>

            <div className="rounded-2xl border border-[var(--color-border)] bg-paper/80 p-6 sm:p-8">
              <h3 className="font-serif text-xl font-semibold text-[var(--color-ink-deep)]">Share this preview</h3>
              <p className="mt-2 text-sm text-[var(--color-muted)]">
                Anyone with the link sees this configuration—great for partners or decision-makers. When you want a fully
                custom site you own, book a call or use the form below; we reply within one business day.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={copyShareLink}
                  disabled={!shareToken}
                  className="rounded-xl border border-zinc-300 bg-white px-5 py-3 text-sm font-semibold text-zinc-900 shadow-sm disabled:opacity-40"
                >
                  Copy share link
                </button>
                <PrimaryCtaLink href={BOOK_CALL_PATH} className="!inline-flex !min-h-12 items-center px-5 text-sm">
                  Book a call
                </PrimaryCtaLink>
              </div>
              {shareHint ? <p className="mt-3 text-sm text-[var(--color-accent)]">{shareHint}</p> : null}
            </div>

            <div className="rounded-2xl border border-[var(--color-border)] bg-paper/80 p-6 sm:p-8">
              <h2 className="font-serif text-xl font-semibold text-[var(--color-ink-deep)]">Get a fully custom build you own</h2>
              <p className="mt-2 text-sm text-[var(--color-muted)]">
                Send a note and we’ll follow up with next steps—or skip straight to{" "}
                <Link href={BOOK_CALL_PATH} className="font-semibold text-[var(--color-accent)] underline-offset-2 hover:underline">
                  booking a call
                </Link>
                . No obligation; we align on scope before any build.
              </p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <label className="block sm:col-span-2">
                  <span className="text-xs font-bold uppercase text-[var(--color-muted)]">Name</span>
                  <input
                    className={`mt-1 w-full ${PREVIEW_LIGHT_FIELD}`}
                    value={leadName}
                    onChange={(e) => setLeadName(e.target.value)}
                  />
                </label>
                <label className="block sm:col-span-2">
                  <span className="text-xs font-bold uppercase text-[var(--color-muted)]">Email</span>
                  <input
                    type="email"
                    className={`mt-1 w-full ${PREVIEW_LIGHT_FIELD}`}
                    value={leadEmail}
                    onChange={(e) => setLeadEmail(e.target.value)}
                  />
                </label>
                <label className="block sm:col-span-2">
                  <span className="text-xs font-bold uppercase text-[var(--color-muted)]">Phone (optional)</span>
                  <input
                    className={`mt-1 w-full ${PREVIEW_LIGHT_FIELD}`}
                    value={leadPhone}
                    onChange={(e) => setLeadPhone(e.target.value)}
                  />
                </label>
                <label className="block sm:col-span-2">
                  <span className="text-xs font-bold uppercase text-[var(--color-muted)]">Notes (optional)</span>
                  <textarea
                    className={`mt-1 min-h-[100px] w-full ${PREVIEW_LIGHT_FIELD}`}
                    value={leadNotes}
                    onChange={(e) => setLeadNotes(e.target.value)}
                  />
                </label>
              </div>
              <button
                type="button"
                disabled={leadStatus === "sending" || !leadName.trim() || !leadEmail.trim()}
                onClick={submitLead}
                className="mt-6 rounded-xl bg-[var(--color-accent)] px-8 py-3 font-semibold text-[var(--color-navy)] disabled:opacity-40"
              >
                {leadStatus === "sending" ? "Sending…" : "Contact us"}
              </button>
              {leadStatus === "ok" || leadStatus === "err" ? (
                <p
                  className={`mt-3 text-sm ${leadStatus === "ok" ? "text-green-700" : "text-red-600"}`}
                  role="status"
                >
                  {leadMsg}
                </p>
              ) : null}
            </div>

            <div className="rounded-2xl border border-[var(--color-accent)]/20 bg-[var(--color-navy-deep)]/25 p-6 sm:p-8">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--color-gold)]">After launch</p>
              <h2 className="mt-2 font-serif text-xl font-semibold text-[var(--color-ink-deep)]">Website hosting (optional)</h2>
              <p className="mt-2 text-sm text-[var(--color-muted)]">
                You always own your custom site. If you’d like us to host and care for it—uptime, updates, and a direct line
                when something breaks—we offer that as an option. Read{" "}
                <Link href="/website-hosting" className="font-semibold text-[var(--color-accent)] underline-offset-2 hover:underline">
                  how hosting works
                </Link>
                , or the{" "}
                <Link href="/hosting-terms" className="font-semibold text-[var(--color-accent)] underline-offset-2 hover:underline">
                  hosting summary &amp; terms
                </Link>{" "}
                for specifics.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <PrimaryCtaLink href={BOOK_CALL_PATH} className="!inline-flex !min-h-12 items-center justify-center px-6 text-sm">
                  Book a call to discuss
                </PrimaryCtaLink>
                <Link
                  href="/website-hosting"
                  className="inline-flex min-h-12 items-center justify-center rounded-xl border border-[var(--color-border)] bg-paper px-6 text-sm font-semibold text-[var(--color-ink)]"
                >
                  Hosting overview
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
