import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { FadeUp } from "../components/animated";
import { GalleryGrid, type GalleryImage } from "./components/GalleryGrid";

export const metadata: Metadata = {
  title: "スタイルギャラリー | RISPLENDERE BROLETTO",
  description:
    "RISPLENDERE BROLETTO のヘアスタイルギャラリー。カット・カラー・パーマ・ヘッドスパなど施術事例をご覧ください。",
};

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ギャラリー画像リスト
   ▶ 画像を追加するには、このオブジェクト配列に追記するだけです。
     { src: "/images/ファイル名.jpg", alt: "説明文", category: "cut" }
   ▶ category は省略可能。将来的なフィルタリングに使用します。
     使用できる値: "cut" | "color" | "perm" | "headspa" | "styling"
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const galleryImages: GalleryImage[] = [
  { src: "/images/style/style-01.jpg", alt: "ヘアスタイル 01", category: "cut"   },
  { src: "/images/style/style-02.jpg", alt: "ヘアスタイル 02", category: "color" },
  { src: "/images/style/style-03.jpg", alt: "ヘアスタイル 03", category: "perm"  },
  { src: "/images/style/style-04.jpg", alt: "ヘアスタイル 04", category: "cut"   },
  // ↓ ここに追加していく
];

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

export default function GalleryPage() {
  return (
    <main className="bg-(--bg)">

      {/* ── ページヘッダー ── */}
      <section className="border-b border-(--border) bg-(--bg-dark)">
        <div className="mx-auto max-w-350 px-6 py-8 sm:pt-24 md:pb-16 md:pt-32">
          <FadeUp>
            <Link
              href="/"
              className="label-en mb-3 sm:mb-6 inline-flex items-center gap-2 text-white/40 transition-colors hover:text-white/70"
            >
              <ArrowLeft size={12} />
              Back to Home
            </Link>
            <span className="section-rule section-rule--white block" />
            <p className="label-section text-white/35">Gallery</p>
            <h1 className="mt-5 font-serif text-4xl font-bold text-white md:text-5xl lg:text-6xl">
              スタイルギャラリー
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-white/50">
              ブロレットでの施術事例をご紹介します。
              カット・カラー・パーマ・ヘッドスパなど、
              気になるスタイルはカウンセリング時にお気軽にご相談ください。
            </p>
            <p className="mt-3 label-en text-white/25">
              {galleryImages.length} styles
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── グリッド ── */}
      <section className="px-6 py-10 md:py-14">
        <div className="mx-auto max-w-350">
          <GalleryGrid images={galleryImages} />
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="border-t border-(--border) bg-(--bg-off) px-6 py-12 md:py-16">
        <div className="mx-auto max-w-350 text-center">
          <p className="text-sm leading-7 text-(--fg-subtle)">
            掲載以外のスタイルもお気軽にご相談ください。<br />
            カウンセリングでじっくりご希望をお聞きします。
          </p>
          <a
            href="https://beauty.hotpepper.jp/slnH000142482/"
            target="_blank"
            rel="noopener noreferrer"
            className="label-en mt-6 inline-flex items-center gap-2 bg-(--cta) px-7 py-3.5 text-(--cta-text) transition-opacity hover:opacity-70"
          >
            Hot Pepperで予約する
          </a>
        </div>
      </section>

    </main>
  );
}
