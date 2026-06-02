import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { FadeUp, FadeIn, StaggerList, StaggerItem } from "../components/animated";

export const metadata: Metadata = {
  title: "メニュー・料金表 | RISPLENDERE BROLETTO",
  description:
    "新潟市中央区本馬越の美容室 RISPLENDERE BROLETTO のメニューと料金一覧。カット・ヘッドスパ・カラー・パーマ・ストレート・スタイリング。",
};

const reservationUrl = "https://beauty.hotpepper.jp/slnH000142482/";

/* ── カテゴリ定義 ─────────────────────────────── */

const categories = [
  { id: "cut",      label: "Cut",      jp: "カット"       },
  { id: "headspa",  label: "Head Spa", jp: "ヘッドスパ"   },
  { id: "color",    label: "Color",    jp: "カラー"       },
  { id: "timesave", label: "時短",     jp: "時短メニュー" },
  { id: "perm",     label: "Perm",     jp: "パーマ"       },
  { id: "straight", label: "Straight", jp: "ストレート"   },
  { id: "styling",  label: "Styling",  jp: "スタイリング" },
];

/* ── メニューデータ ───────────────────────────── */

type MenuItem = {
  name: string;
  detail?: string;
  time?: string;
  price: string;
  note?: string;
};

const cutMenu: MenuItem[] = [
  { name: "デザインカット",              time: "70分", price: "¥5,000 +tax" },
  { name: "ブロレットカット",            time: "80分", price: "¥5,500 +tax" },
  { name: "うるつやカット",             time: "80分", price: "¥8,000 +tax", detail: "トリートメント付き", note: "ロングは +¥1,000 +tax" },
  { name: "プチカット",                  time: "10分", price: "¥2,000 +tax", detail: "カウンセリングなし" },
  { name: "フロントカット",             price: "¥500〜 +tax", note: "来店5週間以内は無料 / サイド・フェイスライン込みの場合 ¥1,000 +tax" },
];

const babyMenu: MenuItem[] = [
  { name: "0〜1歳以下",  detail: "お子様のみ",   price: "¥1,000" },
  { name: "2〜4歳以下",  detail: "お子様のみ",   price: "¥2,000" },
  { name: "5〜6歳以下",  detail: "お子様のみ",   price: "¥2,500" },
  { name: "0〜1歳以下",  detail: "親子で半額",   price: "¥500 +tax" },
  { name: "2〜4歳以下",  detail: "親子で半額",   price: "¥1,000 +tax" },
  { name: "5〜6歳以下",  detail: "親子で半額",   price: "¥1,250 +tax" },
];

const studentMenu: MenuItem[] = [
  { name: "小学生カット", price: "¥3,000 +tax" },
  { name: "中学生カット", price: "¥3,500 +tax" },
  { name: "高校生カット", price: "¥4,000 +tax" },
  { name: "大学生カット", price: "¥4,500 +tax" },
];

const headspaMenu: MenuItem[] = [
  { name: "ダヴィネス ドラゴンヘッドスパ",            time: "60分",  price: "¥5,000 +tax" },
  { name: "ダヴィネス ドラゴンヘッドスパ（ショート）", time: "20分",  price: "¥2,500 +tax" },
  { name: "エステシモヘッドスパ",                     time: "90分",  price: "¥8,000 +tax" },
  { name: "エステシモヘッドスパ（ラメラマスク）",       time: "70分",  price: "¥6,000 +tax" },
];

type SizedItem = { name: string; detail?: string; s?: string; m?: string; l?: string; note?: string };

const colorSized: SizedItem[] = [
  { name: "ワンカラー",                   s: "¥4,500", m: "¥5,500",  l: "¥6,500"  },
  { name: "カラー前配合トリートメント",   s: "¥1,000", m: "¥1,000",  l: "¥1,500", detail: "S/M共通" },
  { name: "トナー",                       s: "¥2,500", m: "¥3,000",  l: "¥3,500"  },
  { name: "ダブルカラー",                 s: "¥11,500",m: "¥13,500", l: "¥16,000" },
  { name: "ピカラカラー",                 s: "¥11,000",m: "¥13,000", l: "¥15,300" },
  { name: "ノンダメージコース",           s: "¥8,500", m: "¥9,500",  l: "¥10,500" },
  { name: "頭皮いたわりスパカラー",       s: "¥6,000", m: "¥7,000",  l: "¥8,000"  },
  { name: "ハーブカラー",                 s: "¥7,000", m: "¥8,500",  l: "¥9,500"  },
  { name: "アロマオーガニックカラー",     s: "¥7,500", m: "¥8,500",  l: "¥9,500"  },
  { name: "エステシモスパカラー",         s: "¥8,500", m: "¥9,500",  l: "¥10,500" },
  { name: "ブロレットオリジナルカラーコース", s: "¥7,500", m: "¥9,300", l: "¥11,500" },
];

