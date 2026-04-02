import type { Metadata } from "next";
import { IndustryServicePage } from "@/components/industry/IndustryServicePage";
import { getSiteUrl } from "@/lib/site-url";

const path = "/oklahoma-city-restaurant-websites";

export const metadata: Metadata = {
  title: "Oklahoma City restaurant websites | J&J Management Solutions",
  description:
    "Fast, mobile-first sites for OKC restaurants—menus, reservations, and local SEO so diners find you first.",
  alternates: { canonical: path },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Oklahoma City restaurant websites | J&J Management Solutions",
    description: "Web design and systems for Oklahoma City restaurants and hospitality.",
    url: `${getSiteUrl()}${path}`,
    siteName: "J&J Management Solutions",
    locale: "en_US",
    type: "website",
  },
};

export default function OklahomaCityRestaurantWebsitesPage() {
  return (
    <IndustryServicePage
      title="Websites for Oklahoma City restaurants & hospitality"
      description="Your guests decide on their phones—speed, clear hours and location, and an obvious “reserve” or “order” path beat a pretty PDF menu. We build and tune sites (and light booking flows) so OKC diners can choose you with confidence."
      bullets={[
        "Mobile-first layouts for menu, hours, and directions",
        "Structured content so Google can surface you in local search",
        "Clear calls to action: call, book, or order online",
        "Optional integrations with the booking or POS tools you already use",
      ]}
      relatedWorkSlug="bricktown-bistro"
      relatedWorkLabel="See a sample restaurant-style walkthrough"
    />
  );
}
