import type { Metadata, Viewport } from "next";
import { DM_Sans, Source_Serif_4 } from "next/font/google";
import { NavigationUx } from "@/components/navigation/NavigationUx";
import { LocalBusinessJsonLd } from "@/components/seo/LocalBusinessJsonLd";
import { getSiteUrl } from "@/lib/site-url";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-source-serif",
  display: "swap",
});

const site = getSiteUrl();

/** Mobile: correct scaling, theme bar color, safe-area (notch) support */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#06080c",
};

export const metadata: Metadata = {
  metadataBase: new URL(site),
  icons: {
    icon: "/logo.png",
  },
  title: "J&J Management Solutions | Oklahoma City Websites, Systems & Ads",
  description:
    "Oklahoma City–based partners for small-business websites, CRMs, Google-style ads, and booking flows. John Conner and Jacob Foreman—plain language, statewide and OKC metro.",
  keywords: [
    "Oklahoma City web design",
    "Oklahoma City website",
    "Oklahoma small business website",
    "OKC CRM",
    "Oklahoma digital marketing",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "J&J Management Solutions | Oklahoma City Websites, Systems & Ads",
    description:
      "Websites, systems, and ads for Oklahoma businesses—based in Oklahoma City, serving the metro and small towns statewide.",
    url: site,
    siteName: "J&J Management Solutions",
    locale: "en_US",
    type: "website",
    images: [{ url: "/logo.png", width: 1200, height: 630, alt: "J&J Management Solutions" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "J&J Management Solutions | Oklahoma City Websites, Systems & Ads",
    description:
      "Websites, CRMs, and ads for Oklahoma businesses—two OKC co-founders, no runaround.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${dmSans.variable} ${sourceSerif.variable}`}>
      <body className="min-h-dvh overflow-x-clip antialiased">
        <LocalBusinessJsonLd />
        <NavigationUx />
        {children}
      </body>
    </html>
  );
}
