# リポジトリコンテキスト

このドキュメントはAIが私の開発リポジトリの構造・規約・使用技術を正確に把握するための参照資料です。

---

## 概要

クライアント向けHP・LPを複数管理するpnpmモノレポです。サイトはそれぞれ `apps/` 配下に独立したNext.jsプロジェクトとして存在し、共通UIコンポーネントは `packages/components/` で管理します。

---

## ディレクトリ構成

```
client-sites/                        ← リポジトリルート（gitルート）
├── apps/
│   ├── hair-salon01/                ← （例）クライアントサイト（Next.jsアプリ）
|   └...                             ここに各サイトを追加していく
├── packages/
│   └── components/                  ← 共通UIコンポーネントパッケージ
│       └── src/
│           └── index.ts             ← コンポーネントのエントリーポイント
├── scripts/
│   └── create-app.mjs               ← 新規アプリ作成スクリプト
├── docs/
│   ├── repository-context.md        ← このファイル
│   └── pnpm-commands.md             ← pnpmコマンドリファレンス
├── node_modules/                    ← 全アプリ共有（実体はここだけ）
│   └── .pnpm/                       ← パッケージ実体（ハードリンク）
├── package.json                     ← ワークスペースルート
├── pnpm-workspace.yaml
└── pnpm-lock.yaml
```

各アプリの `apps/*/node_modules/` はシンボリックリンクのみ。実体ファイルはルートの `node_modules/.pnpm/` に一元管理されています。

---

## 技術スタック（バージョン固定）

| 技術 | バージョン | 備考 |
|---|---|---|
| Next.js | 16.2.4 | App Router使用 |
| React | 19.2.4 | |
| TypeScript | ^5 | strict mode |
| Tailwind CSS | ^4 | v4系（設定ファイル不要）|
| pnpm | 10.33.2 | ワークスペース機能使用 |

**重要: Next.js はv16系です。v13〜v15とはAPIや規約が異なる可能性があります。**

---

## 各アプリの構成（テンプレート）

新規アプリは `pnpm create-app <名前>` で以下の構成が生成されます。

```
apps/<name>/
├── app/
│   ├── layout.tsx       ← ルートレイアウト（html/body/globals.css）
│   ├── page.tsx         ← トップページ
│   └── globals.css      ← Tailwindのエントリーポイント
├── public/
├── next.config.ts
├── tsconfig.json        ← パスエイリアス @/* → ./*
├── postcss.config.mjs
├── eslint.config.mjs
└── package.json
```

### globals.css（必須の記述）

```css
@import "tailwindcss";
@source "../../../packages/components/src";
```

`@source` により `packages/components/src` 内で使用されたTailwindクラスもスキャン対象になります。

### tsconfig.json パスエイリアス

```
@/* → アプリルート（apps/<name>/）以下
```

例: `import { Button } from "@/components/Button"` → `apps/<name>/components/Button.tsx`

---

## インストール済みパッケージ（全アプリ共通テンプレート）

### dependencies

| パッケージ | バージョン | 用途 |
|---|---|---|
| `framer-motion` | ^12 | アニメーション全般 |
| `react-intersection-observer` | ^10 | スクロール検知・アニメーショントリガー |
| `lucide-react` | ^1 | アイコン |
| `embla-carousel-react` | ^8 | スライダー・カルーセル |
| `react-hook-form` | ^7 | フォーム管理 |
| `zod` | ^4 | バリデーション |
| `clsx` | ^2 | 条件付きクラス名結合 |
| `tailwind-merge` | ^3 | Tailwindクラスの競合解消 |

### devDependencies

| パッケージ | 用途 |
|---|---|
| `@tailwindcss/postcss` | Tailwind v4のPostCSS統合 |
| `tailwindcss` | Tailwind本体 |
| `typescript` | TypeScript |
| `eslint` + `eslint-config-next` | Lint |
| `@types/react` `@types/react-dom` `@types/node` | 型定義 |

---

## Tailwind CSS v4 の規約

**v4はv3と設定方法が異なります。**

- `tailwind.config.js` は**不要・存在しない**
- カスタマイズは `globals.css` 内の `@theme {}` ブロックで行う
- コンテンツスキャンは自動検知 + `@source` ディレクティブで追加指定

```css
/* カスタムカラー・フォント等の追加例 */
@import "tailwindcss";
@source "../../../packages/components/src";

@theme {
  --color-brand: #e91e8c;
  --font-sans: "Noto Sans JP", sans-serif;
}
```

クラスはそのまま使用可能: `bg-brand`, `text-brand`, `font-sans`

---

## 共通コンポーネントパッケージ（packages/components）

```
packages/components/
├── src/
│   └── index.ts    ← エクスポート集約ファイル
├── package.json    ← name: "@client-sites/components"
└── tsconfig.json
```

### 共通コンポーネントの追加手順

**1. コンポーネントファイルを作成**

```tsx
// packages/components/src/Button.tsx
export function Button({ children }: { children: React.ReactNode }) {
  return (
    <button className="px-4 py-2 bg-black text-white rounded-lg">
      {children}
    </button>
  );
}
```

**2. index.ts からエクスポート**

```ts
// packages/components/src/index.ts
export { Button } from "./Button";
```

**3. 使用するアプリの package.json に依存を追加**（初回のみ）

```bash
pnpm --filter <app-name> add @client-sites/components@workspace:*
```

**4. アプリ内でインポート**

```tsx
import { Button } from "@client-sites/components";
```

---

## pnpmコマンド早見表

```bash
# 新規サイト作成
pnpm create-app <name>

# 開発サーバー
pnpm --filter <name> dev

# ビルド
pnpm --filter <name> build

# パッケージ追加（特定アプリ）
pnpm --filter <name> add <package>

# 全依存インストール（clone後・アプリ追加後）
pnpm install
```

---

## Vercelデプロイ設定

各アプリをVercelに個別プロジェクトとして登録します。

| 設定項目 | 値 |
|---|---|
| Root Directory | `apps/<アプリ名>` |
| Framework Preset | Next.js（自動検出）|
| Build / Install Command | 変更不要（自動）|

---

## コーディング規約

- **言語**: TypeScript（strict mode、型推論を活用し`any`禁止）
- **コンポーネント**: 関数コンポーネントのみ（`export default` or named export）
- **スタイル**: Tailwind CSSクラスを積極的に使用。独自CSS styleを作成し、利用もOK。その際は、別でCSSコードなどを適切に出力して下さい。
- **クラス結合**: `clsx` + `tailwind-merge` を使う（`cn`ユーティリティ関数を作って使うのが慣習）
- **画像**: 基本的にNext.js の `<Image>` コンポーネントを使う
- **フォント**: Next.js の `next/font` で読み込む

### cn ユーティリティ（推奨パターン）

各アプリまたは `packages/lib` に作成して使用します。

```ts
// lib/utils.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

```tsx
// 使用例
<div className={cn("px-4 py-2", isActive && "bg-brand", className)} />
```
