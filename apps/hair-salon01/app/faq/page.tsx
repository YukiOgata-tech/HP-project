import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { FadeUp, StaggerList, StaggerItem } from "../components/animated";

export const metadata: Metadata = {
  title: "よくあるご質問（FAQ） | RISPLENDERE BROLETTO",
  description:
    "RISPLENDERE BROLETTO によくいただくご質問をまとめました。予約方法・料金・施術・駐車場・個室など、初めての方もご参考ください。",
};

/* ── FAQ データ ────────────────────────────────── */

const faqs = [
  {
    id: "reservation",
    en: "Reservation",
    category: "予約・来店について",
    items: [
      {
        q: "初めてでも来店できますか？",
        a: "はい、もちろんです。カウンセリングを大切にしているサロンですので、初めての方も安心してご来店ください。新規様限定で、施術から2週間以内のカウンセリングも無料で承っています。",
      },
      {
        q: "予約は必要ですか？当日でも来店できますか？",
        a: "予約優先制です。当日予約も大歓迎ですので、お気軽にHot Pepper Beautyまたはお電話（025-278-7274）でご連絡ください。",
      },
      {
        q: "子どもを連れて来店できますか？",
        a: "DVDが視聴できるキッズスペースを完備しています。また、貸切個室ルームも無料でご利用いただけます（要予約）。お子様連れでも安心してご来店ください。",
      },
      {
        q: "女性スタッフだけのサロンですか？",
        a: "はい。当サロンは女性スタッフのみで運営しています。女性のお客様にリラックスしていただける環境を大切にしています。",
      },
    ],
  },
  {
    id: "pricing",
    en: "Pricing",
    category: "料金・お支払いについて",
    items: [
      {
        q: "支払い方法を教えてください。",
        a: "現金および各種クレジットカードに対応しています。",
      },
      {
        q: "子ども・学生向けのメニューはありますか？",
        a: "ベビー・チャイルドカット（0〜6歳）および小学生〜大学生向けの学生カットメニューをご用意しています。未就学児のカットは、親子でご来店いただくと半額になります。",
      },
      {
        q: "紹介割引はありますか？",
        a: "ご紹介いただいた方・ご紹介者様のどちらにも ¥1,000オフの割引が適用されます。",
      },
      {
        q: "誕生日割引・その他の特典について教えてください。",
        a: "誕生月の技術料が ¥1,000オフになる誕生日割、前回ご利用が ¥5,000以上の方に適用されるサイクル割、来店5週間以内の前髪メンテナンス無料サービスなど、各種特典をご用意しています。詳しくはスタッフにお気軽にお問い合わせください。",
      },
    ],
  },
  {
    id: "treatment",
    en: "Treatment",
    category: "施術・アフターケアについて",
    items: [
      {
        q: "仕上がりが気に入らない場合、お直しはできますか？",
        a: "施術から10日以内であれば無料でお直しします。お気軽にご連絡ください。",
      },
      {
        q: "前髪だけのカットは可能ですか？",
        a: "前髪カット ¥500〜で承っています。前回来店から5週間以内の方は無料です。サイド・フェイスライン込みの場合は ¥1,000〜になります。",
      },
      {
        q: "ホームケアの相談もできますか？",
        a: "はい。毎日のシャンプーやケア方法のアドバイスも大切にしています。来店時だけでなく、次回来店までのホームケアサポートも行っています。",
      },
      {
        q: "施術の所要時間の目安を教えてください。",
        a: "メニューにより異なります。例として、デザインカットは約70分、ブロレットカットは約80分、ヘッドスパは20〜90分が目安です。詳細は各メニューページをご参照ください。",
      },
    ],
  },
  {
    id: "access",
    en: "Access & Facility",
    category: "設備・アクセスについて",
    items: [
      {
        q: "駐車場はありますか？",
        a: "店舗前に3台分の駐車スペースがあります。また、第二駐車場（8・10・11番）もご利用いただけます。",
      },
      {
        q: "お店の場所を教えてください。",
        a: "新潟市中央区本馬越2丁目8番17号です。セブンイレブン本馬越店様の向かい、ウオロク本馬越店の斜め前にあります。",
      },
      {
        q: "個室はありますか？",
        a: "貸切個室ルームを無料でご利用いただけます（要予約）。プライベートな空間でゆっくりお過ごしいただけます。",
      },
      {
        q: "営業時間と定休日を教えてください。",
        a: "平日（火〜土）は9:15〜18:00、日曜・祝日は10:00〜17:00の営業です。毎週月曜日と第3日曜日が定休日となります。",
      },
    ],
  },
];

