"use client";

import { type ReactNode } from "react";

type Props = {
  url: string;
  children: ReactNode;
  className?: string;
};

export function BrowserChrome({ url, children, className = "" }: Props) {
  return (
    <div
      className={`overflow-hidden rounded-xl border border-[var(--color-border)] bg-[#1e293b] shadow-2xl shadow-black/20 ${className}`}
    >
      <div className="flex items-center gap-2 border-b border-white/10 px-3 py-2.5">
        <div className="flex gap-1.5">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        </div>
        <div className="ml-2 flex min-w-0 flex-1 items-center rounded-md bg-black/25 px-3 py-1 text-[11px] text-slate-400">
          <span className="truncate font-mono">{url}</span>
        </div>
      </div>
      <div className="max-h-[min(70dvh,720px)] overflow-y-auto overflow-x-hidden overscroll-contain bg-white [-webkit-overflow-scrolling:touch]">
        {children}
      </div>
    </div>
  );
}
