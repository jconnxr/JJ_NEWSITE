"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Reveal } from "@/components/motion/Reveal";
import { SectionFlowAccent } from "./SectionFlowAccent";
import { JOHN_PHONE_DISPLAY, JOHN_PHONE_TEL } from "@/lib/constants";
import { getSafeTeamVideoEmbedSrc } from "@/lib/team-embed-url";

const sharedBio = (
  <>
    <p>
      We’re based in Oklahoma City with a simple focus: make the online side of running a business feel
      understandable—not a maze of jargon, dashboards, and vendors you never meet. Too many owners feel behind before
      they even start; we show up to change that.
    </p>
    <p className="mt-4">
      Whether you’re in a small town or the metro, we want your business to thrive online with websites, systems, and
      ads you can actually use. You’ll work directly with us—no layers, no distant “support team”—just clear answers in
      plain language and follow-through on what we agree to in the call.
    </p>
    <p className="mt-4">
      We run our business as a Christian company. Our faith isn’t a label we tack on—it shapes how we treat people, tell
      the truth, and steward what you trust us with: your time, your budget, and your reputation online. We aim to work
      with integrity, generosity, and a sense of responsibility that goes beyond the invoice—because stewardship, for us,
      means taking seriously the work God’s given us to do and the businesses you’ve worked so hard to build.
    </p>
  </>
);

export function Team() {
  const teamVideoSrc = getSafeTeamVideoEmbedSrc(process.env.NEXT_PUBLIC_TEAM_VIDEO_URL);

  return (
    <section
      id="team"
      className="relative overflow-hidden scroll-mt-24 border-t border-[var(--color-border)] bg-[var(--color-surface-alt)] py-24 sm:py-32"
      aria-labelledby="team-heading"
    >
      <SectionFlowAccent phase={5} side="left" />
      <div className="relative z-[1] mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <h2
            id="team-heading"
            className="font-serif text-3xl font-semibold tracking-tight text-[var(--color-ink-deep)] sm:text-4xl lg:tracking-tight"
          >
            Who you&apos;ll work with
          </h2>
        </Reveal>
        <Reveal delay={0.06}>
          <p className="mt-4 max-w-2xl text-lg text-[var(--color-muted)]">
            John Conner leads J&amp;J from Oklahoma City—here to help your business grow online without the confusion.
            Call or text directly; we&apos;re not a call center, and we&apos;re not going anywhere.
          </p>
        </Reveal>

        {teamVideoSrc ? (
          <Reveal delay={0.08}>
            <div className="mt-12 overflow-hidden rounded-2xl border border-[var(--color-border)] bg-black/20 shadow-lg shadow-black/30">
              <div className="aspect-video w-full">
                <iframe
                  src={teamVideoSrc}
                  title="Welcome from John Conner — J&J Management Solutions"
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>
          </Reveal>
        ) : null}

        <motion.article
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-8% 0px" }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-14 max-w-md overflow-hidden rounded-3xl border border-[var(--color-border)] bg-paper shadow-xl shadow-black/40"
        >
          <motion.div className="relative aspect-[4/5] overflow-hidden bg-[var(--color-surface-alt)]">
            <motion.div
              className="absolute inset-0"
              whileHover={{ scale: 1.045 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image
                src="/team-john.png"
                alt="John Conner, owner of J&J Management Solutions"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 28rem"
              />
            </motion.div>
          </motion.div>
          <div className="p-6 sm:p-8">
            <h3 className="font-serif text-xl font-semibold text-[var(--color-ink-deep)]">John Conner</h3>
            <p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-accent)]">Owner</p>
            <p className="mt-4 text-sm leading-relaxed text-[var(--color-muted)]">
              John leads discovery, strategy, and delivery—scope, site builds, integrations, ads setup, and what to ship
              first. From the first call through launch, you work with the same person who does the work.
            </p>
            <p className="mt-4">
              <a
                href={JOHN_PHONE_TEL}
                className="text-base font-semibold text-[var(--color-accent)] underline-offset-2 hover:underline"
              >
                {JOHN_PHONE_DISPLAY}
              </a>
            </p>
          </div>
        </motion.article>

        <Reveal delay={0.1}>
          <div className="mt-12 rounded-2xl border border-[var(--color-border)] bg-paper/95 p-6 shadow-sm sm:p-8">
            <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-[var(--color-muted)]">Our story</h3>
            <div className="mt-4 max-w-3xl text-sm leading-relaxed text-[var(--color-ink)] sm:text-base">
              {sharedBio}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
