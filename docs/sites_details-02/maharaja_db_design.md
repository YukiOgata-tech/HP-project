# MAHARAJA NIGHT in Niigata 2026 Firestore DB設計

最終更新: 2026-05-24

このドキュメントは、`apps/maharaja-night-2026` の現行実装に基づく Firestore 設計です。旧資料にあった `events`、`venues`、`orders`、`payments`、`drink_tickets` などのPOS・会計系テーブル設計は、現在の公式サイト、CMS、事前チケット応募管理には採用していません。

## 1. 全体構成

現行実装は、サイトごとのデータを `sites/{SITE_ID}` 配下にまとめます。

```txt
users/{uid}
sites/{siteId}
  posts/{postId}
  sponsors/{sponsorId}
  preTickets/{ticketId}
  preTicketRateLimits/{rateLimitId}
```

現在の `SITE_ID` は `maharaja-night-2026` です。

Firestoreでは、親ドキュメント `sites/maharaja-night-2026` が存在しなくてもサブコレクションを作成できます。CLI確認時点では親ドキュメントは未作成ですが、サブコレクションは利用されています。

## 2. users

管理画面ログイン後の権限判定に使用します。

Path:

```txt
users/{uid}
```

Schema:

```ts
type Role = "superAdmin" | "siteAdmin" | "editor" | "viewer";

interface CmsUserDocument {
  email: string;
  displayName: string;
  role: Role;
  siteIds: string[];
  createdAt: FirebaseFirestore.Timestamp;
  updatedAt: FirebaseFirestore.Timestamp;
}
```

権限ロジック:

- `superAdmin`: 全サイトにアクセス可能
- `siteAdmin` / `editor`: `siteIds` に含まれるサイトへアクセス可能
- `viewer`: 閲覧のみ。`canEdit` では編集不可

現状:

- `users`: 2件
- `superAdmin`: 1件
- `siteAdmin`: 1件
- `siteIds` に `maharaja-night-2026` を含むユーザー: 1件

## 3. sites

サイト単位の親ドキュメントです。

Path:

```txt
sites/{siteId}
```

現時点では `sites/maharaja-night-2026` 親ドキュメントは未作成です。サブコレクションは存在します。

将来的に作成する場合の推奨Schema:

```ts
interface SiteDocument {
  name: string;
  domain: string;
  eventDate: string;
  venueName: string;
  status: "draft" | "published" | "archived";
  createdAt: FirebaseFirestore.Timestamp;
  updatedAt: FirebaseFirestore.Timestamp;
}
```

## 4. posts

お知らせCMSの記事データです。

Path:

```txt
sites/{siteId}/posts/{postId}
```

Schema:

```ts
interface PostDocument {
  title: string;
  slug: string;
  excerpt: string;
  content: JSONContent;
  contentHtml: string;
  status: "draft" | "published";
  coverImageUrl: string;
  tags: string[];
  publishedAt: FirebaseFirestore.Timestamp | null;
  createdAt: FirebaseFirestore.Timestamp;
  updatedAt: FirebaseFirestore.Timestamp;
  createdBy: string;
  updatedBy: string;
}
```

主な用途:

- 公開記事一覧
- 公開記事詳細
- トップページ最新お知らせ
- 管理画面の記事作成、編集、削除
- サイトマップ生成

主なクエリ:

```ts
// 公開記事一覧
where("status", "==", "published")
orderBy("publishedAt", "desc")
limit(n)

// 公開記事詳細
where("slug", "==", slug)
where("status", "==", "published")
limit(1)

// 管理画面一覧
orderBy("updatedAt", "desc")
```

現状:

- 件数: 1件
- 公開記事: `MAHARAJA NIGHT in Niigata 2026、今年も開催決定！`
- slug: `maharaja-night-2026-announcement`
- status: `published`
- publishedAt: `2026-05-23T01:00:00.000Z`
- coverImageUrl: `https://hp-project-maharaja-night-2026.vercel.app/images/maharaja-logo-blackBG.webp`

## 5. sponsors

協賛企業データです。

Path:

```txt
sites/{siteId}/sponsors/{sponsorId}
```

Schema:

```ts
interface SponsorDocument {
  name: string;
  logoUrl: string;
  websiteUrl: string;
  tier: string;
  order: number;
  isActive: boolean;
  createdAt: FirebaseFirestore.Timestamp;
  updatedAt: FirebaseFirestore.Timestamp;
}
```

主な用途:

- トップページの協賛企業セクション
- `/sponsors` の協賛企業一覧
- 管理画面での協賛企業追加、編集、削除

主なクエリ:

```ts
// 公開側
where("isActive", "==", true)
orderBy("order", "asc")

// 管理画面
orderBy("order", "asc")
```

