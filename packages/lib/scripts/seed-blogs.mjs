/**
 * ブログ記事シードスクリプト v2
 * 使い方: node scripts/seed-blogs.mjs  (packages/lib/ で実行)
 */
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore, Timestamp } from 'firebase-admin/firestore';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

function loadEnv(filepath) {
  try {
    const content = readFileSync(filepath, 'utf-8');
    for (const line of content.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eqIdx = trimmed.indexOf('=');
      if (eqIdx === -1) continue;
      const key = trimmed.slice(0, eqIdx).trim();
      let value = trimmed.slice(eqIdx + 1);
      if ((value.startsWith('"') && value.endsWith('"')) ||
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      if (!process.env[key]) process.env[key] = value;
    }
  } catch {}
}

loadEnv(resolve(ROOT, '../../apps/hair-salon01/.env.local'));

const projectId   = process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const privateKey  = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

if (!projectId || !clientEmail || !privateKey) {
  console.error('Firebase Admin 環境変数が不足しています');
  process.exit(1);
}
if (!getApps().length) initializeApp({ credential: cert({ projectId, clientEmail, privateKey }) });

const db   = getFirestore();
const SITE = 'hair-salon01';

// 5月の自然な土曜投稿日
const pub1 = Timestamp.fromDate(new Date('2026-05-10T10:00:00+09:00'));
const pub2 = Timestamp.fromDate(new Date('2026-05-17T10:00:00+09:00'));
const pub3 = Timestamp.fromDate(new Date('2026-05-24T10:00:00+09:00'));

/* ── Article 1: 初夏カラートレンド ──────────────────────────────────────── */
const a1content = {
  type: 'doc',
  content: [
    { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: '気分が上がる色を纏う季節がやってきた' }] },
    { type: 'paragraph', content: [
      { type: 'text', text: '新潟は5月に入ると日差しが明るくなり、少しずつ夏の気配が漂い始めます。ヘアカラーを変えると、気持ちまで軽やかになる感覚がありませんか？ブロレットでも「梅雨が来る前に明るくしたい」というご相談が増える季節です。' },
    ]},
    { type: 'paragraph', content: [
      { type: 'text', text: '今回は、2026年初夏に' },
      { type: 'text', marks: [{ type: 'bold' }], text: 'スタイリストがおすすめするトレンドカラー' },
      { type: 'text', text: 'と、新潟の気候と相性のいい色選びのポイントをご紹介します。' },
    ]},
    { type: 'image', attrs: { src: '/images/style-01.jpg', alt: '2026初夏 トレンドヘアカラー 新潟' } },
    { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: '今シーズン注目のカラー3選' }] },
    { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: '① テラコッタブラウン——大人の温かみ' }] },
    { type: 'paragraph', content: [
      { type: 'text', text: '赤みと茶色が混ざったテラコッタ系は、日本人の肌色に馴染みやすいカラーです。' },
      { type: 'text', marks: [{ type: 'bold' }], text: '退色してもオレンジ〜ベージュに抜け、色落ちの過程も楽しめる' },
      { type: 'text', text: 'のが魅力。ブリーチなしでも発色しやすく、ダメージが心配な方にも挑戦しやすいカラーです。' },
    ]},
    { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: '② シアーグレージュ——透明感の極致' }] },
    { type: 'paragraph', content: [
      { type: 'text', text: '今シーズンのグレージュは、より' },
      { type: 'text', marks: [{ type: 'bold' }], text: '「透け感」' },
      { type: 'text', text: 'を意識したシアータイプが人気です。日光に当たると髪が透けて見え、ヌーディーで上品な印象に。明るめでも暗めでも楽しめる万能カラーです。' },
    ]},
    { type: 'image', attrs: { src: '/images/style-02.jpg', alt: 'グレージュ デザインカラー 新潟' } },
    { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: '③ オリーブアッシュ——くすみカラーの新定番' }] },
    { type: 'paragraph', content: [
      { type: 'text', text: '「黄味を消したい」という方からよくご相談いただくオリーブアッシュ。' },
      { type: 'text', marks: [{ type: 'bold' }, { type: 'underline' }], text: '日本人特有の赤み・黄みを和らげ、クールな印象' },
      { type: 'text', text: 'を演出してくれます。肌をきれいに見せる効果もあると言われています。' },
    ]},
    { type: 'blockquote', content: [{ type: 'paragraph', content: [
      { type: 'text', marks: [{ type: 'italic' }], text: 'スタイリストより：「どのカラーが似合うか迷ったら、まずカウンセリングで肌色を一緒に確認しましょう。「こんな感じ」の画像を持ってきていただくのが一番伝わりやすいです。」' },
    ]}]},
    { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: '新潟の気候と相性のいい色選びのポイント' }] },
    { type: 'paragraph', content: [
      { type: 'text', text: '新潟の梅雨〜夏は湿度が高く、汗や湿気で髪が広がりやすい季節。だからこそ、' },
      { type: 'text', marks: [{ type: 'bold' }], text: '「退色が美しいカラー」' },
      { type: 'text', text: 'を選ぶことがポイントです。カラーは時間とともに退色しますが、その過程がおしゃれなカラーなら、サロンとサロンの間もずっと楽しめます。テラコッタやグレージュはまさにそのタイプ。' },
    ]},
    { type: 'image', attrs: { src: '/images/salon-working.jpg', alt: 'ブロレット カラー施術風景 新潟' } },
    { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: 'カラーを長持ちさせる3つのコツ' }] },
    { type: 'orderedList', content: [
      { type: 'listItem', content: [{ type: 'paragraph', content: [
        { type: 'text', marks: [{ type: 'bold' }], text: 'カラーシャンプーを取り入れる' },
        { type: 'text', text: '——週2〜3回使うだけで退色スピードが変わります' },
      ]}]},
      { type: 'listItem', content: [{ type: 'paragraph', content: [
        { type: 'text', marks: [{ type: 'bold' }], text: 'シャンプー後はすぐに乾かす' },
        { type: 'text', text: '——濡れたまま放置すると色素が流れやすくなります' },
      ]}]},
      { type: 'listItem', content: [{ type: 'paragraph', content: [
        { type: 'text', marks: [{ type: 'bold' }], text: 'ヘアアイロンの温度を下げる' },
        { type: 'text', text: '——カラー後は160℃以下を目安に' },
      ]}]},
    ]},
    { type: 'horizontalRule' },
    { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: '「どの色にしようか」から一緒に考えます' }] },
    { type: 'paragraph', content: [
      { type: 'text', text: 'カウンセリングで、ライフスタイルや好みを丁寧にお聞きしながらカラーをご提案します。「なんとなくイメチェンしたい」「いつも同じ色になってしまう」という方も、ぜひお気軽にご来店ください。' },
    ]},
    { type: 'paragraph', content: [{ type: 'text', marks: [{ type: 'bold' }], text: '📍 新潟県新潟市中央区本馬越2丁目8番17号　📞 025-278-7274' }] },
    { type: 'image', attrs: { src: '/images/RB-logo-normal.png', alt: 'RISPLENDERE BROLETTO' } },
  ],
};
const a1html = `<h2>気分が上がる色を纏う季節がやってきた</h2><p>新潟は5月に入ると日差しが明るくなり、少しずつ夏の気配が漂い始めます。ヘアカラーを変えると、気持ちまで軽やかになる感覚がありませんか？ブロレットでも「梅雨が来る前に明るくしたい」というご相談が増える季節です。</p><p>今回は、2026年初夏に<strong>スタイリストがおすすめするトレンドカラー</strong>と、新潟の気候と相性のいい色選びのポイントをご紹介します。</p><img src="/images/style-01.jpg" alt="2026初夏 トレンドヘアカラー 新潟"><h2>今シーズン注目のカラー3選</h2><h3>① テラコッタブラウン——大人の温かみ</h3><p>赤みと茶色が混ざったテラコッタ系は、日本人の肌色に馴染みやすいカラーです。<strong>退色してもオレンジ〜ベージュに抜け、色落ちの過程も楽しめる</strong>のが魅力。ブリーチなしでも発色しやすく、ダメージが心配な方にも挑戦しやすいカラーです。</p><h3>② シアーグレージュ——透明感の極致</h3><p>今シーズンのグレージュは、より<strong>「透け感」</strong>を意識したシアータイプが人気です。日光に当たると髪が透けて見え、ヌーディーで上品な印象に。明るめでも暗めでも楽しめる万能カラーです。</p><img src="/images/style-02.jpg" alt="グレージュ デザインカラー 新潟"><h3>③ オリーブアッシュ——くすみカラーの新定番</h3><p>「黄味を消したい」という方からよくご相談いただくオリーブアッシュ。<u><strong>日本人特有の赤み・黄みを和らげ、クールな印象</strong></u>を演出してくれます。肌をきれいに見せる効果もあると言われています。</p><blockquote><p><em>スタイリストより：「どのカラーが似合うか迷ったら、まずカウンセリングで肌色を一緒に確認しましょう。「こんな感じ」の画像を持ってきていただくのが一番伝わりやすいです。」</em></p></blockquote><h2>新潟の気候と相性のいい色選びのポイント</h2><p>新潟の梅雨〜夏は湿度が高く、汗や湿気で髪が広がりやすい季節。だからこそ、<strong>「退色が美しいカラー」</strong>を選ぶことがポイントです。カラーは時間とともに退色しますが、その過程がおしゃれなカラーなら、サロンとサロンの間もずっと楽しめます。テラコッタやグレージュはまさにそのタイプ。</p><img src="/images/salon-working.jpg" alt="ブロレット カラー施術風景 新潟"><h2>カラーを長持ちさせる3つのコツ</h2><ol><li><p><strong>カラーシャンプーを取り入れる</strong>——週2〜3回使うだけで退色スピードが変わります</p></li><li><p><strong>シャンプー後はすぐに乾かす</strong>——濡れたまま放置すると色素が流れやすくなります</p></li><li><p><strong>ヘアアイロンの温度を下げる</strong>——カラー後は160℃以下を目安に</p></li></ol><hr><h2>「どの色にしようか」から一緒に考えます</h2><p>カウンセリングで、ライフスタイルや好みを丁寧にお聞きしながらカラーをご提案します。「なんとなくイメチェンしたい」「いつも同じ色になってしまう」という方も、ぜひお気軽にご来店ください。</p><p><strong>📍 新潟県新潟市中央区本馬越2丁目8番17号　📞 025-278-7274</strong></p><img src="/images/RB-logo-normal.png" alt="RISPLENDERE BROLETTO">`;

