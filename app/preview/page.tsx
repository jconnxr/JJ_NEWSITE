import type { Metadata } from "next";
import { Suspense } from "react";
import { PreviewWizard } from "@/components/preview/PreviewWizard";
import { getSiteUrl } from "@/lib/site-url";

const path = "/preview";

export const metadata: Metadata = {
  title: "Site preview builder | J&J Management Solutions",
  description:
    "Pick an industry and layout, customize copy and colors, and see an illustrative website preview for your Oklahoma business.",
  alternates: { canonical: path },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Site preview builder | J&J Management Solutions",
    url: `${getSiteUrl()}${path}`,
    siteName: "J&J Management Solutions",
    locale: "en_US",
    type: "website",
  },
};

function PreviewFallback() {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-[var(--color-cream)] pt-24 text-[var(--color-muted)]">
      Loading preview builder…
    </div>
  );
}

export default function PreviewPage() {
  return (
    <Suspense fallback={<PreviewFallback />}>
      <PreviewWizard />
    </Suspense>
  );
}
