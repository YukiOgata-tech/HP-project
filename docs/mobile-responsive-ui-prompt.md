# Mobile Responsive UI Prompt

このドキュメントは、デジシフのUIを改善するエージェントへ共有するための指示プロンプトです。目的は、一般的なWebページではなく「スマホアプリの画面」の密度感と、デジシフらしい営業訴求の強さを両立することです。

## Copy Prompt

あなたはデジシフのUIを改善するフロントエンドエンジニアです。対象ページまたは対象コンポーネントのモバイルレスポンシブを、Webサイト的な余白多めの構成ではなく、スマホアプリの画面に近い密度感へ調整してください。

特にトップページやLP系では、単に綺麗なカードを並べるだけでは弱いです。実務の痛み、導入後の変化、数字や成果が一瞬で伝わる構成にしてください。

## Core Direction

- モバイルを先に設計し、`sm:` 以上でPC向けに拡張する。
- モバイルでは縦スクロールを増やしすぎない。情報を削るか、2列化するか、文を短くする。
- 余白は詰める。`p-4`、`gap-4`、大きな角丸、強い影をモバイルに直接使わない。
- 説明文より、現場の悩みや成果が伝わる短い言葉を優先する。
- 見出しは単一サイズにしない。重要語を大きく、助詞・接続語・補助語を `span` で小さくして強弱を作る。
- PC表示の高級感は維持するが、モバイルで間延びしないことを優先する。

## Text & Copy Rules

LPや訴求セクションでは、文章は説明的にしすぎないでください。

良い方向:

- `希望回収`
- `未提出確認`
- `転記`
- `共有ミス`
- `3分台運用へ`
- `1画面で追える`
- `店舗規模に合わせて、プランを選択`

悪い方向:

- 長い機能説明をそのまま本文に入れる。
- 「要確認」など機能名だけを強調し、オーナーが得る成果に接続しない。
- きれいだが刺さらない抽象文で終わる。

## Heading Style

見出しは、主役の単語を大きく見せ、助詞や補助語は `span` でサイズを落としてください。

```tsx
<h1 className="text-4xl font-black leading-[1.03] sm:text-6xl">
  店舗<span className="text-lg sm:text-xl">の</span>シフト管理<span className="text-lg sm:text-xl">を、</span><br />
  提出<span className="text-lg sm:text-xl">から</span>共有<span className="text-lg sm:text-xl">まで</span><br />
  <span className="text-emerald-700">一気通貫に。</span>
</h1>
```

```tsx
<h3 className="text-base font-bold leading-tight sm:text-3xl">
  希望回収<span className="text-xs sm:text-xl">から</span>整形<span className="text-xs sm:text-xl">まで、</span>3分台運用へ。
</h3>
```

この表現により、モバイルでも見出しのリズムと訴求力を維持します。

## Mobile Sizing Rules

- セクション余白: `py-6`〜`py-8` を基準。PCは `sm:py-16`〜`sm:py-24`。
- コンテナ横余白: `px-3`〜`px-4` を基準。PCは `sm:px-8`。
- カード余白: `p-2`〜`p-3` を基準。PCは `sm:p-5`〜`sm:p-7`。
- カード間隔: `gap-1`〜`gap-2` を基準。PCは `sm:gap-3`〜`sm:gap-6`。
- ラベル: `text-[10px]`～。
- 補足文: `text-xs`〜`text-sm`。
- 本文: `text-sm` を基準。
- 大見出し: `text-2xl`〜`text-4xl`。助詞は `span` で小さくする。
- CTA高さ: `h-9` を基準。PCは `sm:h-11`〜`sm:h-12`。
- アイコン: `size-3.5`〜`size-4` を基準。PCのみ `sm:size-5` 以上へ拡大する。
- 角丸: モバイルは `rounded-xl`〜`rounded-2xl`。PCは `sm:rounded-4xl` でもよい。
- 影: モバイルは控えめ。PCで `sm:shadow-2xl` などに拡張する。

## Layout Rules

- モバイルでカードが1列で長く続く場合は、2列化を検討する。
- 小型ステータス、料金カード、Before項目、機能チップは `grid-cols-○○` を積極的に使う。
- PCの情報量をそのままモバイルに持ち込まない。補足文を短くし、重要語を残す。
- タップ領域は確保しつつ、ボタンやカードを大きくしすぎない。
- 背景装飾やグラデーションは残してよいが、モバイルではコンテンツ領域を圧迫しないサイズにする。

## Landing Page Persuasion Pattern

トップページや紹介セクションでは、以下の流れを優先してください。

1. 現場の痛みを短い言葉で示す。
2. デジシフでどう変わるかを見せる。
3. 数字や成果で印象付ける。
4. 機能詳細は補助として置く。

例:

- Before: `個別LINEや用紙で希望回収`
- After: `希望提出 → 未提出確認 → 土台作成 → 公開･共有`
- Result: `3分台運用へ`

## Bad Patterns

- モバイルで `p-6`、`gap-4`、`text-lg` を直接使う。
- 1画面に1〜2項目しか見えないほどカードが大きい。
- 説明文が長く、スクロール量が増える。
- 全部同じ文字サイズで、見出しにリズムがない。
- きれいなだけで、飲食店オーナーや店長が使いたくなる理由が弱い。
- 機能名だけを強調し、時間削減や管理負担削減に接続していない。

## Preferred Pattern

```tsx
<section className="py-7 sm:py-24">
  <div className="mx-auto max-w-7xl px-3 sm:px-8">
    <div className="grid gap-2 sm:gap-6 lg:grid-cols-2">
      <article className="rounded-2xl p-3 shadow-xl sm:rounded-[2.5rem] sm:p-7 sm:shadow-2xl">
        <p className="text-[10px] font-black uppercase tracking-[0.18em] sm:text-sm">
          Owner story
        </p>
        <h2 className="mt-1 text-2xl font-black leading-tight sm:text-5xl">
          シフト作成<span className="text-lg sm:text-2xl">の</span>作業<span className="text-lg sm:text-2xl">を、</span>
          <br />人員管理<span className="text-lg sm:text-2xl">の</span>負担<span className="text-lg sm:text-2xl">を、</span>削減。
        </h2>
        <p className="mt-1 text-xs font-bold leading-5 sm:mt-4 sm:text-base sm:leading-7">
          重いのは「希望回収･抜け確認･転記」。店長が調整に時間を割かない環境を提供します。
        </p>
      </article>
    </div>
  </div>
</section>
```

## Verification

実装後は対象ファイルを確認し、必要なら `npx tsc --noEmit` で型チェックしてください。小さなCSS調整のみなら、毎回ビルドまでは不要です。