/* ── Article 2: シャンプーガイド ─────────────────────────────────────────── */
const a2content = {
  type: 'doc',
  content: [
    { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: '「毎日洗っているのに、なぜ髪がパサつくの？」' }] },
    { type: 'paragraph', content: [
      { type: 'text', text: 'ブロレットでよくいただくご相談のひとつです。シャンプーは毎日するものだからこそ、その方法が髪の状態に直結します。実は、' },
      { type: 'text', marks: [{ type: 'bold' }], text: '多くの方が「正しいと思っているシャンプー」が髪を傷める原因' },
      { type: 'text', text: 'になっていることがあります。' },
    ]},
    { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: 'やってしまいがちなNGな洗い方' }] },
    { type: 'bulletList', content: [
      { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: '❌ シャンプーを直接頭皮にのせる（泡立てずに原液をつける）' }] }] },
      { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: '❌ 爪を立ててガシガシ洗う（頭皮を傷つける）' }] }] },
      { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: '❌ すすぎが不十分（残留成分が頭皮トラブルの原因に）' }] }] },
      { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: '❌ 洗った後すぐに乾かさず放置（キューティクルが開き傷みやすい）' }] }] },
      { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: '❌ シャンプー前にブラッシングしない（汚れが落ちにくい）' }] }] },
    ]},
    { type: 'image', attrs: { src: '/images/salon-01.jpg', alt: 'ブロレット サロン 新潟市' } },
    { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: 'ブロレット流・正しいシャンプーの4ステップ' }] },
    { type: 'orderedList', content: [
      { type: 'listItem', content: [{ type: 'paragraph', content: [
        { type: 'text', marks: [{ type: 'bold' }], text: '予洗い（30秒以上）' },
        { type: 'text', text: '——シャンプー前にぬるま湯でしっかり予洗い。これだけで汚れの約7割が落ちます。' },
      ]}]},
      { type: 'listItem', content: [{ type: 'paragraph', content: [
        { type: 'text', marks: [{ type: 'bold' }], text: '手のひらで泡立ててから頭皮へ' },
        { type: 'text', text: '——原液を直接頭皮につけるのはNG。しっかり泡立ててから。' },
      ]}]},
      { type: 'listItem', content: [{ type: 'paragraph', content: [
        { type: 'text', marks: [{ type: 'bold' }], text: '指の腹でマッサージ' },
        { type: 'text', text: '——爪を立てず、指の腹で頭皮全体を動かすように。血行促進にも効果的です。' },
      ]}]},
      { type: 'listItem', content: [{ type: 'paragraph', content: [
        { type: 'text', marks: [{ type: 'bold' }], text: 'しっかりすすぐ' },
        { type: 'text', text: '——耳の後ろや首の付け根まで丁寧に。すすぎ残しは頭皮トラブルの原因になります。' },
      ]}]},
    ]},
    { type: 'blockquote', content: [{ type: 'paragraph', content: [
      { type: 'text', marks: [{ type: 'italic' }], text: '最重要ポイントは「予洗い」です。お湯だけでも30秒以上予洗いするだけで、シャンプーの泡立ちが格段によくなり、髪への負担が大きく減ります。' },
    ]}]},
    { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: 'シャンプー前のブラッシングで効果アップ' }] },
    { type: 'paragraph', content: [
      { type: 'text', text: 'シャンプー前に軽くブラッシングするだけで、からまりが取れ、汚れや古いスタイリング剤が浮きやすくなります。長い髪の方は' },
      { type: 'text', marks: [{ type: 'bold' }], text: '毛先→中間→根元の順' },
      { type: 'text', text: 'でブラッシングするのがポイント。泡立ちも良くなり、シャンプー量が少なくて済みます。' },
    ]},
    { type: 'image', attrs: { src: '/images/style-04.jpg', alt: 'ヘアケア 美髪 新潟 ブロレット' } },
    { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: 'トリートメントの正しい使い方' }] },
    { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: '「中間〜毛先」に集中させる' }] },
    { type: 'paragraph', content: [
      { type: 'text', text: 'トリートメントは頭皮につけないのが基本。' },
      { type: 'text', marks: [{ type: 'bold' }], text: '中間から毛先を中心' },
      { type: 'text', text: 'につけ、しっかり馴染ませてから流します。根元に多くつけると毛穴を詰まらせる原因に。' },
    ]},
    { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: '蒸しタオルで浸透力アップ' }] },
    { type: 'paragraph', content: [
      { type: 'text', text: 'トリートメントを塗ったあと蒸しタオルで包んで2〜3分置くと浸透力が上がります。週1回のスペシャルケアとして取り入れるだけで、髪の手触りが変わります。' },
    ]},
    { type: 'horizontalRule' },
    { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: '「365日のホームケアを、一緒に育てる。」' }] },
    { type: 'paragraph', content: [
      { type: 'text', text: 'ブロレットでは施術後に必ずホームケアのアドバイスをお伝えします。特別な製品を購入することが目的ではなく、' },
      { type: 'text', marks: [{ type: 'bold' }], text: '「今ある道具でより正しい使い方をすること」' },
      { type: 'text', text: 'を大切にしています。シャンプー方法やドライヤーの使い方も、カウンセリングでお気軽にご相談ください。' },
    ]},
    { type: 'blockquote', content: [{ type: 'paragraph', content: [
      { type: 'text', marks: [{ type: 'italic' }], text: 'ブロレットのお約束 01「ホームケアを、一緒に育てる。」——365日のホームケアを大切に考え、正しいケア方法をお伝えします。' },
    ]}]},
    { type: 'paragraph', content: [{ type: 'text', marks: [{ type: 'bold' }], text: '📍 新潟県新潟市中央区本馬越2丁目8番17号　📞 025-278-7274' }] },
    { type: 'image', attrs: { src: '/images/RB-logo-normal.png', alt: 'RISPLENDERE BROLETTO' } },
  ],
};
const a2html = `<h2>「毎日洗っているのに、なぜ髪がパサつくの？」</h2><p>ブロレットでよくいただくご相談のひとつです。シャンプーは毎日するものだからこそ、その方法が髪の状態に直結します。実は、<strong>多くの方が「正しいと思っているシャンプー」が髪を傷める原因</strong>になっていることがあります。</p><h3>やってしまいがちなNGな洗い方</h3><ul><li><p>❌ シャンプーを直接頭皮にのせる（泡立てずに原液をつける）</p></li><li><p>❌ 爪を立ててガシガシ洗う（頭皮を傷つける）</p></li><li><p>❌ すすぎが不十分（残留成分が頭皮トラブルの原因に）</p></li><li><p>❌ 洗った後すぐに乾かさず放置（キューティクルが開き傷みやすい）</p></li><li><p>❌ シャンプー前にブラッシングしない（汚れが落ちにくい）</p></li></ul><img src="/images/salon-01.jpg" alt="ブロレット サロン 新潟市"><h2>ブロレット流・正しいシャンプーの4ステップ</h2><ol><li><p><strong>予洗い（30秒以上）</strong>——シャンプー前にぬるま湯でしっかり予洗い。これだけで汚れの約7割が落ちます。</p></li><li><p><strong>手のひらで泡立ててから頭皮へ</strong>——原液を直接頭皮につけるのはNG。しっかり泡立ててから。</p></li><li><p><strong>指の腹でマッサージ</strong>——爪を立てず、指の腹で頭皮全体を動かすように。血行促進にも効果的です。</p></li><li><p><strong>しっかりすすぐ</strong>——耳の後ろや首の付け根まで丁寧に。すすぎ残しは頭皮トラブルの原因になります。</p></li></ol><blockquote><p><em>最重要ポイントは「予洗い」です。お湯だけでも30秒以上予洗いするだけで、シャンプーの泡立ちが格段によくなり、髪への負担が大きく減ります。</em></p></blockquote><h2>シャンプー前のブラッシングで効果アップ</h2><p>シャンプー前に軽くブラッシングするだけで、からまりが取れ、汚れや古いスタイリング剤が浮きやすくなります。長い髪の方は<strong>毛先→中間→根元の順</strong>でブラッシングするのがポイント。泡立ちも良くなり、シャンプー量が少なくて済みます。</p><img src="/images/style-04.jpg" alt="ヘアケア 美髪 新潟 ブロレット"><h2>トリートメントの正しい使い方</h2><h3>「中間〜毛先」に集中させる</h3><p>トリートメントは頭皮につけないのが基本。<strong>中間から毛先を中心</strong>につけ、しっかり馴染ませてから流します。根元に多くつけると毛穴を詰まらせる原因に。</p><h3>蒸しタオルで浸透力アップ</h3><p>トリートメントを塗ったあと蒸しタオルで包んで2〜3分置くと浸透力が上がります。週1回のスペシャルケアとして取り入れるだけで、髪の手触りが変わります。</p><hr><h2>「365日のホームケアを、一緒に育てる。」</h2><p>ブロレットでは施術後に必ずホームケアのアドバイスをお伝えします。特別な製品を購入することが目的ではなく、<strong>「今ある道具でより正しい使い方をすること」</strong>を大切にしています。シャンプー方法やドライヤーの使い方も、カウンセリングでお気軽にご相談ください。</p><blockquote><p><em>ブロレットのお約束 01「ホームケアを、一緒に育てる。」——365日のホームケアを大切に考え、正しいケア方法をお伝えします。</em></p></blockquote><p><strong>📍 新潟県新潟市中央区本馬越2丁目8番17号　📞 025-278-7274</strong></p><img src="/images/RB-logo-normal.png" alt="RISPLENDERE BROLETTO">`;

