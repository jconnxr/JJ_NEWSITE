"use client";

import { Navbar } from "./Navbar";
import { Hero } from "./Hero";
import { Bridge } from "./Bridge";
import { TrustStrip } from "./TrustStrip";
import { Portfolio } from "./Portfolio";
import { Services } from "./Services";
import { Team } from "./Team";
import { Contact } from "./Contact";
import { Footer } from "./Footer";
import { StickyCta } from "./StickyCta";

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
      <Footer />
    </>
  );
}
