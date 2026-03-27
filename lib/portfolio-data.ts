export type PortfolioCategory = "website" | "booking" | "ads";

export type PortfolioProject = {
  slug: string;
  title: string;
  /** Fictional client name */
  client: string;
  location: string;
  category: PortfolioCategory;
  categoryLabel: string;
  excerpt: string;
  tags: string[];
  /** Problem / context for case study copy */
  challenge: string;
  /** What we "delivered" in the mock narrative */
  outcome: string;
};

export const projects: PortfolioProject[] = [
  {
    slug: "red-dirt-roofing",
    title: "Local trades brand & lead site",
    client: "Red Dirt Roofing Co.",
    location: "Edmond, OK",
    category: "website",
    categoryLabel: "Website",
    excerpt:
      "A credibility-first site for storm-season leads: clear service areas, fast CTAs, and trust signals built for mobile.",
    tags: ["Next.js-style layout", "Mobile-first", "Lead capture"],
    challenge:
      "Homeowners compare roofers fast on their phones. The site had to feel established, load instantly, and make “call now” or “request inspection” obvious in one thumb reach.",
    outcome:
      "We structured the page around urgency (storm season), proof (reviews, licenses), and geography—so visitors know they’re local before they scroll far.",
  },
  {
    slug: "summit-family-dental",
    title: "Patient booking & intake flow",
    client: "Summit Family Dental",
    location: "Tulsa, OK",
    category: "booking",
    categoryLabel: "Booking flow",
    excerpt:
      "A guided booking experience: visit reason, preferred time, insurance flag—reducing phone tag for the front desk.",
    tags: ["Multi-step flow", "Validation", "Staff-friendly"],
    challenge:
      "The office wanted fewer phone rounds and clearer expectations before the patient walked in—without feeling like hospital software.",
    outcome:
      "We built a calm, step-by-step flow with plain language, smart defaults, and a confirmation screen patients can save or screenshot.",
  },
  {
    slug: "bricktown-bistro",
    title: "Restaurant presence & reservations",
    client: "Bricktown Bistro",
    location: "Oklahoma City, OK",
    category: "website",
    categoryLabel: "Website",
    excerpt:
      "Atmosphere-forward design with hours, menu highlights, and reservation CTAs tuned for weekend traffic and events.",
    tags: ["Brand mood", "Menu highlights", "Reservations"],
    challenge:
      "Diners decide quickly from search and maps. The site needed personality, real hours, and a reservation path that works thumbs-first on Friday nights.",
    outcome:
      "We leaned into photography-forward layout, scannable menu bands, and a sticky “Reserve a table” path that stays visible while browsing.",
  },
  {
    slug: "prairie-hvac-ads",
    title: "Search & local ad campaign system",
    client: "Prairie HVAC & Air",
    location: "Norman, OK",
    category: "ads",
    categoryLabel: "Ad campaign",
    excerpt:
      "Campaign structure for seasonal offers: ad groups by service, geo-fenced creative, and a simple reporting view owners can understand.",
    tags: ["Google Ads-style", "Geo", "Seasonal offers"],
    challenge:
      "HVAC spend spikes in summer and winter. The owner needed tight messaging by service line and city—not one generic ad blasting the whole metro.",
    outcome:
      "We show how we’d split campaigns, rotate offers, and tie creative back to dedicated landing paths so clicks don’t hit a generic homepage.",
  },
];

export function getProject(slug: string): PortfolioProject | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAllSlugs(): string[] {
  return projects.map((p) => p.slug);
}
