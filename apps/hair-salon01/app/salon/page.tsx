import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { FadeUp, FadeIn, StaggerList, StaggerItem } from "../components/animated";

export const metadata: Metadata = {
  title: "サロン・会社情報 | RISPLENDERE BROLETTO",
  description:
    "RISPLENDERE BROLETTO のブランドストーリー、3つのお約束、代表・会社概要。新潟市中央区本馬越の美容室。",
};

const instagramUrl   = "https://www.instagram.com/risplendere_broletto/";
const reservationUrl = "https://beauty.hotpepper.jp/slnH000142482/";
const tel            = "025-278-7274";

/* ── データ ──────────────────────────────────── */

const promises = [
  {
    number: "01",
    title: "ホームケアを、一緒に育てる。",
    body: "サロンから帰った後、毎日の髪を作る（育てる）のは365日、お客様ご自身のデイリーホームケアです。健康な頭皮を維持し、カラーやパーマの持続を左右する毎日のシャンプーを大切に考え、正しいケア方法を伝えることも美容師の大事な仕事と考えています。",
  },
  {
    number: "02",
    title: "髪と頭皮に、優しく。",
    body: "可能な限り優しい処方で施術を行います。頭皮をプロテクトしながら施術し、必要な施術後はシャンプー時に化学成分を徹底的に除去。髪と頭皮と体に優しい施術を心がけています。",
  },
  {
    number: "03",
    title: "来店後も、寄り添い続ける。",
    body: "来店時だけでなく、その後のヘアスタイル維持までサポート。毎日髪の悩みがない生活を送れるよう、ヘアドクターとして次回来店までしっかりフォロー・アドバイスを行います。",
  },
];

const companyRows = [
  { label: "社名",       value: "株式会社リスプレンデレブロレット" },
  { label: "代表取締役", value: "渡辺 麗奈（Rena Watanabe）" },
  { label: "所在地",     value: "〒950-0865\n新潟市中央区本馬越2丁目8番17号" },
  { label: "TEL",        value: tel },
  { label: "営業時間",   value: "平日 9:15〜18:00\n日曜・祝日 10:00〜17:00" },
  { label: "定休日",     value: "毎週月曜日・第3日曜日" },
  { label: "予約",       value: "ご予約優先制 / 当日予約OK" },
];

/* ═══════════════════════════════════════════════
   Instagram SVG (lucide-react の旧バージョン対応)
═══════════════════════════════════════════════ */
function IgIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
    </svg>
  );
}

/* ══════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════ */

