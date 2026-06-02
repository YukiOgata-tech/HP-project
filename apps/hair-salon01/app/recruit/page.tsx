import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { FadeUp, FadeIn, StaggerList, StaggerItem } from "../components/animated";
import { ApplicationForm } from "./components/ApplicationForm";
import { FloatingApplyButton } from "./components/FloatingApplyButton";

export const metadata: Metadata = {
  title: "採用情報 | RISPLENDERE BROLETTO",
  description:
    "RISPLENDERE BROLETTO の採用情報。スタイリスト・アシスタント募集中。新潟市中央区の3階建て多機能サロンで、女性スタッフだけのチームで働きませんか。",
};

const reservationUrl = "https://beauty.hotpepper.jp/slnH000142482/";

/* ── データ ──────────────────────────────────── */

const points = [
  {
    number: "01",
    title: "寄り添うカウンセリング",
    body: "しっかり聞くことから始まる、オーダーメイドの綺麗。技術前に常連客・初客問わず髪型や頭皮状態をじっくりカウンセリング。ホームケアアドバイスで、365日の美を二人三脚で実現します。",
  },
  {
    number: "02",
    title: "チーム制の魅力",
    body: "あなたの得意が誰かの力になる。各スタッフの得意分野を活かし合うことで、1人担当より高い満足度を実現。急な体調不良時も他スタイリストがしっかりカバーします。",
  },
  {
    number: "03",
    title: "お店が応援する資格・練習体制",
    body: "MILBONカラーソムリエは4名取得済み。資格取得費用は全額会社負担。全体練習なし、自主練習は大歓迎。自分のペースでスキルを伸ばせる環境です。",
  },
  {
    number: "04",
    title: "3階建て多機能空間",
    body: "1階にお子様個室・スパルーム個室、2階に通常サロン、3階に半個室を完備。様々な年代・ライフスタイルのお客様に対応できるため、幅広い技術と経験が積めます。",
  },
  {
    number: "05",
    title: "働きやすい文化",
    body: "17時半退社でプライベート重視。ママスタッフへの急な対応時は「ごめんなさい」ではなく「ありがとう」の文化。1分から残業手当が発生し、サポートへの貢献はきちんと給与に還元されます。",
  },
];

const staff = [
  {
    name: "鶴巻 麗奈",
    role: "オーナー",
    tenure: "",
    image: "/images/recruit/staff-tsurumaki-sq.jpg",
    comment: "お客様自身の気づいていなかった悩みも解決し、なりたかったスタイルに近づけるよう施術させて頂きます。",
    skills: [],
  },
  {
    name: "袖山 亜紀子",
    role: "店長",
    tenure: "在籍14年",
    image: "/images/recruit/staff-sodeyama-sq.jpg",
    comment: "ヘアケアマイスター・着付師免許保有。着物屋勤務経験を活かし、着付けからデザインカラーまで幅広く対応しています。",
    skills: ["カット（切りっぱなしボブ）", "デザインカラー", "着付け"],
  },
  {
    name: "田中 莉瑚",
    role: "スタイリスト",
    tenure: "",
    image: null,
    comment: "美容着付師免許・パーソナルカラリスト資格保有。お着付け全般とヘアセットを得意としています。",
    skills: ["お着付け全般", "ヘアセット"],
  },
  {
    name: "猪股 久美",
    role: "スタイリスト",
    tenure: "在籍3年半",
    image: "/images/recruit/staff-inomata-sq.jpg",
    comment: "ご来店中も、日常の忙しさから解放されゆったりとした時間をお過ごしいただけるよう心がけています。",
    skills: ["縮毛矯正", "ヘッドスパ"],
  },
  {
    name: "稲吉 春香",
    role: "ケアリスト",
    tenure: "",
    image: null,
    comment: "エステ・マッサージの経験を活かし、頭皮ケアやリラクゼーションの施術を担当しています。",
    skills: ["頭皮ケア", "マッサージ"],
  },
];

const wants = [
  "お客様との会話が好きで、思いやりある接客ができる方",
  "美容が好きな方",
  "ヘアセット・着付けができる方（大歓迎）",
  "チームで支え合いながら働きたい方",
  "長く働ける美容室を探している方",
  "ブロレットらしさに共感してくれる方",
];

const flow = [
  { step: "01", label: "応募" },
  { step: "02", label: "サロン見学" },
  { step: "03", label: "スタッフとの\nコミュニケーション" },
  { step: "04", label: "履歴書・\n質疑応答" },
  { step: "05", label: "面接" },
  { step: "06", label: "採用" },
];

