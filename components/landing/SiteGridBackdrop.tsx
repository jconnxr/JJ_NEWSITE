/** Fixed low-opacity grid behind main landing content (hero has its own grid). */
export function SiteGridBackdrop() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 opacity-[0.22]"
      aria-hidden
      style={{
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.022) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 255, 255, 0.022) 1px, transparent 1px)`,
        backgroundSize: "56px 56px",
        maskImage: "linear-gradient(to bottom, black 0%, black 75%, transparent 100%)",
      }}
    />
  );
}
