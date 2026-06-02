import { notFound } from "next/navigation";
import { getBlogBySlug, getPublishedBlogs } from "@client-sites/lib/cms";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";

const SITE_ID = process.env.SITE_ID!;
const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "").replace(/\/$/, "");
const SITE_NAME = "RISPLENDERE BROLETTO";

export const revalidate = 60;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const blogs = await getPublishedBlogs(SITE_ID, 100);
    return blogs.map((b) => ({ slug: b.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogBySlug(SITE_ID, slug);
  if (!blog) return {};

  const url = `${SITE_URL}/blog/${blog.slug}`;
  const images = blog.coverImageUrl ? [{ url: blog.coverImageUrl }] : [];

  return {
    title: `${blog.title} | ${SITE_NAME}`,
    description: blog.excerpt || undefined,
    alternates: { canonical: url },
    openGraph: {
      title: blog.title,
      description: blog.excerpt || undefined,
      url,
      type: "article",
      images,
      publishedTime: blog.publishedAt ?? undefined,
      modifiedTime: blog.updatedAt,
      tags: blog.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.excerpt || undefined,
      images: blog.coverImageUrl ? [blog.coverImageUrl] : [],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const blog = await getBlogBySlug(SITE_ID, slug);
  if (!blog) notFound();

  const url = `${SITE_URL}/blog/${blog.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    description: blog.excerpt || undefined,
    url,
    datePublished: blog.publishedAt ?? blog.createdAt,
    dateModified: blog.updatedAt,
    image: blog.coverImageUrl || undefined,
    articleSection: blog.category || undefined,
    keywords: blog.tags.join(", ") || undefined,
    author: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };

  return (
    <main className="bg-(--bg)">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── ページヘッダー ── */}
      <section className="border-b border-(--border) bg-(--bg) px-6 py-8 sm:pt-28 md:pb-16 md:pt-36">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/blog"
            className="label-en mb-3 sm:mb-6 inline-flex items-center gap-2 text-(--fg-subtle) transition-colors hover:text-(--fg)"
          >
            <ArrowLeft size={12} />
            ブログ一覧
          </Link>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            {blog.category && (
              <span className="border border-(--border) px-3 py-1 text-xs font-bold uppercase tracking-wider text-(--fg-subtle)">
                {blog.category}
              </span>
            )}
            {blog.tags.map((tag) => (
              <span key={tag} className="label-en text-(--fg-subtle)">
                {tag}
              </span>
            ))}
          </div>

          <h1 className="mt-4 font-serif text-3xl font-bold leading-tight text-(--fg) md:text-4xl lg:text-5xl">
            {blog.title}
          </h1>

          {blog.publishedAt && (
            <time
              dateTime={blog.publishedAt}
              className="mt-4 block text-xs text-(--fg-subtle)"
            >
              {new Date(blog.publishedAt).toLocaleDateString("ja-JP", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          )}
        </div>
      </section>

      {/* ── 記事本体 ── */}
      <article className="px-6 py-14 md:py-20">
        <div className="mx-auto max-w-3xl">

          {blog.coverImageUrl && (
            <div className="mb-10 overflow-hidden">
              <img
                src={blog.coverImageUrl}
                alt={blog.title}
                className="h-64 w-full object-cover md:h-112"
              />
            </div>
          )}

          {blog.excerpt && (
            <p className="mb-10 border-l-2 border-(--border) pl-5 text-sm leading-8 text-(--fg-muted) md:text-base md:leading-9">
              {blog.excerpt}
            </p>
          )}

          <div
            className="prose max-w-none
              prose-headings:font-serif prose-headings:text-(--fg) prose-headings:font-bold
              prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
              prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
              prose-p:text-(--fg-muted) prose-p:leading-8
              prose-li:text-(--fg-muted) prose-li:leading-8
              prose-a:text-(--fg) prose-a:underline prose-a:underline-offset-2 hover:prose-a:opacity-60
              prose-blockquote:border-l-2 prose-blockquote:border-(--border) prose-blockquote:not-italic prose-blockquote:text-(--fg-subtle)
              prose-img:w-full prose-img:rounded-none
              prose-hr:border-(--border)
              prose-strong:text-(--fg)
              prose-table:border prose-table:border-(--border)
              prose-th:bg-(--bg-off) prose-th:text-(--fg) prose-th:border prose-th:border-(--border)
              prose-td:text-(--fg-muted) prose-td:border prose-td:border-(--border)"
            dangerouslySetInnerHTML={{ __html: blog.contentHtml }}
          />

          <div className="mt-14 border-t border-(--border) pt-8">
            <Link
              href="/blog"
              className="label-en inline-flex items-center gap-2 text-(--fg-subtle) transition-colors hover:text-(--fg)"
            >
              <ArrowLeft size={11} />
              ブログ一覧へ戻る
            </Link>
          </div>
        </div>
      </article>

    </main>
  );
}
