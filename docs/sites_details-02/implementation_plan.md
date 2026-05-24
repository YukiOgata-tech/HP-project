# MAHARAJA NIGHT in Niigata 2026 現行実装概要・運用計画

最終更新: 2026-05-24

このドキュメントは、`apps/maharaja-night-2026` の現時点の実装状態を基準にした概要です。古い資料に含まれるPOS、会計、注文、ドリンクチケット、売上担当者記録などは、現在の公式サイト実装スコープには含めません。

## 1. プロジェクト概要

`maharaja-night-2026` は、MAHARAJA NIGHT in Niigata 2026 の公式サイト、ニュースCMS、協賛企業管理、事前チケット応募管理をまとめた Next.js アプリです。

- ワークスペース: `client-sites`
- アプリ: `apps/maharaja-night-2026`
- フレームワーク: Next.js App Router
- 言語: TypeScript
- スタイル: Tailwind CSS v4
- データ: Firebase Firestore
- 認証: Firebase Auth と管理画面用セッションCookie
- 画像管理: Firebase Storage または `public/images`
- 管理対象サイトID: `maharaja-night-2026`

## 2. 公開サイト

### ルーティング

- `/`: 公式トップページ
- `/news`: お知らせ一覧
- `/news/[slug]`: お知らせ詳細
- `/sponsors`: 協賛企業一覧
- `/pre-ticket`: 事前チケット応募フォーム
- `/pre-ticket/complete`: 応募完了、受付チケット表示
- `/pre-ticket/lookup`: 受付チケット再表示
- `not-found.tsx`: 独自404ページ

### トップページ構成

トップページは `components/HomePageClient.tsx` を中心に、以下のセクションで構成しています。

- `HeroSection`: イベント名、開催概要、3D背景、主要CTA
- `LatestNewsSection`: Firestoreの公開済み記事から最新3件を表示
- `EventOverviewSection`: 開催日、会場、料金などの概要
- `AboutSection`: イベントの雰囲気、歴史、魅力
- `GuestSection`: ゲスト出演者、DJ情報
- `VipSection`: VIP TABLE情報
- `HistorySection`: 年代別の歴史紹介。画像は横スクロールで表示
- `VenueSection`: 会場情報
- `SponsorsSection`: 協賛企業の簡易表示と一覧ページ導線
- `FaqSection`: よくある質問
- `FloatingTicketCta`: 右下固定の事前チケット応募導線

ヘッダーとフッターは `SiteHeader.tsx` と `SiteFooter.tsx` で実装しています。ヘッダーからページ内セクションへ移動する場合は、`globals.css` の `scroll-behavior: smooth` と `scroll-margin-top` によりスムーズスクロールします。

### 3D・演出

Hero背景は `components/3d/ParticleBackground.tsx` を使用しています。Three.js系の描画を崩さない方針で、警告対応は描画品質を壊さない範囲に限定します。

ページ遷移時の体感を補うため、`PublicLoadingLink.tsx` と `MaharajaLoadingOverlay.tsx` を使用しています。ローディング表示は `document.body` へのポータルで画面中央に固定され、背景は軽いblur表現です。

## 3. 事前チケット応募

### 目的

事前応募者は当日入場時に500円引きで入場できます。応募後は受付ID付きのチケット風完了画面を表示し、当日受付で提示できるようにしています。

### 公開フォーム

実装場所:

- `app/pre-ticket/page.tsx`
- `app/pre-ticket/actions.ts`
- `app/pre-ticket/FormSubmitButton.tsx`
- `app/pre-ticket/PreTicketSpamFields.tsx`

主な入力項目:

- メールアドレス
- 名前
- 性別: `MEN` / `WOMEN`
- 認知経路
- 人数
- 紹介者
- VIP TABLE希望
- 備考

料金表示:

- MEN: 通常 4,500円、事前応募後 4,000円
- WOMEN: 通常 3,500円、事前応募後 3,000円
- 割引額: 500円

### スパム対策

コードで実装済みの対策:

- honeypot項目 `website`
- フォーム表示から送信までの最短時間チェック
- IP単位の送信回数制限
- メールアドレス単位の送信回数制限
- 受付チケット再表示のIP単位回数制限
- IP、メール、トークンはハッシュまたは正規化値を併用

### 完了画面と再表示

応募成功時に `receiptId` と短時間有効な `receiptTokenHash` を発行し、`/pre-ticket/complete?token=...` に遷移します。

完了画面では以下を表示します。

- 受付ID
- 名前
- 性別
- 人数
- 応募日時
- 当日受付用の注意文
- 画像保存ボタン
- PDF保存ボタン
- トップページへ戻るボタン

再表示は `/pre-ticket/lookup` で、受付ID、メールアドレス、名前の3点一致により短時間有効な表示トークンを再発行します。

## 4. 管理画面

### ルーティング

