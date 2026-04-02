export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  rating: 1 | 2 | 3 | 4 | 5;
  /** Optional — link to Google review profile */
  sourceUrl?: string;
};

/**
 * Replace with real client quotes and permission to publish.
 * Placeholder structure demonstrates layout only.
 */
export const testimonials: Testimonial[] = [
  {
    quote:
      "They explained everything in plain English and our new site actually brings in calls—we’re not guessing anymore.",
    name: "Local service owner",
    role: "Oklahoma City metro",
    rating: 5,
  },
  {
    quote: "No runaround. We talk to the same two people every time, and follow-up is fast.",
    name: "Small business operator",
    role: "Central Oklahoma",
    rating: 5,
  },
  {
    quote: "Finally have booking and leads in one place instead of scattered texts and voicemails.",
    name: "Practice administrator",
    role: "Tulsa area",
    rating: 5,
  },
];
