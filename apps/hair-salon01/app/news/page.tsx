import { getPublishedPosts } from "@client-sites/lib/cms";
import Link from "next/link";
import type { Metadata } from "next";

const SITE_ID = process.env.SITE_ID!;

export const metadata: Metadata = {
  title: "お知らせ",
};

export const revalidate = 60;

export default async function NewsPage() {
  const posts = await getPublishedPosts(SITE_ID);

  return (
    <section className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-serif font-bold text-[var(--fg)] mb-10">
        お知らせ
      </h1>

      {posts.length === 0 ? (
        <p className="text-[var(--fg-subtle)]">現在、公開中の記事はありません。</p>
      ) : (
        <ul className="space-y-8">
          {posts.map((post) => (
            <li key={post.id}>
              <Link
                href={`/news/${post.slug}`}
                className="group block p-6 bg-[var(--card-solid)] border border-[var(--border)] rounded-xl hover:border-[var(--accent-border)] transition-colors"
              >
                {post.coverImageUrl && (
                  <img
                    src={post.coverImageUrl}
                    alt={post.title}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                )}

                <div className="flex items-center gap-2 mb-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-0.5 bg-[var(--bg)] border border-[var(--border)] rounded-full text-[var(--fg-subtle)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h2 className="text-lg font-semibold text-[var(--fg)] group-hover:text-[var(--accent)] transition-colors">
                  {post.title}
                </h2>

                {post.excerpt && (
                  <p className="mt-2 text-sm text-[var(--fg-subtle)] line-clamp-2">
                    {post.excerpt}
                  </p>
                )}

                <time className="mt-3 block text-xs text-[var(--fg-subtle)]">
                  {post.publishedAt
                    ? new Date(post.publishedAt).toLocaleDateString("ja-JP", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : ""}
                </time>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
