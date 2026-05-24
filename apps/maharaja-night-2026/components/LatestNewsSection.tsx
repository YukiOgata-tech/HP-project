import { CalendarDays, ChevronRight, Newspaper } from "lucide-react";
import { PublicLoadingLink } from "./PublicLoadingLink";

interface NewsItem {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  publishedAt?: string | null;
}

export function LatestNewsSection({ posts }: { posts: NewsItem[] }) {
  return (
    <section className="border-y border-white/10 bg-[#09060a] px-3 py-6 sm:px-6 sm:py-14">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-end justify-between gap-3">
          <div className="min-w-0">
            <p className="font-label text-[12px] uppercase tracking-[0.2em] text-[#d9b84f]">
              News
            </p>
            <h2 className="mt-1 text-2xl font-black leading-tight text-white sm:text-4xl">
              最新<span className="text-base sm:text-2xl">のお知らせ</span>
            </h2>
          </div>
          <PublicLoadingLink
            href="/news"
            loadingLabel="お知らせページへ移動中です"
            className="inline-flex h-8 shrink-0 items-center justify-center rounded-full border border-[#d9b84f]/45 px-3 text-[11px] font-black tracking-[0.14em] text-[#f3de8a] transition-colors hover:bg-[#d9b84f]/10 sm:h-9 sm:px-5 sm:text-[12px] sm:tracking-[0.16em]"
          >
            一覧へ
          </PublicLoadingLink>
        </div>

        <div className="mt-3 grid gap-1.5 sm:mt-6 sm:gap-3 md:grid-cols-3">
          {posts.length === 0 ? (
            <div className="rounded-xl border border-dashed border-[#d9b84f]/30 bg-white/[0.035] p-3 sm:rounded-2xl sm:p-5 md:col-span-3">
              <div className="flex items-center gap-2 text-[#d9b84f]">
                <Newspaper className="size-4" />
                <p className="text-sm font-black">現在、公開中のお知らせはありません</p>
              </div>
              <p className="mt-1 text-xs font-bold text-white/52">
                最新情報は準備が整い次第、こちらに掲載します。
              </p>
            </div>
          ) : (
            posts.slice(0, 3).map((post, index) => (
              <PublicLoadingLink
                key={post.id}
                href={`/news/${post.slug}`}
                loadingLabel="記事ページへ移動中です"
                className="group block rounded-xl border border-white/10 bg-white/[0.045] p-3 transition-colors hover:border-[#d9b84f]/45 sm:rounded-2xl sm:p-5"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded-full bg-[#d9b84f]/10 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-[#d9b84f]">
                    {index === 0 ? "Latest" : "News"}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-white/42">
                    <CalendarDays className="size-3.5" />
                    {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString("ja-JP") : ""}
                  </span>
                </div>
                <h3 className="mt-2 line-clamp-2 text-sm font-black leading-5 text-white group-hover:text-[#f3de8a] sm:text-base sm:leading-6">
                  {post.title}
                </h3>
                <p className="mt-1 line-clamp-2 text-xs font-bold leading-5 text-white/54 sm:text-sm">
                  {post.excerpt || "詳細は記事ページでご確認ください。"}
                </p>
                <div className="mt-2 inline-flex items-center gap-1 text-[11px] font-black uppercase tracking-[0.16em] text-[#ff4ca5]">
                  Read
                  <ChevronRight className="size-3.5" />
                </div>
              </PublicLoadingLink>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
