import Link from "next/link";
import { Home, SearchX, Ticket } from "lucide-react";
import { PublicPageFrame } from "@/components/PublicPageFrame";

export default function NotFound() {
  return (
    <PublicPageFrame>
      <main className="min-h-screen bg-[#070508] px-3 pb-10 pt-20 text-white sm:px-6 sm:pb-20 sm:pt-36">
        <section className="mx-auto grid max-w-5xl gap-4 lg:grid-cols-[0.86fr_1.14fr] lg:items-center">
          <div className="relative overflow-hidden rounded-2xl border border-[#d9b84f]/25 bg-white/5 p-4 sm:rounded-[1.6rem] sm:p-8">
            <div className="absolute -right-12 -top-16 size-40 rounded-full bg-[#d9b84f]/10 blur-3xl" />
            <p className="font-label text-[12px] uppercase tracking-[0.2em] text-[#d9b84f]">
              404 Not Found
            </p>
            <h1 className="mt-2 text-[4.6rem] font-black leading-none text-gradient-gold sm:text-[8rem]">
              404
            </h1>
            <p className="mt-2 text-sm font-bold leading-6 text-white/62 sm:text-base sm:leading-8">
              お探しのページは見つかりませんでした。URLが変更されたか、ページが削除された可能性があります。
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/95 p-4 text-[#1d1712] shadow-2xl sm:rounded-[1.6rem] sm:p-7">
            <SearchX className="size-9 text-[#8a5b32]" />
            <h2 className="mt-1 sm:mt-3 text-xl font-black leading-tight sm:text-4xl">
              目的<span className="text-base sm:text-2xl">の</span>ページを選択してください。
            </h2>
            <p className="mt-2 text-sm font-bold leading-6 text-[#67574b] sm:text-base sm:leading-8">
              各種情報は、下記から確認できます。
            </p>

            <div className="mt-5 grid gap-2 sm:grid-cols-2">
              <Link
                href="/"
                className="inline-flex h-9 sm:h-11 items-center justify-center gap-2 rounded-full bg-[#2d221c] px-5 text-sm font-black tracking-[0.14em] text-white transition-colors hover:bg-[#1f1712]"
              >
                <Home className="size-4" />
                トップページへ
              </Link>
              <Link
                href="/pre-ticket"
                className="inline-flex h-9 sm:h-11 items-center justify-center gap-2 rounded-full border border-[#8a5b32]/50 px-5 text-sm font-black tracking-[0.14em] text-[#2d221c] transition-colors hover:bg-[#f4ead8]"
              >
                <Ticket className="size-4" />
                チケットへ
              </Link>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2">
              <Link
                href="/news"
                className="rounded-xl border border-[#b89b84]/45 bg-[#b17c1a] px-3 py-2 text-center text-xs font-black tracking-widest text-white hover:bg-[#f4ead8] hover:text-black"
              >
                お知らせ
              </Link>
              <Link
                href="/sponsors"
                className="rounded-xl border border-[#b89b84]/45 bg-[#b17c1a] px-3 py-2 text-center text-xs font-black tracking-widest text-white hover:bg-[#f4ead8] hover:text-black"
              >
                協賛企業
              </Link>
            </div>
          </div>
        </section>
      </main>
    </PublicPageFrame>
  );
}