/* ── Article 3: 初来店ガイド ─────────────────────────────────────────────── */
const a3content = {
  type: 'doc',
  content: [
    { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: '「美容室って、なんとなく緊張しませんか？」' }] },
    { type: 'paragraph', content: [
      { type: 'text', text: '久しぶりに美容室に行くとき、新しいサロンに初めて行くとき、ちょっとドキドキしてしまうことはありませんか？「うまく希望を伝えられるか不安」「待っている間どうすればいい？」——そんな緊張をほぐすために、ブロレットへの初来店がどんな流れで進むかをご紹介します。' },
    ]},
    { type: 'image', attrs: { src: '/images/salon-02.jpg', alt: 'ブロレット サロン内装 新潟市本馬越' } },
    { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: '初来店の流れ' }] },
    { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: 'STEP 1｜ご予約' }] },
    { type: 'paragraph', content: [
      { type: 'text', text: 'お電話（025-278-7274）またはホットペッパービューティーからご予約いただけます。' },
      { type: 'text', marks: [{ type: 'bold' }], text: '当日予約も大歓迎' },
      { type: 'text', text: 'です。「どのメニューにしようか迷っている」という場合も、電話でご相談いただければスタッフがご案内します。' },
    ]},
    { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: 'STEP 2｜ご来店・お席へご案内' }] },
    { type: 'paragraph', content: [
      { type: 'text', text: 'セブンイレブン本馬越店の向かい、ウオロク本馬越店の斜め前にあります（駐車場3台分あり）。スタッフがお席にご案内します。お荷物はお預かりしますので、リラックスしてお待ちください。' },
    ]},
    { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: 'STEP 3｜カウンセリング（ここが一番大切）' }] },
    { type: 'paragraph', content: [
      { type: 'text', text: '今日の仕上がりイメージだけでなく、' },
      { type: 'text', marks: [{ type: 'bold' }], text: '普段のスタイリング習慣・髪のお悩み・生活スタイル' },
      { type: 'text', text: 'まで丁寧にお聞きします。「こんな感じ」の画像（SNSのスクショでOK）を見せていただくのが一番伝わりやすいです。' },
    ]},
    { type: 'blockquote', content: [{ type: 'paragraph', content: [
      { type: 'text', marks: [{ type: 'italic' }], text: '「まずはしっかり聞くことから始まる、オーダーメイドの綺麗」——うまく言葉にできなくても、スタッフが一緒に引き出しながら進めますのでご安心ください。' },
    ]}]},
    { type: 'image', attrs: { src: '/images/staff-team.jpg', alt: 'ブロレット スタッフチーム 新潟' } },
    { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: 'STEP 4｜施術' }] },
    { type: 'paragraph', content: [
      { type: 'text', text: '施術中はリラックスしてお過ごしください。スタッフと気軽にお話しいただくことも歓迎ですし、「静かに過ごしたい」という方はそれも全然OKです。お子様連れの場合は' },
      { type: 'text', marks: [{ type: 'bold' }], text: '1階のキッズスペース（DVD完備）または貸切個室ルーム（要予約・無料）' },
      { type: 'text', text: 'をご利用いただけます。' },
    ]},
    { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: 'STEP 5｜仕上げ・ホームケアアドバイス' }] },
    { type: 'paragraph', content: [
      { type: 'text', text: '仕上げのあとは、スタイリング方法とホームケアのアドバイスをお伝えします。「次回どのくらいで来店するのがいいか」まで含めてご説明するので、帰宅後も美しい状態をキープしやすくなります。' },
    ]},
    { type: 'horizontalRule' },
    { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: '初めてのお客様への特典' }] },
    { type: 'bulletList', content: [
      { type: 'listItem', content: [{ type: 'paragraph', content: [
        { type: 'text', marks: [{ type: 'bold' }, { type: 'underline' }], text: '来店後2週間以内の無料カウンセリング' },
        { type: 'text', text: '——「仕上がりが気になる」「ケアのことを聞きたい」ときに' },
      ]}]},
      { type: 'listItem', content: [{ type: 'paragraph', content: [
        { type: 'text', marks: [{ type: 'bold' }], text: '10日以内のお直し無料' },
        { type: 'text', text: '——気になる点があればお気軽にご連絡ください' },
      ]}]},
      { type: 'listItem', content: [{ type: 'paragraph', content: [
        { type: 'text', marks: [{ type: 'bold' }], text: 'ご紹介割引' },
        { type: 'text', text: '——ご友人をご紹介いただくと、ご本人様・お友達様どちらにも¥1,000オフ' },
      ]}]},
    ]},
    { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: 'よくある不安にお答えします' }] },
    { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: 'Q. 要望をうまく言葉にできるか不安…' }] },
    { type: 'paragraph', content: [
      { type: 'text', text: 'A.' },
      { type: 'text', marks: [{ type: 'bold' }], text: '「こんな感じ」の画像' },
      { type: 'text', text: 'を見せていただくだけで大丈夫です。「前回こうなったから今回は変えたい」という情報も参考になります。スタッフが質問しながら一緒に整理しますので、ご安心ください。' },
    ]},
    { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: 'Q. 子どもを連れて行っていい？' }] },
    { type: 'paragraph', content: [
      { type: 'text', text: 'A. もちろん大歓迎です。1階にはDVDが見られるキッズスペースがあり、お子様と一緒に来店されているお客様も多いです。' },
      { type: 'text', marks: [{ type: 'bold' }], text: '貸切個室ルーム（要予約・無料）' },
      { type: 'text', text: 'のご利用も可能です。' },
    ]},
    { type: 'image', attrs: { src: '/images/staff-tsurumaki.jpg', alt: '鶴巻麗奈 オーナー ブロレット 新潟' } },
    { type: 'horizontalRule' },
    { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: 'まずは気軽に来てみてください' }] },
    { type: 'paragraph', content: [
      { type: 'text', text: '「久しぶりにサロンに行こうかな」と思ったとき、ブロレットが頭に浮かんだら、それだけで十分です。完璧なイメージが固まっていなくても、カウンセリングの中で一緒に作っていきます。' },
      { type: 'text', marks: [{ type: 'bold' }], text: '当日予約OK、初来店も丁寧に対応します。' },
    ]},
    { type: 'paragraph', content: [{ type: 'text', marks: [{ type: 'bold' }], text: '📍 新潟県新潟市中央区本馬越2丁目8番17号　📞 025-278-7274' }] },
    { type: 'paragraph', content: [{ type: 'text', text: '平日 9:15〜18:00 / 日祝 10:00〜17:00（月曜・第3日曜定休）' }] },
    { type: 'image', attrs: { src: '/images/RB-logo-normal.png', alt: 'RISPLENDERE BROLETTO ロゴ' } },
  ],
};
const a3html = `<h2>「美容室って、なんとなく緊張しませんか？」</h2><p>久しぶりに美容室に行くとき、新しいサロンに初めて行くとき、ちょっとドキドキしてしまうことはありませんか？「うまく希望を伝えられるか不安」「待っている間どうすればいい？」——そんな緊張をほぐすために、ブロレットへの初来店がどんな流れで進むかをご紹介します。</p><img src="/images/salon-02.jpg" alt="ブロレット サロン内装 新潟市本馬越"><h2>初来店の流れ</h2><h3>STEP 1｜ご予約</h3><p>お電話（025-278-7274）またはホットペッパービューティーからご予約いただけます。<strong>当日予約も大歓迎</strong>です。「どのメニューにしようか迷っている」という場合も、電話でご相談いただければスタッフがご案内します。</p><h3>STEP 2｜ご来店・お席へご案内</h3><p>セブンイレブン本馬越店の向かい、ウオロク本馬越店の斜め前にあります（駐車場3台分あり）。スタッフがお席にご案内します。お荷物はお預かりしますので、リラックスしてお待ちください。</p><h3>STEP 3｜カウンセリング（ここが一番大切）</h3><p>今日の仕上がりイメージだけでなく、<strong>普段のスタイリング習慣・髪のお悩み・生活スタイル</strong>まで丁寧にお聞きします。「こんな感じ」の画像（SNSのスクショでOK）を見せていただくのが一番伝わりやすいです。</p><blockquote><p><em>「まずはしっかり聞くことから始まる、オーダーメイドの綺麗」——うまく言葉にできなくても、スタッフが一緒に引き出しながら進めますのでご安心ください。</em></p></blockquote><img src="/images/staff-team.jpg" alt="ブロレット スタッフチーム 新潟"><h3>STEP 4｜施術</h3><p>施術中はリラックスしてお過ごしください。スタッフと気軽にお話しいただくことも歓迎ですし、「静かに過ごしたい」という方はそれも全然OKです。お子様連れの場合は<strong>1階のキッズスペース（DVD完備）または貸切個室ルーム（要予約・無料）</strong>をご利用いただけます。</p><h3>STEP 5｜仕上げ・ホームケアアドバイス</h3><p>仕上げのあとは、スタイリング方法とホームケアのアドバイスをお伝えします。「次回どのくらいで来店するのがいいか」まで含めてご説明するので、帰宅後も美しい状態をキープしやすくなります。</p><hr><h2>初めてのお客様への特典</h2><ul><li><p><u><strong>来店後2週間以内の無料カウンセリング</strong></u>——「仕上がりが気になる」「ケアのことを聞きたい」ときに</p></li><li><p><strong>10日以内のお直し無料</strong>——気になる点があればお気軽にご連絡ください</p></li><li><p><strong>ご紹介割引</strong>——ご友人をご紹介いただくと、ご本人様・お友達様どちらにも¥1,000オフ</p></li></ul><h2>よくある不安にお答えします</h2><h3>Q. 要望をうまく言葉にできるか不安…</h3><p>A. <strong>「こんな感じ」の画像</strong>を見せていただくだけで大丈夫です。「前回こうなったから今回は変えたい」という情報も参考になります。スタッフが質問しながら一緒に整理しますので、ご安心ください。</p><h3>Q. 子どもを連れて行っていい？</h3><p>A. もちろん大歓迎です。1階にはDVDが見られるキッズスペースがあり、お子様と一緒に来店されているお客様も多いです。<strong>貸切個室ルーム（要予約・無料）</strong>のご利用も可能です。</p><img src="/images/staff-tsurumaki.jpg" alt="鶴巻麗奈 オーナー ブロレット 新潟"><hr><h2>まずは気軽に来てみてください</h2><p>「久しぶりにサロンに行こうかな」と思ったとき、ブロレットが頭に浮かんだら、それだけで十分です。完璧なイメージが固まっていなくても、カウンセリングの中で一緒に作っていきます。<strong>当日予約OK、初来店も丁寧に対応します。</strong></p><p><strong>📍 新潟県新潟市中央区本馬越2丁目8番17号　📞 025-278-7274</strong></p><p>平日 9:15〜18:00 / 日祝 10:00〜17:00（月曜・第3日曜定休）</p><img src="/images/RB-logo-normal.png" alt="RISPLENDERE BROLETTO ロゴ">`;

