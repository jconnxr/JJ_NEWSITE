import type { MetadataRoute } from "next";
import { getAllSlugs } from "@/lib/portfolio-data";
import { getSiteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const now = new Date();

  const routes: MetadataRoute.Sitemap = [
    {
      url: base,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${base}/book-call`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/why-online`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    ...getAllSlugs().map((slug) => ({
      url: `${base}/work/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];

  return routes;
}
