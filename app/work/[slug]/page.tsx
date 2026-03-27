import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getProject, getAllSlugs } from "@/lib/portfolio-data";
import { CaseStudyView } from "@/components/portfolio/CaseStudyView";
import { Footer } from "@/components/landing/Footer";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return { title: "Work" };
  return {
    title: `${p.title} · J&J Management Solutions`,
    description: p.excerpt,
    openGraph: {
      title: `${p.title} · Case study`,
      description: p.excerpt,
    },
  };
}

export default async function WorkCasePage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-[var(--color-border)]/90 bg-[var(--color-cream)]/95 pt-[env(safe-area-inset-top,0px)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <Link href="/" className="flex min-h-11 min-w-0 items-center gap-2 text-sm font-medium text-[var(--color-ink)]">
            <Image src="/logo.png" alt="" width={36} height={36} className="h-9 w-auto shrink-0" />
            <span className="truncate font-serif sm:inline">J&J Management Solutions</span>
          </Link>
          <Link
            href="/#portfolio"
            className="flex min-h-11 min-w-[88px] items-center justify-center rounded-lg px-2 text-sm font-medium text-[var(--color-accent)] active:bg-black/5 hover:text-[var(--color-navy)]"
          >
            All work
          </Link>
        </div>
      </header>
      <CaseStudyView project={project} />
      <Footer />
    </>
  );
}
