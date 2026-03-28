import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getProject, getAllSlugs } from "@/lib/portfolio-data";
import { CaseStudyView } from "@/components/portfolio/CaseStudyView";
import { Footer } from "@/components/landing/Footer";
import { getSiteUrl } from "@/lib/site-url";

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
    alternates: {
      canonical: `/work/${slug}`,
    },
    openGraph: {
      title: `${p.title} · Case study`,
      description: p.excerpt,
      url: `${getSiteUrl()}/work/${slug}`,
      type: "article",
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
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6 sm:py-4">
          <Link href="/" className="flex min-h-12 min-w-0 items-center gap-2 text-sm font-medium text-[var(--color-ink)] sm:min-h-14">
            <span className="sr-only">J&amp;J Management Solutions — Home</span>
            <Image
              src="/logo-wordmark.png"
              alt=""
              width={400}
              height={110}
              className="h-12 w-auto max-w-[min(300px,68vw)] shrink-0 object-contain object-left sm:h-[3.75rem] sm:max-w-[min(400px,48vw)]"
            />
          </Link>
          <Link
            href="/#portfolio"
            className="flex min-h-11 min-w-[88px] items-center justify-center rounded-lg px-2 text-sm font-medium text-[var(--color-accent)] active:bg-white/10 hover:text-[var(--color-ink-deep)]"
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