/* ── FAQ スキーマ ─────────────────────────────── */

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.flatMap(({ items }) =>
    items.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    }))
  ),
};

/* ── コンポーネント ───────────────────────────── */

function FaqItem({ q, a }: { q: string; a: string }) {
  return (
    <details className="group border-b border-[var(--border-light)]">
      <summary className="flex cursor-pointer list-none items-start justify-between gap-4 py-5 [&::-webkit-details-marker]:hidden">
        <span className="text-sm font-bold leading-6 text-[var(--fg)]">{q}</span>
        <span
          aria-hidden
          className="mt-0.5 shrink-0 text-base font-bold text-[var(--fg-subtle)] transition-transform duration-200 group-open:rotate-45"
        >
          ＋
        </span>
      </summary>
      <p className="pb-6 text-sm leading-8 text-[var(--fg-subtle)]">{a}</p>
    </details>
  );
}

/* ══════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════ */

export default function FaqPage() {
  return (
    <main className="bg-[var(--bg)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ── ページヘッダー ── */}
      <section className="border-b border-[var(--border)] bg-[var(--bg)] px-6 pt-24 pb-12 md:pt-32 md:pb-16">
        <div className="mx-auto max-w-[1400px]">
          <FadeUp>
            <Link
              href="/"
              className="label-en mb-3 sm:mb-6 inline-flex items-center gap-2 text-[var(--fg-subtle)] transition-colors hover:text-[var(--fg)]"
            >
              <ArrowLeft size={12} />
              Back to Home
            </Link>
            <span className="section-rule block" />
            <p className="label-section">FAQ</p>
            <h1 className="mt-5 font-serif text-4xl font-bold text-[var(--fg)] md:text-5xl lg:text-6xl">
              よくあるご質問
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-[var(--fg-subtle)]">
              初めてご来店のお客様や、ご予約前に気になることをまとめました。
              こちらに掲載のない内容はお電話またはHot Pepper Beautyのメッセージでお気軽にお問い合わせください。
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── FAQ 本体 ── */}
      <div className="mx-auto max-w-[1400px] px-6 py-14 md:py-20">
        <StaggerList className="mx-auto max-w-3xl space-y-14">
          {faqs.map(({ id, en, category, items }) => (
            <StaggerItem key={id}>
              <section>
                {/* カテゴリヘッダー */}
                <div className="mb-2 border-b border-[var(--border)] pb-4">
                  <p className="label-en text-[var(--fg-subtle)]">{en}</p>
                  <h2 className="mt-1 text-2xl font-black text-[var(--fg)]">{category}</h2>
                </div>

                {/* Q&A リスト */}
                <div>
                  {items.map((item) => (
                    <FaqItem key={item.q} {...item} />
                  ))}
                </div>
              </section>
            </StaggerItem>
          ))}
        </StaggerList>

        {/* ── CTA ── */}
        <div className="mx-auto mt-16 max-w-3xl border border-[var(--border)] p-8 md:p-10">
          <p className="label-en text-[var(--fg-subtle)]">Contact</p>
          <h2 className="mt-2 font-serif text-2xl font-bold text-[var(--fg)]">
            お気軽にご連絡ください
          </h2>
          <p className="mt-3 text-sm leading-7 text-[var(--fg-subtle)]">
            こちらに掲載のない内容については、お電話またはHot Pepper Beautyのメッセージ機能からご相談いただけます。
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a
              href="tel:025-278-7274"
              className="label-en flex-1 border border-[var(--border)] py-3.5 text-center text-[var(--fg-subtle)] transition-all hover:border-[var(--fg)] hover:text-[var(--fg)]"
            >
              025-278-7274
            </a>
            <a
              href="https://beauty.hotpepper.jp/slnH000142482/"
              target="_blank"
              rel="noopener noreferrer"
              className="label-en flex-1 bg-[var(--cta)] py-3.5 text-center text-[var(--cta-text)] transition-opacity hover:opacity-70"
            >
              Hot Pepperで予約・問い合わせ
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
