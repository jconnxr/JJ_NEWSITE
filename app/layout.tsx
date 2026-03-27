import type { Metadata, Viewport } from "next";
import { DM_Sans, Source_Serif_4 } from "next/font/google";
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

const site = "https://jjmanagementsolutions.com";

/** Mobile: correct scaling, theme bar color, safe-area (notch) support */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#f7f5f2",
};

export const metadata: Metadata = {
  metadataBase: new URL(site),
  icons: {
    icon: "/logo.png",
  },
  title: "J&J Management Solutions | Digital delivery for Oklahoma businesses",
  description:
    "Technology-led project management for websites, CRMs, advertising, and booking systems. John Conner and Jacob Foreman help Oklahoma companies grow online visibility—structured delivery, plain language, measurable outcomes.",
  openGraph: {
    title: "J&J Management Solutions | Digital delivery for Oklahoma businesses",
    description:
      "Technology-led project management for websites, CRMs, advertising, and booking systems. Oklahoma-based partners for online visibility.",
    url: site,
    siteName: "J&J Management Solutions",
    locale: "en_US",
    type: "website",
    images: [{ url: "/logo.png", width: 1200, height: 630, alt: "J&J Management Solutions" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "J&J Management Solutions | Digital delivery for Oklahoma businesses",
    description:
      "Websites, CRMs, ads, and booking flows—direct access to two Oklahoma co-founders who ship with a modern stack.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${dmSans.variable} ${sourceSerif.variable}`}>
      <body className="min-h-dvh overflow-x-clip antialiased">{children}</body>
    </html>
  );
}