const colorDesign: MenuItem[] = [
  { name: "ハイライト・ローライト",           price: "¥2,000〜¥5,000 +tax" },
  { name: "グラデーションカラー・インナーカラー", price: "¥1,000〜¥3,000 +tax" },
];

const timesaveMenu: MenuItem[] = [
  { name: "時短グレイカラーコース（リタッチ）", price: "¥4,500 +tax" },
  { name: "時短グレイカラーコース（S）",        price: "¥5,500" },
  { name: "時短グレイカラーコース（M）",        price: "¥6,800" },
  { name: "時短グレイカラーコース（L）",        price: "¥8,000" },
  { name: "時短酸性ホットパーマ ワンカール5本",  price: "¥5,000 +tax" },
  { name: "時短酸性ホットパーマ ランダム10本",  price: "¥8,000 +tax" },
  { name: "時短酸性ホットパーマ トップ3本",     price: "¥4,000 +tax" },
  { name: "時短酸性ホットパーマ フロント1〜2本",price: "¥3,000 +tax" },
];

const permSized: SizedItem[] = [
  { name: "ブロレットナチュラルパーマ",           s: "¥14,500〜", m: "¥16,000〜", l: "¥17,500〜" },
  { name: "デジタルパーマ（くっきりウェーブ）",   s: "¥12,500〜", m: "¥13,500〜", l: "¥14,500〜" },
  { name: "SINKAデジタルパーマ（柔らか手触り）",  s: "¥14,000〜", m: "¥15,000〜", l: "¥16,500〜" },
  { name: "メンズパーマ",                          s: "¥12,000〜", m: "¥13,000〜" },
];

const straightSized: SizedItem[] = [
  { name: "髪質改善SINKAトリートメントストレート", s: "¥14,500", m: "¥16,000", l: "¥18,000" },
  { name: "ウェーブストレート ライトタイプ",       s: "¥12,500", m: "¥13,500", l: "¥15,500" },
  { name: "ウェーブストレート しっかりタイプ",     s: "¥15,000", m: "¥17,000", l: "¥19,500" },
];

const stylingMenu: MenuItem[] = [
  { name: "セット",                  price: "¥4,000 +tax" },
  { name: "メイク",                  price: "¥5,000 +tax" },
  { name: "お着付け",                price: "¥8,000〜 +tax" },
  { name: "トリートメント",          price: "¥3,000〜 +tax" },
  { name: "シャンプードライブロー（1F）", price: "¥3,000 +tax" },
  { name: "シャンプードライブロー（2F）", price: "¥2,500 +tax" },
];

/* ── コンポーネント ───────────────────────────── */

/** シンプル行 */
function MenuRow({ name, detail, time, price, note }: MenuItem) {
  return (
    <div className="group flex items-start justify-between gap-4 border-b border-(--border-light) py-4 last:border-b-0">
      <div className="min-w-0 flex-1">
        <p className="text-sm font-bold text-(--fg)">{name}</p>
        {detail && <p className="mt-0.5 text-xs text-(--fg-subtle)">{detail}</p>}
        {time   && <p className="mt-0.5 text-xs text-(--fg-subtle)">所要時間目安 {time}</p>}
        {note   && <p className="mt-1 text-[11px] text-(--fg-subtle) leading-5">※ {note}</p>}
      </div>
      <p className="shrink-0 text-sm font-black text-(--fg) tabular-nums">{price}</p>
    </div>
  );
}

