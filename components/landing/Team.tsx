"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Reveal } from "@/components/motion/Reveal";
import { SectionFlowAccent } from "./SectionFlowAccent";
import { JACOB_PHONE_DISPLAY, JACOB_PHONE_TEL, JOHN_PHONE_DISPLAY, JOHN_PHONE_TEL } from "@/lib/constants";
import { getSafeTeamVideoEmbedSrc } from "@/lib/team-embed-url";

const people = [
  {
    name: "John Conner",
    role: "Co-founder",
    src: "/team-john.png",
    tel: JOHN_PHONE_TEL,
    telDisplay: JOHN_PHONE_DISPLAY,
  },
  {
    name: "Jacob Foreman",
    role: "Co-founder",
    src: "/team-jacob.png",
    tel: JACOB_PHONE_TEL,
    telDisplay: JACOB_PHONE_DISPLAY,
  },
];

const sharedBio = (
  <>
    <p>
      We’re both from Oklahoma City, and our partnership is built on a friendship that goes back to childhood—long before
      we ever started a company. That same trust is what we bring to our work today, with a simple dream: make the online
      side of running a business feel understandable—not a maze of jargon, dashboards, and vendors you never meet. Too
      many owners feel behind before they even start; we show up to change that.
    </p>
    <p className="mt-4">
      Whether you’re in a small town or the metro, we want your business to thrive online with websites, systems, and
      ads you can actually use. You’ll work directly with both of us—no layers, no distant “support team,” just two people
      who answer the phone, explain things in plain language, and care about your outcomes as much as you do.
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
            The people you’ll actually talk to
          </h2>
        </Reveal>
        <Reveal delay={0.06}>
          <p className="mt-4 max-w-2xl text-lg text-[var(--color-muted)]">
            Real people from Oklahoma—here to help your business grow online without the confusion. Call either of us;
            we’re not a call center, and we’re not going anywhere.
          </p>
        </Reveal>

        {teamVideoSrc ? (
          <Reveal delay={0.08}>
            <div className="mt-12 overflow-hidden rounded-2xl border border-[var(--color-border)] bg-black/20 shadow-lg shadow-black/30">
              <div className="aspect-video w-full">
                <iframe
                  src={teamVideoSrc}
                  title="Welcome from John and Jacob — J&J Management Solutions"
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>
          </Reveal>
        ) : null}

        <div className="mt-14 grid gap-8 md:grid-cols-2 md:gap-10">
          {people.map((person, i) => (
            <motion.article
              key={person.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8% 0px" }}
              transition={{ duration: 0.55, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="group overflow-hidden rounded-3xl border border-[var(--color-border)] bg-paper shadow-xl shadow-black/40"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-[var(--color-surface-alt)]">
                <motion.div
                  className="absolute inset-0"
                  whileHover={{ scale: 1.045 }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Image
                    src={person.src}
                    alt={`${person.name}, ${person.role} at J&J Management Solutions`}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </motion.div>
              </div>
              <div className="p-6 sm:p-8">
                <h3 className="font-serif text-xl font-semibold text-[var(--color-ink-deep)]">{person.name}</h3>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-accent)]">
                  {person.role}
                </p>
                <p className="mt-4">
                  <a
                    href={person.tel}
                    className="text-base font-semibold text-[var(--color-accent)] underline-offset-2 hover:underline"
                  >
                    {person.telDisplay}
                  </a>
                </p>
              </div>
            </motion.article>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-12 rounded-2xl border border-[var(--color-border)] bg-paper/95 p-6 shadow-sm sm:p-8">
            <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-[var(--color-muted)]">Our story</h3>
            <div className="mt-4 max-w-3xl text-sm leading-relaxed text-[var(--color-ink)] sm:text-base">{sharedBio}</div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
