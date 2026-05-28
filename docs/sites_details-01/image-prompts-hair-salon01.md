# RISPLENDERE BROLETTO — デザイン画像 生成プロンプト集

## 前提

- **CSS背景はすべてCSS（グラデーション・疑似要素・clip-path等）で構築** → 画像ファイル不要
- このプロンプト集は、CSSでは作れない**装飾的デザイン画像**（`<img>` 要素として配置）のみ対象
- ヘアスタイル写真・スタイリスト写真・サロン内装写真はサロン側と別途準備

---

## サイトデザイントーン（画像に求める空気感）

| 要素 | 方針 |
|---|---|
| カラー | 白・黒・グレーのモノクローム |
| 質感 | ハイコントラスト・ミニマル・エディトリアル |
| 形状 | 角丸なし・幾何学・建築的 |
| 避けること | 暖色・ふわっと系・ビンテージ・過剰な装飾 |

---

## 画像一覧（装飾デザイン用）

| ファイル名 | 用途・配置場所 | 比率 | 優先度 |
|---|---|---|---|
| `deco-ink-01.jpg` | Heroセクション 右側の縦長アクセント装飾 | 9:16 | ★★★ |
| `deco-ink-02.jpg` | Conceptセクション 左背面の縦長装飾 | 9:16 | ★★ |
| `deco-line-wide.jpg` | セクション見出しの下線アクセント（超横長） | 16:2 | ★★ |
| `deco-geo-01.jpg` | Promiseセクション 装飾パネル用 | 1:1 | ★ |

---

## 各画像 詳細プロンプト

---

### `deco-ink-01.jpg` — Hero縦長インクアクセント

**配置**:  
Heroセクション右側に縦長で配置する純粋な装飾画像。  
`<img>` として半透明に重ねる or グリッドの一枠に収める。  
テキストではなくビジュアルの重力を作るための要素。

**イメージ**: 細い縦のインクライン、水墨の縦流れ、白×黒の緊張感ある抽象。

#### Midjourney（推奨）
```
single vertical thin black ink brushstroke on pure white background, sumi ink, japanese calligraphy brush, imperfect natural edge, one continuous line from top to bottom, extreme negative space left and right, minimal graphic design element, flat scan aesthetic, monochrome, no text, no characters --ar 9:16 --style raw --v 7
```

#### バリエーション A（複数細線）
```
three parallel ultra-thin vertical black ink lines on white background, hand drawn, slight imperfection, sumi ink, minimal japanese aesthetic, extreme white space, flat scan, graphic design element, no text --ar 9:16 --style raw --v 7
```

#### バリエーション B（幾何学的な縦の影）
```
abstract vertical composition, white background, geometric black rectangle fragment at top edge bleeding off frame, architectural abstraction, minimal graphic, high contrast, no gradients, sharp edges, graphic design poster element --ar 9:16 --style raw --v 7
```

#### Negative
```
people, hair, salon, warm colors, gradient, 3D, illustration, text, kanji, flower, nature, bokeh
```

---

### `deco-ink-02.jpg` — Concept縦長装飾

**配置**:  
Conceptセクション（サロンのこだわりを語るセクション）の背景左側、テキストの後方に薄く重ねる縦長装飾。  
`opacity: 0.15〜0.3` で使用する前提のため、存在感は強くていい。

**イメージ**: より太めのインクウォッシュ、または幾何学的なブロック構成。

#### Midjourney（推奨）
```
vertical abstract ink wash composition on white paper, bold black sumi ink gradation from top, heavy at top fading to nothing at bottom, single gesture, japanese minimalism, extreme vertical crop, flat scan, no text, graphic design artwork --ar 9:16 --style raw --v 7
```

#### バリエーション A（ドライブラシ）
```
dry brush vertical black ink stroke on white, wide dry brush tool, heavy texture at edges, fading mid-stroke, minimal and raw, sumi-e influence, flat scan, graphic design element, extreme vertical ratio --ar 9:16 --style raw --v 7
```

#### バリエーション B（幾何学形）
```
abstract vertical graphic composition, black geometric angular shape on pure white, sharp diagonal cut, negative space dominant, architectural minimal poster art, high contrast, no gradients, flat graphic design element --ar 9:16 --style raw --v 7
```

#### Negative
```
warm colors, people, objects, 3D, text, kanji, flowers, nature
```

---

### `deco-line-wide.jpg` — 見出しアクセントライン（超横長）

**配置**:  
各セクション見出しの下、またはセクション区切りに使う超横長の線アクセント。  
`<img>` として `width: 100%` で伸ばして使用、または固定幅で中央配置。

**イメージ**: 一本の毛筆横線、またはかすれたインクの水平線。

#### Midjourney（推奨）
```
single horizontal thin black ink brushstroke on pure white background, sumi ink, calligraphy brush, natural imperfect edge, slight texture and pressure variation, one horizontal line, extreme white space above and below, flat scan, no text, minimal graphic design element --ar 16:2 --style raw --v 7
```

#### バリエーション A（定規的・シャープ）
```
single precise ultra-thin horizontal black line on pure white, sharp clean edge, graphic design rule element, flat, no texture, extreme white space above and below, minimal --ar 16:2 --style raw --v 7
```

#### バリエーション B（かすれ強め）
```
heavily textured dry brush horizontal ink stroke on white paper, rough and broken edges, sumi-e style, expressive mark making, flat scan, single gestural line, high contrast monochrome --ar 16:2 --style raw --v 7
```

#### Negative
```
multiple lines, text, characters, color, gradient, 3D, people, objects
```

---

### `deco-geo-01.jpg` — Promise スクエア装飾

**配置**:  
Promiseセクション（黒背景）の中で、テキストブロックのアクセントとして使うスクエア装飾。  
黒背景の上に乗せる前提で、**白・グレーベース**の構成。

**イメージ**: 白い幾何学的な抽象パターン、光が差し込む建築的な抽象。

#### Midjourney（推奨）
```
abstract minimal white and light gray geometric composition on very dark background, single white angular shape, architectural abstraction, high contrast, graphic design art element, sharp edges, no round corners, editorial minimalism, square format --ar 1:1 --style raw --v 7
```

#### バリエーション A（白い線構成）
```
abstract composition of white thin geometric lines on black background, architectural blueprint fragment, precise and clean, no gradient, high contrast, square format, minimal graphic design artwork --ar 1:1 --style raw --v 7
```

#### バリエーション B（光の断面）
```
white light ray slice on matte black background, architectural light study, sharp geometric edge, minimal abstract photography, square crop, editorial, no people, no objects --ar 1:1 --style raw --v 7
```

#### Negative
```
color, warm tone, round shapes, soft edges, gradients, people, text, flowers
```

---

## 生成・納品チェックリスト

- [ ] **モノクローム確認** — 暖色・青みが混入していないか
- [ ] **解像度** — 最低 2000px 長辺以上で生成
- [ ] **ファイル形式** — JPG（品質80%）または PNG（透過不要ならJPGで可）
- [ ] **配置場所** — `apps/hair-salon01/public/images/` に格納

---

## 補足：CSSで構築する背景（画像不要）

以下はすべてCSSのみで実装します（参考）。

| 要素 | CSS手法 |
|---|---|
| Heroグレイン質感 | SVGフィルター (`feTurbulence`) |
| 白セクション微細テクスチャ | CSS `background-image: url("data:image/svg+xml,...")` |
| 黒セクション背景 | CSS グラデーション + 疑似要素 |
| セクション区切り | `::after` 擬似要素 + `clip-path` |
| ホバーエフェクト | CSS `transition` + `border-color` / `opacity` |
