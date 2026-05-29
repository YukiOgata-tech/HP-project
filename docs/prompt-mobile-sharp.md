# 角丸なし系（シャープ）— モバイルレスポンシブ実装プロンプト

> **使い分け**
> - このファイル `prompt-mobile-sharp.md` : **角丸なし・シャープ系**。管理画面・CMS・ダッシュボード・ボーダー型UIのページ全般
> - `prompt-mobile-rounded.md` : **角丸・影あり系**。LP・サービスサイト・カード型UI・訴求重視のページ全般
>
> 用途（LP か 管理画面か）ではなく、**そのサイトのデザインスタイル**で選択する。

このドキュメントは、`rounded-*` や `shadow-*` を使わないボーダー型・シャープなデザインのモバイルUIをスマートフォンでも快適に操作できる密度感へ調整するためのエージェント向け指示プロンプトです。**適用前に下記「プロジェクト固有の設定」を確認・編集してください。**

---

## プロジェクト固有の設定（適用前に確認・編集する）

```
対象ディレクトリ : apps/<サイト名>/app/<管理画面パス>/
ビルドコマンド   : pnpm --filter <サイト名> build
Lintコマンド    : pnpm --filter <サイト名> lint
ヘッダーロゴ文字 : "<サービス名> CMS" など
```

使用するCSSカスタムプロパティ（プロジェクトの `globals.css` を確認して調整）：
```
--bg / --bg-off / --bg-dark
--fg / --fg-muted / --fg-subtle
--border / --border-light
--cta / --cta-text
--card / --card-off
--header-bg / --header-border
```

タイポグラフィ（プロジェクトに合わせて確認）：
- 本文・UI: `font-sans`
- 見出し装飾: `font-serif`（使用している場合）
- 英語ラベル: `.label-en`（プロジェクト固有ユーティリティクラス）

配色は `light / dark` モード両対応。追加インラインカラーは使わず CSS 変数で統一する。

---

## 設計の前提

### デザインシステム
このプロンプトが対象とする管理画面は**角丸を使わない**シャープな設計を前提とする。  
`rounded-*` クラスは禁止。すべての境界は直線・直角のボーダー（`border border-(--border)`）で構成する。

---

## Core Direction

- **モバイルファースト**で設計し、`md:` 以上でPC向けに拡張する
- モバイルでは1画面に3〜5件のコンテンツが視認できる密度を目指す
- 余白は詰める。`p-6` `gap-6` などの大きなスペースはモバイルには直接使わない
- 説明文（description）はモバイルでは非表示か最小限にする
- タップ領域は `min-h-[44px]` を確保しつつ、ビジュアル上は小さく見せる
- PC表示の情報密度は維持するが、モバイルで間延びしないことを優先する
- **角丸なし・影なし**。境界はすべて `border border-(--border)` で表現する

---

## Mobile Sizing Rules

### スペーシング
| 用途 | モバイル | PC（md:以上） |
|---|---|---|
| ページ外側余白 | `px-3 py-4` | `md:px-6 md:py-8` |
| カード内余白 | `p-3` | `md:p-5` または `md:p-6` |
| カード間隔 | `gap-2` | `md:gap-4` |
| リスト項目余白 | `px-3 py-3` | `md:px-6 md:py-5` |
| セクション間余白 | `space-y-4` | `md:space-y-8` |

### テキスト
| 用途 | モバイル | PC |
|---|---|---|
| 英語ラベル（eyebrow） | `text-[10px]` | `text-xs` |
| ページタイトル（h1） | `text-xl font-bold` | `md:text-2xl md:font-bold` |
| カード見出し（h2） | `text-base font-bold` | `md:text-lg` |
| 説明文 | 非表示（`hidden md:block`） | `text-sm leading-7` |
| 統計値（テーブル内） | `text-xl font-black` | `md:text-3xl` |
| ボタン・リンク | `text-[10px] tracking-widest` | `text-xs tracking-widest` |
| 本文 | `text-xs` | `md:text-sm` |

### ボタン・アクション
| 用途 | モバイル | PC |
|---|---|---|
| Primary ボタン | `px-3 py-2` | `md:px-5 md:py-2.5` |
| Secondary ボタン | `px-3 py-1.5` | `md:px-5 md:py-2.5` |
| リスト内インラインボタン | `px-2.5 py-1.5` | `md:px-4 md:py-2` |

---

## Layout Rules

### 統計表示（AdminStatTable — 新設コンポーネント）

**廃止**: `AdminStatCard`（大きな数字カード）は使わない。  
**代替**: テーブル行 ＋ CSS インラインバーグラフで件数・割合を同時に表現する。

外部ライブラリ不要。純粋な TSX ＋ Tailwind で実装する。