export default function SalonPage() {
  return (
    <main className="bg-(--bg)">

      {/* ════════════════════════════════════════
          TOP
      ════════════════════════════════════════ */}
      <section className="border-b border-(--border) bg-(--bg) px-6 pt-24 md:pt-32">
        <div className="mx-auto flex max-w-350 items-end justify-between gap-10">

          {/* テキスト */}
          <FadeUp className="flex-1 pb-12 md:pb-16">
            <Link
              href="/"
              className="label-en mb-3 sm:mb-6 inline-flex items-center gap-2 text-(--fg-subtle) transition-colors hover:text-(--fg)"
            >
              <ArrowLeft size={11} />
              Back to Home
            </Link>
            <span className="section-rule" />
            <p className="label-section">About</p>
            <h1 className="mt-4 font-serif text-4xl font-bold text-(--fg) md:text-5xl lg:text-6xl">
              サロン・会社情報
            </h1>
            <p className="mt-5 max-w-3xl text-sm leading-7 text-(--fg-subtle)">
              <span className="font-bold underline">RISPLENDERE BROLETTO</span> のブランドストーリー、3つのお約束、代表・会社情報をご紹介します。
            </p>
          </FadeUp>

          {/* ロゴ — 下端揃え・自然サイズ (デスクトップのみ) */}
          <FadeIn delay={0.15} className="hidden shrink-0 md:block">
            <Image
              src="/images/logo/RB-logo-light.png"
              alt="RISPLENDERE BROLETTO ロゴ"
              width={0}
              height={0}
              sizes="100vw"
              className="h-auto w-auto max-h-48 md:max-h-72 dark:hidden"
              priority
            />
            <Image
              src="/images/logo/RB-logo-dark.png"
              alt="RISPLENDERE BROLETTO ロゴ"
              width={0}
              height={0}
              sizes="100vw"
              className="hidden h-auto w-auto max-h-48 md:max-h-72 dark:block"
              priority
            />
          </FadeIn>

        </div>
      </section>

      {/* ════════════════════════════════════════
          BRAND STORY + REPRESENTATIVE
      ════════════════════════════════════════ */}
      <section className="bg-(--bg) px-6 py-16 md:py-24">
        <div className="mx-auto max-w-350">
          <div className="grid gap-12 md:grid-cols-2 md:gap-16 lg:gap-24">

            {/* ブランドストーリー */}
            <FadeUp>
              <span className="section-rule" />
              <p className="label-section">Brand Story</p>
              <h2 className="mt-4 text-3xl font-black leading-tight text-(--fg) md:text-4xl">
                ブロレットという名前に、<br />
                込めた想い。
              </h2>
              <div className="mt-6 space-y-4 text-sm leading-8 text-(--fg-subtle) md:text-base md:leading-9">
                <p>
                  サロン名「RISPLENDERE BROLETTO」はイタリア語で
                  「キラキラ輝く小さな場所」という意味。ブロレットに訪れた方が
                  輝いて帰れるよう、またお客様にとってブロレットがキラキラとした
                  場所であるように、願いを込めてつけられた名前です。
                </p>
                <p>
                  女性スタッフだけの小さなサロン。細やかな気配りで、
                  すべてのお客様のご要望に応えられるサロンを目指しています。
                </p>
              </div>

              {/* 言葉の意味カード */}
              <div className="mt-8 grid grid-cols-2 gap-3">
                <div className="border border-(--border) bg-(--card) p-5">
                  <p className="label-en text-(--fg-subtle)">Risplendere</p>
                  <p className="mt-2 text-xl font-black text-(--fg)">輝く</p>
                  <p className="mt-1 text-xs text-(--fg-subtle)">キラキラ輝く</p>
                </div>
                <div className="border border-(--border) bg-(--card) p-5">
                  <p className="label-en text-(--fg-subtle)">Broletto</p>
                  <p className="mt-2 text-xl font-black text-(--fg)">場所</p>
                  <p className="mt-1 text-xs text-(--fg-subtle)">小さな場所</p>
                </div>
              </div>
            </FadeUp>

            {/* 代表者カード */}
            <FadeIn delay={0.1}>
              <div className="overflow-hidden border border-(--border) bg-(--card)">

                {/* オーナー写真 */}
                <div className="relative aspect-3/4 overflow-hidden">
                  <Image
                    src="/images/recruit/staff-tsurumaki.jpg"
                    alt="代表取締役 渡辺麗奈"
                    fill
                    className="object-cover object-top"
                    sizes="(min-width: 768px) 50vw, 100vw"
                    priority
                  />
                </div>

                {/* 情報 */}
                <div className="p-8 md:p-10">
                  <span className="section-rule" />
                  <p className="label-section">Representative</p>

                  <div className="mt-6">
                    <h3 className="font-serif text-3xl font-bold text-(--fg)">
                      渡辺 麗奈
                    </h3>
                    <p className="mt-1 label-en text-(--fg-subtle)">Rena Watanabe</p>
                    <p className="mt-2 text-xs text-(--fg-subtle)">
                      代表取締役 / Hair Stylist
                    </p>
                  </div>

                  <div className="my-7 h-px w-full bg-(--border)" />

                  <p className="text-sm leading-8 text-(--fg-subtle)">
                    株式会社リスプレンデレブロレット 代表取締役。<br />
                    新潟市中央区を拠点に、お客様一人ひとりの髪と向き合うサロンを運営しています。
                  </p>

                  {/* Instagram リンク */}
                  <a
                    href={instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-7 inline-flex items-center gap-2.5 border border-(--border) px-5 py-3 text-xs font-bold text-(--fg-subtle) transition-all hover:border-(--fg) hover:text-(--fg)"
                  >
                    <IgIcon />
                    @risplendere_broletto
                    <ExternalLink size={10} />
                  </a>
                </div>
              </div>
            </FadeIn>

          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          3 PROMISES — 詳細版
      ════════════════════════════════════════ */}
      <section className="bg-(--bg-off) px-6 py-16 md:py-24">
        <div className="mx-auto max-w-350">
          <FadeUp>
            <span className="section-rule" />
            <p className="label-section">Promise</p>
            <h2 className="mt-4 text-3xl font-black text-(--fg) md:text-4xl">
              ブロレットからの、<br className="sm:hidden" />3つのお約束。
            </h2>
          </FadeUp>

          <StaggerList className="mt-10 grid gap-5 md:grid-cols-3 lg:mt-14">
            {promises.map(({ number, title, body }) => (
              <StaggerItem key={number}>
                <article className="flex h-full flex-col border border-(--border) bg-(--card) p-7">
                  <div className="flex items-center justify-between">
                    <p className="label-en text-(--fg-subtle)">{number}</p>
                    <p className="label-en text-(--fg-subtle)">Promise</p>
                  </div>
                  <div className="mt-4 h-px w-full bg-(--border)" />
                  <h3 className="mt-5 text-lg font-black leading-snug text-(--fg)">
                    {title}
                  </h3>
                  <p className="mt-4 flex-1 text-sm leading-7 text-(--fg-subtle)">
                    {body}
                  </p>
                </article>
              </StaggerItem>
            ))}
          </StaggerList>
        </div>
      </section>

      {/* ════════════════════════════════════════
          COMPANY INFO
      ════════════════════════════════════════ */}
      <section className="bg-(--bg) px-6 py-16 md:py-24">
        <div className="mx-auto max-w-350">
          <FadeUp>
            <span className="section-rule" />
            <p className="label-section">Company</p>
            <h2 className="mt-4 text-3xl font-black text-(--fg) md:text-4xl">
              会社概要
            </h2>
          </FadeUp>

          <FadeIn className="mt-10 max-w-2xl">
            <dl className="border border-(--border) divide-y divide-(--border-light)">
              {companyRows.map(({ label, value }) => (
                <div
                  key={label}
                  className="grid grid-cols-[5.5rem_1fr] items-baseline gap-4 px-6 py-4 md:grid-cols-[8rem_1fr]"
                >
                  <dt className="text-xs font-bold text-(--fg-subtle)">{label}</dt>
                  <dd className="whitespace-pre-line text-sm text-(--fg)">{value}</dd>
                </div>
              ))}

              {/* Instagram 行 */}
              <div className="grid grid-cols-[5.5rem_1fr] items-baseline gap-4 px-6 py-4 md:grid-cols-[8rem_1fr]">
                <dt className="text-xs font-bold text-(--fg-subtle)">Instagram</dt>
                <dd>
                  <a
                    href={instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-(--fg) transition-opacity hover:opacity-60"
                  >
                    @risplendere_broletto
                    <ExternalLink size={11} />
                  </a>
                </dd>
              </div>
            </dl>
          </FadeIn>
        </div>
      </section>

      {/* ════════════════════════════════════════
          CTA
      ════════════════════════════════════════ */}
      <section className="bg-(--bg-dark) px-6 py-14 text-white md:py-20">
        <div className="mx-auto max-w-350">
          <FadeUp className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div>
              <span className="section-rule section-rule--white" />
              <h2 className="mt-4 text-2xl font-black text-white md:text-3xl">
                ブロレットで、<br className="sm:hidden" />あなたらしく輝く。
              </h2>
              <p className="mt-3 text-sm leading-7 text-white/50">
                新潟市中央区本馬越。女性スタッフだけの小さなサロンで、お待ちしています。
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href={reservationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="label-en inline-flex items-center justify-center gap-2 bg-white px-7 py-3.5 text-black transition-opacity hover:opacity-80"
              >
                Web予約 <ArrowRight size={12} />
              </a>
              <a
                href={`tel:${tel}`}
                className="label-en inline-flex items-center justify-center gap-2 border border-white/25 px-7 py-3.5 text-white/70 transition-all hover:border-white/60 hover:text-white"
              >
                {tel}
              </a>
            </div>
          </FadeUp>
        </div>
      </section>

    </main>
  );
}
