import { notFound } from "next/navigation";
import { getPostBySlug, getPublishedPosts } from "@client-sites/lib/cms";
import Link from "next/link";
import type { Metadata } from "next";
import { ChevronLeft, Sparkles } from "lucide-react";

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
    <main className="px-5 pb-16 pt-24 md:px-6 md:pb-20 md:pt-32">
      <article className="mx-auto max-w-5xl">
        <Link
          href="/news"
          className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-[var(--fg-subtle)] transition-colors hover:text-[var(--fg)]"
        >
          <ChevronLeft size={16} />
          お知らせ一覧へ戻る
        </Link>

        <div className="overflow-hidden rounded-[2.2rem] border border-[var(--border)] bg-[linear-gradient(135deg,rgba(255,255,255,0.92),rgba(245,236,227,0.88))] shadow-[0_26px_65px_-42px_rgba(44,36,31,0.45)]">
          <header className="px-6 py-8 md:px-10 md:py-10">
            <div className="flex flex-wrap items-center gap-2">
              {post.tags.length > 0 ? (
                post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-[var(--bg)] px-3 py-1 text-[10px] font-black uppercase tracking-[0.22em] text-[var(--accent)]"
                  >
                    {tag}
                  </span>
                ))
              ) : (
                <span className="inline-flex items-center gap-2 rounded-full bg-[var(--bg)] px-3 py-1 text-[10px] font-black uppercase tracking-[0.22em] text-[var(--accent)]">
                  <Sparkles size={12} />
                  Journal
                </span>
              )}
            </div>

            <h1 className="mt-5 font-serif text-3xl font-bold leading-tight text-[var(--fg)] md:text-5xl">
              {post.title}
            </h1>

            {post.publishedAt && (
              <time className="mt-4 block text-sm text-[var(--fg-subtle)]">
                {new Date(post.publishedAt).toLocaleDateString("ja-JP", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            )}

            {post.excerpt && (
              <p className="mt-5 max-w-3xl text-sm leading-7 text-[var(--fg-subtle)] md:text-base md:leading-8">
                {post.excerpt}
              </p>
            )}
          </header>

          {post.coverImageUrl && (
            <div className="px-6 pb-2 md:px-10">
              <img
                src={post.coverImageUrl}
                alt={post.title}
                className="h-72 w-full rounded-[1.8rem] object-cover md:h-[28rem]"
              />
            </div>
          )}

          <div className="px-6 pb-10 pt-8 md:px-10">
            <div
              className="prose prose-lg max-w-none
                prose-headings:font-serif prose-headings:text-[var(--fg)]
                prose-h2:text-3xl prose-h2:font-bold
                prose-h3:text-2xl prose-h3:font-bold
                prose-p:text-[var(--fg-muted)] prose-p:leading-8
                prose-li:text-[var(--fg-muted)] prose-li:leading-8
                prose-a:text-[var(--accent)] prose-a:no-underline hover:prose-a:underline
                prose-blockquote:rounded-r-2xl prose-blockquote:border-[var(--accent-border)] prose-blockquote:bg-[rgba(255,255,255,0.52)] prose-blockquote:px-5 prose-blockquote:py-2 prose-blockquote:text-[var(--fg-subtle)]
                prose-img:rounded-[1.4rem]
                prose-hr:border-[var(--border)]
                prose-table:overflow-hidden prose-table:rounded-2xl prose-table:border prose-table:border-[var(--border)]
                prose-th:bg-[var(--bg)] prose-th:text-[var(--fg)]
                prose-td:text-[var(--fg-muted)]"
              dangerouslySetInnerHTML={{ __html: post.contentHtml }}
            />
          </div>
        </div>
      </article>
    </main>
  );
}