/** S/M/L サイズ行 */
function SizedRow({ name, detail, s, m, l, note }: SizedItem) {
  return (
    <div className="border-b border-(--border-light) py-4 last:border-b-0">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold text-(--fg)">{name}</p>
          {detail && <p className="mt-0.5 text-xs text-(--fg-subtle)">{detail}</p>}
        </div>
        <div className="flex shrink-0 gap-4 text-right text-xs tabular-nums text-(--fg-subtle)">
          {s && <span><span className="block text-[10px] font-bold text-(--fg-subtle)">S</span>{s}</span>}
          {m && <span><span className="block text-[10px] font-bold text-(--fg-subtle)">M</span>{m}</span>}
          {l && <span><span className="block text-[10px] font-bold text-(--fg-subtle)">L</span>{l}</span>}
        </div>
      </div>
      {note && <p className="mt-1 text-[11px] text-(--fg-subtle) leading-5">※ {note}</p>}
    </div>
  );
}

/** セクションヘッダー */
function SectionHead({ id, en, jp }: { id: string; en: string; jp: string }) {
  return (
    <div id={id} className="border-b border-(--border) pb-4 pt-2">
      <p className="label-en text-(--fg-subtle)">{en}</p>
      <h2 className="mt-1 text-2xl font-black text-(--fg) md:text-3xl">{jp}</h2>
    </div>
  );
}

/** サブグループラベル */
function SubLabel({ label }: { label: string }) {
  return (
    <p className="mt-7 mb-2 label-en text-(--fg-subtle) border-b border-(--border-light) pb-2">
      {label}
    </p>
  );
}

/* ══════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════ */

