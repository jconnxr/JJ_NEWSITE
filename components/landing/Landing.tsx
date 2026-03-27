"use client";

import dynamic from "next/dynamic";
import { Navbar } from "./Navbar";
import { Hero } from "./Hero";
import { StickyCta } from "./StickyCta";

const Bridge = dynamic(() => import("./Bridge").then((m) => ({ default: m.Bridge })));
const TrustStrip = dynamic(() => import("./TrustStrip").then((m) => ({ default: m.TrustStrip })));
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
      <main id="main" className="pb-16 md:pb-0">
        <Hero />
        <Bridge />
        <TrustStrip />
        <Portfolio />
        <Services />
        <Team />
        <Contact />
      </main>
      <StickyCta />
    </>
  );
}
