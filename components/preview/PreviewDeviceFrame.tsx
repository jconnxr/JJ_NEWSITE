"use client";

import type { ReactNode } from "react";

function slugifyLabel(name: string): string {
  const s = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 32);
  return s || "your-site";
}

type Props = {
  children: ReactNode;
  className?: string;
  /** Phone = narrow device chrome; desktop = wider “browser” frame. */
  mode?: "phone" | "desktop";
  /** Used for the fake URL bar (desktop). */
  siteLabel?: string;
};

export function PreviewDeviceFrame({ children, className = "", mode = "phone", siteLabel = "" }: Props) {
  const slug = slugifyLabel(siteLabel);

  if (mode === "desktop") {
    return (
      <div
        className={`mx-auto w-full max-w-[min(100%,920px)] overflow-hidden rounded-xl border-[6px] border-[#2a2a2a] bg-[#2a2a2a] shadow-[0_28px_90px_rgba(0,0,0,0.5)] ${className}`}
      >
        <div className="flex items-center gap-2 rounded-t-lg bg-[#3d3d3d] px-3 py-2">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/90" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/90" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/90" />
          </div>
          <div className="min-w-0 flex-1 rounded-md bg-[#1e1e1e] px-3 py-1.5 text-center font-mono text-[10px] text-white/70">
            https://{slug}.yourbusiness.site
          </div>
        </div>
        <div
          data-preview-scroll-root
          className="max-h-[min(78vh,720px)] overflow-y-auto overflow-x-hidden rounded-b-lg bg-white"
        >
          {children}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`mx-auto w-full max-w-[380px] overflow-hidden rounded-[2rem] border-[10px] border-[#1a1a1a] bg-[#1a1a1a] shadow-[0_24px_80px_rgba(0,0,0,0.45)] sm:max-w-[420px] ${className}`}
    >
      <div className="flex h-7 items-center justify-center gap-1.5 rounded-t-[1.35rem] bg-[#2a2a2a] pt-1">
        <span className="h-2 w-2 rounded-full bg-[#444]" />
        <span className="h-2 w-8 rounded-full bg-[#333]" />
      </div>
      <div
        data-preview-scroll-root
        className="max-h-[min(72vh,640px)] overflow-y-auto overflow-x-hidden rounded-b-[1.25rem] bg-white"
      >
        {children}
      </div>
    </div>
  );
}
