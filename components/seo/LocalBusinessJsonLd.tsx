import { PHONE_TEL, SERVICE_AREA } from "@/lib/constants";
import { getSiteUrl } from "@/lib/site-url";

function telephoneE164(telHref: string): string {
  return telHref.replace(/^tel:/i, "");
}

/**
 * Local / ProfessionalService structured data for Google (complements GBP; does not replace it).
 */
export function LocalBusinessJsonLd() {
  const url = getSiteUrl();
  const payload = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "J&J Management Solutions",
    url,
    telephone: telephoneE164(PHONE_TEL),
    description:
      "Websites, CRMs, advertising, and booking tools for Oklahoma small businesses—plain language, direct access to co-founders John Conner and Jacob Foreman.",
    areaServed: [
      { "@type": "City", name: "Oklahoma City", containedInPlace: { "@type": "State", name: "Oklahoma" } },
      { "@type": "State", name: "Oklahoma" },
    ],
    slogan: SERVICE_AREA,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  );
}
