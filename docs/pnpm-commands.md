# pnpm ワークスペース コマンドマニュアル

## リポジトリ構成

```
client-sites/               ← ここで pnpm コマンドを実行する（ルート）
├── apps/
│   ├── hair-salon01/       ← サイト1
│   └── shop-01/            ← サイト2（追加例）
├── packages/               ← 共有コード置き場（必要になったら使う）
├── pnpm-workspace.yaml
└── pnpm-lock.yaml
```

---

## 新しいサイトを追加する

### コマンド一発で作成する（推奨）

```bash
# ルート（client-sites/）で実行
pnpm create-app サイト名
```

**例:**

```bash
pnpm create-app hair-salon02
pnpm create-app restaurant-01
```

- `apps/サイト名/` に Next.js + TypeScript + Tailwind v4 の構成が自動生成される
- `pnpm install` も自動実行される
- 名前は小文字・数字・ハイフンのみ使用可

**作成後すぐ開発を始められる:**

```bash
pnpm --filter hair-salon02 dev
```

---

## 開発サーバー（プレビュー）

### 特定のアプリを起動する

```bash
# ルート（client-sites/）から実行
pnpm --filter hair-salon01 dev

# アプリのディレクトリ内から実行しても同じ
cd apps/hair-salon01
pnpm dev
```

### ポートを指定して起動

```bash
pnpm --filter hair-salon01 dev -- --port 3001
pnpm --filter shop-01 dev -- --port 3002
```

### 複数のアプリを同時に起動する

ターミナルを複数開いてそれぞれ実行する（ポートは別々に指定）。

---

## ビルド

### 特定のアプリをビルド

```bash
# ルートから
pnpm --filter hair-salon01 build

# アプリのディレクトリ内から
cd apps/hair-salon01
pnpm build
```

### ビルド結果を本番起動（確認用）

```bash
pnpm --filter hair-salon01 start
```

### 全アプリを一括ビルド

```bash
pnpm --filter "./apps/*" build
```

---

## Lint（コード品質チェック）

```bash
# 特定のアプリ
pnpm --filter hair-salon01 lint

# 全アプリ
pnpm --filter "./apps/*" lint
```

---

## パッケージの追加・削除

### 特定のアプリに追加する

```bash
# 本番依存（dependencies）
pnpm --filter hair-salon01 add パッケージ名

# 開発依存（devDependencies）
pnpm --filter hair-salon01 add -D パッケージ名

# 例：framer-motion を hair-salon01 に追加
pnpm --filter hair-salon01 add framer-motion
```

### 特定のアプリから削除する

```bash
pnpm --filter hair-salon01 remove パッケージ名
```

### 全アプリ共通で使うパッケージをルートに追加する

```bash
# ルートの package.json に追加（-w = workspace root）
pnpm add -w -D パッケージ名
```

---

## 依存関係の管理

### インストール（初回 / 他の人がリポジトリを clone した後）

```bash
# ルートで実行するだけで全アプリの依存が入る
pnpm install
```

### パッケージのアップデート

```bash
# 特定アプリの全パッケージを最新に
pnpm --filter hair-salon01 update

# バージョン指定でアップデート
pnpm --filter hair-salon01 update next@latest
```

### インストール済みパッケージの確認

```bash
# 特定アプリの依存一覧
pnpm --filter hair-salon01 list

# 全ワークスペースの依存一覧
pnpm list --recursive
```

---

## ワークスペース確認コマンド

```bash
# ワークスペースに登録されているアプリ一覧を確認
pnpm list --recursive --depth 0

# pnpm のバージョン確認
pnpm --version

# node のバージョン確認
node --version
```

---

## --filter オプションの書き方まとめ

| 書き方 | 対象 |
|---|---|
| `--filter hair-salon01` | 名前が hair-salon01 のパッケージ |
| `--filter "./apps/*"` | apps/ 以下の全パッケージ |
| `--filter "./packages/*"` | packages/ 以下の全パッケージ |
| `--filter "...hair-salon01"` | hair-salon01 とその依存パッケージ |

---

## Tailwind CSS v4 の使い方

v4 は設定ファイル不要。CSS ファイルに1行書くだけで動作する。

```css
/* app/globals.css */
@import "tailwindcss";
```

### カスタムカラーなどを追加したい場合

```css
/* app/globals.css */
@import "tailwindcss";

@theme {
  --color-brand: #e91e8c;
  --font-sans: "Noto Sans JP", sans-serif;
}
```

クラスは通常通り使える：`bg-brand`, `text-brand` など。

---

## よくあるエラー

### `pnpm install` 後もモジュールが見つからない

```bash
# node_modules を削除して再インストール
rm -rf node_modules apps/*/node_modules
pnpm install
```

### ポートが使用中

```bash
# 別ポートで起動
pnpm --filter hair-salon01 dev -- --port 3001
```