const conditions = [
  { label: "職種",     value: "スタイリスト / アシスタント / ブランク歓迎 / 新卒対応" },
  { label: "雇用形態", value: "正社員 / パート・アルバイト / インターン" },
  { label: "給与",     value: "月給 182,000円〜295,000円（各種手当別途）" },
  { label: "就業時間", value: "9:00〜17:00（所定8時間・休憩60分）" },
  { label: "休日",     value: "完全週休2日制（土日いずれか勤務、第3日曜定休）" },
  { label: "試用期間", value: "3〜6ヶ月" },
  { label: "各種手当", value: "店長手当・材料管理手当・着付け師手当・皆勤手当・土曜手当・残業手当（1分単位）" },
  { label: "福利厚生", value: "社会保険完備、健康診断、結婚・出産祝い金、資格取得費用全額補助、社員割引、全面禁煙" },
];

/* ══════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════ */

const jobPostingSchema = {
  "@context": "https://schema.org",
  "@type": "JobPosting",
  title: "美容師（スタイリスト・アシスタント）",
  description:
    "新潟市中央区本馬越の美容室 RISPLENDERE BROLETTO でのスタイリスト・アシスタント募集。女性スタッフだけの3階建て多機能サロン。資格取得費用全額補助、1分単位の残業手当、完全週休2日制。チームで助け合う働きやすい環境です。",
  datePosted: "2026-05-01",
  validThrough: "2026-12-31",
  employmentType: ["FULL_TIME", "PART_TIME", "OTHER"],
  hiringOrganization: {
    "@type": "Organization",
    name: "株式会社リスプレンデレブロレット",
    sameAs: process.env.NEXT_PUBLIC_SITE_URL ?? "",
  },
  jobLocation: {
    "@type": "Place",
    address: {
      "@type": "PostalAddress",
      streetAddress: "本馬越2丁目8番17号",
      addressLocality: "新潟市中央区",
      addressRegion: "新潟県",
      postalCode: "950-0865",
      addressCountry: "JP",
    },
  },
  baseSalary: {
    "@type": "MonetaryAmount",
    currency: "JPY",
    value: {
      "@type": "QuantitativeValue",
      minValue: 182000,
      maxValue: 295000,
      unitText: "MONTH",
    },
  },
  workHours: "9:00〜17:00（所定8時間）",
  jobBenefits:
    "社会保険完備、健康診断、結婚・出産祝い金、資格取得費用全額補助、社員割引、残業手当（1分単位）、各種手当",
  qualifications: "美容師免許（取得見込み可）",
  responsibilities: "美容業務全般（カット・カラー・パーマ・ヘッドスパ・着付けなど）",
  industry: "美容・理容",
};

