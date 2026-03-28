/** Copy for /why-online — keep sources visible; refresh figures when surveys update. */

export type WhyOnlineStat = {
  figure: string;
  claim: string;
  source: string;
  href?: string;
};

export type WhyOnlineGroup = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  stats: WhyOnlineStat[];
};

export const whyOnlineGroups: WhyOnlineGroup[] = [
  {
    id: "discovery",
    eyebrow: "Discovery",
    title: "How people find you",
    description:
      "Search, maps, and your website are often the first impression—before a call, a visit, or a booking.",
    stats: [
      {
        figure: "76%",
        claim:
          "of people who search on their smartphone for something nearby visit a related business within a day.",
        source: "Google / Ipsos (Think with Google)",
        href: "https://www.thinkwithgoogle.com/consumer-insights/consumer-trends/how-to-win-the-moment-with-better-local-search-ads/",
      },
      {
        figure: "Near me",
        claim:
          "Local and “near me” style intent is a long-running pattern in how people use Search and Maps to decide where to go next.",
        source: "Google Search Central (local intent overview)",
        href: "https://developers.google.com/search/docs/appearance/structured-data/local-business",
      },
    ],
  },
  {
    id: "trust",
    eyebrow: "Trust",
    title: "Reviews and credibility",
    description:
      "Oklahoma customers are no different from national surveys: they read signals online before they reach out.",
    stats: [
      {
        figure: "98%",
        claim: "of consumers read online reviews for local businesses at least occasionally.",
        source: "BrightLocal, Local Consumer Review Survey 2024",
        href: "https://www.brightlocal.com/research/local-consumer-review-survey-2024/",
      },
      {
        figure: "75%",
        claim: "of consumers “always” or “regularly” read online reviews while researching local businesses.",
        source: "BrightLocal, Local Consumer Review Survey 2024",
        href: "https://www.brightlocal.com/research/local-consumer-review-survey-2024/",
      },
    ],
  },
  {
    id: "experience",
    eyebrow: "Experience",
    title: "Speed, mobile, and clarity",
    description:
      "A fast, readable site reduces friction—especially on phones, where much of local discovery happens.",
    stats: [
      {
        figure: "Core Web Vitals",
        claim:
          "Google uses real-user experience signals (including loading and interactivity) as part of how it evaluates page experience for ranking.",
        source: "Google Search Central — Core Web Vitals",
        href: "https://developers.google.com/search/docs/appearance/core-web-vitals",
      },
      {
        figure: "Mobile-first",
        claim:
          "Google predominantly uses the mobile version of a page for indexing and ranking—mobile usability is not a side project.",
        source: "Google Search Central — Mobile-first indexing",
        href: "https://developers.google.com/search/docs/crawling-indexing/mobile/mobile-sites-mobile-first-indexing",
      },
    ],
  },
];

export const whyOnlineSources: { label: string; href: string }[] = [
  {
    label: "BrightLocal — Local Consumer Review Survey 2024",
    href: "https://www.brightlocal.com/research/local-consumer-review-survey-2024/",
  },
  {
    label: "Think with Google — local search behavior",
    href: "https://www.thinkwithgoogle.com/consumer-insights/consumer-trends/how-to-win-the-moment-with-better-local-search-ads/",
  },
  {
    label: "Google Search Central — Core Web Vitals",
    href: "https://developers.google.com/search/docs/appearance/core-web-vitals",
  },
  {
    label: "Google Search Central — Mobile-first indexing",
    href: "https://developers.google.com/search/docs/crawling-indexing/mobile/mobile-sites-mobile-first-indexing",
  },
];
