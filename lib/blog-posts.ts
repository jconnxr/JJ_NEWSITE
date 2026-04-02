export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  paragraphs: string[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "more-google-reviews-oklahoma-city",
    title: "How to get more Google reviews in Oklahoma City (without feeling pushy)",
    excerpt: "Practical prompts, timing, and follow-up habits that help local businesses collect credible reviews.",
    date: "2026-03-15",
    paragraphs: [
      "Reviews are one of the first things people check after they find you on Google. For Oklahoma City and statewide service businesses, a steady flow of recent reviews signals that you’re active and trustworthy.",
      "Ask after a successful job—when the customer is happiest—and make it easy: send a direct link to your Google Business Profile review page. Keep the message short and optional; pressure backfires.",
      "Respond to every public review. It shows you’re engaged and helps future customers see how you handle feedback—even the imperfect ones.",
    ],
  },
  {
    slug: "what-makes-a-good-small-business-website",
    title: "What makes a good small business website in 2026",
    excerpt: "Clarity, speed, mobile layout, and one obvious next step beat flashy effects every time.",
    date: "2026-03-01",
    paragraphs: [
      "A good small business site answers three questions in seconds: what you do, where you serve, and what the visitor should do next (call, book, or request a quote).",
      "Most of your traffic is on a phone. Large tap targets, readable type, and fast load times reduce bounce more than animation or stock photography ever will.",
      "Match your forms and ads to a real follow-up process. A pretty site with nowhere for leads to land—or no one answering—wastes ad spend and SEO effort alike.",
    ],
  },
  {
    slug: "when-to-fix-vs-replace-your-site",
    title: "When to fix your website versus replace it",
    excerpt: "How to tell if a refresh, a new template, or a full rebuild is the right move.",
    date: "2026-02-18",
    paragraphs: [
      "If your content is solid but the site is slow or broken on mobile, targeted fixes and performance work may be enough.",
      "If the structure is confusing, the brand has changed, or you’re adding booking and CRM integrations, a rebuild often saves money compared to patching an outdated stack.",
      "Start with goals: what should the site help you sell or book in the next 90 days? That answer drives whether you patch or replace.",
    ],
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
