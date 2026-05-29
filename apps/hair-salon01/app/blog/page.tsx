import { getPublishedBlogs } from "@client-sites/lib/cms";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { FadeUp, FadeIn, StaggerList, StaggerItem } from "../components/animated";

const SITE_ID = process.env.SITE_ID!;
const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "").replace(/\/$/, "");

export const metadata: Metadata = {
  title: "ブログ | RISPLENDERE BROLETTO",
  description: "RISPLENDERE BROLETTO のスタイリスト・スタッフによるヘアスタイル、ヘアケア、トレンド情報をお届けするブログです。",
  alternates: { canonical: `${SITE_URL}/blog` },
  openGraph: {
    title: "ブログ | RISPLENDERE BROLETTO",
    description: "ヘアスタイル、ヘアケア、トレンド情報をお届けするブログです。",
    url: `${SITE_URL}/blog`,
    type: "website",
  },
};

export const revalidate = 60;

const fmtLong  = (d: string) => new Date(d).toLocaleDateString("ja-JP", { year: "numeric", month: "long",    day: "numeric" });
const fmtShort = (d: string) => new Date(d).toLocaleDateString("ja-JP", { month: "numeric", day: "numeric" });

function ImgPlaceholder({ index }: { index: number }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-(--bg-dark)">
      <p className="font-serif text-4xl font-bold text-white/15 select-none">
        {String(index + 1).padStart(2, "0")}
      </p>
      <p className="label-en text-white/10">No Image</p>
    </div>
  );
}

