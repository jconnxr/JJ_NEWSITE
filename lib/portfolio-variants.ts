/** Short labels for each mock preview style (4 per project: index 0–3). */
export const PREVIEW_VARIANT_LABELS: Record<string, [string, string, string, string]> = {
  "red-dirt-roofing": ["Rust & storm hero", "Navy trust bar", "Forest split layout", "Bold single column"],
  "summit-family-dental": ["Teal step flow", "Calendar-first", "Night mode luxe", "Soft card intake"],
  "bricktown-bistro": ["Dark supper club", "Bright daytime", "Terracotta editorial", "Minimal one-page"],
  "prairie-hvac-ads": ["Slate overview", "Dark ops console", "Warm metric tiles", "Table & tags"],
};

export const PREVIEW_VARIANT_COUNT = 4;

export function getPreviewVariantLabels(slug: string): [string, string, string, string] {
  return (
    PREVIEW_VARIANT_LABELS[slug] ?? ["Style A", "Style B", "Style C", "Style D"]
  );
}
