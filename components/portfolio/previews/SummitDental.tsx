"use client";

import type { PreviewProps } from "./types";

export function SummitDentalPreview({ variant = 0 }: PreviewProps) {
  switch (variant % 4) {
    case 1:
      return <SummitCalendarFirst />;
    case 2:
      return <SummitNightLuxe />;
    case 3:
      return <SummitSoftCard />;
    default:
      return <SummitTealWizard />;
  }
}

function SummitTealWizard() {
  return (
    <div className="min-h-[520px] bg-gradient-to-b from-slate-50 to-white text-slate-800">
      <div className="border-b border-slate-200 bg-white px-4 py-4 sm:px-8">
        <div className="mx-auto flex max-w-lg items-center justify-between">
          <div>
            <div className="font-serif text-lg font-semibold text-[#0f766e]">Summit Family Dental</div>
            <div className="text-xs text-slate-500">Tulsa · New patients welcome</div>
          </div>
          <div className="rounded-full bg-teal-50 px-3 py-1 text-xs font-medium text-teal-800">Est. 2009</div>
        </div>
      </div>

      <div className="mx-auto max-w-lg px-4 py-8 sm:px-6">
        <div className="mb-8 flex justify-center gap-2">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
                  s === 1 ? "bg-[#0d9488] text-white" : "border border-slate-200 bg-white text-slate-400"
                }`}
              >
                {s}
              </div>
              {s < 3 && <div className="h-px w-6 bg-slate-200" />}
            </div>
          ))}
        </div>

        <h2 className="text-center font-serif text-xl font-semibold text-slate-900">Book a visit</h2>
        <p className="mt-2 text-center text-sm text-slate-600">Step 1 of 3 · Tell us what you need</p>

        <div className="mt-8 space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Visit reason</span>
            <select className="mt-1.5 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm">
              <option>Cleaning & exam</option>
              <option>Tooth pain / urgent</option>
              <option>New patient exam</option>
              <option>Cosmetic consult</option>
            </select>
          </label>
          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Preferred day</span>
            <div className="mt-1.5 grid grid-cols-7 gap-1 text-center text-[10px]">
              {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                <span key={d + i} className="py-1 text-slate-400">
                  {d}
                </span>
              ))}
            </div>
            <div className="mt-1 grid grid-cols-7 gap-1">
              {Array.from({ length: 7 }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  className={`rounded-md py-2 text-xs font-medium ${
                    i === 2 ? "bg-[#0d9488] text-white" : "border border-slate-200 bg-white text-slate-700"
                  }`}
                >
                  {12 + i}
                </button>
              ))}
            </div>
          </label>
          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Insurance (optional)</span>
            <input
              type="text"
              readOnly
              placeholder="e.g. Delta Dental"
              className="mt-1.5 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm"
            />
          </label>
        </div>

        <button
          type="button"
          className="mt-6 w-full rounded-xl bg-[#0d9488] py-3.5 text-sm font-semibold text-white shadow-md"
        >
          Continue to time selection
        </button>
        <p className="mt-4 text-center text-xs text-slate-500">Mock UI · No data is submitted</p>
      </div>
    </div>
  );
}

function SummitCalendarFirst() {
  return (
    <div className="min-h-[520px] bg-[#faf5ff] text-violet-950">
      <header className="border-b border-violet-200 bg-white px-4 py-3 sm:px-6">
        <div className="mx-auto flex max-w-md items-center justify-between">
          <span className="font-serif text-lg font-semibold text-violet-900">Summit Family Dental</span>
          <span className="text-xs text-violet-600">Tulsa, OK</span>
        </div>
      </header>
      <div className="mx-auto max-w-md px-4 py-6">
        <h1 className="text-center font-serif text-2xl font-semibold text-violet-950">Pick a time</h1>
        <p className="mt-1 text-center text-sm text-violet-700/80">March 2026 · New patients</p>

        <div className="mt-6 rounded-2xl border border-violet-200 bg-white p-4 shadow-sm">
          <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-medium uppercase text-violet-500">
            {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
              <span key={d + i}>{d}</span>
            ))}
          </div>
          <div className="mt-2 grid grid-cols-7 gap-1">
            {Array.from({ length: 28 }).map((_, i) => {
              const day = i + 1;
              const active = day === 18;
              return (
                <button
                  key={day}
                  type="button"
                  className={`aspect-square rounded-lg text-xs font-medium ${
                    active ? "bg-violet-600 text-white shadow-md" : "bg-violet-50 text-violet-800 hover:bg-violet-100"
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-6 rounded-xl border border-violet-200 bg-white p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-violet-600">Available slots · Wed 18th</p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {["9:00 AM", "10:30 AM", "1:00 PM", "3:30 PM"].map((t) => (
              <button
                key={t}
                type="button"
                className="rounded-lg border border-violet-200 bg-violet-50 py-2.5 text-sm font-medium text-violet-900"
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <button type="button" className="mt-6 w-full rounded-xl bg-violet-600 py-3.5 text-sm font-semibold text-white">
          Continue details
        </button>
        <p className="mt-3 text-center text-[10px] text-violet-600">Mock UI · Sample layout</p>
      </div>
    </div>
  );
}

