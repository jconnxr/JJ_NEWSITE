export type FocusOptionId = "website" | "crm" | "ads" | "booking" | "unsure";

export type FocusOption = {
  id: FocusOptionId;
  title: string;
  shortLabel: string;
  /** Shown when this option is selected */
  description: string;
  /** What we deliver / how it helps */
  helpsWith: string;
};

export const focusOptions: FocusOption[] = [
  {
    id: "website",
    shortLabel: "Website & presence",
    title: "Website & online presence",
    description:
      "A fast, credible site that explains what you do, answers common questions, and points visitors to the next step—call, form, or booking.",
    helpsWith:
      "Improves trust from search and referrals, reduces repetitive phone questions, and gives you a professional home base that matches how you actually operate.",
  },
  {
    id: "crm",
    shortLabel: "CRM & systems",
    title: "CRM & customer systems",
    description:
      "Leads, contacts, and follow-ups in one place—pipelines, reminders, and simple workflows your team can keep up with.",
    helpsWith:
      "Stops leads from slipping through the cracks, makes handoffs clearer, and gives you visibility into what’s working without living in spreadsheets.",
  },
  {
    id: "ads",
    shortLabel: "Ads & leads",
    title: "Ads & lead generation",
    description:
      "Campaign structure and creative direction for search and local ads—tied to real goals and reporting you can read without a marketing degree.",
    helpsWith:
      "Puts budget toward intent that matches your services, tightens messaging by geography and service line, and connects clicks to calls or forms.",
  },
  {
    id: "booking",
    shortLabel: "Booking & intake",
    title: "Booking & intake flows",
    description:
      "Online scheduling, quote requests, and intake experiences that feel light for the customer and organized for your team.",
    helpsWith:
      "Cuts phone tag, captures the right details up front, and helps staff prepare before the first conversation or visit.",
  },
  {
    id: "unsure",
    shortLabel: "Not sure yet",
    title: "Help me choose",
    description:
      "You know something’s off with visibility or operations but you’re not sure where to start—we’ll ask a few questions and suggest a sensible first move.",
    helpsWith:
      "You get a clear recommendation instead of buying the wrong thing first. Often we start small and expand once it’s working.",
  },
];
