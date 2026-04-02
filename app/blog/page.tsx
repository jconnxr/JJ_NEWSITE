import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/landing/Footer";
import { Navbar } from "@/components/landing/Navbar";
import { SiteGridBackdrop } from "@/components/landing/SiteGridBackdrop";
import { blogPosts } from "@/lib/blog-posts";
import { getSiteUrl } from "@/lib/site-url";

const path = "/blog";

export const metadata: Metadata = {
  title: "Resources | J&J Management Solutions",
  description: "Practical notes on websites, reviews, and online presence for Oklahoma small businesses.",
  alternates: { canonical: path },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Resources | J&J Management Solutions",
    url: `${getSiteUrl()}${path}`,
    siteName: "J&J Management Solutions",
    locale: "en_US",
    type: "website",
  },
};

export default function BlogIndexPage() {
  return (
    <div className="relative min-h-dvh bg-[var(--color-cream)] text-[var(--color-ink)]">
      <SiteGridBackdrop />
      <Navbar />
      <main
        id="main"
        className="relative z-[1] mx-auto max-w-3xl px-4 py-12 pt-[calc(7rem+env(safe-area-inset-top,0px))] sm:px-6 sm:py-16"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-gold)]">Resources</p>
        <h1 className="mt-2 font-serif text-3xl font-semibold tracking-tight text-[var(--color-ink-deep)] sm:text-4xl">
          Articles for Oklahoma owners
        </h1>
        <p className="mt-4 text-lg text-[var(--color-muted)]">
          Short posts you can skim—SEO, reviews, and what actually matters on a small business site.
        </p>
        <ul className="mt-12 space-y-8">
          {blogPosts.map((post) => (
            <li key={post.slug}>
              <article>
                <p className="text-xs text-[var(--color-muted)]">{post.date}</p>
                <h2 className="mt-1 font-serif text-xl font-semibold text-[var(--color-ink-deep)]">
                  <Link href={`/blog/${post.slug}`} className="hover:text-[var(--color-accent)]">
                    {post.title}
                  </Link>
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">{post.excerpt}</p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="mt-3 inline-block text-sm font-semibold text-[var(--color-accent)] hover:underline"
                >
                  Read more →
                </Link>
              </article>
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </div>
  );
}
