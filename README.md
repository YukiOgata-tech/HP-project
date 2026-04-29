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
│   └── ...
├── packages/               # 共有コード（UIコンポーネント等）
├── scripts/
│   └── create-app.mjs      # 新規アプリ作成スクリプト
├── docs/
│   └── pnpm-commands.md    # pnpmコマンドマニュアル
├── package.json
└── pnpm-workspace.yaml
```

## サイト一覧

| アプリ名 | 概要 | URL | 顧客情報 |
|---|---|---|---|
| [hair-salon01](./apps/hair-salon01) | 美容室サイト | - | - |

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

# 例
pnpm --filter hair-salon01 dev
```

## ビルド

```bash
# ビルド
pnpm --filter <アプリ名> build

# ビルド結果の動作確認
pnpm --filter <アプリ名> start
```

## Vercelデプロイ

各アプリをVercelに個別プロジェクトとして登録します。

| 設定項目 | 値 |
|---|---|
| Root Directory | `apps/<アプリ名>` |
| Framework Preset | Next.js（自動検出） |

詳細は [docs/pnpm-commands.md](./docs/pnpm-commands.md) を参照してください。
