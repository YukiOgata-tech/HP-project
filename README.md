# client-sites

クライアント向けHP・LPを管理するpnpmモノレポです。

## 技術スタック

- **フレームワーク**: Next.js 16 (App Router)
- **言語**: TypeScript
- **スタイル**: Tailwind CSS v4
- **パッケージ管理**: pnpm workspace
- **デプロイ**: Vercel（アプリごとに個別プロジェクト）

## リポジトリ構成

```
client-sites/
├── apps/                   # 各クライアントサイト
│   ├── hair-salon01
│   └── maharaja-night-2026
├── packages/
│   ├── components          # 共有UI・CMSエディタ部品
│   └── lib                 # Firebase/CMS/共通ユーティリティ
├── scripts/
│   └── create-app.mjs      # 新規アプリ作成スクリプト
├── docs/
│   ├── pnpm-commands.md    # pnpmコマンドマニュアル
│   ├── sites_details-01    # hair-salon01 関連資料
│   └── sites_details-02    # maharaja-night-2026 関連資料
├── package.json
└── pnpm-workspace.yaml
```

## サイト一覧

| アプリ名 | 概要 | URL | 顧客情報 |
|---|---|---|---|
| [hair-salon01](./apps/hair-salon01) | 美容室サイト / ニュースCMS | - | docs/sites_details-01 |
| [maharaja-night-2026](./apps/maharaja-night-2026) | MAHARAJA NIGHT 2026 イベントLP / 参加登録 / CMS | - | docs/sites_details-02 |

## セットアップ

```bash
# 依存関係のインストール（全アプリ共通）
pnpm install
```

## 新しいサイトを追加する

```bash
pnpm create-app サイト名
```

```bash
# 例
pnpm create-app restaurant-01
```

`apps/サイト名/` に Next.js + TypeScript + Tailwind CSS v4 の構成が生成されます。

## 開発

```bash
# 開発サーバー起動
pnpm --filter <アプリ名> dev

# 例: 美容室サイト
pnpm --filter hair-salon01 dev

# 例: マハラジャイベントサイト
pnpm --filter maharaja-night-2026 dev
```

## ビルド

```bash
# ビルド
pnpm --filter <アプリ名> build

# ビルド結果の動作確認
pnpm --filter <アプリ名> start
```

## CMS / Firebase

両アプリとも Firebase / Firestore を使った CMS または管理機能を持ちます。共通の投稿・認証ロジックは `packages/lib/src/cms`、CMS エディタ UI は `packages/components/src/cms` にあります。

```bash
# CMSユーザー作成
pnpm create-cms-user
```

現状の `create-cms-user` は `apps/hair-salon01/.env.local` を読み込みます。作成するユーザーの対象サイトは `packages/lib/scripts/create-cms-user.mjs` 内の `SITE_IDS` で管理します。

## Vercelデプロイ

各アプリをVercelに個別プロジェクトとして登録します。

| 設定項目 | 値 |
|---|---|
| Root Directory | `apps/<アプリ名>` |
| Framework Preset | Next.js（自動検出） |

詳細は [docs/pnpm-commands.md](./docs/pnpm-commands.md) を参照してください。