```tsx
// components/AdminUi.tsx に追加

interface StatRow {
  labelEn: string;   // 英語ラベル（例: "Published"）
  label: string;     // 日本語ラベル（例: "公開中"）
  value: number;     // 件数
  total: number;     // 全体（割合計算用）
  tone?: "default" | "success" | "warning";
}

export function AdminStatTable({ rows }: { rows: StatRow[] }) {
  return (
    <div className="border border-(--border) bg-(--card)">
      <div className="border-b border-(--border) px-4 py-2 md:px-6 md:py-3">
        <p className="label-en text-(--fg-subtle)">Overview</p>
      </div>
      <table className="w-full">
        <tbody className="divide-y divide-(--border)">
          {rows.map((row) => {
            const pct = row.total > 0 ? Math.round((row.value / row.total) * 100) : 0;
            const numColor =
              row.tone === "success" ? "text-emerald-700"
              : row.tone === "warning" ? "text-amber-700"
              : "text-(--fg)";
            const barColor =
              row.tone === "success" ? "bg-emerald-500"
              : row.tone === "warning" ? "bg-amber-400"
              : "bg-(--fg)";
            return (
              <tr key={row.labelEn}>
                {/* ラベル列 */}
                <td className="w-28 px-4 py-2.5 md:w-40 md:px-6 md:py-4">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-(--fg-subtle)">
                    {row.labelEn}
                  </p>
                  <p className="mt-0.5 text-xs text-(--fg)">{row.label}</p>
                </td>

                {/* 件数列 */}
                <td className="w-14 px-2 py-2.5 text-right md:w-20 md:px-4 md:py-4">
                  <span className={`text-xl font-black tabular-nums md:text-3xl ${numColor}`}>
                    {String(row.value).padStart(2, "0")}
                  </span>
                </td>

                {/* バーグラフ列 */}
                <td className="px-3 py-2.5 md:px-6 md:py-4">
                  <div className="h-1.5 w-full bg-(--border-light) md:h-2">
                    <div
                      className={`h-full ${barColor} transition-[width] duration-500`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <p className="mt-1 text-[10px] tabular-nums text-(--fg-subtle)">{pct}%</p>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
```

**呼び出し例（ダッシュボード・記事一覧ページ）**:

```tsx
<AdminStatTable
  rows={[
    { labelEn: "Total",     label: "合計",  value: posts.length,     total: posts.length, tone: "default" },
    { labelEn: "Published", label: "公開中", value: published.length, total: posts.length, tone: "success" },
    { labelEn: "Drafts",    label: "下書き", value: drafts.length,    total: posts.length, tone: "warning" },
  ]}
/>
```

**表示イメージ（モバイル）**:
```
Overview
─────────────────────────────────
TOTAL     合計   12  ████████████  100%
PUBLISHED 公開中  08  █████████░░░   67%
DRAFTS    下書き  04  ████░░░░░░░░   33%
─────────────────────────────────
```

### ページヘッダー（AdminPageHeader）
モバイルでは説明文を非表示にし、タイトルとアクションだけ残す。

```tsx
<section className="border border-(--border) bg-(--bg) p-3 md:p-8">
  <div className="flex items-center justify-between gap-3 md:flex-col md:items-start md:gap-5 lg:flex-row lg:items-end">
    <div>
      {eyebrow && <p className="label-en text-(--fg-subtle)">{eyebrow}</p>}
      <span className="section-rule block" />
      <h1 className="font-serif text-xl font-bold text-(--fg) md:text-2xl lg:text-3xl">{title}</h1>
      {description && (
        <p className="hidden md:block mt-2 max-w-2xl text-sm leading-7 text-(--fg-subtle)">{description}</p>
      )}
    </div>
    {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
  </div>
</section>
```

### リストアイテム（記事・応募一覧）
モバイルではタイトルとバッジ、ショートカットボタンだけ見せる。

```tsx
<li className="px-3 py-3 md:px-6 md:py-5 transition-colors hover:bg-(--card-off)">
  <div className="flex items-center justify-between gap-3">
    <div className="min-w-0 flex-1 space-y-1">
      <div className="flex flex-wrap items-center gap-2">
        <StatusBadge status={post.status} />
        <span className="text-[10px] text-(--fg-subtle)">
          {new Date(post.updatedAt).toLocaleDateString("ja-JP")}
        </span>
      </div>
      <h3 className="line-clamp-1 text-sm font-bold text-(--fg)">{post.title}</h3>
      <p className="hidden font-mono text-xs text-(--fg-subtle) md:block">{post.slug}</p>
    </div>
    <Link href={...} className="shrink-0 border border-(--border) px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-widest text-(--fg-subtle)">
      編集
    </Link>
  </div>
</li>
```

---

## ヘッダー（AdminHeader）のモバイル対応

**現状の問題**: モバイルではナビが `hidden` になり、ロゴとログアウトしか見えない。

**解決方針**: モバイルではヘッダー直下にナビを横スクロールで表示する。

