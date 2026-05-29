# client-sites — Claude 作業ガイド

## リポジトリ概要

クライアント向け Next.js サイトを管理する pnpm モノレポ。  
アプリは `apps/`、共通ロジックは `packages/` に配置。

```
client-sites/
├── apps/
│   ├── hair-salon01/          # 美容室サイト（ニュースCMS・採用・ギャラリー）
│   └── maharaja-night-2026/   # イベントLP（3D表現・PDF出力・参加登録）
└── packages/
    ├── lib/src/cms/           # Firebase Admin/Client・CMS共通ロジック
    └── components/src/cms/    # Tiptap・CMSエディタUI
```

## 開発コマンド

```bash
# 依存関係インストール（ルートで実行）
pnpm install

# 開発サーバー起動
pnpm --filter hair-salon01 dev
pnpm --filter maharaja-night-2026 dev

# ビルド / 起動
pnpm --filter <app-name> build
pnpm --filter <app-name> start

# Lint（PR前に必ず実行）
pnpm --filter <app-name> lint

# 新規アプリ作成
pnpm create-app <site-name>

# CMSユーザー作成（hair-salon01 の .env.local を使用）
pnpm create-cms-user
```

## 技術スタック

| カテゴリ | 技術 |
|---|---|
| フレームワーク | Next.js 16 (App Router) |
| 言語 | TypeScript |
| スタイル | Tailwind CSS v4 |
| パッケージ管理 | pnpm workspace v10.33.2 |
| バックエンド | Firebase / Firestore |
| デプロイ | Vercel（アプリごと個別プロジェクト） |
| リッチテキスト | Tiptap Editor |
| アニメーション | Framer Motion |
| フォーム | React Hook Form + Zod |

## コーディング規約

- インデント: **2スペース**
- コンポーネントファイル: `PascalCase.tsx`（例: `AdminHeader.tsx`）
- 関数・変数: `camelCase`
- ディレクトリ・アプリ名: `kebab-case`（例: `hair-salon01`）
- ルートファイル: Next.js 規約に従う（`page.tsx`, `layout.tsx`, `route.ts`）
- 共有パッケージの export: named export 優先

## Firebase 使い分けルール

| SDK | 使用場所 | ファイル |
|---|---|---|
| Firebase Admin SDK | サーバー側（Server Actions・Route Handlers） | `packages/lib/src/cms/firebase-admin.ts` |
| Firebase Client SDK | クライアント側（ブラウザ） | `packages/lib/src/cms/firebase-client.ts` |

クライアントコンポーネント（`"use client"`）では Admin SDK を **絶対に使わない**。

## Server Actions パターン

- データ変更は `app/admin/actions/` 配下の Server Actions で行う
- フォームは React Hook Form + Zod でバリデーション
- 管理者認証はセッショントークン（`app/admin/lib/session-token.ts`）で管理

## Tailwind CSS v4 の注意点

- 設定は `postcss.config.mjs` 経由（`tailwind.config.js` は不要）
- `@tailwindcss/postcss` プラグインを使用
- v3 の `theme.extend` 構文は使えない → CSS 変数で定義

## アプリ固有情報

### hair-salon01
- `@tailwindcss/typography` を使用（ニュース記事の本文レンダリング）
- 管理画面: `/admin`（ニュース投稿・採用応募管理）

### maharaja-night-2026
- `@react-three/fiber` + `@react-three/drei` + `three` で 3D 表現
- `jspdf` + `html-to-image` で PDF 出力
- LP セクションコンポーネントは `components/` 配下に配置

## テスト方針

自動テストスイートなし。変更時は以下を確認:

1. `pnpm --filter <app-name> lint` — ESLint パス
2. `pnpm --filter <app-name> build` — ビルドパス
3. ローカル開発環境で手動動作確認

新規テストを追加する場合は対象機能の近くに `*.test.ts` / `*.test.tsx` として配置。

## コミット規約

```
# 形式: 対象アプリ or 機能 + 内容（簡潔に）
hair-salon01 hero polish
maharaja-night-2026 3D section updated
packages/lib cms auth fixed
```

## セキュリティ

- `.env.local` は絶対にコミットしない（`.env.local.example` をコピーして使用）
- `firestore.rules` / `storage.rules` の変更は PR 本文に影響範囲を明記
- `packages/lib/src/cms/firebase-admin.ts` は権限影響大 — 変更時は慎重に

## Vercel デプロイ設定

各アプリを Vercel に個別プロジェクトとして登録。

| 設定項目 | 値 |
|---|---|
| Root Directory | `apps/<アプリ名>` |
| Framework Preset | Next.js（自動検出） |
