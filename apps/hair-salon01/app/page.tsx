import Link from "next/link";
import Image from "next/image";
import { getPublishedPosts } from "@client-sites/lib/cms";
import {
  CalendarDays,
  Car,
  ChevronRight,
  Clock,
  CreditCard,
  Droplets,
  Leaf,
  MapPin,
  MessageCircle,
  Palette,
  Phone,
  Scissors,
  Sofa,
  Sparkles,
} from "lucide-react";
import { HeroBg } from "./components/hero-bg";
import { FadeUp, FadeIn, StaggerList, StaggerItem } from "./components/animated";

const reservationUrl = "https://beauty.hotpepper.jp/slnH000142482/";
const tel = "025-278-7274";

const stylists = [
  {
    name: "Stylist 01",
    role: "Hair Designer",
    image: "/images/stylist-01.jpg",
    text: "髪質・骨格・ライフスタイルに合わせて、毎日扱いやすいスタイルをご提案します。",
  },
  {
    name: "Stylist 02",
    role: "Care Specialist",
    image: "/images/stylist-02.jpg",
    text: "カラーやトリートメント、ヘッドスパまで、髪と頭皮にやさしい施術を大切にしています。",
  },
];

const menus = [
  { icon: <Scissors size={18} />, en: "Cut", jp: "カット", price: "¥5,400〜" },
  { icon: <Palette size={18} />, en: "Color", jp: "カラー", price: "要確認" },
  { icon: <Sparkles size={18} />, en: "Treatment", jp: "トリートメント", price: "要確認" },
  { icon: <Droplets size={18} />, en: "Head Spa", jp: "ヘッドスパ", price: "要確認" },
];

const features = [
  {
    icon: <MessageCircle />,
    title: "丁寧なカウンセリング",
    text: "髪質・悩み・普段のスタイリングまで確認し、無理のない提案を行います。",
  },
  {
    icon: <Leaf />,
    title: "髪にやさしい施術",
    text: "カラーやケアメニューでは、ダメージに配慮した施術を重視します。",
  },
  {
    icon: <Sofa />,
    title: "通いやすい空間",
    text: "セット面4席の落ち着いた規模感で、リラックスして過ごせる雰囲気です。",
  },
];

const styles = [
  "/images/style-01.jpg",
  "/images/style-02.jpg",
  "/images/style-03.jpg",
  "/images/style-04.jpg",
];

const SITE_ID = process.env.SITE_ID!;

