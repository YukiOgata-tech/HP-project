import { getPublishedPosts } from "@client-sites/lib/cms";
import Link from "next/link";
import type { Metadata } from "next";
import { ChevronRight, Sparkles } from "lucide-react";

const SITE_ID = process.env.SITE_ID!;

export const metadata: Metadata = {
  title: "お知らせ",
};

export const revalidate = 60;

export default async function NewsPage() {
  const posts = await getPublishedPosts(SITE_ID);
  const featuredPost = posts[0];
  const remainingPosts = posts.slice(1);

  return (
    <main className="px-5 pb-16 pt-24 md:px-6 md:pb-20 md:pt-32">
      <div className="mx-auto max-w-7xl space-y-8">
        <section className="overflow-hidden rounded-[2.2rem] border border-[var(--border)] bg-[linear-gradient(135deg,rgba(255,255,255,0.92),rgba(245,236,227,0.88))] shadow-[0_24px_60px_-40px_rgba(44,36,31,0.45)]">
          <div className="grid gap-8 px-6 py-8 md:grid-cols-[0.9fr_1.1fr] md:px-9 md:py-10">
            <div className="space-y-4">
              <p className="inline-flex items-center gap-2 rounded-full border border-[var(--accent-border)] bg-white/60 px-3 py-1.5 text-xs font-black uppercase tracking-[0.28em] text-[var(--accent)]">
                <Sparkles size={13} />
                News
              </p>
              <div>
                <h1 className="font-serif text-4xl font-bold leading-tight text-[var(--fg)] md:text-5xl">
                  お知らせ一覧
                </h1>
                <p className="mt-4 max-w-xl text-sm leading-7 text-[var(--fg-subtle)] md:text-base md:leading-8">
                  営業日のお知らせや、スタイル提案、サロンからのご案内をまとめています。
                  気になる内容からそのまま詳細ページへ進めます。
                </p>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {[
                { label: "公開記事", value: posts.length },
                { label: "最新更新", value: featuredPost?.publishedAt ? new Date(featuredPost.publishedAt).toLocaleDateString("ja-JP", { month: "numeric", day: "numeric" }) : "-" },
                { label: "カテゴリ", value: posts.flatMap((post) => post.tags).filter((tag, index, list) => list.indexOf(tag) === index).length || 0 },
              ].map((item) => (
                <div key={item.label} className="rounded-[1.6rem] border border-[var(--border)] bg-white/70 px-5 py-5">
                  <p className="text-xs font-black uppercase tracking-[0.22em] text-[var(--accent)]">
                    {item.label}
                  </p>
                  <p className="mt-3 text-2xl font-black text-[var(--fg)]">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {posts.length === 0 ? (
          <section className="rounded-[2rem] border border-dashed border-[var(--accent-border)] bg-[var(--card)] px-6 py-16 text-center">
            <p className="text-lg font-bold text-[var(--fg)]">現在、公開中の記事はありません。</p>
            <p className="mt-2 text-sm text-[var(--fg-subtle)]">
              新しいお知らせが公開されると、こちらに一覧表示されます。
            </p>
          </section>
        ) : (
          <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
            <Link
              href={`/news/${featuredPost.slug}`}
              className="group overflow-hidden rounded-[2rem] border border-[var(--border)] bg-[var(--bg-section)] shadow-[0_24px_60px_-42px_rgba(44,36,31,0.45)] transition-transform duration-300 hover:-translate-y-1"
            >
              {featuredPost.coverImageUrl ? (
                <img
                  src={featuredPost.coverImageUrl}
                  alt={featuredPost.title}
                  className="h-72 w-full object-cover md:h-[22rem]"
                />
              ) : (
                <div className="flex h-72 items-center justify-center bg-[radial-gradient(circle_at_top,rgba(182,132,105,0.24),transparent_58%),linear-gradient(135deg,rgba(248,243,237,1),rgba(238,226,214,1))] md:h-[22rem]">
                  <Sparkles className="text-[var(--accent)]" size={22} />
                </div>
              )}

              <div className="space-y-4 px-6 py-6 md:px-8 md:py-8">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-[var(--bg)] px-3 py-1 text-[10px] font-black uppercase tracking-[0.25em] text-[var(--accent)]">
                    Featured
                  </span>
                  <time className="text-xs text-[var(--fg-subtle)]">
                    {featuredPost.publishedAt
                      ? new Date(featuredPost.publishedAt).toLocaleDateString("ja-JP", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : ""}
                  </time>
                </div>

                <h2 className="text-2xl font-black leading-tight text-[var(--fg)] transition-colors group-hover:text-[var(--accent)] md:text-3xl">
                  {featuredPost.title}
                </h2>

                <p className="max-w-2xl text-sm leading-7 text-[var(--fg-subtle)] md:text-base md:leading-8">
                  {featuredPost.excerpt || "詳細は記事ページからご覧ください。"}
                </p>

                <div className="flex flex-wrap gap-2">
                  {featuredPost.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-[var(--border)] bg-[var(--card)] px-3 py-1 text-xs font-bold text-[var(--fg-subtle)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <span className="inline-flex items-center gap-2 text-sm font-bold text-[var(--accent)]">
                  記事を読む
                  <ChevronRight size={16} />
                </span>
              </div>
            </Link>

            <div className="space-y-4">
              {remainingPosts.length === 0 ? (
                <div className="rounded-[1.8rem] border border-[var(--border)] bg-[var(--card-solid)] px-5 py-8 text-sm text-[var(--fg-subtle)]">
                  さらに表示できる記事はまだありません。
                </div>
              ) : (
                remainingPosts.map((post) => (
                  <Link
                    key={post.id}
                    href={`/news/${post.slug}`}
                    className="group block rounded-[1.8rem] border border-[var(--border)] bg-[var(--card-solid)] p-5 shadow-[0_20px_50px_-42px_rgba(44,36,31,0.5)] transition-all duration-200 hover:-translate-y-1 hover:border-[var(--accent-border)]"
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <time className="text-xs text-[var(--fg-subtle)]">
                        {post.publishedAt
                          ? new Date(post.publishedAt).toLocaleDateString("ja-JP", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })
                          : ""}
                      </time>
                      {post.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-[var(--bg)] px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.22em] text-[var(--accent)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="mt-3 text-lg font-black text-[var(--fg)] transition-colors group-hover:text-[var(--accent)]">
                      {post.title}
                    </h3>
                    <p className="mt-2 line-clamp-3 text-sm leading-7 text-[var(--fg-subtle)]">
                      {post.excerpt || "詳細は記事ページからご覧ください。"}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[var(--accent)]">
                      続きを読む
                      <ChevronRight size={15} />
                    </span>
                  </Link>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