```tsx
<header className="sticky top-0 z-50 border-b border-(--border) bg-(--header-bg) backdrop-blur-md">
  {/* 上段: ロゴ + ユーザー/ログアウト */}
  <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-3 py-2.5 md:px-6 md:py-3.5">
    <Link href="/admin" className="font-serif text-sm font-bold tracking-[0.28em] uppercase text-(--fg)">
      {/* ↓ プロジェクト固有のロゴ文字に変更 */}
      <サービス名> CMS
    </Link>

    {/* PC: フルナビ */}
    <nav className="hidden items-center md:flex">
      {navItems.map(...)}
      <Link href="/" target="_blank" className="...">サイト ↗</Link>
    </nav>

    {/* ユーザー情報 + ログアウト */}
    <div className="flex items-center gap-3 border border-(--border) bg-(--card) px-3 py-1.5">
      <div className="hidden min-w-0 sm:block">
        <p className="truncate text-xs font-bold text-(--fg)">{user.displayName}</p>
        <p className="truncate text-[10px] text-(--fg-subtle)">{user.email}</p>
      </div>
      <form action={deleteSession}>
        <button type="submit" className="text-[10px] font-bold uppercase tracking-widest text-(--fg-subtle) hover:text-(--fg)">
          ログアウト
        </button>
      </form>
    </div>
  </div>

  {/* モバイル専用: 横スクロールナビ */}
  <nav className="flex overflow-x-auto border-t border-(--border) md:hidden scrollbar-none">
    {navItems.map((item) => (
      <Link
        key={item.href}
        href={item.href}
        className={[
          "shrink-0 px-4 py-2.5 text-[10px] font-bold uppercase tracking-widest whitespace-nowrap border-r border-(--border)",
          isActive(item.href)
            ? "bg-(--cta) text-(--cta-text)"
            : "text-(--fg-subtle)",
        ].join(" ")}
      >
        {item.label}
      </Link>
    ))}
    <Link
      href="/"
      target="_blank"
      className="shrink-0 px-4 py-2.5 text-[10px] font-bold uppercase tracking-widest whitespace-nowrap text-(--fg-subtle)"
    >
      サイト ↗
    </Link>
  </nav>
</header>
```

---

## Bad Patterns（禁止パターン）

- モバイルで `p-6` `p-8` をそのまま使う
- `rounded-*` を使う（このプロジェクト全体で禁止）
- `shadow-*` を使う（ボーダーで代替）
- 1画面に1〜2アイテムしか見えないほどカードが大きい
- 説明文を全デバイスで表示する（モバイルは `hidden md:block`）
- ボタンラベルを長くしてタップ領域を広げようとする（文言を短くして解決）
- `text-lg` `text-xl` をモバイルに直接使う

---

## Preferred Pattern（推奨パターン）

```tsx
{/* 統計テーブルの推奨レイアウト（AdminStatTable を使用） */}
<AdminStatTable
  rows={[
    { labelEn: "Total",     label: "合計",  value: total,     total, tone: "default" },
    { labelEn: "Published", label: "公開中", value: published, total, tone: "success" },
    { labelEn: "Drafts",    label: "下書き", value: drafts,    total, tone: "warning" },
  ]}
/>

{/* リストアイテムの推奨レイアウト */}
<li className="px-3 py-3 transition-colors hover:bg-(--card-off) md:px-6 md:py-5">
  <div className="flex items-center justify-between gap-3">
    <div className="min-w-0 flex-1 space-y-1">
      <div className="flex items-center gap-2">
        <StatusBadge status={post.status} />
        <span className="text-[10px] text-(--fg-subtle)">
          {new Date(post.updatedAt).toLocaleDateString("ja-JP")}
        </span>
      </div>
      <h3 className="line-clamp-1 text-sm font-bold text-(--fg)">{post.title}</h3>
      <p className="hidden font-mono text-xs text-(--fg-subtle) md:block">{post.slug}</p>
    </div>
    <Link href={...} className="shrink-0 border border-(--border) px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-widest text-(--fg-subtle)">
      編集
    </Link>
  </div>
</li>
```

---

## 実装チェックリスト（プロジェクトに合わせて調整する）

- [ ] ヘッダー — モバイル横スクロールナビを追加（`hidden md:flex` のナビを解放）
- [ ] 統計表示 — 大きな数字カードを廃止し `StatTable`（テーブル＋バーグラフ）に置き換える
- [ ] ページヘッダー — 説明文を `hidden md:block`、パディングを `p-3 md:p-8` に縮小
- [ ] ダッシュボード — `StatTable` に切り替え
- [ ] コンテンツ一覧（記事・投稿等） — リスト行を `px-3 py-3 md:px-6 md:py-5` にコンパクト化
- [ ] サブコンテンツ一覧（応募・コメント等） — 同上
- [ ] 入力フォーム — ラベル・インプットのモバイル余白調整（`p-3 md:p-5`）
- [ ] 空状態 — `py-18` → `py-10 md:py-18`

## Verification

変更後はプロジェクトのビルドコマンド（「プロジェクト固有の設定」参照）でビルドが通ることを確認。  
型エラーチェックは Lint コマンドで実施。