- `/admin/login`: ログイン
- `/admin`: ダッシュボード
- `/admin/news`: お知らせ一覧
- `/admin/news/new`: お知らせ作成
- `/admin/news/[id]/edit`: お知らせ編集
- `/admin/sponsors`: 協賛企業一覧
- `/admin/sponsors/new`: 協賛企業作成
- `/admin/sponsors/[id]/edit`: 協賛企業編集
- `/admin/pre-ticket`: 事前チケット応募管理
- `/admin/pre-ticket/data`: 応募データ取得API
- `/admin/pre-ticket/export`: CSVエクスポート
- `/admin/clear-session`: セッション削除

### 認証・権限

管理画面は Firebase Auth でログインし、サーバー側で検証した後に管理用セッションCookieを発行します。ユーザー情報は Firestore の `users/{uid}` に保持します。

権限:

- `superAdmin`: 全サイトへアクセス可能
- `siteAdmin`: `siteIds` に含まれるサイトへアクセス可能
- `editor`: 編集可能
- `viewer`: 閲覧のみ

ログアウト時は、共通コンポーネント `packages/components/src/ConfirmActionModal.tsx` による確認モーダルを使用します。

### お知らせCMS

お知らせは Firestore の `sites/{SITE_ID}/posts` に保存します。本文は Tiptap JSON とHTMLの両方を保存し、公開側の記事ページでは見出し、太字、リストなどが反映されます。

主な機能:

- スラグ編集
- 公開、下書き
- タグ
- アイキャッチ画像
- リッチテキスト本文
- 作成者、更新者

### 協賛企業管理

協賛企業は Firestore の `sites/{SITE_ID}/sponsors` に保存します。現時点のFirestore上の登録数は0件ですが、管理画面と公開一覧ページは実装済みです。登録データがない場合、トップページと一覧ページでは静的な協賛名をフォールバック表示します。

主な項目:

- 企業名
- ロゴURL
- WebサイトURL
- 掲載ランク
- 表示順
- 表示、非表示

### 事前チケット管理

`/admin/pre-ticket` では、応募データの集計、一覧、CSV出力を行います。

管理画面では毎回完全取得しないよう、ブラウザの `localStorage` にキャッシュを保持します。

- キャッシュキー: `maharaja-admin-pre-ticket-cache-v1`
- 初回またはキャッシュなし: 全件取得
- 通常表示: ローカルキャッシュを優先
- 新規反映: 定期的に `since` 付きで差分取得
- 完全更新: 管理画面内の手動リロードボタンで実行
- 大量データ対策: モバイルでは「もっと見る」、PCではコンポーネント内スクロールを使用

CSVエクスポートは `/admin/pre-ticket/export` で実装しています。Excelで扱いやすいようBOM付きCSVを返します。

## 5. SEO・メタ情報

SEO関連は以下で実装しています。

- `components/seo.ts`
- `components/StructuredData.tsx`
- `app/layout.tsx`
- `app/robots.ts`
- `app/sitemap.ts`
- 各公開ページの `metadata`

主な方針:

- トップ、ニュース、協賛ページはindex対象
- 事前チケット完了、再表示など個人情報に近い画面はindex対象外
- OGP画像は `public/images/maharaja-logo-blackBG.webp` を基準に使用
- サイト名、イベント名、会場名、開催日を構造化データに含める

## 6. 現在のFirestore状態

2026-05-24にCLIで確認した状態です。個人情報は確認時に伏せています。

- Firebase project: `client-sites-38d50`
- SITE_ID: `maharaja-night-2026`
- `sites/maharaja-night-2026` 親ドキュメント: 未作成
- `sites/maharaja-night-2026/posts`: 1件
- `sites/maharaja-night-2026/sponsors`: 0件
- `sites/maharaja-night-2026/preTickets`: 1件
- `sites/maharaja-night-2026/preTicketRateLimits`: 2件
- `users`: 2件
  - `superAdmin`: 1件
  - `siteAdmin`: 1件

Firestoreでは親ドキュメントが存在しなくてもサブコレクションは利用できます。ただし管理上は `sites/{SITE_ID}` にサイトメタ情報を作成しておくと、将来の一覧管理や監査がしやすくなります。

## 7. 今後の改善候補

- `sites/{SITE_ID}` 親ドキュメントにサイト名、公開URL、イベント日、管理メタ情報を保存する
- 事前チケット応募のステータスを `pending` 以外にも拡張する
  - `checked_in`
  - `cancelled`
  - `invalid`
- 管理画面で受付済みチェック機能を追加する
- 協賛企業のロゴアップロード運用を確定する
- Firestore composite indexを本番環境で明示的に管理する
- CSVだけでなくExcel形式の `.xlsx` 出力が必要か検討する
- 受付ID再表示時のメール通知を追加する場合、メール送信ログを別コレクションで管理する

## 8. 検証コマンド

大きな変更時は以下を実行します。

```powershell
pnpm --filter maharaja-night-2026 lint
pnpm --filter maharaja-night-2026 build
```

ドキュメントのみの更新や軽微な文言修正では、毎回ビルドを回す必要はありません。
