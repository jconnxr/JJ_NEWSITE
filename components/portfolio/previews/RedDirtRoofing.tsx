"use client";

import { PHONE_DISPLAY } from "@/lib/constants";
import type { PreviewProps } from "./types";

export function RedDirtRoofingPreview({ variant = 0 }: PreviewProps) {
  switch (variant % 4) {
    case 1:
      return <RedDirtNavyTrust />;
    case 2:
      return <RedDirtForestSplit />;
    case 3:
      return <RedDirtBoldColumn />;
    default:
      return <RedDirtStormHero />;
  }
}

function RedDirtStormHero() {
  return (
    <div className="min-h-[520px] bg-[#faf8f5] text-[#1c1917]">
      <header className="border-b border-stone-200/80 bg-white/90 px-4 py-4 backdrop-blur sm:px-8">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4">
          <div className="font-serif text-xl font-bold tracking-tight text-[#9a3412]">Red Dirt Roofing</div>
          <nav className="flex flex-wrap gap-4 text-sm font-medium text-stone-600">
            <span className="cursor-default">Services</span>
            <span className="cursor-default">Storm help</span>
            <span className="cursor-default">Reviews</span>
          </nav>
          <button
            type="button"
            className="rounded-lg bg-[#c2410c] px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-orange-900/15"
          >
            Free roof inspection
          </button>
        </div>
      </header>

      <section className="relative overflow-hidden px-4 pb-12 pt-10 sm:px-8 sm:pt-14">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-orange-100/80 via-transparent to-stone-100/60" />
        <div className="relative mx-auto max-w-5xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#9a3412]">Serving central Oklahoma</p>
          <h1 className="mt-3 font-serif text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
            Storm damage?
            <span className="block text-stone-700">We answer the phone. We show up.</span>
          </h1>
          <p className="mt-4 max-w-xl text-stone-600">
            Same-day assessments in Edmond, OKC, and Norman. Insurance paperwork help, clear scopes, crews you can
            actually reach.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              className="rounded-xl bg-[#c2410c] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-orange-900/20"
            >
              Call {PHONE_DISPLAY}
            </button>
            <button
              type="button"
              className="rounded-xl border border-stone-300 bg-white px-6 py-3.5 text-sm font-semibold text-stone-800"
            >
              Text photos of damage
            </button>
          </div>
        </div>
      </section>

      <section className="border-t border-stone-200 bg-white px-4 py-10 sm:px-8">
        <div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-3">
          {[
            { t: "Residential", d: "Shingle, metal, and flat—installed to manufacturer specs." },
            { t: "Insurance claims", d: "Documentation, supplements, and adjuster coordination." },
            { t: "Emergency tarp", d: "Stop water intrusion until the full repair is scheduled." },
          ].map((x) => (
            <div key={x.t} className="rounded-2xl border border-stone-200 bg-[#faf8f5] p-5">
              <h3 className="font-serif text-lg font-semibold text-stone-900">{x.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-600">{x.d}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="border-t border-stone-200 bg-stone-100 px-4 py-6 text-center text-xs text-stone-500">
        Mock concept · Not a real business
      </div>
    </div>
  );
}

function RedDirtNavyTrust() {
  return (
    <div className="min-h-[520px] bg-white text-slate-900">
      <header className="border-b border-slate-200 bg-[#1e3a5f] px-4 py-4 text-white sm:px-8">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4">
          <div className="font-sans text-lg font-bold tracking-tight">Red Dirt Roofing</div>
          <div className="flex flex-wrap items-center gap-6 text-sm text-blue-100/90">
            <span className="cursor-default">Licensed & insured</span>
            <span className="cursor-default">BBB A+</span>
            <span className="cursor-default">Local crews</span>
          </div>
          <button type="button" className="rounded-md bg-sky-400 px-5 py-2 text-sm font-semibold text-[#0f172a]">
            Schedule inspection
          </button>
        </div>
      </header>

      <div className="border-b border-slate-100 bg-slate-50 px-4 py-3 sm:px-8">
        <div className="mx-auto flex max-w-5xl flex-wrap justify-between gap-4 text-center text-sm sm:text-left">
          {[
            { k: "24h response", v: "Storm line open" },
            { k: "OKC metro", v: "Edmond · Norman · Moore" },
            { k: "Warranty", v: "Workmanship + manufacturer" },
          ].map((row) => (
            <div key={row.k}>
              <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">{row.k}</div>
              <div className="font-medium text-slate-800">{row.v}</div>
            </div>
          ))}
        </div>
      </div>

      <section className="px-4 py-12 sm:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-sans text-3xl font-bold tracking-tight text-[#1e3a5f] sm:text-4xl">
            Roof repairs built for Oklahoma weather
          </h1>
          <p className="mt-4 text-slate-600">
            Detailed estimates, photo documentation, and a single point of contact from tarp to final nail.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button type="button" className="rounded-lg bg-[#1e3a5f] px-8 py-3 text-sm font-semibold text-white">
              Call {PHONE_DISPLAY}
            </button>
            <button
              type="button"
              className="rounded-lg border border-slate-300 bg-white px-8 py-3 text-sm font-semibold text-slate-800"
            >
              Request written estimate
            </button>
          </div>
        </div>
      </section>

      <div className="border-t border-slate-200 bg-slate-50 px-4 py-5 text-center text-[10px] text-slate-500">
        Mock concept · Not a real business
      </div>
    </div>
  );
}

function RedDirtForestSplit() {
  return (
    <div className="min-h-[520px] bg-[#f0fdf4] text-[#14532d]">
      <div className="grid min-h-[520px] lg:grid-cols-2">
        <div className="flex flex-col justify-center bg-gradient-to-br from-[#166534] to-[#14532d] px-6 py-10 text-white lg:px-10">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-200/90">Edmond · OKC · Norman</p>
          <h1 className="mt-4 font-serif text-3xl font-semibold leading-tight sm:text-4xl">Hail, wind, heat—we’ve seen it.</h1>
          <p className="mt-4 text-sm leading-relaxed text-emerald-100/90">
            Family-run crew. Real timelines. No mystery subcontractors.
          </p>
        </div>
        <div className="flex flex-col justify-center px-6 py-10 lg:px-10">
          <div className="space-y-4 rounded-2xl border border-emerald-200 bg-white p-6 shadow-sm">
            <h2 className="font-serif text-xl font-semibold text-[#14532d]">Start with a free check</h2>
            <p className="text-sm text-emerald-900/70">We’ll document damage and walk you through insurance next steps.</p>
            <button
              type="button"
              className="w-full rounded-xl bg-[#15803d] py-3 text-sm font-semibold text-white shadow-md"
            >
              Book {PHONE_DISPLAY}
            </button>
            <p className="text-center text-[10px] text-emerald-700/80">Mock UI · Sample layout</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function RedDirtBoldColumn() {
  return (
    <div className="min-h-[520px] bg-[#fffbeb] text-stone-900">
      <div className="mx-auto max-w-lg px-4 py-10">
        <div className="text-center">
          <span className="inline-block rounded-full bg-amber-200/80 px-3 py-1 text-xs font-bold uppercase tracking-wide text-amber-950">
            Emergency line · 7 days
          </span>
          <h1 className="mt-6 font-black uppercase leading-none tracking-tighter text-stone-900 sm:text-5xl">
            Roof
            <br />
            <span className="text-amber-600">Relief</span>
          </h1>
          <p className="mt-6 text-sm leading-relaxed text-stone-700">
            Text photos. Get a scope. We coordinate with your adjuster—plain English, no runaround.
          </p>
        </div>

        <div className="mt-10 space-y-3">
          {["Inspection today", "Written estimate", "Crew on your roof"].map((step, i) => (
            <div
              key={step}
              className="flex items-center gap-4 rounded-xl border-2 border-stone-900 bg-white px-4 py-3 shadow-[4px_4px_0_0_#1c1917]"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-400 text-lg font-black text-stone-900">
                {i + 1}
              </span>
              <span className="font-bold uppercase tracking-wide">{step}</span>
            </div>
          ))}
        </div>

        <button
          type="button"
          className="mt-10 w-full rounded-xl bg-stone-900 py-4 text-sm font-bold uppercase tracking-wide text-amber-300"
        >
          Call {PHONE_DISPLAY}
        </button>
      </div>
      <div className="py-4 text-center text-[10px] text-stone-500">Mock concept · Not a real business</div>
    </div>
  );
}