現状:

- 件数: 0件

登録がない場合、公開側では `components/eventData.ts` の静的協賛名をフォールバック表示します。

## 6. preTickets

事前チケット応募データです。

Path:

```txt
sites/{siteId}/preTickets/{ticketId}
```

Schema:

```ts
interface PreTicketDocument {
  email: string;
  name: string;
  normalizedEmail: string;
  normalizedName: string;
  receiptId: string;
  receiptTokenHash: string;
  receiptTokenExpiresAt: FirebaseFirestore.Timestamp;
  gender: "MEN" | "WOMEN";
  source: string;
  sourceOther: string;
  numberOfPeople: number;
  referrer: string;
  vipTable: string;
  note: string;
  discountAmount: number;
  requestIpHash: string;
  status: "pending";
  createdAt: FirebaseFirestore.Timestamp;
  updatedAt: FirebaseFirestore.Timestamp;
}
```

受付ID:

```txt
MN2026-XXXXXXXX
```

`XXXXXXXX` はランダムな16進文字列です。

主な用途:

- 応募フォーム送信
- 応募完了チケット表示
- 受付ID、メール、名前によるチケット再表示
- 管理画面での応募一覧、集計、CSV出力

主なクエリ:

```ts
// 管理画面の完全取得
orderBy("createdAt", "desc")

// 管理画面の差分取得
where("createdAt", ">", new Date(since))
orderBy("createdAt", "desc")

// 受付チケット再表示
where("receiptId", "==", receiptId)
limit(1)

// 完了画面の短時間トークン表示
where("receiptTokenHash", "==", hashKey(token))
limit(1)
```

現状:

- 件数: 1件
- status: `pending`
- gender: `MEN`
- source: `チラシ`
- vipTable: `不要`
- discountAmount: `500`

個人情報にあたる `email`、`name`、正規化値、トークンハッシュ、IPハッシュは、ドキュメント化や調査共有時には伏せます。

## 7. preTicketRateLimits

事前チケット応募と受付チケット再表示のレート制限用データです。

Path:

```txt
sites/{siteId}/preTicketRateLimits/{rateLimitId}
```

Document ID:

```txt
{kind}_{sha256(value)}
```

Schema:

```ts
type PreTicketRateLimitKind = "ip" | "email" | "lookup_ip";

interface PreTicketRateLimitDocument {
  kind: PreTicketRateLimitKind;
  count: number;
  windowStart: number;
  updatedAt: FirebaseFirestore.Timestamp;
}
```

現行制限:

- 応募IP: 1時間に5回まで
- 応募メール: 24時間に3回まで
- 再表示IP: 1時間に20回まで

現状:

- 件数: 2件
- `kind = "ip"`: 1件
- `kind = "email"`: 1件

## 8. Firebase Storage

画像アップロードは `packages/lib/src/cms/firebase-client.ts` の `uploadImageToStorage` を使用します。

保存パス:

```txt
{siteId}/images/{timestamp}-{random}.{ext}
```

用途:

- お知らせアイキャッチ画像
- 協賛企業ロゴ画像

既存の静的画像は `apps/maharaja-night-2026/public/images` 配下に置きます。

## 9. 管理画面キャッシュ

`/admin/pre-ticket` は応募データが増える前提のため、毎回全件取得せずブラウザ側にキャッシュを持ちます。

キャッシュ:

```txt
localStorage key: maharaja-admin-pre-ticket-cache-v1
```

挙動:

- キャッシュがあればまずローカルデータを表示
- 30秒ごとに `since` 付きで差分取得
- 管理者が「完全更新」を押した場合のみ全件取得
- CSVエクスポート時はサーバー側でFirestoreから取得

## 10. インデックス注意点

現行クエリから、以下はFirestoreの複合インデックスが必要になる可能性があります。

```txt
sites/{siteId}/posts:
  status ASC, publishedAt DESC

sites/{siteId}/sponsors:
  isActive ASC, order ASC

sites/{siteId}/preTickets:
  createdAt DESC
  createdAt ASC/DESC with createdAt range query
```

Next.js実行時にFirestoreからインデックス作成URLが出た場合は、そのURLから本番プロジェクトにインデックスを作成します。

## 11. CLI確認結果

2026-05-24 に、`apps/maharaja-night-2026/.env.local` のFirebase Admin設定を使ってCLI確認しました。

```txt
Firebase project: client-sites-38d50
SITE_ID: maharaja-night-2026
sites/maharaja-night-2026 parent document: not found
posts: 1
sponsors: 0
preTickets: 1
preTicketRateLimits: 2
users: 2
```

確認には `firebase-admin` を使用し、個人情報とハッシュ値は出力時に伏せました。
