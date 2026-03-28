const svgProps = {
  fill: "none" as const,
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function IconWebsites({ className }: { className?: string }) {
  return (
    <svg className={className} width={40} height={40} viewBox="0 0 24 24" aria-hidden {...svgProps}>
      <rect x="2.25" y="4" width="19.5" height="14" rx="1.75" />
      <path d="M6 21h12" />
      <path d="M8 8h8M8 11.5h5" opacity={0.85} />
    </svg>
  );
}

export function IconCrms({ className }: { className?: string }) {
  return (
    <svg className={className} width={40} height={40} viewBox="0 0 24 24" aria-hidden {...svgProps}>
      <circle cx="9" cy="8.5" r="3.25" />
      <circle cx="16.5" cy="9.25" r="2.5" />
      <path d="M3.5 20.25v-.75a4.25 4.25 0 014.25-4.25h3a4.25 4.25 0 014.25 4.25v.75" />
      <path d="M17.5 20.25v-.5a3 3 0 013-3h.5" opacity={0.85} />
    </svg>
  );
}

export function IconAds({ className }: { className?: string }) {
  return (
    <svg className={className} width={40} height={40} viewBox="0 0 24 24" aria-hidden {...svgProps}>
      <path d="M4 19V5M4 19h16M4 19l4-6 4 3 5-8 5 5" />
      <path d="M15 8h.01M18 11h.01" />
    </svg>
  );
}

export function IconBooking({ className }: { className?: string }) {
  return (
    <svg className={className} width={40} height={40} viewBox="0 0 24 24" aria-hidden {...svgProps}>
      <rect x="3.25" y="4.25" width="17.5" height="16.5" rx="2" />
      <path d="M3.25 9.5h17.5M8 2.5v4M16 2.5v4" />
      <path d="M8.5 14h2M12 14h2M15.5 14h2M8.5 17.5h2M12 17.5h2" opacity={0.85} />
    </svg>
  );
}
