import { getPublishedPosts } from "@client-sites/lib/cms";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { FadeUp, FadeIn, StaggerList, StaggerItem } from "../components/animated";

const SITE_ID = process.env.SITE_ID!;

export const metadata: Metadata = {
  title: "お知らせ | RISPLENDERE BROLETTO",
  description: "RISPLENDERE BROLETTO からのお知らせ、スタイル情報、サロンのご案内。",
};

export const revalidate = 60;

/* ── 日付フォーマット ─────────────────────────── */
const fmtLong  = (d: string) => new Date(d).toLocaleDateString("ja-JP", { year: "numeric", month: "long",    day: "numeric" });
const fmtShort = (d: string) => new Date(d).toLocaleDateString("ja-JP", { month: "numeric", day: "numeric" });

/* ── 画像なし時のプレースホルダー ─────────────── */
function ImgPlaceholder({ index }: { index: number }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-[var(--bg-dark)]">
      <p className="font-serif text-4xl font-bold text-white/15 select-none">
        {String(index + 1).padStart(2, "0")}
      </p>
      <p className="label-en text-white/10">No Image</p>
    </div>
  );
}

/* ══════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════ */

export default async function NewsPage() {
  const posts = await getPublishedPosts(SITE_ID);
  const [featured, ...rest] = posts;

  return (
    <main className="bg-[var(--bg)]">

      {/* ════════════════════════════════════════
          TOP — 背景画像 (ライト/ダーク切替)
      ════════════════════════════════════════ */}
      <section className="relative overflow-hidden border-b border-[var(--border)] px-6 pb-10 pt-24 md:pt-28 md:pb-12">

        {/* ライトモード背景 */}
        <Image
          src="/images/news-top-bg-light.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center dark:hidden"
          priority
        />
        {/* ダークモード背景 */}
        <Image
          src="/images/news-top-bg-dark.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center hidden dark:block"
          priority
        />

        {/* 装飾文字オーバーレイ */}
        <p aria-hidden className="news-deco-word">J</p>

        <div className="relative z-10 mx-auto max-w-[1400px]">
          <FadeUp>
            <div className="flex items-end justify-between gap-6">
              <div>
                <Link
                  href="/"
                  className="label-en mb-3 sm:mb-6 inline-flex items-center gap-2 text-[var(--fg-subtle)] transition-colors hover:text-[var(--fg)]"
                >
                  <ArrowLeft size={11} />
                  Home
                </Link>
                <span className="section-rule block" />
                <p className="label-section">Journal</p>
                <h1 className="mt-3 font-serif text-5xl font-bold text-[var(--fg)] md:text-6xl lg:text-7xl">
                  お知らせ
                </h1>
              </div>

              {/* 記事数インジケーター */}
              <div className="hidden shrink-0 text-right md:block">
                <p className="label-en text-[var(--fg-subtle)]">Articles</p>
                <p className="mt-1 font-serif text-5xl font-bold tabular-nums text-[var(--fg)]">
                  {String(posts.length).padStart(2, "0")}
                </p>
              </div>
            </div>

            <p className="mt-4 max-w-lg text-sm leading-7 text-[var(--fg-subtle)]">
              サロンからのお知らせや、スタイル情報、ご案内をまとめています。
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ════════════════════════════════════════
          POSTS
      ════════════════════════════════════════ */}
      <section className="px-6 py-12 md:py-16">
        <div className="mx-auto max-w-[1400px]">

          {posts.length === 0 ? (
            <FadeUp>
              <div className="border border-dashed border-[var(--border)] px-6 py-20 text-center">
                <p className="font-serif text-3xl font-bold text-[var(--fg-subtle)]">—</p>
                <p className="mt-3 text-sm text-[var(--fg-subtle)]">現在、公開中の記事はありません。</p>
              </div>
            </FadeUp>
          ) : (
            <div className="grid gap-6 md:grid-cols-[1.3fr_1fr] md:items-start lg:gap-8">

              {/* ── フィーチャード記事 ── */}
              {featured && (
                <FadeIn>
                  <Link
                    href={`/news/${featured.slug}`}
                    className="group block"
                  >
                    {/* サムネイル */}
                    <div className="relative h-64 overflow-hidden sm:h-80 md:h-[22rem]">
                      {featured.coverImageUrl ? (
                        <img
                          src={featured.coverImageUrl}
                          alt={featured.title}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <ImgPlaceholder index={0} />
                      )}

                      {/* Latest バッジ (画像に重ねて) */}
                      <div className="absolute left-0 top-0 bg-[var(--fg)] px-4 py-2">
                        <p className="label-en text-[var(--bg)]">Latest</p>
                      </div>
                    </div>

                    {/* テキスト */}
                    <div className="border border-t-0 border-[var(--border)] bg-[var(--card)] p-5 md:p-7">
                      {featured.publishedAt && (
                        <time className="text-xs text-[var(--fg-subtle)]">
                          {fmtLong(featured.publishedAt)}
                        </time>
                      )}
                      <h2 className="mt-2 text-xl font-black leading-snug text-[var(--fg)] md:text-2xl">
                        {featured.title}
                      </h2>
                      <p className="mt-3 line-clamp-3 text-sm leading-7 text-[var(--fg-subtle)]">
                        {featured.excerpt ?? "詳細は記事ページでご覧ください。"}
                      </p>
                      <span className="mt-5 inline-flex items-center gap-2 text-xs font-bold text-[var(--fg)] transition-opacity group-hover:opacity-50">
                        続きを読む
                        <ArrowRight size={11} />
                      </span>
                    </div>
                  </Link>
                </FadeIn>
              )}

              {/* ── 残り記事リスト ── */}
              <div>
                {rest.length === 0 ? (
                  <FadeIn>
                    <div className="border border-[var(--border)] bg-[var(--card)] px-6 py-10 text-center">
                      <p className="text-sm text-[var(--fg-subtle)]">他の記事はまだありません。</p>
                    </div>
                  </FadeIn>
                ) : (
                  <StaggerList className="flex flex-col gap-px border border-[var(--border)]">
                    {rest.map((post, i) => (
                      <StaggerItem key={post.id}>
                        <Link
                          href={`/news/${post.slug}`}
                          className="group flex items-stretch bg-[var(--card)] transition-opacity hover:opacity-60"
                        >
                          {/* サムネイル */}
                          <div className="relative h-28 w-28 shrink-0 overflow-hidden md:h-32 md:w-32">
                            {post.coverImageUrl ? (
                              <img
                                src={post.coverImageUrl}
                                alt={post.title}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <ImgPlaceholder index={i + 1} />
                            )}
                          </div>

                          {/* テキスト */}
                          <div className="flex min-w-0 flex-1 flex-col justify-center border-l border-[var(--border)] px-4 py-4">
                            {post.publishedAt && (
                              <time className="text-xs text-[var(--fg-subtle)]">
                                {fmtShort(post.publishedAt)}
                              </time>
                            )}
                            <h3 className="mt-1 line-clamp-2 text-sm font-black leading-snug text-[var(--fg)] md:text-base">
                              {post.title}
                            </h3>
                            <span className="mt-2 inline-flex items-center gap-1 text-xs text-[var(--fg-subtle)]">
                              読む <ArrowRight size={9} />
                            </span>
                          </div>

                          {/* 番号 */}
                          <div className="flex w-10 shrink-0 items-center justify-center border-l border-[var(--border)]">
                            <p className="label-en text-[var(--fg-subtle)]">
                              {String(i + 2).padStart(2, "0")}
                            </p>
                          </div>
                        </Link>
                      </StaggerItem>
                    ))}
                  </StaggerList>
                )}
              </div>

            </div>
          )}
        </div>
      </section>

    </main>
  );
}
