import { notFound } from "next/navigation";
import { getPostBySlug, getPublishedPosts } from "@client-sites/lib/cms";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";

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
    title: `${post.title} | RISPLENDERE BROLETTO`,
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
    <main className="bg-(--bg)">

      {/* ── ページヘッダー ── */}
      <section className="border-b border-(--border) bg-(--bg) px-6 pb-8 pt-8 sm:pt-24 md:pb-16 md:pt-36">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/news"
            className="label-en mb-3 sm:mb-6 inline-flex items-center gap-2 text-(--fg-subtle) transition-colors hover:text-(--fg)"
          >
            <ArrowLeft size={12} />
            お知らせ一覧
          </Link>

          {post.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span key={tag} className="label-en text-(--fg-subtle)">
                  {tag}
                </span>
              ))}
            </div>
          )}

          <h1 className="mt-4 font-serif text-3xl font-bold leading-tight text-(--fg) md:text-4xl lg:text-5xl">
            {post.title}
          </h1>

          {post.publishedAt && (
            <time className="mt-4 block text-xs text-(--fg-subtle)">
              {new Date(post.publishedAt).toLocaleDateString("ja-JP", {
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

          {post.coverImageUrl && (
            <div className="mb-10 overflow-hidden">
              <img
                src={post.coverImageUrl}
                alt={post.title}
                className="h-64 w-full object-cover md:h-112"
              />
            </div>
          )}

          {post.excerpt && (
            <p className="mb-10 border-l-2 border-(--border) pl-5 text-sm leading-8 text-(--fg-muted) md:text-base md:leading-9">
              {post.excerpt}
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
              prose-img:w-full
              prose-hr:border-(--border)
              prose-strong:text-(--fg)
              prose-table:border prose-table:border-(--border)
              prose-th:bg-(--bg-off) prose-th:text-(--fg) prose-th:border prose-th:border-(--border)
              prose-td:text-(--fg-muted) prose-td:border prose-td:border-(--border)"
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />

          <div className="mt-14 border-t border-(--border) pt-8">
            <Link
              href="/news"
              className="label-en inline-flex items-center gap-2 text-(--fg-subtle) transition-colors hover:text-(--fg)"
            >
              <ArrowLeft size={11} />
              お知らせ一覧へ戻る
            </Link>
          </div>
        </div>
      </article>

    </main>
  );
}
