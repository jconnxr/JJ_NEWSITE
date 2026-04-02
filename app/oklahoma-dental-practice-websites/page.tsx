import type { Metadata } from "next";
import { IndustryServicePage } from "@/components/industry/IndustryServicePage";
import { getSiteUrl } from "@/lib/site-url";

const path = "/oklahoma-dental-practice-websites";

export const metadata: Metadata = {
  title: "Oklahoma dental practice websites & booking | J&J Management Solutions",
  description:
    "Patient-friendly sites and intake for Oklahoma dental practices—trust, clarity, and smoother scheduling.",
  alternates: { canonical: path },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Oklahoma dental practice websites & booking | J&J Management Solutions",
    description: "Websites and booking flows for Oklahoma dental and medical practices.",
    url: `${getSiteUrl()}${path}`,
    siteName: "J&J Management Solutions",
    locale: "en_US",
    type: "website",
  },
};

export default function OklahomaDentalPracticeWebsitesPage() {
  return (
    <IndustryServicePage
      title="Websites & patient flows for Oklahoma dental practices"
      description="New patients compare practices online before they call. We help Oklahoma dental offices look credible, explain services in plain language, and route requests into a booking or intake flow your front desk can manage."
      bullets={[
        "Intake and forms designed around what your practice is comfortable collecting—we plan fields with you, not against you",
        "Insurance and services pages that answer common questions upfront",
        "Booking or “request an appointment” flows tuned for mobile",
        "Local SEO basics so nearby patients find you",
      ]}
      relatedWorkSlug="summit-family-dental"
      relatedWorkLabel="See a sample patient booking walkthrough"
    />
  );
}
