import type { Metadata } from "next";
import { IndustryServicePage } from "@/components/industry/IndustryServicePage";
import { getSiteUrl } from "@/lib/site-url";

const path = "/oklahoma-hvac-contractor-websites";

export const metadata: Metadata = {
  title: "Oklahoma HVAC contractor websites & ads | J&J Management Solutions",
  description:
    "Lead-focused sites and campaigns for Oklahoma HVAC—storm season, service areas, and clear emergency CTAs.",
  alternates: { canonical: path },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Oklahoma HVAC contractor websites & ads | J&J Management Solutions",
    description: "Websites and ad programs for Oklahoma HVAC and home services contractors.",
    url: `${getSiteUrl()}${path}`,
    siteName: "J&J Management Solutions",
    locale: "en_US",
    type: "website",
  },
};

export default function OklahomaHvacContractorWebsitesPage() {
  return (
    <IndustryServicePage
      title="Websites & leads for Oklahoma HVAC contractors"
      description="Homeowners search fast when the AC quits. We build credible, mobile-ready sites with obvious “call now” and “schedule service” paths, plus ad landing alignment so your spend turns into booked jobs—not just clicks."
      bullets={[
        "Service area and seasonal messaging (heat, cool, maintenance)",
        "Trust blocks: licenses, reviews, guarantees—above the fold on mobile",
        "Lead capture that routes to your CRM or inbox",
        "Optional ad program structure tied to real offers and geography",
      ]}
      relatedWorkSlug="prairie-hvac-ads"
      relatedWorkLabel="See a sample ads dashboard walkthrough"
    />
  );
}
