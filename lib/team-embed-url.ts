/**
 * Only allow common embed hosts for NEXT_PUBLIC_TEAM_VIDEO_URL so a mis-set env
 * cannot point the iframe at an arbitrary origin.
 */
const ALLOWED_HOSTS = new Set([
  "www.youtube.com",
  "youtube.com",
  "www.youtube-nocookie.com",
  "youtube-nocookie.com",
  "m.youtube.com",
  "youtu.be",
  "player.vimeo.com",
  "vimeo.com",
]);

export function getSafeTeamVideoEmbedSrc(raw: string | undefined): string | null {
  if (!raw?.trim()) return null;
  let u: URL;
  try {
    u = new URL(raw.trim());
  } catch {
    return null;
  }
  if (u.protocol !== "https:" && u.protocol !== "http:") return null;
  const h = u.hostname.toLowerCase();
  if (!ALLOWED_HOSTS.has(h)) return null;
  return u.toString();
}
