import { getPublishedPosts } from "@client-sites/lib/cms";
import Link from "next/link";
import { CalendarDays, ChevronRight, Newspaper } from "lucide-react";
import { PublicPageFrame } from "@/components/PublicPageFrame";
import { eventInfo } from "@/components/eventData";
import { StructuredData } from "@/components/StructuredData";
import { absoluteUrl, pageMetadata, siteName } from "@/components/seo";

export const dynamic = "force-dynamic";

const newsDescription =
  "MAHARAJA NIGHT in Niigata 2026 の出演者情報、チケット、VIP、協賛、当日の案内など公式ニュースを掲載します。";

export const metadata = pageMetadata({
  title: "お知らせ",
  description: newsDescription,
  path: "/news",
});

export default async function NewsList() {
  const siteId = process.env.SITE_ID;
  if (!siteId) throw new Error("SITE_ID is not defined");

  const posts = await getPublishedPosts(siteId);
  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${siteName} お知らせ`,
    description: newsDescription,
    url: absoluteUrl("/news"),
    mainEntity: posts.map((post) => ({
      "@type": "NewsArticle",
      headline: post.title,
      url: absoluteUrl(`/news/${post.slug}`),
      datePublished: post.publishedAt,
      dateModified: post.updatedAt,
    })),
  };

  return (
    <PublicPageFrame>
      <StructuredData data={collectionJsonLd} />
      <main className="min-h-screen bg-[#070508] px-3 pb-10 pt-20 text-white sm:px-6 sm:pb-20 sm:pt-36">
        <section className="mx-auto max-w-7xl">
          <div className="grid gap-2 border-b border-white/10 pb-4 sm:gap-8 sm:pb-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="text-[13px] font-black uppercase tracking-[0.2em] text-[#D4AF37] sm:text-sm sm:tracking-[0.32em]">
                News
              </p>
              <h1 className="mt-1 text-3xl font-black text-gradient-gold sm:mt-3 sm:text-6xl">
                お知らせ
              </h1>
            </div>
            <p className="max-w-2xl text-sm font-bold leading-5 text-white/66 sm:text-base sm:leading-8">
              {eventInfo.name} の出演者情報、チケット、VIP、協賛、当日の案内など、公式情報をこちらで更新します。
            </p>
          </div>

          <div className="mt-4 grid gap-2 sm:mt-10 sm:gap-5">
            {posts.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-[#D4AF37]/35 bg-white/[0.035] px-4 py-10 text-center sm:rounded-[1.6rem] sm:px-6 sm:py-16">
                <Newspaper className="mx-auto size-7 text-[#D4AF37] sm:size-9" />
                <p className="mt-3 text-base font-black text-white sm:mt-5 sm:text-lg">現在、公開中のお知らせはありません</p>
                <p className="mt-1 text-sm text-white/52 sm:mt-2 sm:text-sm">最新情報は準備が整い次第、こちらに掲載します。</p>
              </div>
            ) : (
              posts.map((post, index) => (
                <Link key={post.id} href={`/news/${post.slug}`} className="group block">
                  <article className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.045] transition-all duration-300 hover:-translate-y-1 hover:border-[#D4AF37]/40 sm:rounded-[1.35rem]">
                    <div className="grid gap-0 md:grid-cols-[18rem_1fr]">
                      {post.coverImageUrl ? (
                        <img
                          src={post.coverImageUrl}
                          alt={post.title}
                          className="h-36 w-full object-cover opacity-85 transition-transform duration-500 group-hover:scale-105 sm:h-56 md:h-full"
                        />
                      ) : (
                        <div className="flex h-36 items-center justify-center bg-[#D4AF37]/8 text-[#D4AF37] sm:h-56 md:h-full">
                          <Newspaper className="size-8 sm:size-9" />
                        </div>
                      )}
                      <div className="p-3 sm:p-7">
                        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                          <span className="rounded-full bg-[#D4AF37]/10 px-2.5 py-1 text-[12px] font-black uppercase tracking-[0.18em] text-[#D4AF37] sm:text-[12px] sm:tracking-[0.22em]">
                            {index === 0 ? "Latest" : "News"}
                          </span>
                          <span className="inline-flex items-center gap-1.5 text-[12px] font-bold text-white/45 sm:gap-2 sm:text-sm">
                            <CalendarDays className="size-3.5" />
                            {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString("ja-JP") : ""}
                          </span>
                        </div>
                        <h2 className="mt-2 text-lg font-black leading-tight text-white transition-colors group-hover:text-[#F9E596] sm:mt-4 sm:text-2xl">
                          {post.title}
                        </h2>
                        <p className="mt-1.5 line-clamp-2 text-[13px] font-bold leading-5 text-white/58 sm:mt-3 sm:line-clamp-3 sm:text-sm sm:leading-7">
                          {post.excerpt || "詳細は記事ページでご確認ください。"}
                        </p>
                        <div className="mt-3 inline-flex items-center gap-1.5 text-[12px] font-black uppercase tracking-[0.18em] text-[#FF4CA5] sm:mt-5 sm:gap-2 sm:text-sm sm:tracking-[0.22em]">
                          Read More
                          <ChevronRight className="size-3.5 sm:size-4" />
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              ))
            )}
          </div>
        </section>
      </main>
    </PublicPageFrame>
  );
}
