# MAHARAJA NIGHT in Niigata 2026 統合イベントシステム 開発方針書

本方針書は、pnpmモノレポ `client-sites` 内に新規のWebアプリケーション（Next.js 16 + Tailwind CSS v4 + TypeScript）を追加し、**「MAHARAJA NIGHT in Niigata 2026」** のプレミアム公式サイト、Googleフォームから移行した統合申込フォーム、および複数年・マルチイベント展開を見据えた統合管理画面を構築するための計画書です。

> [!WARNING]
> **【他のAIエージェント・協働エージェント向け重要警告指示】**
> 本プロジェクトのスコープは**「公式HP（フロントエンドLP ＋ 統合申込 ＋ CMS管理画面）」のみ**です。
> `C:\projects\client-sites\docs\sites_details-02\` フォルダ内の資料（特に `maharaja_db_design.md` や `event_dev_policy.md`）に記載されている**「会計システム（payments）」「売上担当者記録（sales_credits）」「ドリンクチケット消化記録（drink_tickets）」「操作ログ（audit_logs）」などのPOS・会計関連の仕様およびデータベース設計は、今回の実装から完全に【無視・除外】してください。**
> 他のエージェントが混乱し、不要な会計ロジックやPOS機能を構築しようとすることを防ぐため、本プロジェクトの第一優先は「公式HP」であることを徹底します。

---

## 1. システム全体設計

### 🌐 公開側サイト（Public Site）のルーティング
* **TOP/ABOUT/HISTORY/GUEST/VIP/FAQ**: `app/page.tsx` (リッチアニメーションLP)
* **お知らせ一覧**: `app/news/page.tsx` (Firestoreから記事データを取得)
* **お知らせ詳細**: `app/news/[slug]/page.tsx` (スラグによる個別記事ページ。SNS/LINEシェア用の動的OGP対応)
* **事前申込**: `app/register/page.tsx` (一般・VIP向けの統合申込フォーム。質問内容は後日追加)

### 🔒 管理側サイト（Admin Console）のルーティング
* **管理画面ログイン**: `app/admin/login/page.tsx`
* **管理画面ダッシュボード**: `app/admin/page.tsx`
  * **申込集計**: リアルタイムな申込者数・男女比・VIP予約数の一覧・検索・CSV出力。当日の「チェックイン（受付済）」機能。
  * **お知らせ投稿（CMS）**: スラグ編集、リッチエディタ、ステータス（下書き/公開）切り替え、アイキャッチ画像のアップロード。
  * **協賛企業（Sponsor）管理**: 協賛企業の新規追加・編集・表示有無（`isActive`）の切り替え・リンク先URL設定・ティア（プラチナ/ゴールド/一般）と並び順の設定。

---

## 2. データベース（Firestore）設計

複数年度・他イベントへの展開に耐えうるよう、**「イベントドキュメント配下のサブコレクション方式」**を採用します。

### 📁 階層構造とフィールド定義

#### ① events (イベント親コレクション)
* Path: `/events/{event_id}` (例: `mn-niigata-2026`)
* **メインサイト（公式HP）の制御・設定を司るドキュメント構造**です。
```typescript
interface Event {
  id: string;            // イベントID (例: "mn-niigata-2026")
  name: string;          // イベント名 (例: "MAHARAJA NIGHT in Niigata 2026")
  slug: string;          // サブドメインやURL用の識別子 (例: "niigata-2026")
  eventDate: string;     // 開催日 (例: "2026-10-24")
  startTime: string;     // 開始時間 (例: "18:00")
  endTime: string;       // 終了時間 (例: "01:00")
  venueName: string;     // 会場名 (例: "STUDIO NEXS")
  venueAddress: string;  // 会場住所 (例: "新潟市中央区万代1-3-1")
  ticketInfo: {
    menPrice: number;    // 男性会費 (例: 4500)
    womenPrice: number;  // 女性会費 (例: 3500)
    vipCharge: number;   // VIPテーブルチャージ (例: 50000)
  };
  status: "draft" | "published" | "archived"; // イベント公開状態
  socialLinks: {
    instagram?: string;
    twitter?: string;
    line?: string;
  };
  seoConfig: {
    title: string;       // 公式HPのSEOタイトル
    description: string; // メタ説明文
    ogImage: string;     // OGP用画像URL
  };
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

#### ② posts (お知らせサブコレクション)
* Path: `/events/{event_id}/posts/{post_id}`
```typescript
interface Post {
  id: string;
  title: string;
  slug: string;        // URL用のユニークな識別子 (例: "guest-marc-panther")
  excerpt: string;     // 要約
  content: string;     // 本文
  status: "draft" | "published";
  coverImageUrl: string;
  publishedAt: Timestamp | null;
  createdAt: Timestamp;
}
```

#### ③ sponsors (協賛企業サブコレクション)
* Path: `/events/{event_id}/sponsors/{sponsor_id}`
```typescript
interface Sponsor {
  id: string;
  name: string;          // 企業名 (例: "アサヒビール")
  logoUrl: string;       // ロゴのFirebase Storageパス
  websiteUrl: string;    // 公式サイトへの導線URL
  tier: "platinum" | "gold" | "regular"; // 掲載ランク
  displayOrder: number;  // 表示順
  isActive: boolean;     // 表示・非表示のトグルスイッチ
  createdAt: Timestamp;
}
```

#### ④ registrations (申込者サブコレクション)
* Path: `/events/{event_id}/registrations/{reg_id}`
```typescript
interface Registration {
  id: string;
  name: string;          // 申込者名
  email: string;
  phone: string;
  gender: "male" | "female";
  type: "general" | "vip";
  numberOfPeople: number;
  referralStaff: string; // 紹介オーガナイザー名
  checkInStatus: "pending" | "checked_in"; // 当日の受付状態
  checkedInAt: Timestamp | null;
  answers: Record<string, any>; // 後日決定するフォーム質問回答
  createdAt: Timestamp;
}
```

---

## 3. アカウントセキュリティ & 権限設計

<h3>💼 共通ライブラリ（@client-sites/lib）を用いたセキュアな設計</h3>

#### 👑 スーパー管理者（info@make-it-tech.com）の特権アクセス
* **設計**:
  Firestore の `/users` コレクションにおいて、`info@make-it-tech.com` アカウントの `role` に **`"superAdmin"`** を付与します。
* **挙動**:
  モノレポ全体の共通認証チェックロジック（`hasSiteAccess`）により、個別のサイトID制限をバイパスし、**モノレポ内のすべての現行・将来の管理画面へ無制限にアクセス可能**とします。

#### 🏢 個別イベント管理者の分離
* **設計**:
  本イベント専用の管理者の `role` を **`"siteAdmin"`**（または `"editor"`）に設定し、`siteIds` に **`["maharaja-night-2026"]`** のみを格納します。
* **挙動**:
  この管理者は、美容室（`hair-salon01`）など他アプリの管理画面には一切アクセスできず、本イベントのデータのみがセキュアに隔離されて表示されます。

---

## 4. デザインシステム & 3Dビジュアル方針

マハラジャの歴史と「非日常の狂熱」を表現するため、視覚的アピールを極限まで高めた**3Dアニメーション・3D表現**を随所に取り入れたリッチなデザインシステムを構築します。

* **3Dビジュアル表現（WebGL / HTML5 Canvas）**:
  * **Heroセクションバックグラウンド**:
    カスタムの3Dパーティクルシステム（Three.jsまたはWebGL/Canvasによる軽量レンダリング）を実装。ユーザーの**マウスの動きに追従して奥行きが傾く、立体的なゴールドグリッター＆レーザーライトの3D星雲エフェクト**を描画します。
  * **立体的な3Dミラーボール表現**:
    CSS 3D回転およびCanvasにより、輝くミラーボールの立体的な回転と光の反射エフェクトを表現し、ファーストビューで強烈なインパクトを与えます。
* **CSS 3D Perspective（立体インタラクション）**:
  * **3D Tilt カードエフェクト (Framer Motion / CSS 3D Transforms)**:
    ゲストDJカードやVIPテーブルのプランカードにホバーした際、マウスの角度に合わせてカードが立体的に傾く（3D Tilt）エフェクトを実装。要素が画面から浮き上がって見えるような視覚的深度を持たせます。
  * **3D パララックススクロール**:
    ページスクロールに合わせて、手前のゴールドロゴ、中景のテキスト、背景の3Dパーティクルが異なる深度でスライドし、圧倒的な立体感を演出します。
* **カラーパレット**:
  * **Base**: 深い漆黒（`#0B080A`）とダークバイオレット（`#19121E`）
  * **Accent**: 豪華絢爛なゴールド（`#D4AF37` / `#F3E5AB`）
  * **Neon (Glow)**: クラブシーンを彩るネオンピンク（`#FF2E93`）とレーザーブルー（`#00E5FF`）

---

## 5. 検証プラン

### 🧪 自動・静的テスト
* モノレポ全体および `maharaja-night-2026` 内での `pnpm run build` を実行し、TypeScriptのコンパイルおよびNext.jsビルドがエラーなく100%成功することを保証します。

### 📱 実機・表示テスト
* **3Dパフォーマンス・フレームレート検証**: Chromeデベロッパーツール等で、3D/WebGLパーティクルがモバイル端末および低スペック端末においてスムーズに（ターゲット60fps以上）動作するか負荷検証を行います。
* **SEO OGPテスト**: 個別お知らせページ（`/news/[slug]`）にメタ情報が正しく挿入されているかを確認します。
* **フォームバリデーション**: 不正な値の入力時、Firestoreへの送信がブロックされ、適切なユーザー向けエラーフィードバックが表示されるか確認します。
* **マルチアクセス確認**: 異なるアカウントでログインし、期待通り権限が分離されているか（スーパー管理者は全アクセス可能、一般管理者はイベントのみ可能）を確認します。
