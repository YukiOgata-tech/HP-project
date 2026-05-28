import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative flex min-h-[80svh] items-center justify-center overflow-hidden bg-(--bg-dark)">

      {/* 背景装飾 */}
      <span
        aria-hidden
        className="pointer-events-none absolute bottom-[-0.12em] right-[-0.02em] select-none font-serif text-[50vw] font-bold leading-none text-white opacity-[0.04]"
      >
        404
      </span>

      <div className="relative z-10 px-6 py-20 text-center">
        <p className="label-en text-white/30">Page Not Found</p>

        <h1 className="mt-4 font-serif text-4xl font-bold text-white md:text-5xl lg:text-6xl">
          ページが見つかりません
        </h1>

        <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-white/50">
          お探しのページは移動・削除されたか、URLが間違っている可能性があります。
        </p>

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="label-en inline-flex items-center gap-2 border border-white/20 px-7 py-3.5 text-white/55 transition-all hover:border-white/50 hover:text-white"
          >
            <ArrowLeft size={12} />
            トップページへ戻る
          </Link>
          <Link
            href="/faq"
            className="label-en inline-flex items-center gap-2 border border-white/10 px-7 py-3.5 text-white/30 transition-all hover:border-white/30 hover:text-white/60"
          >
            よくあるご質問
          </Link>
        </div>
      </div>

    </main>
  );
}