export default async function BlogPage() {
  const blogs = await getPublishedBlogs(SITE_ID);
  const [featured, ...rest] = blogs;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "RISPLENDERE BROLETTO ブログ",
    description: "ヘアスタイル、ヘアケア、トレンド情報をお届けするブログです。",
    url: `${SITE_URL}/blog`,
    publisher: {
      "@type": "Organization",
      name: "RISPLENDERE BROLETTO",
    },
  };

  return (
    <main className="bg-(--bg)">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ════════════════════════════════════════
          TOP — ヘッダーセクション
      ════════════════════════════════════════ */}
      <section className="relative overflow-hidden border-b border-(--border) px-6 pb-10 pt-24 md:pt-28 md:pb-12">

        <Image
          src="/images/news-top-bg-light.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center dark:hidden"
          priority
        />
        <Image
          src="/images/news-top-bg-dark.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center hidden dark:block"
          priority
        />

        <p aria-hidden className="news-deco-word">B</p>

        <div className="relative z-10 mx-auto max-w-350">
          <FadeUp>
            <div className="flex items-end justify-between gap-6">
              <div>
                <Link
                  href="/"
                  className="label-en mb-3 sm:mb-6 inline-flex items-center gap-2 text-(--fg-subtle) transition-colors hover:text-(--fg)"
                >
                  <ArrowLeft size={11} />
                  Home
                </Link>
                <span className="section-rule block" />
                <p className="label-section">Blog</p>
                <h1 className="mt-3 font-serif text-5xl font-bold text-(--fg) md:text-6xl lg:text-7xl">
                  ブログ
                </h1>
              </div>

              <div className="hidden shrink-0 text-right md:block">
                <p className="label-en text-(--fg-subtle)">Articles</p>
                <p className="mt-1 font-serif text-5xl font-bold tabular-nums text-(--fg)">
                  {String(blogs.length).padStart(2, "0")}
                </p>
              </div>
            </div>

            <p className="mt-4 max-w-lg text-sm leading-7 text-(--fg-subtle)">
              スタイリストによるヘアスタイル・ヘアケア・トレンド情報など、サロンのリアルをお届けします。
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ════════════════════════════════════════
          BLOG POSTS
      ════════════════════════════════════════ */}
      <section className="px-6 py-12 md:py-16">
        <div className="mx-auto max-w-350">

          {blogs.length === 0 ? (
            <FadeUp>
              <div className="border border-dashed border-(--border) px-6 py-20 text-center">
                <p className="font-serif text-3xl font-bold text-(--fg-subtle)">—</p>
                <p className="mt-3 text-sm text-(--fg-subtle)">現在、公開中のブログ記事はありません。</p>
              </div>
            </FadeUp>
          ) : (
            <div className="grid gap-6 md:grid-cols-[1.3fr_1fr] md:items-start lg:gap-8">

              {/* ── フィーチャード記事 ── */}
              {featured && (
                <FadeIn>
                  <Link href={`/blog/${featured.slug}`} className="group block">
                    <div className="relative h-64 overflow-hidden sm:h-80 md:h-88">
                      {featured.coverImageUrl ? (
                        <img
                          src={featured.coverImageUrl}
                          alt={featured.title}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <ImgPlaceholder index={0} />
                      )}

                      {featured.category && (
                        <div className="absolute bottom-0 right-0 bg-(--bg)/90 px-4 py-2 backdrop-blur-sm">
                          <p className="label-en text-(--fg-subtle)">{featured.category}</p>
                        </div>
                      )}
                    </div>

                    <div className="border border-t-0 border-(--border) bg-(--card) p-5 md:p-7">
                      <div className="mb-3 flex items-center gap-3">
                        <span className="inline-block bg-(--fg) px-3 py-1 label-en text-xs text-(--bg)">Latest</span>
                        {featured.publishedAt && (
                          <time className="text-xs text-(--fg-subtle)">
                            {fmtLong(featured.publishedAt)}
                          </time>
                        )}
                      </div>
                      <h2 className="text-xl font-black leading-snug text-(--fg) md:text-2xl">
                        {featured.title}
                      </h2>
                      <p className="mt-3 line-clamp-3 text-sm leading-7 text-(--fg-subtle)">
                        {featured.excerpt ?? "詳細は記事ページでご覧ください。"}
                      </p>
                      <span className="mt-5 inline-flex items-center gap-2 text-xs font-bold text-(--fg) transition-opacity group-hover:opacity-50">
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
                    <div className="border border-(--border) bg-(--card) px-6 py-10 text-center">
                      <p className="text-sm text-(--fg-subtle)">他の記事はまだありません。</p>
                    </div>
                  </FadeIn>
                ) : (
                  <StaggerList className="flex flex-col gap-px border border-(--border)">
                    {rest.map((blog, i) => (
                      <StaggerItem key={blog.id}>
                        <Link
                          href={`/blog/${blog.slug}`}
                          className="group flex items-stretch bg-(--card) transition-opacity hover:opacity-60"
                        >
                          <div className="relative h-28 w-28 shrink-0 overflow-hidden md:h-32 md:w-32">
                            {blog.coverImageUrl ? (
                              <img
                                src={blog.coverImageUrl}
                                alt={blog.title}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <ImgPlaceholder index={i + 1} />
                            )}
                          </div>

                          <div className="flex min-w-0 flex-1 flex-col justify-center border-l border-(--border) px-4 py-4">
                            <div className="flex items-center gap-2">
                              {blog.publishedAt && (
                                <time className="text-xs text-(--fg-subtle)">
                                  {fmtShort(blog.publishedAt)}
                                </time>
                              )}
                              {blog.category && (
                                <span className="label-en text-xs text-(--fg-subtle)">
                                  / {blog.category}
                                </span>
                              )}
                            </div>
                            <h3 className="mt-1 line-clamp-2 text-sm font-black leading-snug text-(--fg) md:text-base">
                              {blog.title}
                            </h3>
                            <span className="mt-2 inline-flex items-center gap-1 text-xs text-(--fg-subtle)">
                              読む <ArrowRight size={9} />
                            </span>
                          </div>

                          <div className="flex w-10 shrink-0 items-center justify-center border-l border-(--border)">
                            <p className="label-en text-(--fg-subtle)">
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
