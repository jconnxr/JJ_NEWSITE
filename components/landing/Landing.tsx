"use client";

import dynamic from "next/dynamic";
import { Navbar } from "./Navbar";
import { Hero } from "./Hero";
import { ScrollProgress } from "./ScrollProgress";
import { SiteGridBackdrop } from "./SiteGridBackdrop";
import { StickyCta } from "./StickyCta";

const Bridge = dynamic(() => import("./Bridge").then((m) => ({ default: m.Bridge })));
const WhyOnlineTeaser = dynamic(() => import("./WhyOnlineTeaser").then((m) => ({ default: m.WhyOnlineTeaser })));
const TrustStrip = dynamic(() => import("./TrustStrip").then((m) => ({ default: m.TrustStrip })));
const Process = dynamic(() => import("./Process").then((m) => ({ default: m.Process })));
const Portfolio = dynamic(() => import("./Portfolio").then((m) => ({ default: m.Portfolio })));
const Services = dynamic(() => import("./Services").then((m) => ({ default: m.Services })));
const Team = dynamic(() => import("./Team").then((m) => ({ default: m.Team })));
const Contact = dynamic(() => import("./Contact").then((m) => ({ default: m.Contact })));

export function Landing() {
  return (
    <>
      <a
        href="#main"
        className="fixed left-4 z-[100] -translate-y-[120%] rounded-lg bg-[var(--color-navy)] px-4 py-3 text-base font-medium text-white opacity-0 transition focus:translate-y-0 focus:opacity-100"
        style={{ top: "max(1rem, env(safe-area-inset-top))" }}
      >
        Skip to main content
      </a>
      <Navbar />
      <ScrollProgress />
      <SiteGridBackdrop />
      <main id="main" className="relative z-[1] min-w-0 max-w-[100vw] overflow-x-clip pb-16 md:pb-0">
        <Hero />
        <Bridge />
        <WhyOnlineTeaser />
        <TrustStrip />
        <Process />
        <Portfolio />
        <Services />
        <Team />
        <Contact />
      </main>
      <StickyCta />
    </>
  );
}