function SummitNightLuxe() {
  return (
    <div className="min-h-[520px] bg-[#0c1222] text-slate-100">
      <div className="border-b border-white/10 px-4 py-4 sm:px-8">
        <div className="mx-auto flex max-w-lg items-center justify-between">
          <div>
            <div className="font-serif text-lg text-cyan-100">Summit Family Dental</div>
            <div className="text-xs text-slate-500">Tulsa · Evening & weekend hours</div>
          </div>
          <div className="rounded-full border border-cyan-500/40 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-300">
            Concierge
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-lg px-4 py-8 sm:px-6">
        <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-400/90">Step 1 of 2</p>
          <h2 className="mt-3 font-serif text-2xl font-semibold text-white">What brings you in?</h2>
          <div className="mt-6 space-y-2">
            {["Routine cleaning", "Cosmetic consult", "Emergency / pain", "New patient exam"].map((opt) => (
              <button
                key={opt}
                type="button"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-left text-sm text-slate-200 transition hover:border-cyan-500/40 hover:bg-white/10"
              >
                {opt}
              </button>
            ))}
          </div>
          <button
            type="button"
            className="mt-8 w-full rounded-xl bg-cyan-500 py-3.5 text-sm font-semibold text-[#0c1222] shadow-lg shadow-cyan-500/20"
          >
            Next: contact info
          </button>
        </div>
        <p className="mt-6 text-center text-xs text-slate-500">Mock UI · No data is submitted</p>
      </div>
    </div>
  );
}

function SummitSoftCard() {
  return (
    <div className="min-h-[520px] bg-[#fff1f2] text-rose-950">
      <div className="mx-auto max-w-2xl px-4 py-10 sm:px-8">
        <div className="mx-auto max-w-md rounded-[2rem] border border-rose-200/80 bg-white p-8 shadow-xl shadow-rose-200/40">
          <div className="text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-100 text-2xl">🦷</div>
            <h1 className="mt-4 font-serif text-2xl font-semibold text-rose-950">New patient intake</h1>
            <p className="mt-2 text-sm text-rose-800/80">Summit Family Dental · Tulsa</p>
          </div>

          <div className="mt-8 space-y-5">
            <label className="block">
              <span className="text-xs font-medium text-rose-700">Full name</span>
              <input
                type="text"
                readOnly
                placeholder="Jane Smith"
                className="mt-1.5 w-full rounded-2xl border border-rose-200 bg-rose-50/50 px-4 py-3 text-sm"
              />
            </label>
            <label className="block">
              <span className="text-xs font-medium text-rose-700">Phone</span>
              <input
                type="text"
                readOnly
                placeholder="(918) 555-0100"
                className="mt-1.5 w-full rounded-2xl border border-rose-200 bg-rose-50/50 px-4 py-3 text-sm"
              />
            </label>
            <label className="block">
              <span className="text-xs font-medium text-rose-700">Anything we should know?</span>
              <textarea
                readOnly
                rows={3}
                placeholder="Allergies, anxiety, previous dentist…"
                className="mt-1.5 w-full resize-none rounded-2xl border border-rose-200 bg-rose-50/50 px-4 py-3 text-sm"
              />
            </label>
          </div>

          <button
            type="button"
            className="mt-8 w-full rounded-2xl bg-rose-500 py-4 text-sm font-semibold text-white shadow-md"
          >
            Request a callback
          </button>
        </div>
        <p className="mt-6 text-center text-[10px] text-rose-700/70">Mock UI · Sample layout</p>
      </div>
    </div>
  );
}
