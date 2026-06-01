import Link from "next/link";
import Image from "next/image";
import { getPublishedPosts } from "@client-sites/lib/cms";
import {
  ArrowRight,
  CalendarDays,
  Car,
  ChevronRight,
  Clock,
  CreditCard,
  MapPin,
  Phone,
} from "lucide-react";
import { FadeUp, FadeIn, StaggerList, StaggerItem } from "./components/animated";
import { HeroSlider } from "./components/hero-slider";
import { FloatingRecruitButton } from "./components/FloatingRecruitButton";

const SITE_ID        = process.env.SITE_ID!;

/** 今年なら "MM.DD"、年を跨いでいれば "YYYY.MM.DD" */
function fmtNewsStripDate(dateStr: string): string {
  const d = new Date(dateStr);
  const sameYear = d.getFullYear() === new Date().getFullYear();
  return sameYear
    ? d.toLocaleDateString("ja-JP", { month: "2-digit", day: "2-digit" }).replace("/", ".")
    : d.toLocaleDateString("ja-JP", { year: "numeric", month: "2-digit", day: "2-digit" }).replace(/\//g, ".");
}
const reservationUrl = "https://beauty.hotpepper.jp/slnH000142482/";
const tel            = "025-278-7274";
const instagramUrl   = "https://www.instagram.com/risplendere_broletto/";
const mapUrl         =
  "https://www.google.com/maps?q=%E6%96%B0%E6%BD%9F%E7%9C%8C%E6%96%B0%E6%BD%9F%E5%B8%82%E4%B8%AD%E5%A4%AE%E5%8C%BA%E6%9C%AC%E9%A6%AC%E8%B6%8A2%E4%B8%81%E7%9B%AE8%E7%95%AA17%E5%8F%B7&output=embed";
const mapLink        =
  "https://www.google.com/maps/search/?api=1&query=%E6%96%B0%E6%BD%9F%E7%9C%8C%E6%96%B0%E6%BD%9F%E5%B8%82%E4%B8%AD%E5%A4%AE%E5%8C%BA%E6%9C%AC%E9%A6%AC%E8%B6%8A2%E4%B8%81%E7%9B%AE8%E7%95%AA17%E5%8F%B7";

/* ── データ ──────────────────────────────────── */

const promises = [
  {
    number: "01",
    title: "ホームケアを、一緒に育てる。",
    text: "サロンから帰った後、毎日の髪を作るのはお客様自身のデイリーホームケアです。正しいケア方法をお伝えすることも、美容師の大切な仕事と考えています。",
  },
  {
    number: "02",
    title: "髪と頭皮に、優しく。",
    text: "頭皮をプロテクトしながら施術し、必要な施術後はシャンプー時に化学成分を徹底的に除去。髪と頭皮と体に優しい施術を心がけています。",
  },
  {
    number: "03",
    title: "来店後も、寄り添い続ける。",
    text: "来店時だけでなく、その後のヘアスタイル維持までサポート。ヘアドクターとして次回来店までしっかりフォロー・アドバイスを行います。",
  },
];

const menuCategories = [
  { en: "Cut",      jp: "カット",       from: "¥2,000",  note: "+tax" },
  { en: "Head Spa", jp: "ヘッドスパ",   from: "¥2,500",  note: "+tax" },
  { en: "Color",    jp: "カラー",       from: "¥4,500",  note: "+tax" },
  { en: "Perm",     jp: "パーマ",       from: "¥12,000", note: "+tax〜" },
  { en: "Straight", jp: "ストレート",   from: "¥12,500", note: "+tax" },
  { en: "Styling",  jp: "スタイリング", from: "¥2,500",  note: "+tax" },
];

const specials = [
  { label: "お直し",         text: "10日以内無料" },
  { label: "ご紹介割",       text: "本人様・ご友人様 お互いに¥1,000オフ" },
  { label: "お誕生日割",     text: "誕生日月の技術料 ¥1,000オフ" },
  { label: "親子カット割",   text: "未就学児のカット 半額" },
  { label: "個室ルーム",     text: "貸切個室ルーム 無料（要予約）" },
  { label: "キッズスペース", text: "DVDが見れるキッズスペース完備" },
  { label: "サイクル割",     text: "前回¥5,000以上の方に適用" },
  { label: "前髪無料",       text: "来店5週間以内の前髪メンテナンス無料" },
  { label: "アフターケア",   text: "新規様 2週間以内のカウンセリング無料" },
];

const galleryImages = [
  { src: "/images/style/style-01.jpg", alt: "ヘアスタイル例 1" },
  { src: "/images/style/style-02.jpg", alt: "ヘアスタイル例 2" },
  { src: "/images/style/style-03.jpg", alt: "ヘアスタイル例 3" },
  { src: "/images/style/style-04.jpg", alt: "ヘアスタイル例 4" },
];

/* ══════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════ */

export default async function Home() {
  const latestPosts = await getPublishedPosts(SITE_ID, 3);

  return (
    <main>

      {/* ════════════════════════════════════════
          HERO — スライダー + ブランドパネル
          モバイル: 全画面スライダー + ブランド上部オーバーレイ + テキスト下部
          デスクトップ: 左スライダー(62%) + 右ブランドパネル(38%)
      ════════════════════════════════════════ */}
      <section className="mt-[calc(var(--site-header-height)+1rem)] flex flex-col md:mt-10 md:min-h-[67svh] md:flex-row">

        {/* ─ 左: スライダーエリア ─ */}
        {/*
          モバイル: min-h-svh で全画面確保 → ヘッダー上部・テキスト下部が重ならない
          デスクトップ: md:min-h-0 で flex-row の高さに従う
        */}
        <div className="relative min-h-[67svh] flex-1 overflow-hidden md:min-h-0">

          {/* スライダー背景 */}
          <HeroSlider />

          {/* テキストエリア
              上部: pt-[57px] でヘッダー分を確保し flex で縦中央〜下寄せ
              下部: pb-24 でスライダーUIとの重なりを防ぐ */}
          <div className="absolute inset-0 z-10 flex flex-col justify-end px-6 pb-24 pt-12 md:justify-end md:px-10 md:pb-20">
            <FadeUp>
              {/* ラベル */}
              <p className="label-en">
                <span className="text-hl--sm">Risplendere Broletto — 新潟市中央区</span>
              </p>

              {/* メインコピー */}
              <h1 className="mt-1 sm:mt-3 text-3xl font-bold leading-[1.75] tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
                <span className="text-hl">キラキラ輝く、</span>
                <br />
                <span className="text-hl">小さな場所。</span>
              </h1>

              {/* サブコピー */}
              <p className="mt-4 max-w-md text-sm leading-loose md:text-base">
                <span className="text-hl--sm">
                  新潟市中央区本馬越の、女性スタッフだけの小さなサロン。
                  丁寧なカウンセリングで、あなたの髪と日常に寄り添います。
                </span>
              </p>

              {/* CTAボタン */}
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a
                  href={reservationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-white px-7 py-3.5 text-sm font-black text-black transition-opacity hover:opacity-80 active:scale-95"
                >
                  Hot Pepperで予約
                  <ArrowRight size={14} />
                </a>
                <a
                  href={`tel:${tel}`}
                  className="inline-flex items-center justify-center gap-2 border border-white/30 bg-black/30 px-7 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition-all hover:border-white/60 hover:bg-black/50 active:scale-95"
                >
                  <Phone size={14} />
                  {tel}
                </a>
              </div>

              {/* 営業時間 */}
              <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1.5">
                {[
                  "平日 9:15〜18:00",
                  "日祝 10:00〜17:00",
                  "月曜・第3日曜 定休",
                ].map((t) => (
                  <span key={t} className="text-hl--sm text-[11px] font-bold">{t}</span>
                ))}
              </div>
            </FadeUp>
          </div>
        </div>

        {/* ─ 右: ブランドパネル (デスクトップのみ) ─ */}
        <div className="hidden flex-col justify-between border-l border-(--border) bg-(--bg) px-10 py-14 md:flex md:w-[45%] lg:px-14">

          {/* 上部: カテゴリラベル */}
          <div>
            <p className="label-en text-(--fg-subtle)">Hair Salon</p>
            <div className="mt-4 h-px w-10 bg-(--border)" />
          </div>

          {/* 中部: ブランド名 */}
          <div>
            <p className="label-en mb-5 text-(--fg-subtle)">Risplendere</p>

            {/* 大文字 "B" */}
            <p className="font-serif text-[6rem] font-bold leading-none text-(--fg) lg:text-[8rem]">
              B
            </p>

            {/* "ROLETTO" */}
            <p className="-mt-1 font-serif text-2xl font-bold uppercase tracking-[0.5em] text-(--fg-muted) lg:text-[1.75rem]">
              ROLETTO
            </p>

            {/* デコレーションライン */}
            <div className="mt-8 space-y-1.5">
              <div className="h-px w-full bg-(--border)" />
              <div className="h-px w-2/3 bg-(--border-light)" />
            </div>

            {/* キャッチコピー */}
            <p className="mt-6 text-xs leading-7 text-(--fg-subtle)">
              女性スタッフだけの<br />
              小さくて大切な場所
            </p>
          </div>

          {/* 下部: 場所情報 */}
          <div>
            <div className="mb-5 h-px w-full bg-(--border)" />
            <p className="label-en text-(--fg-subtle)">Niigata / Japan</p>
            <p className="mt-2.5 text-xs leading-6 text-(--fg-muted)">
              新潟市中央区本馬越<br />
              2丁目8番17号
            </p>
          </div>
        </div>

      </section>

      {/* ════════════════════════════════════════
          NEWS STRIP — 最新お知らせ
      ════════════════════════════════════════ */}
      {latestPosts.length > 0 && (
        <section className="border-b border-(--border) bg-(--bg)">
          <div className="mx-auto max-w-350">

            {/* ヘッダー行 */}
            <div className="flex items-center justify-between border-b border-(--border-light) px-6 py-3">
              <p className="label-en text-(--fg-subtle)">最新のお知らせ</p>
              <Link
                href="/news"
                className="label-en inline-flex items-center gap-1.5 text-(--fg-subtle) transition-colors hover:text-(--fg) hover:underline"
              >
                すべて見る
                <ArrowRight size={10} />
              </Link>
            </div>

            {/* 記事リスト */}
            <ul className="divide-y divide-(--border-light)">
              {latestPosts.map((post) => (
                <li key={post.id}>
                  <Link
                    href={`/news/${post.slug}`}
                    className="group flex items-center gap-4 px-6 py-3.5 transition-colors hover:bg-neutral-200 dark:hover:bg-neutral-800"
                  >
                    {post.publishedAt && (
                      <time className="shrink-0 text-sm sm:text-base font-medium tracking-none sm:tracking-wide text-(--fg-subtle)">
                        {fmtNewsStripDate(post.publishedAt)}
                      </time>
                    )}
                    <p className="min-w-0 flex-1 truncate text-sm sm:text-lg font-bold text-(--fg)">
                      {post.title}
                    </p>
                    <ArrowRight
                      size={12}
                      className="shrink-0 text-(--fg-subtle) transition-transform group-hover:translate-x-1"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ════════════════════════════════════════
          CONCEPT — salon-01 / salon-02 使用
          モバイル: salon-01フル幅 → テキスト
          デスクトップ: 左:2枚非対称グリッド / 右:テキスト
      ════════════════════════════════════════ */}
      <section id="concept" className="bg-(--bg-off)">

        {/* ─ モバイル: salon-01 フル幅ヘッダー画像 ─ */}
        <div className="relative h-56 overflow-hidden sm:h-72 md:hidden">
          <Image
            src="/images/salon/salon-01.jpg"
            alt="RISPLENDERE BROLETTOの店内"
            fill
            sizes="(min-width: 768px) 0px, 100vw"
            className="object-cover object-center"
            priority
          />
          {/* 下からのグラデーション */}
          <div className="absolute inset-0 bg-linear-to-t from-(--bg-off) via-transparent to-transparent" />
        </div>

        {/* ─ コンテンツ本体 ─ */}
        <div className="mx-auto max-w-350 px-6 pb-16 pt-8 md:grid md:grid-cols-[1fr_1.1fr] md:items-center md:gap-12 md:px-14 md:py-24 lg:gap-20 lg:py-32">

          {/* 左: 画像グリッド (デスクトップのみ) */}
          <FadeIn className="hidden md:block">
            <div className="grid grid-cols-[1.15fr_0.85fr] grid-rows-[auto_auto] gap-3">

              {/* salon-01: 左全高 */}
              <div className="row-span-2 overflow-hidden">
                <Image
                  src="/images/salon/salon-01.jpg"
                  alt="RISPLENDERE BROLETTOの店内"
                  width={720}
                  height={960}
                  sizes="(min-width: 1024px) 30vw, 40vw"
                  className="h-full w-full object-cover"
                  style={{ maxHeight: "520px" }}
                  priority
                />
              </div>

              {/* salon-02: 右上、下にオフセット */}
              <div className="mt-12 overflow-hidden">
                <Image
                  src="/images/salon/salon-02.jpg"
                  alt="RISPLENDERE BROLETTOの施術スペース"
                  width={480}
                  height={360}
                  sizes="(min-width: 1024px) 18vw, 25vw"
                  className="h-48 w-full object-cover lg:h-56"
                />
              </div>

              {/* CSSラインアクセント */}
              <div className="flex items-end pb-3 pl-3">
                <div className="flex flex-col gap-1.5">
                  <div className="h-px w-10 bg-(--border)" />
                  <div className="h-px w-6 bg-(--border-light)" />
                </div>
              </div>
            </div>
          </FadeIn>

          {/* 右: テキスト */}
          <FadeUp delay={0.1}>
            <span className="section-rule" />
            <p className="label-section">Concept</p>

            <h2 className="mt-5 text-3xl font-black leading-tight text-(--fg) md:text-4xl lg:text-5xl">
              ブロレット<span className="text-xl md:text-2xl lg:text-3xl">は、</span><br />
              キラキラ輝いて<br />
              帰れる場所。
            </h2>

            <p className="mt-6 text-sm leading-8 text-(--fg-body) md:text-base md:leading-9">
              サロン名「RISPLENDERE BROLETTO」はイタリア語で
              「キラキラ輝く小さな場所」という意味。ブロレットに訪れた方が
              輝いて帰れるよう、願いを込めてつけられた名前です。
            </p>
            <p className="mt-4 text-sm leading-8 text-(--fg-body) md:text-base md:leading-9">
              女性スタッフだけの小さなサロン。細やかな気配りで、
              すべてのお客様のご要望に応えられるサロンを目指しています。
            </p>

            {/* 言葉の意味ブロック */}
            <div className="mt-8 grid grid-cols-2 gap-3">
              <div className="border border-(--border) bg-(--card) p-4">
                <p className="label-en text-(--fg-subtle)">Risplendere</p>
                <p className="mt-2 text-xl font-black text-(--fg)">輝く</p>
                <p className="mt-1 text-xs text-(--fg-subtle)">キラキラ輝く</p>
              </div>
              <div className="border border-(--border) bg-(--card) p-4">
                <p className="label-en text-(--fg-subtle)">Broletto</p>
                <p className="mt-2 text-xl font-black text-(--fg)">場所</p>
                <p className="mt-1 text-xs text-(--fg-subtle)">小さな場所</p>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ════════════════════════════════════════
          PROMISE
      ════════════════════════════════════════ */}
      <section className="bg-(--bg-dark) px-6 py-8 text-white md:py-20 lg:py-32">
        <div className="mx-auto max-w-350">
          <FadeUp>
            <span className="section-rule section-rule--white" />
            <p className="label-en text-white/35">Promise</p>
            <h2 className="mt-5 text-2xl font-black text-white md:text-3xl lg:text-4xl">
              ブロレット<span className="text-lg md:text-xl lg:text-2xl">からの、</span>
              3つ<span className="text-lg md:text-xl lg:text-2xl">の</span>お約束
            </h2>
          </FadeUp>

          <StaggerList className="mt-6 grid gap-4 md:grid-cols-3 md:gap-5 lg:mt-14">
            {promises.map(({ number, title, text }) => (
              <StaggerItem key={number}>
                <article
                  className="promise-card relative h-full"
                  data-number={number}
                >
                  <div className="relative z-10 flex h-full flex-col">
                    <div className="flex items-center justify-between">
                      <p className="label-en text-white/30">{number}</p>
                      <p className="label-en text-white/20">Promise</p>
                    </div>
                    <h3 className="mt-4 text-lg font-black text-white md:text-xl">
                      {title}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-7 text-white/55">
                      {text}
                    </p>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </StaggerList>

          <FadeUp className="mt-10 flex justify-center">
            <Link
              href="/salon"
              className="label-en inline-flex items-center gap-2 border border-white/20 px-7 py-3.5 text-white/55 transition-all hover:border-white/50 hover:text-white"
            >
              サロン・会社情報を見る
              <ArrowRight size={12} />
            </Link>
          </FadeUp>
        </div>
      </section>

      {/* ════════════════════════════════════════
          MENU OVERVIEW
      ════════════════════════════════════════ */}
      <section id="menu" className="bg-(--bg) px-6 py-8 md:py-20 lg:py-32">
        <div className="mx-auto max-w-350">

          <FadeUp className="flex items-end justify-between gap-4">
            <div>
              <span className="section-rule" />
              <p className="label-section">Menu</p>
              <h2 className="mt-5 text-2xl font-black text-(--fg) md:text-3xl lg:text-4xl">
                メニュー
              </h2>
            </div>
            <Link
              href="/menu"
              className="label-en hidden shrink-0 items-center gap-2 border border-(--border) px-5 py-2.5 text-(--fg-subtle) transition-all hover:border-(--fg) hover:text-(--fg) sm:inline-flex"
            >
              全メニューを見る
              <ArrowRight size={12} />
            </Link>
          </FadeUp>

          <StaggerList className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:mt-12">
            {menuCategories.map(({ en, jp, from, note }) => (
              <StaggerItem key={en}>
                <Link
                  href="/menu"
                  className="group block border border-(--border) bg-(--card) p-5 transition-all hover:border-(--fg) md:p-7"
                >
                  <p className="label-en text-(--fg-subtle) transition-colors group-hover:text-(--fg)">
                    {en}
                  </p>
                  <p className="mt-2 text-base font-black text-(--fg) md:text-xl">
                    {jp}
                  </p>
                  <div className="mt-4 h-px w-full bg-(--border-light)" />
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-xs text-(--fg-subtle)">from</span>
                    <span className="text-lg font-black text-(--fg) md:text-2xl">
                      {from}
                    </span>
                    <span className="text-[10px] text-(--fg-subtle)">{note}</span>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerList>

          <FadeUp className="mt-6 sm:hidden">
            <Link
              href="/menu"
              className="label-en flex w-full items-center justify-center gap-2 border border-(--border) py-3.5 text-(--fg-subtle) transition-all hover:border-(--fg) hover:text-(--fg)"
            >
              全メニューを見る
              <ArrowRight size={12} />
            </Link>
          </FadeUp>
        </div>
      </section>

      {/* ════════════════════════════════════════
          SPECIAL SERVICES
      ════════════════════════════════════════ */}
      <section className="bg-(--bg-off) px-6 py-8 md:py-20 lg:py-32">
        <div className="mx-auto max-w-350">
          <FadeUp>
            <span className="section-rule" />
            <p className="label-section">Special Service</p>
            <h2 className="mt-5 text-2xl font-black text-(--fg) md:text-3xl lg:text-4xl">
              ブロレットだからできる、<br className="sm:hidden" />
              特別<span className="text-lg md:text-xl lg:text-2xl">な</span>こと。
            </h2>
          </FadeUp>

          <StaggerList className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 md:gap-4 lg:mt-12">
            {specials.map(({ label, text }) => (
              <StaggerItem key={label}>
                <div className="border border-(--border) bg-(--card) p-5 md:p-6">
                  <p className="label-en text-(--fg-subtle)">{label}</p>
                  <p className="mt-1 sm:mt-3 text-sm font-bold text-(--fg) leading-6">
                    {text}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerList>
        </div>
      </section>

      {/* ════════════════════════════════════════
          GALLERY
      ════════════════════════════════════════ */}
      <section className="bg-(--bg-dark) px-6 py-8 md:py-20 lg:py-32">
        <div className="mx-auto max-w-350">
          <FadeUp>
            <span className="section-rule section-rule--white" />
            <p className="label-en text-white/35">Gallery</p>
            <h2 className="mt-5 text-2xl font-black text-white md:text-3xl lg:text-4xl">
              スタイルギャラリー
            </h2>
          </FadeUp>

          <StaggerList className="mt-8 grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-3 lg:mt-12">
            {galleryImages.map(({ src, alt }) => (
              <StaggerItem key={src}>
                <Link href="/gallery" className="group block overflow-hidden">
                  <Image
                    src={src}
                    alt={alt}
                    width={480}
                    height={640}
                    sizes="(min-width: 768px) 25vw, 50vw"
                    className="h-48 w-full object-cover transition-transform duration-700 group-hover:scale-105 sm:h-60 md:h-72"
                  />
                </Link>
              </StaggerItem>
            ))}
          </StaggerList>

          <FadeUp delay={0.2} className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/gallery"
              className="label-en inline-flex items-center gap-2 bg-white px-7 py-3.5 text-black transition-opacity hover:opacity-80"
            >
              ギャラリーをすべて見る
              <ArrowRight size={12} />
            </Link>
            <a
              href={reservationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="label-en inline-flex items-center gap-2 border border-white/20 px-7 py-3.5 text-white/55 transition-all hover:border-white/50 hover:text-white"
            >
              Hot Pepperで予約
              <ArrowRight size={12} />
            </a>
          </FadeUp>
        </div>
      </section>

      {/* ════════════════════════════════════════
          JOURNAL
      ════════════════════════════════════════ */}
      <section className="bg-(--bg) px-6 py-8 md:py-20 lg:py-32">
        <div className="mx-auto max-w-350">
          <FadeUp className="flex items-end justify-between gap-4">
            <div>
              <span className="section-rule" />
              <p className="label-section">Journal</p>
              <h2 className="mt-5 text-2xl font-black text-(--fg) md:text-3xl">
                サロンからのお知らせ
              </h2>
            </div>
            <Link
              href="/news"
              className="label-en hidden shrink-0 items-center gap-2 border border-(--border) px-5 py-2.5 text-(--fg-subtle) transition-all hover:border-(--fg) hover:text-(--fg) sm:inline-flex"
            >
              一覧を見る
              <ArrowRight size={12} />
            </Link>
          </FadeUp>

          {latestPosts.length === 0 ? (
            <FadeIn className="mt-10 border border-dashed border-(--border) px-6 py-14 text-center">
              <p className="text-sm text-(--fg-subtle)">
                現在、公開中の記事はありません。
              </p>
            </FadeIn>
          ) : (
            <StaggerList className="mt-8 divide-y divide-(--border-light) lg:mt-12">
              {latestPosts.map((post, index) => (
                <StaggerItem key={post.id}>
                  <Link
                    href={`/news/${post.slug}`}
                    className="group flex flex-col gap-4 py-6 transition-opacity hover:opacity-60 sm:flex-row sm:items-start"
                  >
                    {/* サムネイル */}
                    <div className="h-24 w-full shrink-0 overflow-hidden sm:h-20 sm:w-32">
                      {post.coverImageUrl ? (
                        <img
                          src={post.coverImageUrl}
                          alt={post.title}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="h-full w-full bg-(--bg-off)" />
                      )}
                    </div>

                    {/* テキスト */}
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-3">
                        {index === 0 && (
                          <span className="label-en text-(--fg-subtle)">Latest</span>
                        )}
                        {post.publishedAt && (
                          <time className="text-xs text-(--fg-subtle)">
                            {new Date(post.publishedAt).toLocaleDateString("ja-JP", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </time>
                        )}
                      </div>
                      <h3 className="mt-2 text-base font-black text-(--fg) md:text-lg">
                        {post.title}
                      </h3>
                      <p className="mt-1.5 line-clamp-2 text-sm leading-6 text-(--fg-subtle)">
                        {post.excerpt ?? "詳細は記事ページでご覧ください。"}
                      </p>
                    </div>

                    <ChevronRight
                      size={16}
                      className="hidden shrink-0 self-center text-(--fg-subtle) transition-transform group-hover:translate-x-1 sm:block"
                    />
                  </Link>
                </StaggerItem>
              ))}
            </StaggerList>
          )}

          <FadeUp className="mt-6 sm:hidden">
            <Link
              href="/news"
              className="label-en flex w-full items-center justify-center gap-2 border border-(--border) py-3.5 text-(--fg-subtle) transition-all hover:border-(--fg) hover:text-(--fg)"
            >
              一覧を見る
              <ArrowRight size={12} />
            </Link>
          </FadeUp>
        </div>
      </section>

      {/* ════════════════════════════════════════
          JOIN US — 採用
      ════════════════════════════════════════ */}
      <section className="bg-(--bg-off) px-6 py-8 md:py-20 lg:py-32">
        <div className="mx-auto max-w-350">
          <div className="grid gap-10 md:grid-cols-[1.2fr_1fr] md:items-center md:gap-16 lg:gap-24">

            <FadeUp>
              <span className="section-rule" />
              <p className="label-section">Join Us</p>
              <h2 className="mt-5 text-2xl font-black text-(--fg) md:text-3xl lg:text-4xl">
                Broletto<span className="text-lg md:text-xl lg:text-2xl">で、</span><br />
                一緒<span className="text-lg md:text-xl lg:text-2xl">に</span>
                輝く場所<span className="text-lg md:text-xl lg:text-2xl">を作りませんか。</span>
              </h2>
              <p className="mt-5 text-sm leading-5 sm:leading-8 text-(--fg-subtle)">
                「髪に優しい。人に優しい。」を大切に、1人サロンから16年。
                女性スタッフだけのチームで、お客様と向き合い続けています。
                チームを支えてくれる仲間を募集中です。
              </p>
              <Link
                href="/recruit"
                className="label-en mt-8 inline-flex items-center gap-2 border border-(--border) px-3 sm:px-7 py-1.5 sm:py-3.5 text-(--fg-subtle) transition-all hover:border-(--fg) hover:text-(--fg)"
              >
                採用情報を詳しく見る
                <ArrowRight size={12} />
              </Link>
            </FadeUp>

            <FadeIn delay={0.1}>
              <ul className="space-y-3">
                {[
                  { label: "募集職種", value: "スタイリスト・アシスタント（ブランク・新卒歓迎）" },
                  { label: "給与",     value: "月給 182,000〜295,000円 + 各種手当" },
                  { label: "勤務",     value: "9:00〜17:00 / 完全週休2日制" },
                  { label: "サポート", value: "資格取得費用全額補助・残業手当1分単位" },
                ].map(({ label, value }) => (
                  <li key={label} className="grid grid-cols-[5.5rem_1fr] gap-3 border border-(--border) bg-(--card) px-5 py-2 sm:py-4">
                    <span className="label-en text-(--fg-subtle)">{label}</span>
                    <span className="text-sm text-(--fg)">{value}</span>
                  </li>
                ))}
              </ul>
            </FadeIn>

          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          ACCESS
      ════════════════════════════════════════ */}
      <section id="access" className="bg-(--bg-dark) px-6 py-8 text-white md:py-20 lg:py-32">
        <div className="mx-auto max-w-350">
          <FadeUp>
            <span className="section-rule section-rule--white" />
            <p className="label-en text-white/35">Access</p>
            <h2 className="mt-5 text-2xl font-black text-white md:text-3xl lg:text-4xl">
              店舗情報
            </h2>
          </FadeUp>

          <div className="mt-6 grid gap-10 md:grid-cols-2 lg:mt-10 lg:gap-16">

            {/* 情報 */}
            <FadeIn>
              <dl className="divide-y divide-white/50">
                {[
                  { icon: <MapPin size={14} />,      label: "住所",     value: "新潟県新潟市中央区本馬越2丁目8番17号" },
                  { icon: <Phone size={14} />,        label: "電話",     value: tel },
                  { icon: <Clock size={14} />,        label: "営業時間", value: "平日 9:15〜18:00\n日曜・祝日 10:00〜17:00" },
                  { icon: <CalendarDays size={14} />, label: "定休日",   value: "毎週月曜日・第3日曜日" },
                  { icon: <Car size={14} />,          label: "駐車場",   value: "店舗前3台 / 第二駐車場 8・10・11番" },
                  { icon: <CreditCard size={14} />,   label: "お支払い", value: "各種クレジットカード対応" },
                ].map(({ icon, label, value }) => (
                  <div key={label} className="flex gap-4 py-2 sm:py-4">
                    <div className="mt-0.5 shrink-0 text-white/30">{icon}</div>
                    <div className="grid flex-1 grid-cols-[4rem_1fr] gap-2">
                      <dt className="text-xs font-bold text-white/35">{label}</dt>
                      <dd className="whitespace-pre-line text-xs leading-6 text-white/65">
                        {value}
                      </dd>
                    </div>
                  </div>
                ))}
              </dl>

              <div className="mt-2 sm:mt-5 border border-white/40 p-4 text-xs leading-4 text-white">
                セブンイレブン本馬越店様向かい。ウオロク本馬越店の斜め前です。
              </div>

              {/* CTA */}
              <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-3">
                <a
                  href={reservationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="label-en bg-white py-2 sm:py-3.5 text-center text-black transition-opacity hover:opacity-75"
                >
                  Web予約
                </a>
                <a
                  href={`tel:${tel}`}
                  className="label-en border border-white/20 py-2 sm:py-3.5 text-center text-white/55 transition-all hover:border-white/50 hover:text-white"
                >
                  {tel}
                </a>
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="label-en border border-white/20 py-2 sm:py-3.5 text-center text-white/55 transition-all hover:border-white/50 hover:text-white"
                >
                  Instagram
                </a>
              </div>
            </FadeIn>

            {/* 地図 */}
            <FadeIn delay={0.1}>
              <div className="overflow-hidden border border-white/10">
                <div className="flex items-center justify-between border-b border-white/8 px-4 py-3">
                  <p className="text-xs font-bold text-white/50">周辺マップ</p>
                  <a
                    href={mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] text-white/30 transition-colors hover:text-white/60"
                  >
                    Google Mapで開く ↗
                  </a>
                </div>
                <iframe
                  title="RISPLENDERE BROLETTO の地図"
                  src={mapUrl}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-72 w-full md:h-85"
                  style={{ border: 0 }}
                  allowFullScreen
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <FloatingRecruitButton />
    </main>
  );
}
