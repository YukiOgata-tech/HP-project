# CMS ユーザー管理ガイド

このリポジトリの Firebase CMS に登録するユーザーの作成・更新・削除手順と、ロール設計の方針をまとめています。新規クライアントサイトの追加時もこのガイドに沿って運用してください。

---

## ロール設計

| ロール | 記事作成 | 記事編集 | 記事削除 | ユーザー管理 | アクセス範囲 |
|---|:---:|:---:|:---:|:---:|---|
| `superAdmin` | ✅ | ✅ | ✅ | ✅ | 全サイト（siteIds 不問） |
| `siteAdmin`  | ✅ | ✅ | ✅ | ❌ | `siteIds` に列挙したサイトのみ |
| `editor`     | ✅ | ✅ | ❌ | ❌ | `siteIds` に列挙したサイトのみ |
| `viewer`     | ❌ | ❌ | ❌ | ❌ | 下書き閲覧のみ |

**運用方針**
- `superAdmin` はシステム保守・監視目的の技術担当者のみに付与する
- クライアントのサイトオーナーには原則 `siteAdmin` を付与する（記事の削除権限を持つ）
- 記事担当スタッフには `editor` を付与する
- `superAdmin` の `siteIds` は空配列でよい（全サイトにアクセスできる）

---

## 前提条件

スクリプトは `packages/lib` 配下にある `firebase-admin` を使用します。実行には Firebase Admin の認証情報が必要です。

認証情報は `apps/<任意のサイト名>/.env.local` に以下の形式で記載してください：

```env
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

取得方法：Firebase コンソール → プロジェクト設定 → サービスアカウント → 「新しい秘密鍵を生成」

> 現在のデフォルト参照先：`apps/hair-salon01/.env.local`  
> 別のファイルを参照する場合は `packages/lib/package.json` の `--env-file` パスを変更してください。

---

## コマンド一覧

すべてのコマンドは **リポジトリルートで実行** します。

### ユーザーを作成する

```bash
pnpm manage-cms-user create \
  --email   ユーザーのメールアドレス \
  --password 初期パスワード（8文字以上） \
  --name    "表示名" \
  --role    ロール \
  --sites   サイトID（カンマ区切り）
```

**例1：サイトオーナー（siteAdmin）を登録する**
```bash
pnpm manage-cms-user create \
  --email owner@salon.com \
  --password "ChangeMe2026!" \
  --name "山田 花子" \
  --role siteAdmin \
  --sites hair-salon01
```

**例2：記事担当スタッフ（editor）を登録する**
```bash
pnpm manage-cms-user create \
  --email staff@salon.com \
  --password "ChangeMe2026!" \
  --name "佐藤 太郎" \
  --role editor \
  --sites hair-salon01
```

**例3：複数サイトにアクセスできる editor を登録する**
```bash
pnpm manage-cms-user create \
  --email writer@agency.com \
  --password "ChangeMe2026!" \
  --name "Agency Writer" \
  --role editor \
  --sites hair-salon01,maharaja-night-2026
```

**例4：保守担当の superAdmin を登録する**
```bash
pnpm manage-cms-user create \
  --email admin@make-it-tech.com \
  --password "ChangeMe2026!" \
  --name "Make It Tech Admin" \
  --role superAdmin
```
> `superAdmin` は `--sites` を省略可能（全サイトへのアクセスが自動付与されます）

---

### ユーザー情報を更新する

```bash
pnpm manage-cms-user update \
  --email 対象ユーザーのメールアドレス \
  [--role 新しいロール] \
  [--sites 新しいサイトID（カンマ区切り）] \
  [--name "新しい表示名"]
```

**例1：新しいサイトへのアクセスを追加する**
```bash
pnpm manage-cms-user update \
  --email owner@salon.com \
  --sites hair-salon01,new-restaurant-01
```

**例2：ロールを editor から siteAdmin に昇格する**
```bash
pnpm manage-cms-user update \
  --email staff@salon.com \
  --role siteAdmin
```

**例3：表示名を変更する**
```bash
pnpm manage-cms-user update \
  --email owner@salon.com \
  --name "鈴木 花子"
```

> `--sites` を上書きすると既存のサイトIDが**置き換わります**（追加ではなく置換）。  
> 既存のサイトに追加したい場合は、現在のサイトIDも含めて指定してください。

---

### 全ユーザーを一覧表示する

```bash
pnpm manage-cms-user list
```

出力例：
```
UID                            Email                               Role         SiteIDs
──────────────────────────────────────────────────────────────────────────────────────
abc123...                      info@make-it-tech.com               superAdmin   （全サイト）
def456...                      owner@salon.com                     siteAdmin    hair-salon01
```

---

### ユーザーを削除する

```bash
pnpm manage-cms-user delete --email 削除するメールアドレス
```

> Firebase Auth と Firestore の両方からドキュメントを削除します。  
> 削除は取り消せません。実行前に `list` コマンドで対象を確認してください。

---

## 新規クライアントサイトを追加する際の手順

1. `pnpm create-app <新サイト名>` で Next.js アプリを生成する
2. Firebase コンソールで新サイト用の Firestore コレクション（`sites/<サイト名>`）を確認する
3. サイトオーナーのユーザーを作成する：
   ```bash
   pnpm manage-cms-user create \
     --email owner@newsite.com \
     --password "ChangeMe2026!" \
     --name "オーナー名" \
     --role siteAdmin \
     --sites new-site-name
   ```
4. 保守用 superAdmin ユーザーに新サイトのアクセスは不要（ロールで自動許可）
5. `firestore.rules` と `firestore.indexes.json` に新サイトのコレクション設定を追加してデプロイする

---

## 現在の登録ユーザー

| Email | Role | アクセス可能サイト | 用途 |
|---|---|---|---|
| info@make-it-tech.com | superAdmin | 全サイト | 保守・監視用（Make It Tech） |
| *(hair-salon01 オーナー)* | siteAdmin | hair-salon01 | サイトオーナー |

> 上記テーブルは手動で更新してください。正確な一覧は `pnpm manage-cms-user list` で確認できます。

---

## セキュリティ上の注意

- 初期パスワードは必ず初回ログイン後に変更するよう依頼する
- パスワードはコマンド履歴に残るため、実行後は `history -c`（bash）または PowerShell の場合 `Clear-History` を実行することを推奨
- `.env.local` ファイルは絶対に Git にコミットしない
- `superAdmin` は技術担当者のみに付与し、クライアントには付与しない
- ユーザーが退職・契約終了した場合は速やかに `delete` コマンドで削除する
