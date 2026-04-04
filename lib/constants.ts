/** In-app scheduling page (sends email via /api/book-call) */
export const BOOK_CALL_PATH = "/book-call";

/** Interactive site preview builder funnel */
export const PREVIEW_PATH = "/preview";

/** Replace with your business email */
export const CONTACT_MAILTO =
  "mailto:hello@example.com?subject=Meeting%20with%20J%26J%20Management%20Solutions";

/** Individual lines — team section; hero/footer/sticky use John’s number as the primary “call us” line */
export const JOHN_PHONE_TEL = "tel:+14053123681";
export const JOHN_PHONE_DISPLAY = "(405) 312-3681";
export const JACOB_PHONE_TEL = "tel:+14056530112";
export const JACOB_PHONE_DISPLAY = "(405) 653-0112";

/** Primary click-to-call (John) — hero, footer, sticky bar, portfolio mocks */
export const PHONE_TEL = JOHN_PHONE_TEL;
export const PHONE_DISPLAY = JOHN_PHONE_DISPLAY;

/** Shown near hero / footer — edit to match how you serve clients */
export const SERVICE_AREA = "Oklahoma City metro & statewide";

/** Named areas for footer / local SEO — edit to match where you actually work */
export const SERVICE_AREA_CITIES = [
  "Oklahoma City",
  "Edmond",
  "Norman",
  "Moore",
  "Midwest City",
  "Tulsa metro",
  "Statewide",
] as const;

/** Sets expectations after form or call */
export const RESPONSE_TIME = "We usually reply within one business day.";

/** Shown on the book-a-call card — keep truthful; adjust to match your calendar */
export const BOOKING_AVAILABILITY_NOTE = "We usually keep 2–3 call slots open per week—most are booked within a few days.";

/** Optional public Google reviews URL (set in .env as NEXT_PUBLIC_GOOGLE_REVIEWS_URL) */
export const GOOGLE_REVIEWS_URL = (process.env.NEXT_PUBLIC_GOOGLE_REVIEWS_URL ?? "").trim();

/** SMS to primary line — for “Text us” / chat alternatives */
export const SMS_URI = "sms:+14053123681";
