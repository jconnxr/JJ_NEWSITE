/**
 * Canonical site origin (https + host, no trailing slash).
 * Set NEXT_PUBLIC_SITE_URL in Vercel so sitemap, robots, OG, and JSON-LD match your live domain (www vs apex).
 */
export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (raw) return raw.replace(/\/$/, "");
  return "https://www.jnjmanagementsolutions.com";
}