export default async function Home() {
  const latestPosts = await getPublishedPosts(SITE_ID, 3);

  return (
    <main className="min-h-screen">

      {/* ── Hero ── */}
      <section className="relative overflow-hidden px-5 pb-10 pt-20 md:pb-16 md:pt-28">
        <HeroBg />

        <div className="relative mx-auto max-w-7xl">
          <div className="md:grid md:grid-cols-[0.95fr_1.05fr] md:items-center md:gap-10">
            <FadeUp>
              <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-[var(--accent-border)] bg-[var(--card)] px-3 py-1.5 text-xs font-bold text-[var(--accent)]">
                <Sparkles size={13} />
                新潟市中央区本馬越の美容室
              </p>

              <h1 className="text-3xl font-black leading-tight tracking-tight sm:text-4xl md:text-6xl lg:text-7xl">
                髪が整う。
                <br />
                <span className="text-2xl sm:text-3xl md:text-5xl">気分まで、軽くなる。</span>
              </h1>

              <p className="mt-3 text-sm leading-7 text-[var(--fg-hero)] md:mt-5 md:max-w-xl md:text-base md:leading-8">
                RISPLENDERE BROLETTOは、髪にやさしく、一人ひとりの雰囲気に寄り添う小さな美容室。
                カット・カラー・ケアを通して、自然に輝くヘアスタイルへ導きます。
              </p>

              <div className="mt-5 flex flex-col gap-2.5 sm:flex-row md:mt-7">
                <a
                  href={reservationUrl}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--cta)] px-6 py-3 text-sm font-bold text-white shadow-xl shadow-black/10 transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110 hover:shadow-2xl active:scale-95"
                >
                  Hot Pepperで予約
                  <ChevronRight size={16} />
                </a>
                <a
                  href={`tel:${tel}`}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--border)] bg-[var(--card)] px-6 py-3 text-sm font-bold transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--accent)] hover:bg-[var(--card-solid)]"
                >
                  <Phone size={15} />
                  電話する
                </a>
              </div>
            </FadeUp>

            {/* モバイル: 1枚 */}
            <FadeIn delay={0.15} className="mt-6 overflow-hidden rounded-3xl shadow-xl shadow-black/15 md:hidden">
              <Image
                src="/images/hero-01.jpg"
                alt="RISPLENDERE BROLETTOのサロンイメージ"
                width={720}
                height={480}
                className="h-56 w-full object-cover sm:h-72"
                priority
              />
            </FadeIn>

            {/* デスクトップ: 5カラムグリッド */}
            <FadeIn delay={0.15} className="hidden grid-cols-5 gap-3 md:grid">
              <div className="col-span-3 overflow-hidden rounded-[2.5rem] shadow-2xl shadow-black/20">
                <Image
                  src="/images/hero-01.jpg"
                  alt="RISPLENDERE BROLETTOのサロンイメージ"
                  width={720}
                  height={920}
                  className="h-115 w-full object-cover"
                  priority
                />
              </div>
              <div className="col-span-2 flex flex-col gap-3 pt-8">
                <div className="overflow-hidden rounded-4rem shadow-xl shadow-black/10">
                  <Image
                    src="/images/hero-02.jpg"
                    alt="ヘアスタイルイメージ"
                    width={420}
                    height={420}
                    className="h-48 w-full object-cover"
                  />
                </div>
                <div className="rounded-4xl bg-[var(--card-solid)] p-4 shadow-xl shadow-black/10">
                  <p className="text-xs font-bold text-[var(--accent-light)]">Cut price</p>
                  <p className="mt-0.5 text-2xl font-black">¥5,400</p>
                  <p className="mt-2 text-xs leading-5 text-[var(--fg-muted)]">
                    セット面4席。落ち着いた雰囲気のプライベートサロン。
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Concept ── */}
      <section id="concept" className="bg-[var(--bg-section)] px-5 py-10 md:py-16">
        <div className="mx-auto max-w-7xl">
          <FadeIn className="mb-6 overflow-hidden rounded-3xl md:hidden">
            <Image
              src="/images/salon-01.jpg"
              alt="店内写真"
              width={800}
              height={480}
              className="h-48 w-full object-cover sm:h-56"
              priority
            />
          </FadeIn>

          <div className="md:grid md:grid-cols-[0.8fr_1.2fr] md:items-center md:gap-10">
            <FadeIn className="hidden grid-cols-2 gap-3 md:grid">
              <Image
                src="/images/salon-01.jpg"
                alt="店内写真"
                width={520}
                height={680}
                className="h-80 rounded-4xl object-cover"
                priority
              />
              <Image
                src="/images/salon-02.jpg"
                alt="施術スペース"
                width={520}
                height={680}
                className="mt-12 h-80 rounded-4xl object-cover"
              />
            </FadeIn>

            <FadeUp delay={0.1}>
              <p className="text-xs font-black uppercase tracking-[0.35em] text-[var(--accent)]">
                Concept
              </p>
              <h2 className="mt-2 text-2xl font-black leading-tight md:text-4xl lg:text-5xl">
                キラキラ輝く、
                <br className="hidden sm:block" />
                小さな場所。
              </h2>
              <p className="mt-4 text-sm leading-6 text-[var(--fg-subtle)] md:text-base md:leading-8">
                RISPLENDERE BROLETTOは、イタリア語で「キラキラ輝く小さな場所」という意味。
                髪を綺麗にするだけでなく、来店後の気分まで明るくなるような時間を大切にしています。
              </p>
              <p className="mt-3 text-sm leading-7 text-[var(--fg-subtle)] md:text-base md:leading-8">
                大型店の慌ただしさではなく、丁寧なカウンセリングと落ち着いた空間で、
                一人ひとりに似合うスタイルを一緒に考えます。
              </p>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── Feature ── */}
      <section className="px-5 py-10 md:py-16">
        <div className="mx-auto max-w-7xl">
          <FadeUp>
            <p className="text-xs font-black uppercase tracking-[0.35em] text-[var(--accent)]">
              Feature
            </p>
            <h2 className="mt-2 text-2xl font-black md:text-4xl">
              BROLETTOが大切にしていること
            </h2>
          </FadeUp>

          <StaggerList className="mt-6 grid gap-3 md:grid-cols-3">
            {features.map(({ icon, title, text }) => (
              <StaggerItem key={title}>
                <article className="h-full rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 shadow-sm transition-all duration-200 hover:-translate-y-1.5 hover:border-[var(--accent-border)] hover:shadow-md md:p-6">
                  <div className="mb-3 flex items-center gap-3">
                    <div className="text-[var(--accent)] [&_svg]:size-5">{icon}</div>
                    <h3 className="text-base font-black md:text-lg">{title}</h3>
                  </div>
                  <p className="mt-2 text-xs leading-6 text-[var(--fg-muted)] md:text-sm md:leading-7">{text}</p>
                </article>
              </StaggerItem>
            ))}
          </StaggerList>
        </div>
      </section>

      {/* ── Stylists ── */}
      <section id="stylists" className="bg-[var(--bg-dark)] px-5 py-10 text-white md:py-16">
        <div className="mx-auto max-w-7xl">
          <FadeUp>
            <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.35em] text-[var(--accent-warm)]">
                  Stylists
                </p>
                <h2 className="mt-2 text-3xl font-black md:text-4xl">美容師紹介</h2>
              </div>
              <p className="text-sm leading-6 text-white/70 md:max-w-md">
                お客様の雰囲気や日常に合うヘアを、丁寧な対話から提案します。
              </p>
            </div>
          </FadeUp>

          <StaggerList className="grid gap-4 md:grid-cols-2">
            {stylists.map((stylist) => (
              <StaggerItem key={stylist.name}>
                <article className="flex overflow-hidden rounded-2xl bg-[var(--bg-section)] text-[var(--fg)] transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/20 md:grid md:grid-cols-[0.9fr_1.1fr] md:rounded-[2rem]">
                  <Image
                    src={stylist.image}
                    alt={`${stylist.name}の写真`}
                    width={520}
                    height={640}
                    className="h-32 w-28 shrink-0 object-cover sm:h-40 sm:w-36 md:h-full md:w-full"
                  />
                  <div className="flex flex-col justify-center p-4 md:p-6">
                    <p className="text-xs font-bold uppercase tracking-[0.25em] text-[var(--accent)]">
                      {stylist.role}
                    </p>
                    <h3 className="mt-1.5 text-lg font-black md:text-2xl">{stylist.name}</h3>
                    <p className="mt-2 text-xs leading-6 text-[var(--fg-muted)] md:text-sm md:leading-7">
                      {stylist.text}
                    </p>
                    <a
                      href={reservationUrl}
                      className="mt-3 inline-flex items-center gap-1.5 self-start rounded-full bg-[var(--cta)] px-4 py-2 text-xs font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110 active:scale-95 md:mt-5 md:px-5 md:py-2.5 md:text-sm"
                    >
                      指名予約を見る
                      <ChevronRight size={13} />
                    </a>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </StaggerList>
        </div>
      </section>

      {/* ── Style Gallery ── */}
      <section className="bg-[var(--bg-section)] px-5 py-10 md:py-16">
        <div className="mx-auto max-w-7xl">
          <FadeUp>
            <p className="text-xs font-black uppercase tracking-[0.35em] text-[var(--accent)]">
              Hair Style
            </p>
            <h2 className="mt-2 text-3xl font-black md:text-4xl">スタイルギャラリー</h2>
          </FadeUp>

          <StaggerList className="mt-5 grid grid-cols-2 gap-2.5 md:grid-cols-4 md:gap-3">
            {styles.map((src, index) => (
              <StaggerItem key={src} className="overflow-hidden rounded-xl md:rounded-2xl">
                <Image
                  src={src}
                  alt={`ヘアスタイル例 ${index + 1}`}
                  width={420}
                  height={560}
                  className="h-36 w-full object-cover transition-transform duration-500 hover:scale-105 sm:h-48 md:h-64"
                />
              </StaggerItem>
            ))}
          </StaggerList>
        </div>
      </section>

      {/* ── Menu ── */}
      <section id="menu" className="px-5 py-10 md:py-16">
        <div className="mx-auto max-w-3xl">
          <FadeUp>
            <p className="text-center text-xs font-black uppercase tracking-[0.35em] text-[var(--accent)]">
              Menu
            </p>
            <h2 className="mt-2 text-center text-3xl font-black md:text-4xl">メニュー</h2>
          </FadeUp>

          <FadeUp delay={0.1} className="mt-6 overflow-hidden rounded-2xl bg-[var(--bg-section)] shadow-xl shadow-black/5">
            {menus.map(({ icon, en, jp, price }) => (
              <div
                key={en}
                className="flex items-center gap-3 border-b border-[var(--border-light)] px-4 py-3.5 transition-colors duration-150 last:border-b-0 hover:bg-[var(--card)] md:px-5 md:py-4"
              >
                <div className="text-[var(--accent)]">{icon}</div>
                <p className="w-20 text-base font-black md:w-28 md:text-xl">{en}</p>
                <p className="flex-1 text-xs text-[var(--fg-muted)] md:text-sm">{jp}</p>
                <p className="text-xs font-black text-[var(--accent-light)] md:text-sm">{price}</p>
              </div>
            ))}
          </FadeUp>

          <p className="mt-3 text-center text-xs text-[var(--fg-muted)]">
            詳細料金・クーポン・空席状況はHot Pepper Beautyをご確認ください。
          </p>
        </div>
      </section>

      {/* ── News Guide ── */}
      <section className="bg-[var(--bg-section)] px-5 py-10 md:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="overflow-hidden rounded-4xl border border-[var(--border)] bg-[linear-gradient(135deg,rgba(255,255,255,0.92),rgba(245,236,227,0.92))] shadow-[0_24px_60px_-40px_rgba(44,36,31,0.45)]">
            <div className="grid gap-8 px-6 py-7 md:grid-cols-[0.85fr_1.15fr] md:px-8 md:py-9">
              <FadeUp>
                <p className="text-xs font-black uppercase tracking-[0.35em] text-[var(--accent)]">
                  Journal
                </p>
                <h2 className="mt-2 text-3xl font-black leading-tight md:text-4xl">
                  サロンのお知らせや
                  <br />
                  日々のことをまとめています。
                </h2>
                <p className="mt-4 max-w-md text-sm leading-7 text-[var(--fg-subtle)] md:text-base md:leading-8">
                  営業日のお知らせ、ヘアケアの話題、新しいスタイル提案など、
                  BROLETTOからの発信を一覧でご覧いただけます。
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/news"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--cta)] px-6 py-3 text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110"
                  >
                    ブログ一覧を見る
                    <ChevronRight size={16} />
                  </Link>
                  <a
                    href={reservationUrl}
                    className="inline-flex items-center justify-center rounded-full border border-[var(--border)] px-6 py-3 text-sm font-bold transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--accent)]"
                  >
                    ご予約はこちら
                  </a>
                </div>
              </FadeUp>

              <div className="grid gap-3">
                {latestPosts.length === 0 ? (
                  <div className="rounded-[1.6rem] border border-dashed border-[var(--accent-border)] bg-[var(--card)] px-5 py-8 text-sm text-[var(--fg-subtle)]">
                    現在、公開中の記事はありません。更新後にこちらへ表示されます。
                  </div>
                ) : (
                  latestPosts.map((post, index) => (
                    <Link
                      key={post.id}
                      href={`/news/${post.slug}`}
                      className="group rounded-[1.6rem] border border-[var(--border)] bg-white/75 p-4 transition-all duration-200 hover:-translate-y-1 hover:border-[var(--accent-border)] hover:shadow-lg hover:shadow-black/5 md:p-5"
                    >
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                        {post.coverImageUrl ? (
                          <img
                            src={post.coverImageUrl}
                            alt={post.title}
                            className="h-24 w-full rounded-2xl object-cover sm:w-36"
                          />
                        ) : (
                          <div className="flex h-24 w-full items-center justify-center rounded-2xl bg-[var(--card)] text-[var(--accent)] sm:w-36">
                            <Sparkles size={18} />
                          </div>
                        )}
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="rounded-full bg-[var(--bg)] px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.22em] text-[var(--accent)]">
                              {index === 0 ? "Latest" : "News"}
                            </span>
                            <time className="text-xs text-[var(--fg-subtle)]">
                              {post.publishedAt
                                ? new Date(post.publishedAt).toLocaleDateString("ja-JP", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  })
                                : ""}
                            </time>
                          </div>
                          <h3 className="mt-3 text-base font-black text-[var(--fg)] transition-colors group-hover:text-[var(--accent)] md:text-lg">
                            {post.title}
                          </h3>
                          <p className="mt-2 line-clamp-2 text-sm leading-6 text-[var(--fg-subtle)]">
                            {post.excerpt || "詳細は記事ページでご覧ください。"}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Access ── */}
      <section id="access" className="bg-[var(--bg-dark)] px-5 py-10 text-white md:py-16">
        <div className="mx-auto max-w-7xl md:grid md:grid-cols-[1fr_1fr] md:gap-10">
          <FadeIn>
            <p className="text-xs font-black uppercase tracking-[0.35em] text-[var(--accent-warm)]">
              Access
            </p>
            <h2 className="mt-2 text-3xl font-black md:text-4xl">店舗情報</h2>

            <dl className="mt-5 grid gap-2 md:mt-7">
              {[
                ["住所", "新潟県新潟市中央区本馬越2丁目8番17号"],
                ["営業時間", "火〜土 9:15〜17:00 / 日・祝 10:00〜17:00"],
                ["定休日", "毎週月曜日・第3日曜日"],
                ["席数", "セット面4席"],
                ["駐車場", "店舗前3台 / 第二駐車場 8・10・11番"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="grid gap-0.5 border-b border-white/10 pb-2 md:grid-cols-[8rem_1fr] md:gap-2 md:pb-3"
                >
                  <dt className="text-xs font-bold text-[var(--accent-warm)] md:text-sm">{label}</dt>
                  <dd className="text-xs leading-6 text-white/80 md:text-sm">{value}</dd>
                </div>
              ))}
            </dl>
          </FadeIn>

          <FadeIn delay={0.1} className="mt-7 rounded-2xl bg-[var(--bg-section)] p-5 text-[var(--fg)] md:mt-0 md:p-6">
            <div className="space-y-4 md:space-y-5">
              <Info icon={<MapPin />} title="アクセス">
                セブンイレブン本馬越店様向かい。ウオロク本馬越店の斜め前です。
              </Info>
              <Info icon={<Car />} title="駐車場">
                店舗前に3台分。第二駐車場は8・10・11番をご利用ください。
              </Info>
              <Info icon={<Clock />} title="営業時間">
                火〜土 9:15〜17:00、日・祝 10:00〜17:00。
              </Info>
              <Info icon={<CalendarDays />} title="定休日">
                毎週月曜日・第3日曜日。
              </Info>
              <Info icon={<CreditCard />} title="お支払い">
                各種クレジットカード対応。
              </Info>
            </div>

            <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
              <a
                href={reservationUrl}
                className="rounded-full bg-[var(--cta)] px-5 py-3 text-center text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110"
              >
                Web予約
              </a>
              <a
                href={`tel:${tel}`}
                className="rounded-full border border-[var(--border)] px-5 py-3 text-center text-sm font-bold transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--accent)]"
              >
                {tel}
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}

function Info({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-3">
      <div className="mt-0.5 text-[var(--accent)] [&_svg]:size-4">{icon}</div>
      <div>
        <h3 className="text-xs font-black md:text-sm">{title}</h3>
        <p className="mt-0.5 text-xs leading-5 text-[var(--fg-muted)] md:leading-6">{children}</p>
      </div>
    </div>
  );
}
