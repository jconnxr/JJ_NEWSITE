import type { PreviewConfig, PreviewTemplateId } from "@/lib/preview-types";

export type SiteCopyDefaults = Pick<
  PreviewConfig,
  "ctaPrimary" | "ctaSecondary" | "testimonialQuote" | "testimonialAttribution" | "hoursLine"
>;

export function siteDefaultsForLayout(templateId: PreviewTemplateId, layoutId: string): SiteCopyDefaults {
  const L = layoutId.toLowerCase();
  switch (templateId) {
    case "restaurant":
      if (L.includes("menu")) {
        return {
          ctaPrimary: "View menu",
          ctaSecondary: "Order online",
          testimonialQuote: "Best new spot in the neighborhood—everything tasted fresh and the staff made us feel at home.",
          testimonialAttribution: "Local guide · OKC",
          hoursLine: "Open daily · Kitchen ’til 9pm",
        };
      }
      return {
        ctaPrimary: "Reserve a table",
        ctaSecondary: "View private dining",
        testimonialQuote: "We hosted our company dinner here and the team still talks about it. Booking again for the holidays.",
        testimonialAttribution: "Operations lead · Edmond",
        hoursLine: "Dinner Tue–Sun · Brunch weekends",
      };
    case "dental":
      if (L.includes("cosmetic")) {
        return {
          ctaPrimary: "Book a smile consult",
          ctaSecondary: "See financing options",
          testimonialQuote: "I finally smiled in photos again. Clear plan, no pressure, and results I wanted.",
          testimonialAttribution: "Patient · Moore",
          hoursLine: "Early mornings & select evenings",
        };
      }
      return {
        ctaPrimary: "Schedule a cleaning",
        ctaSecondary: "New patient forms",
        testimonialQuote: "Gentle with kids and honest about what we needed. The whole family goes here now.",
        testimonialAttribution: "Parent of two · Norman",
        hoursLine: "Mon–Fri 8–5 · Sat by appt.",
      };
    case "hvac":
      if (L.includes("install")) {
        return {
          ctaPrimary: "Free replacement quote",
          ctaSecondary: "Financing questions",
          testimonialQuote: "Upfront quote matched the invoice. Crew was respectful of our home and timeline.",
          testimonialAttribution: "Homeowner · Yukon",
          hoursLine: "Install crews · Mon–Sat",
        };
      }
      return {
        ctaPrimary: "Schedule service",
        ctaSecondary: "Emergency line",
        testimonialQuote: "AC died in July—they had a tech out same day and we were cool again by dinner.",
        testimonialAttribution: "Homeowner · OKC",
        hoursLine: "Emergency service · Call anytime",
      };
    case "retail":
      if (L.includes("showroom")) {
        return {
          ctaPrimary: "Plan a showroom visit",
          ctaSecondary: "Get directions",
          testimonialQuote: "We could touch everything and compare options side by side—worth the drive.",
          testimonialAttribution: "Contractor · Midwest City",
          hoursLine: "Showroom · Mon–Sat 9–6",
        };
      }
      return {
        ctaPrimary: "Shop in stock",
        ctaSecondary: "Call the store",
        testimonialQuote: "They had what we needed without the big-box runaround. Helpful crew.",
        testimonialAttribution: "Small business owner · Tulsa metro",
        hoursLine: "In-store pickup · Same day when possible",
      };
    case "professional":
    default:
      if (L.includes("expertise")) {
        return {
          ctaPrimary: "See how we work",
          ctaSecondary: "Download overview",
          testimonialQuote: "Clear scope, realistic timeline, and communication the whole way. Exactly what we needed.",
          testimonialAttribution: "Business owner · OKC",
          hoursLine: "Consultations by appointment",
        };
      }
      return {
        ctaPrimary: "Book a consultation",
        ctaSecondary: "Email our team",
        testimonialQuote: "Responsive, professional, and they explained everything in plain language.",
        testimonialAttribution: "Client · statewide",
        hoursLine: "Office hours · Mon–Fri 9–5",
      };
  }
}
