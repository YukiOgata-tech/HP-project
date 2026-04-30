import { notFound } from "next/navigation";
import { getPostBySlug, getPublishedPosts } from "@client-sites/lib/cms";
import Link from "next/link";
import type { Metadata } from "next";

const SITE_ID = process.env.SITE_ID!;

export const revalidate = 60;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getPublishedPosts(SITE_ID, 100);
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(SITE_ID, slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt || undefined,
    openGraph: {
      title: post.title,
      description: post.excerpt || undefined,
      images: post.coverImageUrl ? [{ url: post.coverImageUrl }] : [],
    },
  };
}

export default async function NewsPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(SITE_ID, slug);
  if (!post) notFound();

  return (
    <article className="max-w-3xl mx-auto px-6 py-16">
      <Link
        href="/news"
        className="text-sm text-[var(--fg-subtle)] hover:text-[var(--fg)] transition-colors mb-8 inline-block"
      >
        ← お知らせ一覧
      </Link>

      <header className="mb-10">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 bg-[var(--bg)] border border-[var(--border)] rounded-full text-[var(--fg-subtle)]"
            >
              {tag}
            </span>
          ))}
        </div>

        <h1 className="text-3xl font-serif font-bold text-[var(--fg)] leading-snug">
          {post.title}
        </h1>

        {post.publishedAt && (
          <time className="mt-3 block text-sm text-[var(--fg-subtle)]">
            {new Date(post.publishedAt).toLocaleDateString("ja-JP", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        )}

        {post.coverImageUrl && (
          <img
            src={post.coverImageUrl}
            alt={post.title}
            className="mt-6 w-full h-64 object-cover rounded-xl"
          />
        )}
      </header>

      {/* contentHtml はサーバーサイドでサニタイズ済み */}
      <div
        className="prose prose-lg max-w-none
          prose-headings:font-serif prose-headings:text-[var(--fg)]
          prose-p:text-[var(--fg-muted)]
          prose-a:text-[var(--accent)] prose-a:no-underline hover:prose-a:underline
          prose-blockquote:border-[var(--accent-border)] prose-blockquote:text-[var(--fg-subtle)]
          prose-img:rounded-lg
          prose-table:text-sm
          prose-th:bg-[var(--bg)] prose-th:text-[var(--fg)]
          prose-td:text-[var(--fg-muted)]"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />
    </article>
  );
}