/* ── Firestore 挿入 ──────────────────────────────────────────────────────── */
const col = db.collection('sites').doc(SITE).collection('blogs');

const articles = [
  { title: '【2026初夏】新潟の美容師が選ぶ旬ヘアカラー｜退色まで楽しめるトレンドカラーガイド', slug: 'niigata-hair-color-trend-2026-early-summer', excerpt: '梅雨前のこの季節、気分を変えるヘアカラーが人気です。2026年初夏に注目のカラートレンドと、新潟の気候に合った色選びのポイントをスタイリストがご紹介します。', category: 'スタイル', tags: ['ヘアカラー', '新潟', 'トレンド', '2026', '夏カラー'], coverImageUrl: '/images/style-01.jpg', status: 'published', publishedAt: pub1, createdAt: pub1, updatedAt: pub1, createdBy: 'seed', updatedBy: 'seed', content: a1content, contentHtml: a1html },
  { title: '美容師直伝！毎日のシャンプーを変えるだけで髪が変わる｜ブロレット流ホームケアの基本', slug: 'correct-shampoo-guide-broletto-haircare', excerpt: '「サロンで仕上げてもらった翌日からすぐパサつく」——そのお悩み、シャンプーの仕方が原因かもしれません。正しいシャンプーの手順と毎日のホームケアのコツをスタイリストがお伝えします。', category: 'ヘアケア', tags: ['ホームケア', 'シャンプー', 'ヘアケア', '新潟', '髪質改善'], coverImageUrl: '/images/style-04.jpg', status: 'published', publishedAt: pub2, createdAt: pub2, updatedAt: pub2, createdBy: 'seed', updatedBy: 'seed', content: a2content, contentHtml: a2html },
  { title: 'はじめてブロレットへ｜新潟市本馬越の美容室、初来店から仕上がりまでの流れ', slug: 'first-visit-guide-broletto-niigata', excerpt: '「美容室って少し緊張する…」という方へ。予約から仕上がりまでの流れと、初来店のお客様への特典、よくある不安へのお答えをまとめました。当日予約もOKです。', category: 'サロン情報', tags: ['初来店', '新潟', '美容室', '本馬越', 'カウンセリング'], coverImageUrl: '/images/salon-02.jpg', status: 'published', publishedAt: pub3, createdAt: pub3, updatedAt: pub3, createdBy: 'seed', updatedBy: 'seed', content: a3content, contentHtml: a3html },
];

for (const article of articles) {
  const ref = col.doc();
  await ref.set(article);
  console.log(`✅ ${article.title}`);
  console.log(`   slug: ${article.slug}  id: ${ref.id}`);
}

console.log('\n✨ 3件のブログ記事を Firestore に挿入しました。');
