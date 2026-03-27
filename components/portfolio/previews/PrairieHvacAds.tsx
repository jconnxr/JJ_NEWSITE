"use client";

import type { PreviewProps } from "./types";

export function PrairieHvacAdsPreview({ variant = 0 }: PreviewProps) {
  switch (variant % 4) {
    case 1:
      return <PrairieDarkOps />;
    case 2:
      return <PrairieWarmMetrics />;
    case 3:
      return <PrairieTableTags />;
    default:
      return <PrairieSlateOverview />;
  }
}

function PrairieSlateOverview() {
  return (
    <div className="min-h-[520px] bg-[#f1f5f9] text-slate-800">
      <div className="border-b border-slate-200 bg-white px-4 py-3 sm:px-6">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-xs font-medium uppercase tracking-wide text-slate-500">Campaign overview</div>
            <div className="font-semibold text-slate-900">Prairie HVAC & Air · Summer 2026</div>
          </div>
          <div className="flex gap-2 text-xs">
            <span className="rounded-md bg-slate-100 px-2 py-1 text-slate-600">Search</span>
            <span className="rounded-md bg-slate-100 px-2 py-1 text-slate-600">Local</span>
            <span className="rounded-md bg-emerald-50 px-2 py-1 font-medium text-emerald-800">Active</span>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-4xl gap-4 px-4 py-6 sm:grid-cols-3 sm:px-6">
        {[
          { label: "Spend (30d)", v: "$4,280", ch: "+12%" },
          { label: "Conv. actions", v: "186", ch: "Calls + forms" },
          { label: "Cost / lead", v: "$23", ch: "vs. $31 prior" },
        ].map((k) => (
          <div key={k.label} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="text-xs text-slate-500">{k.label}</div>
            <div className="mt-1 text-2xl font-semibold tabular-nums text-slate-900">{k.v}</div>
            <div className="mt-1 text-xs text-emerald-700">{k.ch}</div>
          </div>
        ))}
      </div>

      <div className="mx-auto max-w-4xl px-4 pb-8 sm:px-6">
        <h2 className="text-sm font-semibold text-slate-900">Ad groups (sample)</h2>
        <div className="mt-3 space-y-3">
          {[
            {
              name: "AC repair · Norman",
              ads: "“No cool air?” + same-day badge",
              geo: "10 mi radius",
            },
            {
              name: "Duct cleaning · OKC metro",
              ads: "Before/after creative + spring promo",
              geo: "ZIP cluster",
            },
            {
              name: "Install quotes · high intent",
              ads: "Financing line + manufacturer logos",
              geo: "City + suburbs",
            },
          ].map((row) => (
            <div
              key={row.name}
              className="flex flex-col gap-2 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <div className="font-medium text-slate-900">{row.name}</div>
                <div className="text-xs text-slate-500">{row.ads}</div>
              </div>
              <div className="text-xs font-medium text-slate-600">{row.geo}</div>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4 text-center text-xs text-slate-500">
          Reporting mock · Numbers are illustrative
        </div>
      </div>
    </div>
  );
}

function PrairieDarkOps() {
  return (
    <div className="min-h-[520px] bg-[#09090b] text-zinc-200">
      <div className="border-b border-zinc-800 px-4 py-4 sm:px-6">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-[10px] font-medium uppercase tracking-widest text-violet-400/90">Ads console</div>
            <div className="font-mono text-sm font-semibold text-white">prairie_hvac · prod</div>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
            <span className="text-xs text-zinc-500">Live spend</span>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-4xl gap-3 px-4 py-5 sm:grid-cols-2 lg:grid-cols-4 sm:px-6">
        {[
          { l: "Impr.", v: "142k", d: "7d" },
          { l: "CTR", v: "4.1%", d: "+0.6" },
          { l: "CPA", v: "$21", d: "goal $25" },
          { l: "Budget", v: "82%", d: "pacing OK" },
        ].map((m) => (
          <div key={m.l} className="rounded-lg border border-zinc-800 bg-zinc-900/80 p-3">
            <div className="text-[10px] uppercase tracking-wide text-zinc-500">{m.l}</div>
            <div className="mt-1 font-mono text-xl text-white">{m.v}</div>
            <div className="text-[10px] text-zinc-600">{m.d}</div>
          </div>
        ))}
      </div>

      <div className="mx-auto max-w-4xl px-4 pb-8 sm:px-6">
        <div className="rounded-lg border border-zinc-800 bg-gradient-to-r from-violet-950/40 to-transparent p-4">
          <p className="text-xs font-medium text-violet-300">Rule: pause “tune-up” ads when temp &gt; 95°F</p>
          <p className="mt-1 text-[10px] text-zinc-500">Automation mock · Not connected to real data</p>
        </div>
      </div>

      <div className="py-4 text-center text-[10px] text-zinc-600">Mock dashboard · Sample layout</div>
    </div>
  );
}

function PrairieWarmMetrics() {
  return (
    <div className="min-h-[520px] bg-gradient-to-b from-amber-50 to-orange-50 text-amber-950">
      <div className="border-b border-amber-200/80 bg-white/80 px-4 py-4 backdrop-blur sm:px-6">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <div>
            <h1 className="font-serif text-lg font-bold text-amber-950">Prairie HVAC campaigns</h1>
            <p className="text-xs text-amber-800/80">Norman · OKC · seasonal push</p>
          </div>
          <div className="rounded-full bg-amber-200 px-3 py-1 text-xs font-bold text-amber-950">Summer</div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { t: "Phone calls", n: "94", sub: "from search" },
            { t: "Form fills", n: "41", sub: "landing pages" },
            { t: "Cost / lead", n: "$19", sub: "blended" },
          ].map((c) => (
            <div
              key={c.t}
              className="rounded-2xl border-2 border-amber-300/60 bg-white p-5 shadow-md shadow-amber-200/50"
            >
              <p className="text-xs font-bold uppercase tracking-wide text-amber-800/70">{c.t}</p>
              <p className="mt-2 font-serif text-3xl font-bold text-amber-950">{c.n}</p>
              <p className="mt-1 text-xs text-amber-800/70">{c.sub}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {["AC repair", "Tune-up", "Install", "Duct clean"].map((tag) => (
            <span key={tag} className="rounded-full bg-amber-200/80 px-3 py-1 text-xs font-semibold text-amber-950">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="py-4 text-center text-[10px] text-amber-900/60">Mock report · Numbers are illustrative</div>
    </div>
  );
}

function PrairieTableTags() {
  return (
    <div className="min-h-[520px] bg-white text-slate-900">
      <div className="border-b border-slate-200 px-4 py-3 sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Campaign breakdown</p>
        <p className="font-semibold">Prairie HVAC & Air</p>
      </div>

      <div className="overflow-x-auto px-2 pb-8 sm:px-4">
        <table className="mx-auto w-full max-w-4xl text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500">
              <th className="py-3 pl-3">Campaign</th>
              <th className="py-3">Status</th>
              <th className="py-3">Geo</th>
              <th className="py-3 pr-3 text-right">Spend</th>
            </tr>
          </thead>
          <tbody>
            {[
              { c: "Emergency AC · Norman", s: "active", g: "10 mi", $: "$1,240" },
              { c: "Spring tune-up", s: "paused", g: "ZIP list", $: "$410" },
              { c: "New install · high intent", s: "active", g: "OKC+", $: "$2,630" },
            ].map((row) => (
              <tr key={row.c} className="border-b border-slate-100">
                <td className="py-3 pl-3 font-medium">{row.c}</td>
                <td className="py-3">
                  <span
                    className={`rounded-md px-2 py-0.5 text-xs font-semibold ${
                      row.s === "active" ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {row.s}
                  </span>
                </td>
                <td className="py-3 text-slate-600">{row.g}</td>
                <td className="py-3 pr-3 text-right tabular-nums text-slate-800">{row.$}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="py-4 text-center text-[10px] text-slate-500">Mock table · Sample layout</div>
    </div>
  );
}
