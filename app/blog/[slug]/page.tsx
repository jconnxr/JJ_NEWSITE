import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/landing/Footer";
import { Navbar } from "@/components/landing/Navbar";
import { SiteGridBackdrop } from "@/components/landing/SiteGridBackdrop";
import { blogPosts, getPostBySlug } from "@/lib/blog-posts";
import { getSiteUrl } from "@/lib/site-url";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Article" };
  const path = `/blog/${slug}`;
  return {
    title: `${post.title} | J&J Management Solutions`,
    description: post.excerpt,
    alternates: { canonical: path },
    robots: { index: true, follow: true },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `${getSiteUrl()}${path}`,
      siteName: "J&J Management Solutions",
      locale: "en_US",
      type: "article",
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <div className="relative min-h-dvh bg-[var(--color-cream)] text-[var(--color-ink)]">
      <SiteGridBackdrop />
      <Navbar />
      <article
        id="main"
        className="relative z-[1] mx-auto max-w-3xl px-4 py-12 pt-[calc(7rem+env(safe-area-inset-top,0px))] sm:px-6 sm:py-16"
      >
        <p className="text-xs text-[var(--color-muted)]">
          <Link href="/blog" className="font-medium text-[var(--color-accent)] hover:underline">
            ← All resources
          </Link>
          {" · "}
          {post.date}
        </p>
        <h1 className="mt-4 font-serif text-3xl font-semibold tracking-tight text-[var(--color-ink-deep)] sm:text-4xl">
          {post.title}
        </h1>
        <p className="mt-4 text-lg text-[var(--color-muted)]">{post.excerpt}</p>
        <div className="prose prose-invert mt-10 max-w-none space-y-4 text-[var(--color-ink)]">
          {post.paragraphs.map((p, i) => (
            <p key={i} className="leading-relaxed text-[var(--color-muted)]">
              {p}
            </p>
          ))}
        </div>
        <p className="mt-12">
          <Link href="/why-online" className="font-semibold text-[var(--color-accent)] hover:underline">
            See research-backed “why online” notes →
          </Link>
        </p>
      </article>
      <Footer />
    </div>
  );
}
