"use client";

import { useState } from "react";
import type { PreviewTemplateId } from "@/lib/preview-types";

const fakeByTemplate: Record<
  PreviewTemplateId,
  { cols: { title: string; cards: { name: string; amt: string }[] }[] }
> = {
  restaurant: {
    cols: [
      { title: "New inquiry", cards: [{ name: "Anniversary table · Sat 7pm", amt: "6 guests" }] },
      {
        title: "Confirmed",
        cards: [
          { name: "Corporate lunch · Fri", amt: "12 guests" },
          { name: "Chef’s tasting", amt: "Deposit paid" },
        ],
      },
      { title: "Completed", cards: [{ name: "Holiday party hold", amt: "Invoice sent" }] },
    ],
  },
  dental: {
    cols: [
      { title: "New patient", cards: [{ name: "Jamie R. · whitening consult", amt: "Thu 2:00" }] },
      {
        title: "Treatment plan",
        cards: [
          { name: "Marcus T. · crown prep", amt: "Mon 9:30" },
          { name: "Insurance verified", amt: "Delta" },
        ],
      },
      { title: "Re-care", cards: [{ name: "6-mo recall batch", amt: "42 due" }] },
    ],
  },
  hvac: {
    cols: [
      { title: "Emergency", cards: [{ name: "AC out · NW OKC", amt: "Dispatched" }] },
      {
        title: "Scheduled",
        cards: [
          { name: "Tune-up · Edmond", amt: "Tomorrow AM" },
          { name: "Duct clean quote", amt: "$420" },
        ],
      },
      { title: "Job complete", cards: [{ name: "Heat pump install", amt: "Paid" }] },
    ],
  },
  retail: {
    cols: [
      { title: "Lead", cards: [{ name: "Wedding registry hold", amt: "Pickup Fri" }] },
      {
        title: "Order",
        cards: [
          { name: "Bulk mulch · contractor", amt: "Quote sent" },
          { name: "POS special order", amt: "Vendor PO" },
        ],
      },
      { title: "Fulfilled", cards: [{ name: "Delivery route OKC", amt: "3 stops" }] },
    ],
  },
  professional: {
    cols: [
      { title: "Intake", cards: [{ name: "LLC formation · consult", amt: "Tue 10:00" }] },
      {
        title: "Active",
        cards: [
          { name: "Tax extension packet", amt: "In review" },
          { name: "Listing · buyer tour", amt: "Sat 2:00" },
        ],
      },
      { title: "Closed won", cards: [{ name: "Retainer renewed", amt: "Q2" }] },
    ],
  },
};

type Props = {
  templateId: PreviewTemplateId | null;
};

export function CrmSandboxDemo({ templateId }: Props) {
  const [hint, setHint] = useState<string | null>(null);
  const key = templateId ?? "professional";
  const board = fakeByTemplate[key] ?? fakeByTemplate.professional;

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-alt)]/60 p-4 shadow-inner">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--color-accent)]">Demo workspace</p>
          <h3 className="font-serif text-lg font-semibold text-[var(--color-ink-deep)]">Sample CRM pipeline</h3>
          <p className="mt-1 text-xs text-[var(--color-muted)]">
            Fictional data only—shows how leads can move from first contact to booked work.
          </p>
        </div>
        <button
          type="button"
          className="rounded-lg border border-[var(--color-border)] bg-paper/80 px-3 py-1.5 text-xs font-semibold text-[var(--color-ink)]"
          onClick={() => setHint((x) => (x ? null : "In a real CRM, stages, owners, and automations match how you sell."))}
        >
          How it works
        </button>
      </div>
      {hint ? <p className="mt-3 text-sm text-[var(--color-accent)]">{hint}</p> : null}
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {board.cols.map((col) => (
          <div key={col.title} className="rounded-xl border border-[var(--color-border)]/80 bg-paper/50 p-2">
            <p className="px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-[var(--color-muted)]">{col.title}</p>
            <ul className="mt-1 space-y-2">
              {col.cards.map((c) => (
                <li
                  key={c.name}
                  className="cursor-default rounded-lg border border-zinc-200/90 bg-white px-3 py-2.5 text-left shadow-sm"
                >
                  <p className="text-sm font-medium text-zinc-900">{c.name}</p>
                  <p className="text-xs text-zinc-600">{c.amt}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
