# Repository Guidelines

## Project Structure & Module Organization
このリポジトリは、クライアント向け Next.js サイトを管理する `pnpm` ワークスペースです。アプリ本体は `apps/` 配下にあり、現在の対象アプリは `apps/hair-salon01` です。App Router の実装は `app/`、静的アセットは `public/` に配置します。共通ロジックは `packages/lib/src`、再利用可能な UI や CMS エディタ部品は `packages/components/src` に置きます。リポジトリ共通のスクリプトは `scripts/`、運用メモは `docs/` を参照してください。

## Build, Test, and Development Commands
特に記載がない限り、コマンドはリポジトリルートで実行します。

- `pnpm install`: ワークスペース全体の依存関係をインストールします。
- `pnpm create-app <site-name>`: `apps/` 配下に新規サイトを生成します。
- `pnpm --filter hair-salon01 dev`: Next.js の開発サーバーを起動します。
- `pnpm --filter hair-salon01 build`: 本番ビルドを作成します。
- `pnpm --filter hair-salon01 start`: ビルド済みアプリをローカルで起動します。
- `pnpm --filter hair-salon01 lint`: 対象サイトに対して ESLint を実行します。
- `pnpm create-cms-user`: `apps/hair-salon01/.env.local` を使って CMS ユーザーを作成します。

## Coding Style & Naming Conventions
実装言語は TypeScript を前提とし、既存コードに合わせて 2 スペースインデントを維持してください。共通ユーティリティやコンポーネントは named export を優先します。React コンポーネントは `Header.tsx` のような `PascalCase`、関数・変数は `camelCase`、アプリやパッケージのディレクトリ名は `hair-salon01` のような `kebab-case` を使います。Next.js のルート関連ファイルは `page.tsx`、`layout.tsx`、`route.ts` の慣例に従ってください。PR 作成前に `pnpm --filter hair-salon01 lint` を実行します。

## Testing Guidelines
現時点では、このワークスペースに専用の自動テストスイートはありません。そのため、変更時は対象アプリで `lint` と `build` を通し、加えてローカル開発環境で手動確認を行ってください。新たにテストを追加する場合は、対象機能の近くに `*.test.ts` または `*.test.tsx` として配置し、変更したアプリまたはパッケージに閉じた構成にします。

## Commit & Pull Request Guidelines
最近の履歴では `setup updated` や `blog` のように、短く内容が分かるコミットメッセージが使われています。コミット件名は簡潔かつ具体的にし、必要に応じて `hair-salon01 hero polish` のように対象アプリや機能名を含めてください。PR には概要、変更対象パス、実行した確認コマンド、UI 変更時のスクリーンショットを含めます。Firebase、Vercel、CMS 設定に影響する変更は、PR 本文で明示してください。

## Security & Configuration Tips
ローカル用のシークレットを設定する際は `.env.local.example` をコピーして使い、値の入った `.env.local` は絶対にコミットしないでください。`firestore.rules`、`storage.rules`、および `packages/lib/src/cms` の Firebase Admin 関連コードは権限影響の大きい領域です。アクセス制御に関わる変更を行った場合は、PR に影響範囲を必ず記載してください。
