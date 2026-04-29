import Image from "next/image";
import { HeroBg } from "./components/hero-bg";
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

export default function Home() {
  return (
    <main className="min-h-screen">

      {/* ── Hero ── */}
      <section className="relative overflow-hidden px-5 pb-10 pt-20 md:pb-16 md:pt-28">
        <HeroBg />

        <div className="relative mx-auto max-w-7xl">
          <div className="md:grid md:grid-cols-[0.95fr_1.05fr] md:items-center md:gap-10">
            <div>
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
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--cta)] px-6 py-3 text-sm font-bold text-white shadow-xl shadow-black/10"
                >
                  Hot Pepperで予約
                  <ChevronRight size={16} />
                </a>
                <a
                  href={`tel:${tel}`}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--border)] bg-[var(--card)] px-6 py-3 text-sm font-bold"
                >
                  <Phone size={15} />
                  電話する
                </a>
              </div>
            </div>

            {/* モバイル: 1枚 */}
            <div className="mt-6 overflow-hidden rounded-3xl shadow-xl shadow-black/15 md:hidden">
              <Image
                src="/images/hero-01.jpg"
                alt="RISPLENDERE BROLETTOのサロンイメージ"
                width={720}
                height={480}
                className="h-56 w-full object-cover sm:h-72"
                priority
              />
            </div>

            {/* デスクトップ: 5カラムグリッド */}
            <div className="hidden grid-cols-5 gap-3 md:grid">
              <div className="col-span-3 overflow-hidden rounded-[2.5rem] shadow-2xl shadow-black/20">
                <Image
                  src="/images/hero-01.jpg"
                  alt="RISPLENDERE BROLETTOのサロンイメージ"
                  width={720}
                  height={920}
                  className="h-[460px] w-full object-cover"
                  priority
                />
              </div>
              <div className="col-span-2 flex flex-col gap-3 pt-8">
                <div className="overflow-hidden rounded-[2rem] shadow-xl shadow-black/10">
                  <Image
                    src="/images/hero-02.jpg"
                    alt="ヘアスタイルイメージ"
                    width={420}
                    height={420}
                    className="h-48 w-full object-cover"
                  />
                </div>
                <div className="rounded-[2rem] bg-[var(--card-solid)] p-4 shadow-xl shadow-black/10">
                  <p className="text-xs font-bold text-[var(--accent-light)]">Cut price</p>
                  <p className="mt-0.5 text-2xl font-black">¥5,400</p>
                  <p className="mt-2 text-xs leading-5 text-[var(--fg-muted)]">
                    セット面4席。落ち着いた雰囲気のプライベートサロン。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Concept ── */}
      <section id="concept" className="bg-[var(--bg-section)] px-5 py-10 md:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 overflow-hidden rounded-3xl md:hidden">
            <Image
              src="/images/salon-01.jpg"
              alt="店内写真"
              width={800}
              height={480}
              className="h-48 w-full object-cover sm:h-56"
            />
          </div>

          <div className="md:grid md:grid-cols-[0.8fr_1.2fr] md:items-center md:gap-10">
            <div className="hidden grid-cols-2 gap-3 md:grid">
              <Image
                src="/images/salon-01.jpg"
                alt="店内写真"
                width={520}
                height={680}
                className="h-[320px] rounded-[2rem] object-cover"
              />
              <Image
                src="/images/salon-02.jpg"
                alt="施術スペース"
                width={520}
                height={680}
                className="mt-12 h-80 rounded-4xl object-cover"
              />
            </div>

            <div>
              <p className="text-xs font-black uppercase tracking-[0.35em] text-[var(--accent)]">
                Concept
              </p>
              <h2 className="mt-2 text-2xl font-black leading-tight md:text-4xl lg:text-5xl">
                キラキラ輝く、
                <br className="hidden sm:block"/>
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
            </div>
          </div>
        </div>
      </section>

      {/* ── Feature ── */}
      <section className="px-5 py-10 md:py-16">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-black uppercase tracking-[0.35em] text-[var(--accent)]">
            Feature
          </p>
          <h2 className="mt-2 text-2xl font-black md:text-4xl">
            BROLETTOが大切にしていること
          </h2>

          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {features.map(({ icon, title, text }) => (
              <article
                key={title}
                className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 shadow-sm md:p-6"
              >
                <div className="flex items-center gap-3 mb-3">
                <div className="text-[var(--accent)] [&_svg]:size-5">{icon}</div>
                <h3 className="text-base font-black md:text-lg">{title}</h3>
                </div>
                <p className="mt-2 text-xs leading-6 text-[var(--fg-muted)] md:text-sm md:leading-7">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stylists ── */}
      <section id="stylists" className="bg-[var(--bg-dark)] px-5 py-10 text-white md:py-16">
        <div className="mx-auto max-w-7xl">
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

          <div className="grid gap-4 md:grid-cols-2">
            {stylists.map((stylist) => (
              <article
                key={stylist.name}
                className="flex overflow-hidden rounded-2xl bg-[var(--bg-section)] text-[var(--fg)] md:grid md:grid-cols-[0.9fr_1.1fr] md:rounded-[2rem]"
              >
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
                    className="mt-3 inline-flex items-center gap-1.5 self-start rounded-full bg-[var(--cta)] px-4 py-2 text-xs font-bold text-white md:mt-5 md:px-5 md:py-2.5 md:text-sm"
                  >
                    指名予約を見る
                    <ChevronRight size={13} />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Style Gallery ── */}
      <section className="bg-[var(--bg-section)] px-5 py-10 md:py-16">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-black uppercase tracking-[0.35em] text-[var(--accent)]">
            Hair Style
          </p>
          <h2 className="mt-2 text-3xl font-black md:text-4xl">スタイルギャラリー</h2>

          <div className="mt-5 grid grid-cols-2 gap-2.5 md:grid-cols-4 md:gap-3">
            {styles.map((src, index) => (
              <Image
                key={src}
                src={src}
                alt={`ヘアスタイル例 ${index + 1}`}
                width={420}
                height={560}
                className="h-36 w-full rounded-xl object-cover sm:h-48 md:h-64 md:rounded-2xl"
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Menu ── */}
      <section id="menu" className="px-5 py-10 md:py-16">
        <div className="mx-auto max-w-3xl">
          <p className="text-center text-xs font-black uppercase tracking-[0.35em] text-[var(--accent)]">
            Menu
          </p>
          <h2 className="mt-2 text-center text-3xl font-black md:text-4xl">メニュー</h2>

          <div className="mt-6 overflow-hidden rounded-2xl bg-[var(--bg-section)] shadow-xl shadow-black/5">
            {menus.map(({ icon, en, jp, price }) => (
              <div
                key={en}
                className="flex items-center gap-3 border-b border-[var(--border-light)] px-4 py-3.5 last:border-b-0 md:px-5 md:py-4"
              >
                <div className="text-[var(--accent)]">{icon}</div>
                <p className="w-20 text-base font-black md:w-28 md:text-xl">{en}</p>
                <p className="flex-1 text-xs text-[var(--fg-muted)] md:text-sm">{jp}</p>
                <p className="text-xs font-black text-[var(--accent-light)] md:text-sm">{price}</p>
              </div>
            ))}
          </div>

          <p className="mt-3 text-center text-xs text-[var(--fg-muted)]">
            詳細料金・クーポン・空席状況はHot Pepper Beautyをご確認ください。
          </p>
        </div>
      </section>

      {/* ── Access ── */}
      <section id="access" className="bg-[var(--bg-dark)] px-5 py-10 text-white md:py-16">
        <div className="mx-auto max-w-7xl md:grid md:grid-cols-[1fr_1fr] md:gap-10">
          <div>
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
          </div>

          <div className="mt-7 rounded-2xl bg-[var(--bg-section)] p-5 text-[var(--fg)] md:mt-0 md:p-6">
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
                className="rounded-full bg-[var(--cta)] px-5 py-3 text-center text-sm font-bold text-white"
              >
                Web予約
              </a>
              <a
                href={`tel:${tel}`}
                className="rounded-full border border-[var(--border)] px-5 py-3 text-center text-sm font-bold"
              >
                {tel}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-[var(--bg-darkest)] px-5 py-5 text-white/70 md:py-6">
        <div className="mx-auto flex max-w-7xl flex-col gap-1.5 md:flex-row md:items-center md:justify-between">
          <p className="text-base font-black tracking-[0.2em] text-white md:text-lg">
            RISPLENDERE BROLETTO
          </p>
          <p className="text-xs">© RISPLENDERE BROLETTO. All Rights Reserved.</p>
        </div>
      </footer>
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