export default function RecruitPage() {
  return (
    <main className="bg-(--bg)">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jobPostingSchema) }}
      />

      {/* ════════════════════════════════════════
          ページヘッダー
      ════════════════════════════════════════ */}
      <section className="border-b border-(--border) bg-(--bg-dark)">
        <div className="mx-auto max-w-350 px-6 py-8 sm:t-24 md:pb-20 md:pt-36">
          <FadeUp>
            <Link
              href="/"
              className="label-en mb-6 inline-flex items-center gap-2 text-white/40 transition-colors hover:text-white/70"
            >
              <ArrowLeft size={12} />
              Back to Home
            </Link>
            <span className="section-rule section-rule--white block" />
            <p className="label-section text-white/35">Recruit</p>
            <h1 className="mt-5 font-serif text-4xl font-bold text-white md:text-5xl lg:text-6xl">
              採用情報
            </h1>
            <p className="mt-4 label-en text-white/30">髪に優しい。人に優しい。</p>

            <p className="mt-5 max-w-2xl text-sm leading-5 sm:leading-8 text-white/55">
              1人サロンから16年。女性が働きやすい、スタッフで助け合う5人サロンへ。<br />
              お客様もスタッフも、信頼と思いやりで居心地よく。心も体もストレスフリー。
            </p>

            <div className="mt-4 sm:mt-10 inline-block border border-white/15 bg-white/5 px-6 py-4">
              <p className="label-en text-white/35">Now Hiring</p>
              <p className="mt-1 text-sm font-bold text-white">
                スタイリスト・アシスタント 募集!
              </p>
              <p className="mt-1 text-xs text-white/65">
                スタッフ退社に伴う欠員補充 / 正社員・パート・アルバイト対応
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ════════════════════════════════════════
          オーナーストーリー
      ════════════════════════════════════════ */}
      <section className="bg-(--bg) px-6 py-8 md:py-20">
        <div className="mx-auto max-w-350">
          <div className="grid gap-10 md:grid-cols-2 md:gap-16 lg:gap-24">
            <FadeUp>
              <span className="section-rule block" />
              <p className="label-section">Owner's Story</p>
              <h2 className="mt-5 text-2xl font-black leading-tight text-(--fg) md:text-3xl lg:text-4xl">
                1人サロンから、16年が経ち。
              </h2>
              <div className="mt-6 space-y-4 text-sm leading-6 sm:leading-8 text-(--fg-subtle) font-medium">
                <p>美容学校卒業後、とにかく美容師の仕事が大好きで美容室という空間が大好きで、1人でサロンをスタート。やがて予約が数ヶ月待ちになり、「自分のエゴでお客様の綺麗になりたい時期を遅らせてしまっている」と気づいたことが、チームを作るきっかけになりました。</p>
                <p>結婚・出産を経て、ライフステージが変わってもスタッフが働きやすい環境づくりを続け、現在は女性5名のチームサロンへ。</p>
              </div>
            </FadeUp>
            <FadeIn delay={0.1}>
              <div className="border border-(--border) bg-(--card) p-6 md:p-10">
                <span className="section-rule block" />
                <p className="label-section">Philosophy</p>
                <blockquote className="mt-5 font-serif text-2xl font-bold leading-snug text-(--fg) md:text-3xl">
                  「スタッフ<span className="text-lg md:text-xl">が</span>幸せだから、<br />お客様も幸せ<span className="text-lg md:text-xl">に</span>なれる」
                </blockquote>
                <p className="mt-6 text-sm leading-8 text-(--fg-subtle)">
                  オンオフの実現は、スタッフ同士とお客様との強い信頼関係があってこそ。身体と心にゆとりがあるから、もっと優しくなれる。そんな居心地の良い空間を、一緒に守れる方を求めています。
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          5つのポイント
      ════════════════════════════════════════ */}
      <section className="bg-(--bg-off) px-6 py-8 md:py-20 lg:py-32">
        <div className="mx-auto max-w-350">
          <FadeUp>
            <span className="section-rule block" />
            <p className="label-section">Why Broletto</p>
            <h2 className="mt-5 text-2xl font-black text-(--fg) md:text-3xl lg:text-4xl">
              ブロレットで働く、<br className="sm:hidden" />5つの理由。
            </h2>
          </FadeUp>

          <StaggerList className="mt-4 sm:mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:mt-14">
            {points.map(({ number, title, body }) => (
              <StaggerItem key={number}>
                <article className="promise-card relative h-full border border-(--border) bg-(--card) p-7" data-number={number}>
                  <div className="relative z-10 flex h-full flex-col">
                    <div className="flex items-baseline gap-3">
                      <p className="label-en shrink-0 text-(--fg-subtle)">{number}</p>
                      <h3 className="text-lg font-black leading-snug text-(--fg)">{title}</h3>
                    </div>
                    <div className="mt-3 h-px w-full bg-(--border)" />
                    <p className="mt-2 sm:mt-4 flex-1 text-sm leading-7 text-(--fg-subtle) font-medium">
                      {body}
                    </p>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </StaggerList>
        </div>
      </section>

      {/* ════════════════════════════════════════
          スタッフ紹介
      ════════════════════════════════════════ */}
      <section className="bg-(--bg) px-6 py-8 md:py-20 lg:py-32">
        <div className="mx-auto max-w-350">
          <FadeUp>
            <span className="section-rule block" />
            <p className="label-section">Our Team</p>
            <h2 className="mt-5 text-2xl font-black text-(--fg) md:text-3xl lg:text-4xl">
              一緒に働く仲間たち。
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-(--fg-subtle)">
              それぞれの得意を持ち寄り、チームとしてお客様に向き合っています。
            </p>
          </FadeUp>

          {/* モバイル: 横スクロール / md以上: グリッド */}
          <div className="-mx-6 mt-6 sm:mt-10 overflow-x-auto px-6 pb-4 md:mx-0 md:overflow-visible md:px-0 md:pb-0 lg:mt-12">
            <StaggerList className="flex gap-4 md:grid md:grid-cols-3 xl:grid-cols-5">
              {staff.map(({ name, role, tenure, image, comment, skills }) => (
                <StaggerItem key={name}>
                  <div className="flex h-full w-56 shrink-0 flex-col overflow-hidden border border-(--border) bg-(--card) md:w-auto">

                    {/* 写真 */}
                    <div className="relative aspect-square overflow-hidden bg-(--bg-off)">
                      {image ? (
                        <Image
                          src={image}
                          alt={name}
                          fill
                          className="object-cover object-top"
                          sizes="(min-width: 1280px) 20vw, (min-width: 768px) 33vw, 224px"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <p className="label-en text-(--fg-subtle)">Photo</p>
                        </div>
                      )}
                    </div>

                    {/* 情報 */}
                    <div className="flex flex-1 flex-col p-5">
                      <p className="label-en text-(--fg-subtle)">
                        {role}{tenure && ` — ${tenure}`}
                      </p>
                      <h3 className="mt-1 font-serif text-xl font-bold text-(--fg)">{name}</h3>

                      <div className="my-3 h-px w-full bg-(--border)" />

                      <p className="flex-1 text-xs leading-6 text-(--fg-subtle) font-medium">{comment}</p>

                      {skills.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {skills.map((s) => (
                            <span
                              key={s}
                              className="border border-(--border) px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-(--fg-subtle)"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerList>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          サロン風景
      ════════════════════════════════════════ */}
      <div className="relative h-56 overflow-hidden sm:h-72 md:h-96">
        {/* 左右半々の画像 */}
        <div className="grid h-full grid-cols-2">
          <div className="relative overflow-hidden">
            <Image
              src="/images/recruit/salon-working.jpg"
              alt="サロンでの施術風景"
              fill
              className="object-cover object-center"
              sizes="50vw"
            />
          </div>
          <div className="relative overflow-hidden">
            <Image
              src="/images/recruit/staff-team.jpg"
              alt="スタッフの集まり"
              fill
              className="object-cover object-center"
              sizes="50vw"
            />
          </div>
        </div>

        {/* グラデーションオーバーレイ＋テキスト */}
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/65 via-black/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 px-8 pb-8 md:px-14 md:pb-10">
          <p className="font-serif text-2xl font-bold text-white md:text-3xl">
            あたたかいチームで、<br className="sm:hidden" />一緒に働きませんか。
          </p>
        </div>
      </div>

      {/* ════════════════════════════════════════
          こんな方を求めています
      ════════════════════════════════════════ */}
      <section className="bg-(--bg-dark) px-6 py-8 text-white md:py-20 lg:py-32">
        <div className="mx-auto max-w-350">
          <FadeUp>
            <span className="section-rule section-rule--white block" />
            <p className="label-en text-white/35">Looking For</p>
            <h2 className="mt-5 text-2xl font-black text-white md:text-3xl lg:text-4xl">
              こんな方を待っています。
            </h2>
          </FadeUp>

          <StaggerList className="mt-4 sm:mt-6 grid gap-3 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3">
            {wants.map((text) => (
              <StaggerItem key={text}>
                <div className="flex items-start gap-3 border border-white/10 bg-white/5 px-3 py-2 sm:p-5">
                  <CheckCircle2 size={14} className="mt-1.5 sm:mt-0.5 shrink-0 text-white/30" />
                  <p className="text-sm leading-6 text-white/70">{text}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerList>
        </div>
      </section>

      {/* ════════════════════════════════════════
          勤務条件
      ════════════════════════════════════════ */}
      <section className="bg-(--bg-off) px-6 py-8 md:py-20">
        <div className="mx-auto max-w-350">
          <FadeUp>
            <span className="section-rule block" />
            <p className="label-section">Conditions</p>
            <h2 className="mt-5 text-2xl font-black text-(--fg) md:text-3xl">
              勤務条件
            </h2>
          </FadeUp>

          <FadeIn className="mt-4 sm:mt-10 max-w-4xl">
            <dl className="border border-(--border) divide-y divide-(--border-light)">
              {conditions.map(({ label, value }) => (
                <div
                  key={label}
                  className="grid grid-cols-[6rem_1fr] items-baseline gap-4 px-6 py-4 md:grid-cols-[10rem_1fr]"
                >
                  <dt className="text-xs font-bold text-(--fg-subtle)">{label}</dt>
                  <dd className="text-sm leading-none sm:leading-7 text-(--fg)">{value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-4 border border-(--border) bg-(--card) px-6 py-4">
              <p className="text-xs leading-6 text-(--fg-subtle) font-medium">
                ※ 希望者は1日アルバイト体験入社も可能です。まずはお気軽にご見学ください。
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ════════════════════════════════════════
          採用フロー
      ════════════════════════════════════════ */}
      <section className="bg-(--bg) px-6 py-8 md:py-20">
        <div className="mx-auto max-w-350">
          <FadeUp>
            <span className="section-rule block" />
            <p className="label-section">Flow</p>
            <h2 className="mt-5 text-2xl font-black text-(--fg) md:text-3xl">
              採用の流れ
            </h2>
          </FadeUp>

          <StaggerList className="mt-4 sm:mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6 lg:mt-12">
            {flow.map(({ step, label }, i) => (
              <StaggerItem key={step}>
                <div className="relative flex flex-col items-center border border-(--border) bg-(--card) px-4 py-3 sm:py-6 text-center">
                  <p className="label-en text-(--fg-subtle)">{step}</p>
                  <p className="mt-3 whitespace-pre-line text-sm font-bold text-(--fg)">{label}</p>
                  {i < flow.length - 1 && ( 
                    <ArrowRight
                      size={12}
                      className="absolute -right-2 top-1/2 hidden -translate-y-1/2 text-(--fg-subtle) md:block"
                    />
                  )}
                </div>
              </StaggerItem>
            ))}
          </StaggerList>

          <FadeUp className="mt-6 max-w-5xl border border-(--border) bg-(--card) px-6 py-5 space-y-2">
            <p className="text-sm leading-7 text-(--fg) font-semibold">
              じっくりお店のことをわかっていただいてから、もう一度入社の意思があることを確認してからの面接となります。
            </p>
            <p className="text-xs leading-6 text-(--fg-subtle)">
              働いてから「やっぱり違った」というお互いの意思のすれ違いをなくすよう、念入りに入社までの流れを設けています。希望者は1日アルバイトとして体験入社も可能です。
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ════════════════════════════════════════
          応募フォーム
      ════════════════════════════════════════ */}
      <section id="apply" className="bg-(--bg-off) px-6 py-8 md:py-20">
        <div className="mx-auto max-w-350">
          <div className="grid gap-6 sm:gap-10 md:grid-cols-[1fr_1.2fr] md:gap-16 lg:gap-24">

            <FadeUp>
              <span className="section-rule block" />
              <p className="label-section">Apply</p>
              <h2 className="mt-5 text-2xl font-black leading-tight text-(--fg) md:text-3xl lg:text-4xl">
                応募・見学の<br />ご連絡はこちら。
              </h2>
              <p className="mt-5 text-sm sm:leading-8 text-(--fg-subtle)">
                まずは見学だけでも歓迎です。フォームからお気軽にご連絡ください。
              </p>
              <div className="mt-2 sm:mt-8 space-y-1 sm:space-y-3 border border-(--border) bg-(--card) px-4 py-2 sm:p-6">
                <p className="label-en text-(--fg-subtle)">Other Contact</p>
                <p className="text-xs leading-7 text-(--fg-subtle)">
                  お電話や Instagram DM でのご連絡も歓迎しています。
                </p>
                <a
                  href="tel:025-278-7274"
                  className="block text-sm font-bold text-(--fg) transition-opacity hover:opacity-60"
                >
                  025-278-7274
                </a>
                <a
                  href="https://www.instagram.com/risplendere_broletto/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm font-bold text-(--fg) transition-opacity hover:opacity-60"
                >
                  @risplendere_broletto
                </a>
              </div>
            </FadeUp>

            <FadeIn delay={0.1}>
              <ApplicationForm />
            </FadeIn>

          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          CTA
      ════════════════════════════════════════ */}
      <section className="bg-(--bg-dark) px-6 py-8 text-white md:py-20">
        <div className="mx-auto max-w-350">
          <FadeUp className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div>
              <span className="section-rule section-rule--white block" />
              <h2 className="mt-4 text-2xl font-black text-white md:text-3xl">
                まずはサロン見学から。
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-7 text-white/50">
                お気軽にお電話またはInstagramのDMでご連絡ください。
                雰囲気を見てから判断していただいて構いません。
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href="tel:025-278-7274"
                className="label-en inline-flex items-center justify-center gap-2 border border-white/25 px-7 py-3.5 text-white/70 transition-all hover:border-white/60 hover:text-white"
              >
                025-278-7274
              </a>
              <a
                href="https://www.instagram.com/risplendere_broletto/"
                target="_blank"
                rel="noopener noreferrer"
                className="label-en inline-flex items-center justify-center gap-2 bg-white px-7 py-3.5 text-black transition-opacity hover:opacity-80"
              >
                Instagram DM
                <ArrowRight size={12} />
              </a>
            </div>
          </FadeUp>
        </div>
      </section>

      <FloatingApplyButton />
    </main>
  );
}