export default function MenuPage() {
  return (
    <main className="bg-(--bg)">

      {/* ── ページヘッダー ── */}
      <section className="border-b border-(--border) bg-(--bg)">
        <div className="mx-auto max-w-350 flex flex-col md:flex-row">

          {/* 左: テキスト */}
          <div className="flex-1 px-6 py-8 sm:pt-24 md:px-14 md:pb-16 md:pt-36">
            <FadeUp>
              <Link
                href="/"
                className="label-en mb-3 sm:mb-6 inline-flex items-center gap-2 text-(--fg-subtle) transition-colors hover:text-(--fg)"
              >
                <ArrowLeft size={12} />
                Back to Home
              </Link>

              <span className="section-rule" />
              <p className="label-section">Menu & Price</p>
              <h1 className="mt-5 font-serif text-4xl font-bold text-(--fg) md:text-5xl lg:text-6xl">
                メニュー・料金表
              </h1>
              <p className="mt-5 text-sm leading-7 text-(--fg-subtle)">
                すべての料金は税別表示です。ロング料金・オプション料金が別途かかる場合があります。<br />
                詳細はカウンセリング時にご確認ください。
              </p>
            </FadeUp>

            {/* カテゴリナビ */}
            <FadeUp delay={0.1} className="mt-10 flex flex-wrap gap-2.5">
              {categories.map(({ id, label }) => (
                <a
                  key={id}
                  href={`#${id}`}
                  className="menu-nav-link border border-(--border) px-4 py-2"
                >
                  {label}
                </a>
              ))}
            </FadeUp>
          </div>

          {/* 右: 画像 (モバイルは上部に短く表示、デスクトップは右半分) */}
          <FadeIn className="relative h-52 md:h-auto md:w-[45%] md:shrink-0 overflow-hidden bg-(--bg-off)">
            {/* 後ほど実際の画像に差し替え予定 */}
            <Image
              src="/images/salon/salon-01.jpg"
              alt="RISPLENDERE BROLETTOのサロン"
              fill
              sizes="(min-width: 768px) 45vw, 100vw"
              className="object-cover object-center"
              priority
            />
            {/* 左側グラデーション (デスクトップのみ、テキストとの境界を自然に) */}
            <div
              aria-hidden
              className="absolute inset-y-0 left-0 w-16 bg-linear-to-r from-(--bg) to-transparent md:block hidden"
            />
          </FadeIn>
        </div>
      </section>

      {/* ── メニュー本体 ── */}
      <div className="mx-auto max-w-350 px-7 py-14 md:py-20">
        <div className="mx-auto max-w-3xl space-y-16">

          {/* ════ CUT ════ */}
          <section>
            <SectionHead id="cut" en="Cut" jp="カット" />
            <div className="mt-4">
              {cutMenu.map((item) => <MenuRow key={item.name} {...item} />)}
            </div>

            <SubLabel label="Baby & Child Cut — ベビー・チャイルドカット" />
            <div>
              {babyMenu.map((item, i) => <MenuRow key={`baby-${i}`} {...item} />)}
            </div>

            <SubLabel label="Student Cut — 学生カット" />
            <div>
              {studentMenu.map((item) => <MenuRow key={item.name} {...item} />)}
            </div>
          </section>

          {/* ════ HEAD SPA ════ */}
          <section>
            <SectionHead id="headspa" en="Head Spa" jp="ヘッドスパ" />
            <div className="mt-4">
              {headspaMenu.map((item) => <MenuRow key={item.name} {...item} />)}
            </div>
          </section>

          {/* ════ COLOR ════ */}
          <section>
            <SectionHead id="color" en="Color" jp="カラー" />

            <div className="mt-3 border border-(--border-light) bg-(--bg-off) p-4 text-xs text-(--fg-subtle) leading-6">
              <p className="font-bold text-(--fg)">ブロレットこだわりカラー</p>
              <p className="mt-1">頭皮保護オイルで肌を守りながら施術 / カラー剤除去を徹底 / 髪質に合わせた栄養補給</p>
            </div>

            {/* S/M/L 注記 */}
            <div className="mt-4 flex justify-end gap-6 pr-1 text-[10px] font-bold text-(--fg-subtle)">
              <span>S</span>
              <span>M</span>
              <span>L</span>
            </div>
            <p className="mt-1 text-right text-[10px] text-(--fg-subtle)">すべて +tax</p>

            <div className="mt-2">
              {colorSized.map((item) => <SizedRow key={item.name} {...item} />)}
            </div>

            <SubLabel label="Design Color — デザインカラー" />
            <div>
              {colorDesign.map((item) => <MenuRow key={item.name} {...item} />)}
            </div>
          </section>

          {/* ════ 時短 ════ */}
          <section>
            <SectionHead id="timesave" en="Quick Menu" jp="時短メニュー" />
            <div className="mt-4">
              {timesaveMenu.map((item) => <MenuRow key={item.name} {...item} />)}
            </div>
          </section>

          {/* ════ PERM ════ */}
          <section>
            <SectionHead id="perm" en="Perm" jp="パーマ" />

            <div className="mt-4 flex justify-end gap-6 pr-1 text-[10px] font-bold text-(--fg-subtle)">
              <span>S</span>
              <span>M</span>
              <span>L</span>
            </div>
            <p className="mt-1 text-right text-[10px] text-(--fg-subtle)">すべて +tax〜</p>

            <div className="mt-2">
              {permSized.map((item) => <SizedRow key={item.name} {...item} />)}
            </div>
          </section>

          {/* ════ STRAIGHT ════ */}
          <section>
            <SectionHead id="straight" en="Straight" jp="ストレート" />

            <div className="mt-4 flex justify-end gap-6 pr-1 text-[10px] font-bold text-(--fg-subtle)">
              <span>S</span>
              <span>M</span>
              <span>L</span>
            </div>
            <p className="mt-1 text-right text-[10px] text-(--fg-subtle)">すべて +tax</p>

            <div className="mt-2">
              {straightSized.map((item) => <SizedRow key={item.name} {...item} />)}
            </div>
          </section>

          {/* ════ STYLING ════ */}
          <section>
            <SectionHead id="styling" en="Styling" jp="スタイリング" />
            <div className="mt-4">
              {stylingMenu.map((item) => <MenuRow key={item.name} {...item} />)}
            </div>
          </section>

          {/* ── 注意事項 ── */}
          <section className="border border-(--border) p-6 text-xs leading-7 text-(--fg-subtle)">
            <p className="font-bold text-(--fg) mb-2">ご注意・ご案内</p>
            <ul className="space-y-1 list-disc list-inside">
              <li>料金はすべて税別表示です。</li>
              <li>髪の長さ（S/M/L）や状態により料金が異なります。</li>
              <li>各種割引・特典の詳細はスタッフにお気軽にお問い合わせください。</li>
              <li>ご予約優先制・当日予約もお気軽にどうぞ。</li>
            </ul>
          </section>

          {/* ── CTA ── */}
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href={reservationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="label-en flex-1 bg-(--cta) py-4 text-center text-(--cta-text) transition-opacity hover:opacity-70"
            >
              Hot Pepperで予約する
            </a>
            <Link
              href="/#access"
              className="label-en flex-1 border border-(--border) py-4 text-center text-(--fg-subtle) transition-all hover:border-(--fg) hover:text-(--fg)"
            >
              店舗情報を見る
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
