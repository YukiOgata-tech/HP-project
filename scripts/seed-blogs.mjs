/**
 * ブログ記事シードスクリプト
 * 使い方: node scripts/seed-blogs.mjs
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

loadEnv(resolve(ROOT, 'apps/hair-salon01/.env.local'));

const projectId   = process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const privateKey  = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

if (!projectId || !clientEmail || !privateKey) {
  console.error('❌ Firebase Admin 環境変数が不足しています');
  process.exit(1);
}
if (!getApps().length) initializeApp({ credential: cert({ projectId, clientEmail, privateKey }) });

const db     = getFirestore();
const SITE   = 'hair-salon01';
const now    = Timestamp.now();
const pub1   = Timestamp.fromDate(new Date('2026-05-27T09:00:00+09:00'));
const pub2   = Timestamp.fromDate(new Date('2026-05-28T09:00:00+09:00'));
const pub3   = Timestamp.fromDate(new Date('2026-05-29T09:00:00+09:00'));

/* ─── Article 1: ヘアカラー & 頭皮ケア ─────────────────────────────────── */
const article1 = {
  title: '新潟市でヘアカラーなら｜頭皮を守りながら美しく染めるブロレットのこだわり',
  slug: 'niigata-hair-color-scalp-care',
  excerpt: '新潟市中央区本馬越の美容室ブロレットは、頭皮保護オイルで肌を守りながら施術する「頭皮ファースト」のヘアカラーが人気です。MILBONカラーソムリエが4名在籍し、365日美しい髪色を二人三脚でサポートします。',
  category: 'スタイル',
  tags: ['ヘアカラー', '新潟', '頭皮ケア', '新潟市中央区', 'デザインカラー'],
  coverImageUrl: '/images/style-01.jpg',
  status: 'published',
  publishedAt: pub1,
  createdAt: pub1,
  updatedAt: pub1,
  createdBy: 'seed',
  updatedBy: 'seed',
  content: {
    type: 'doc',
    content: [
      { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: 'ブロレットのカラーは「頭皮ファースト」' }] },
      { type: 'paragraph', content: [
        { type: 'text', text: '新潟市中央区本馬越にある美容室' },
        { type: 'text', marks: [{ type: 'bold' }], text: 'RISPLENDERE BROLETTO（リスプレンデレ ブロレット）' },
        { type: 'text', text: 'では、ヘアカラーにおいてひとつの信念を大切にしています。' },
        { type: 'text', marks: [{ type: 'underline' }, { type: 'bold' }], text: '「頭皮と髪に、できる限り優しく。」' },
        { type: 'text', text: 'その想いから、すべての施術が始まります。' },
      ]},
      { type: 'image', attrs: { src: '/images/style-01.jpg', alt: '新潟 ヘアカラー スタイル例' } },
      { type: 'paragraph', content: [
        { type: 'text', text: 'ヘアカラーで美しい色を楽しみたい、でも頭皮や髪へのダメージが心配——そんな新潟のお客様のお声を、開業以来16年にわたり数えきれないほど聞いてきました。ブロレットは、カラー剤が体に与える影響を最小限に抑えるための取り組みを、日々の施術の中で続けています。' },
      ]},
      { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: 'なぜ頭皮保護がカラーに欠かせないのか' }] },
      { type: 'paragraph', content: [
        { type: 'text', text: 'ヘアカラー剤には、髪の色素を変化させる成分が含まれています。この成分が頭皮に直接触れ続けると、肌荒れ・乾燥・かゆみの原因になることがあります。特に敏感肌の方や、繰り返しカラーをされる方は注意が必要です。' },
      ]},
      { type: 'paragraph', content: [
        { type: 'text', text: 'ブロレットでは施術前に' },
        { type: 'text', marks: [{ type: 'bold' }], text: '頭皮保護オイル' },
        { type: 'text', text: 'で肌をコーティングし、薬剤が直接触れることを防ぎます。さらに施術後は、' },
        { type: 'text', marks: [{ type: 'bold' }], text: 'シャンプー時に化学成分を徹底除去' },
        { type: 'text', text: 'することで、カラー後の頭皮・髪への負担を限りなく軽減しています。' },
      ]},
      { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: '頭皮を守るブロレットの3ステップ' }] },
      { type: 'orderedList', content: [
        { type: 'listItem', content: [{ type: 'paragraph', content: [
          { type: 'text', marks: [{ type: 'bold' }], text: '頭皮保護オイルでプロテクト' },
          { type: 'text', text: '——施術前に頭皮をオイルで保護し、薬剤刺激をブロック' },
        ]}]},
        { type: 'listItem', content: [{ type: 'paragraph', content: [
          { type: 'text', marks: [{ type: 'bold' }], text: 'カラー後の徹底除去' },
          { type: 'text', text: '——シャンプー時に化学成分を残さず洗い流す' },
        ]}]},
        { type: 'listItem', content: [{ type: 'paragraph', content: [
          { type: 'text', marks: [{ type: 'bold' }], text: '髪質に合わせた栄養補給' },
          { type: 'text', text: '——カラー後の髪にトリートメントで潤いとツヤを補充' },
        ]}]},
      ]},
      { type: 'blockquote', content: [{ type: 'paragraph', content: [
        { type: 'text', marks: [{ type: 'italic' }], text: 'ブロレットのお約束 02「髪と頭皮に、優しく。」——可能な限り優しい処方で施術し、頭皮をプロテクトしながら、施術後はシャンプー時に化学成分を徹底的に除去します。' },
      ]}]},
      { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: 'MILBONカラーソムリエが4名在籍' }] },
      { type: 'image', attrs: { src: '/images/salon-working.jpg', alt: 'ブロレット カラー施術風景' } },
      { type: 'paragraph', content: [
        { type: 'text', text: 'ブロレットには、国内トップシェアのヘアケアブランド' },
        { type: 'text', marks: [{ type: 'bold' }], text: 'MILBON（ミルボン）' },
        { type: 'text', text: 'が認定する' },
        { type: 'text', marks: [{ type: 'bold' }, { type: 'underline' }], text: 'カラーソムリエの資格保有者が4名' },
        { type: 'text', text: '在籍しています。カラーソムリエとは、カラーの理論・技術・提案力において高い水準をクリアしたスタイリストに与えられる認定資格です。' },
      ]},
      { type: 'paragraph', content: [
        { type: 'text', text: 'お客様一人ひとりの髪質・肌色・ライフスタイルを丁寧にカウンセリングし、' },
        { type: 'text', marks: [{ type: 'bold' }], text: '365日、ずっと好きでいられる髪色' },
        { type: 'text', text: 'をご提案します。資格取得費用はすべて会社が負担しているため、スタッフ全員が自分のスキルアップを思い切り追求できる環境が整っています。' },
      ]},
      { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: '新潟でデザインカラーを楽しもう' }] },
      { type: 'paragraph', content: [
        { type: 'text', text: 'ベーシックなカラーはもちろん、ハイライト・バレイヤージュ・グラデーションカラーなど、トレンドのデザインカラーも得意としています。「どんな色が似合うかわからない」という方も、カウンセリングで一緒に考えていきましょう。' },
      ]},
      { type: 'image', attrs: { src: '/images/style-02.jpg', alt: '新潟 デザインカラー スタイル' } },
      { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: '人気のカラーメニュー' }] },
      { type: 'bulletList', content: [
        { type: 'listItem', content: [{ type: 'paragraph', content: [
          { type: 'text', marks: [{ type: 'bold' }], text: 'ワンカラー（¥4,500〜）' },
          { type: 'text', text: '——全体を均一に染め上げるベーシックカラー' },
        ]}]},
        { type: 'listItem', content: [{ type: 'paragraph', content: [
          { type: 'text', marks: [{ type: 'bold' }], text: 'ハーブカラー' },
          { type: 'text', text: '——天然由来成分配合、敏感肌・頭皮が弱い方に' },
        ]}]},
        { type: 'listItem', content: [{ type: 'paragraph', content: [
          { type: 'text', marks: [{ type: 'bold' }], text: 'スパカラー' },
          { type: 'text', text: '——頭皮ケアとカラーを同時に楽しむコース' },
        ]}]},
        { type: 'listItem', content: [{ type: 'paragraph', content: [
          { type: 'text', marks: [{ type: 'bold' }], text: 'ノンダメージコース' },
          { type: 'text', text: '——ハイダメージ毛でも安心なケア特化カラー' },
        ]}]},
      ]},
      { type: 'horizontalRule' },
      { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: '初めての方へ——まずは無料カウンセリングから' }] },
      { type: 'paragraph', content: [
        { type: 'text', text: 'ブロレットでは、新規のお客様に' },
        { type: 'text', marks: [{ type: 'underline' }, { type: 'bold' }], text: '来店2週間以内の無料カウンセリング' },
        { type: 'text', text: 'をご用意しています。カラーのお悩みや理想の髪色について、お気軽にご相談ください。当日予約もOKです。' },
      ]},
      { type: 'paragraph', content: [{ type: 'text', marks: [{ type: 'bold' }], text: '📍 新潟県新潟市中央区本馬越2丁目8番17号' }] },
      { type: 'paragraph', content: [
        { type: 'text', marks: [{ type: 'bold' }], text: '📞 025-278-7274' },
        { type: 'text', text: '　（平日 9:15〜18:00 / 日祝 10:00〜17:00）' },
      ]},
      { type: 'image', attrs: { src: '/images/RB-logo-normal.png', alt: 'RISPLENDERE BROLETTO ロゴ' } },
    ],
  },
  contentHtml: `<h2>ブロレットのカラーは「頭皮ファースト」</h2><p>新潟市中央区本馬越にある美容室<strong>RISPLENDERE BROLETTO（リスプレンデレ ブロレット）</strong>では、ヘアカラーにおいてひとつの信念を大切にしています。<u><strong>「頭皮と髪に、できる限り優しく。」</strong></u>その想いから、すべての施術が始まります。</p><img src="/images/style-01.jpg" alt="新潟 ヘアカラー スタイル例"><p>ヘアカラーで美しい色を楽しみたい、でも頭皮や髪へのダメージが心配——そんな新潟のお客様のお声を、開業以来16年にわたり数えきれないほど聞いてきました。ブロレットは、カラー剤が体に与える影響を最小限に抑えるための取り組みを、日々の施術の中で続けています。</p><h2>なぜ頭皮保護がカラーに欠かせないのか</h2><p>ヘアカラー剤には、髪の色素を変化させる成分が含まれています。この成分が頭皮に直接触れ続けると、肌荒れ・乾燥・かゆみの原因になることがあります。特に敏感肌の方や、繰り返しカラーをされる方は注意が必要です。</p><p>ブロレットでは施術前に<strong>頭皮保護オイル</strong>で肌をコーティングし、薬剤が直接触れることを防ぎます。さらに施術後は、<strong>シャンプー時に化学成分を徹底除去</strong>することで、カラー後の頭皮・髪への負担を限りなく軽減しています。</p><h3>頭皮を守るブロレットの3ステップ</h3><ol><li><p><strong>頭皮保護オイルでプロテクト</strong>——施術前に頭皮をオイルで保護し、薬剤刺激をブロック</p></li><li><p><strong>カラー後の徹底除去</strong>——シャンプー時に化学成分を残さず洗い流す</p></li><li><p><strong>髪質に合わせた栄養補給</strong>——カラー後の髪にトリートメントで潤いとツヤを補充</p></li></ol><blockquote><p><em>ブロレットのお約束 02「髪と頭皮に、優しく。」——可能な限り優しい処方で施術し、頭皮をプロテクトしながら、施術後はシャンプー時に化学成分を徹底的に除去します。</em></p></blockquote><h2>MILBONカラーソムリエが4名在籍</h2><img src="/images/salon-working.jpg" alt="ブロレット カラー施術風景"><p>ブロレットには、国内トップシェアのヘアケアブランド<strong>MILBON（ミルボン）</strong>が認定する<u><strong>カラーソムリエの資格保有者が4名</strong></u>在籍しています。カラーソムリエとは、カラーの理論・技術・提案力において高い水準をクリアしたスタイリストに与えられる認定資格です。</p><p>お客様一人ひとりの髪質・肌色・ライフスタイルを丁寧にカウンセリングし、<strong>365日、ずっと好きでいられる髪色</strong>をご提案します。資格取得費用はすべて会社が負担しているため、スタッフ全員が自分のスキルアップを思い切り追求できる環境が整っています。</p><h2>新潟でデザインカラーを楽しもう</h2><p>ベーシックなカラーはもちろん、ハイライト・バレイヤージュ・グラデーションカラーなど、トレンドのデザインカラーも得意としています。「どんな色が似合うかわからない」という方も、カウンセリングで一緒に考えていきましょう。</p><img src="/images/style-02.jpg" alt="新潟 デザインカラー スタイル"><h3>人気のカラーメニュー</h3><ul><li><p><strong>ワンカラー（¥4,500〜）</strong>——全体を均一に染め上げるベーシックカラー</p></li><li><p><strong>ハーブカラー</strong>——天然由来成分配合、敏感肌・頭皮が弱い方に</p></li><li><p><strong>スパカラー</strong>——頭皮ケアとカラーを同時に楽しむコース</p></li><li><p><strong>ノンダメージコース</strong>——ハイダメージ毛でも安心なケア特化カラー</p></li></ul><hr><h2>初めての方へ——まずは無料カウンセリングから</h2><p>ブロレットでは、新規のお客様に<u><strong>来店2週間以内の無料カウンセリング</strong></u>をご用意しています。カラーのお悩みや理想の髪色について、お気軽にご相談ください。当日予約もOKです。</p><p><strong>📍 新潟県新潟市中央区本馬越2丁目8番17号</strong></p><p><strong>📞 025-278-7274</strong>　（平日 9:15〜18:00 / 日祝 10:00〜17:00）</p><img src="/images/RB-logo-normal.png" alt="RISPLENDERE BROLETTO ロゴ">`,
};

/* ─── Article 2: 縮毛矯正・ヘッドスパ ──────────────────────────────────── */
const article2 = {
  title: '【新潟】くせ毛・うねりにさようなら｜ブロレットの髪質改善ストレートとヘッドスパ',
  slug: 'niigata-straight-headspa-care',
  excerpt: '新潟の梅雨・冬の湿気でくせ毛・うねりに悩む方へ。ブロレットの髪質改善SINKAトリートメントストレートとダヴィネスドラゴンヘッドスパで、毎朝のスタイリングが楽になる美髪へ。縮毛矯正担当の猪股スタイリストが丁寧に対応します。',
  category: 'ヘアケア',
  tags: ['縮毛矯正', 'ヘッドスパ', '新潟', '髪質改善', '新潟市中央区'],
  coverImageUrl: '/images/salon-01.jpg',
  status: 'published',
  publishedAt: pub2,
  createdAt: pub2,
  updatedAt: pub2,
  createdBy: 'seed',
  updatedBy: 'seed',
  content: {
    type: 'doc',
    content: [
      { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: '新潟の梅雨・冬の湿気に負けない美髪へ' }] },
      { type: 'paragraph', content: [
        { type: 'text', text: '日本有数の豪雪地帯である新潟。冬の乾燥と夏の湿気で、' },
        { type: 'text', marks: [{ type: 'bold' }], text: 'くせ毛・うねり・広がり' },
        { type: 'text', text: 'に悩む方が多いのが新潟の特徴です。「毎朝のスタイリングが大変」「梅雨の季節だけ髪が言うことを聞かない」——そんなお声をよくお聞きします。' },
      ]},
      { type: 'paragraph', content: [
        { type: 'text', text: '新潟市中央区本馬越の美容室' },
        { type: 'text', marks: [{ type: 'bold' }], text: 'RISPLENDERE BROLETTO（ブロレット）' },
        { type: 'text', text: 'では、くせ毛・うねりのお悩みに対応する豊富なメニューをご用意しています。特に' },
        { type: 'text', marks: [{ type: 'bold' }, { type: 'underline' }], text: '縮毛矯正・髪質改善ストレート' },
        { type: 'text', text: 'は人気のメニューで、多くのお客様から「毎朝の時間が楽になった」という喜びの声をいただいています。' },
      ]},
      { type: 'image', attrs: { src: '/images/salon-working.jpg', alt: '新潟 美容室 縮毛矯正 施術風景' } },
      { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: 'SINKA（シンカ）トリートメントストレートとは？' }] },
      { type: 'paragraph', content: [
        { type: 'text', text: 'ブロレットで扱う' },
        { type: 'text', marks: [{ type: 'bold' }], text: 'SINKAトリートメントストレート' },
        { type: 'text', text: 'は、一般的な縮毛矯正とは一線を画す最新メニューです。髪のタンパク質に直接働きかけ、' },
        { type: 'text', marks: [{ type: 'bold' }], text: '髪の芯から形状を整える' },
        { type: 'text', text: 'ことで、自然なストレートとツヤを実現します。' },
      ]},
      { type: 'bulletList', content: [
        { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: '✅ 仕上がりが自然でまとまりやすい' }] }] },
        { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: '✅ 繰り返し施術しても髪へのダメージを最小限に抑える' }] }] },
        { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: '✅ カラーとの同時施術にも対応（要カウンセリング）' }] }] },
        { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: '✅ 毎朝のスタイリング時間を大幅に短縮' }] }] },
      ]},
      { type: 'blockquote', content: [{ type: 'paragraph', content: [
        { type: 'text', marks: [{ type: 'italic' }], text: '「縮毛矯正をしてから、朝の準備が10分以上短くなりました。毎日のストレスが一つ減った感じです」——ご来店のお客様より' },
      ]}]},
      { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: 'ウェーブストレートという選択肢' }] },
      { type: 'paragraph', content: [
        { type: 'text', text: '「ガチッとしたストレートではなく、少し動きを残したい」という方には' },
        { type: 'text', marks: [{ type: 'bold' }], text: 'ウェーブストレート' },
        { type: 'text', text: 'がおすすめです。くせを完全に伸ばすのではなく、扱いやすい程度にまとまりを出します。自然な外ハネやふんわりとした動きを残しながら、梅雨や冬の湿気に負けない髪に仕上がります。' },
      ]},
      { type: 'image', attrs: { src: '/images/style-03.jpg', alt: 'ウェーブストレート スタイル 新潟' } },
      { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: '縮毛矯正担当：猪股久美スタイリスト' }] },
      { type: 'image', attrs: { src: '/images/staff-inomata-sq.jpg', alt: '猪股久美 スタイリスト' } },
      { type: 'paragraph', content: [
        { type: 'text', text: '縮毛矯正・ストレートメニューを得意とする' },
        { type: 'text', marks: [{ type: 'bold' }], text: '猪股久美スタイリスト' },
        { type: 'text', text: 'が在籍3年半のキャリアを活かし、お客様一人ひとりのくせ毛の特性に合わせた施術を行います。「できるだけ自然に」「ダメージを残したくない」などのご要望を、施術前にしっかりお聞きしてからプランを立てます。' },
      ]},
      { type: 'paragraph', content: [
        { type: 'text', marks: [{ type: 'italic' }], text: '「ご来店中も、日常の忙しさから解放されゆったりとした時間をお過ごしいただけるよう心がけています」' },
        { type: 'text', text: '——そんな想いで施術中のコミュニケーションを大切にしています。' },
      ]},
      { type: 'horizontalRule' },
      { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: '疲れた頭皮をリセットするヘッドスパ' }] },
      { type: 'paragraph', content: [
        { type: 'text', text: '縮毛矯正と同様に人気なのが、ブロレットの本格ヘッドスパです。日々のストレスや頭皮の疲れを、プロの手によるマッサージでリセットします。' },
      ]},
      { type: 'image', attrs: { src: '/images/salon-01.jpg', alt: 'ブロレット ヘッドスパ サロン' } },
      { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: 'ダヴィネス ドラゴンヘッドスパ（60分 ¥5,000〜）' }] },
      { type: 'paragraph', content: [
        { type: 'text', text: '本場イタリアのヘアケアブランド' },
        { type: 'text', marks: [{ type: 'bold' }], text: 'DAVINES（ダヴィネス）' },
        { type: 'text', text: 'の製品を使用した本格ヘッドスパです。頭皮を丁寧にほぐしながら栄養を補給。60分コースでは、頭皮から首・肩まで全身のリラクゼーション効果が期待できます。' },
      ]},
      { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: 'エステシモヘッドスパ（90分 ¥8,000）' }] },
      { type: 'paragraph', content: [
        { type: 'text', text: 'じっくり時間をかけてケアしたい方には、90分の' },
        { type: 'text', marks: [{ type: 'bold' }], text: 'エステシモヘッドスパ' },
        { type: 'text', text: 'がおすすめです。エステ・マッサージ経験豊富な稲吉春香ケアリストが、頭皮ケアとマッサージを組み合わせた贅沢なコースを担当します。' },
      ]},
      { type: 'horizontalRule' },
      { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: 'ご相談・ご予約——新潟市中央区本馬越でお待ちしています' }] },
      { type: 'paragraph', content: [
        { type: 'text', text: 'くせ毛・縮毛矯正・ヘッドスパについて「やってみたいけど不安」「自分に合うメニューを知りたい」という方は、お気軽にお問い合わせください。当日予約もOKです。' },
      ]},
      { type: 'paragraph', content: [{ type: 'text', marks: [{ type: 'bold' }], text: '📍 新潟県新潟市中央区本馬越2丁目8番17号' }] },
      { type: 'paragraph', content: [
        { type: 'text', marks: [{ type: 'bold' }], text: '📞 025-278-7274' },
        { type: 'text', text: '　（平日 9:15〜18:00 / 日祝 10:00〜17:00）' },
      ]},
      { type: 'image', attrs: { src: '/images/RB-logo-normal.png', alt: 'RISPLENDERE BROLETTO' } },
    ],
  },
  contentHtml: `<h2>新潟の梅雨・冬の湿気に負けない美髪へ</h2><p>日本有数の豪雪地帯である新潟。冬の乾燥と夏の湿気で、<strong>くせ毛・うねり・広がり</strong>に悩む方が多いのが新潟の特徴です。「毎朝のスタイリングが大変」「梅雨の季節だけ髪が言うことを聞かない」——そんなお声をよくお聞きします。</p><p>新潟市中央区本馬越の美容室<strong>RISPLENDERE BROLETTO（ブロレット）</strong>では、くせ毛・うねりのお悩みに対応する豊富なメニューをご用意しています。特に<u><strong>縮毛矯正・髪質改善ストレート</strong></u>は人気のメニューで、多くのお客様から「毎朝の時間が楽になった」という喜びの声をいただいています。</p><img src="/images/salon-working.jpg" alt="新潟 美容室 縮毛矯正 施術風景"><h2>SINKA（シンカ）トリートメントストレートとは？</h2><p>ブロレットで扱う<strong>SINKAトリートメントストレート</strong>は、一般的な縮毛矯正とは一線を画す最新メニューです。髪のタンパク質に直接働きかけ、<strong>髪の芯から形状を整える</strong>ことで、自然なストレートとツヤを実現します。</p><ul><li><p>✅ 仕上がりが自然でまとまりやすい</p></li><li><p>✅ 繰り返し施術しても髪へのダメージを最小限に抑える</p></li><li><p>✅ カラーとの同時施術にも対応（要カウンセリング）</p></li><li><p>✅ 毎朝のスタイリング時間を大幅に短縮</p></li></ul><blockquote><p><em>「縮毛矯正をしてから、朝の準備が10分以上短くなりました。毎日のストレスが一つ減った感じです」——ご来店のお客様より</em></p></blockquote><h3>ウェーブストレートという選択肢</h3><p>「ガチッとしたストレートではなく、少し動きを残したい」という方には<strong>ウェーブストレート</strong>がおすすめです。くせを完全に伸ばすのではなく、扱いやすい程度にまとまりを出します。自然な外ハネやふんわりとした動きを残しながら、梅雨や冬の湿気に負けない髪に仕上がります。</p><img src="/images/style-03.jpg" alt="ウェーブストレート スタイル 新潟"><h2>縮毛矯正担当：猪股久美スタイリスト</h2><img src="/images/staff-inomata-sq.jpg" alt="猪股久美 スタイリスト"><p>縮毛矯正・ストレートメニューを得意とする<strong>猪股久美スタイリスト</strong>が在籍3年半のキャリアを活かし、お客様一人ひとりのくせ毛の特性に合わせた施術を行います。「できるだけ自然に」「ダメージを残したくない」などのご要望を、施術前にしっかりお聞きしてからプランを立てます。</p><p><em>「ご来店中も、日常の忙しさから解放されゆったりとした時間をお過ごしいただけるよう心がけています」</em>——そんな想いで施術中のコミュニケーションを大切にしています。</p><hr><h2>疲れた頭皮をリセットするヘッドスパ</h2><p>縮毛矯正と同様に人気なのが、ブロレットの本格ヘッドスパです。日々のストレスや頭皮の疲れを、プロの手によるマッサージでリセットします。</p><img src="/images/salon-01.jpg" alt="ブロレット ヘッドスパ サロン"><h3>ダヴィネス ドラゴンヘッドスパ（60分 ¥5,000〜）</h3><p>本場イタリアのヘアケアブランド<strong>DAVINES（ダヴィネス）</strong>の製品を使用した本格ヘッドスパです。頭皮を丁寧にほぐしながら栄養を補給。60分コースでは、頭皮から首・肩まで全身のリラクゼーション効果が期待できます。</p><h3>エステシモヘッドスパ（90分 ¥8,000）</h3><p>じっくり時間をかけてケアしたい方には、90分の<strong>エステシモヘッドスパ</strong>がおすすめです。エステ・マッサージ経験豊富な稲吉春香ケアリストが、頭皮ケアとマッサージを組み合わせた贅沢なコースを担当します。</p><hr><h2>ご相談・ご予約——新潟市中央区本馬越でお待ちしています</h2><p>くせ毛・縮毛矯正・ヘッドスパについて「やってみたいけど不安」「自分に合うメニューを知りたい」という方は、お気軽にお問い合わせください。当日予約もOKです。</p><p><strong>📍 新潟県新潟市中央区本馬越2丁目8番17号</strong></p><p><strong>📞 025-278-7274</strong>　（平日 9:15〜18:00 / 日祝 10:00〜17:00）</p><img src="/images/RB-logo-normal.png" alt="RISPLENDERE BROLETTO">`,
};

/* ─── Article 3: 女性スタッフ・サロンストーリー ─────────────────────────── */
const article3 = {
  title: '女性スタッフだけの新潟の美容室｜ブロレットが16年愛される理由と3つのお約束',
  slug: 'niigata-womens-only-salon-broletto-story',
  excerpt: '「キラキラ輝く小さな場所」を意味するRISPLENDERE BROLETTO。代表・鶴巻麗奈が1人でスタートし、現在は女性スタッフ5名の温かいチームサロンへ。新潟で16年間愛される理由と、3つのお約束をご紹介します。',
  category: 'サロン情報',
  tags: ['女性スタッフ', '新潟', '本馬越', '子連れ', '新潟市中央区'],
  coverImageUrl: '/images/staff-team.jpg',
  status: 'published',
  publishedAt: pub3,
  createdAt: pub3,
  updatedAt: pub3,
  createdBy: 'seed',
  updatedBy: 'seed',
  content: {
    type: 'doc',
    content: [
      { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: '「キラキラ輝く小さな場所」が生まれるまで' }] },
      { type: 'paragraph', content: [
        { type: 'text', text: 'RISPLENDERE（リスプレンデレ）はイタリア語で「キラキラ輝く」、BROLETTO（ブロレット）は「小さな場所」を意味します。そのふたつを合わせたのが、新潟市中央区本馬越にある美容室' },
        { type: 'text', marks: [{ type: 'bold' }], text: 'RISPLENDERE BROLETTO（ブロレット）' },
        { type: 'text', text: 'の名前の由来です。' },
      ]},
      { type: 'paragraph', content: [
        { type: 'text', text: 'オーナーの' },
        { type: 'text', marks: [{ type: 'bold' }], text: '鶴巻麗奈' },
        { type: 'text', text: 'は、美容学校を卒業後、1人サロンとしてブロレットをスタートしました。腕一本で施術し続けるうちに、予約はみるみる数ヶ月待ちに。' },
      ]},
      { type: 'blockquote', content: [{ type: 'paragraph', content: [
        { type: 'text', marks: [{ type: 'italic' }], text: '「自分のエゴでお客様の綺麗になりたい時期を遅らせている」——そう気づいたとき、チームを作ることを決断しました。' },
      ]}]},
      { type: 'paragraph', content: [
        { type: 'text', text: '以来、結婚・出産を経てもスタッフが生き生きと働けるサロンづくりを続け、現在は' },
        { type: 'text', marks: [{ type: 'bold' }, { type: 'underline' }], text: '女性スタッフ5名のチームサロン' },
        { type: 'text', text: 'へと進化しました。16年間、新潟のお客様に寄り添い続けてきた、小さくて大切な場所です。' },
      ]},
      { type: 'image', attrs: { src: '/images/staff-team.jpg', alt: 'ブロレット スタッフチーム 新潟' } },
      { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: '全員女性スタッフだから安心できること' }] },
      { type: 'paragraph', content: [
        { type: 'text', text: 'ブロレットのスタッフは全員女性です。これは偶然ではなく、' },
        { type: 'text', marks: [{ type: 'bold' }], text: '「お客様にとってリラックスできる空間であること」' },
        { type: 'text', text: 'を大切に考えた結果です。女性同士だからこそ話しやすい悩みや、美容についての本音も遠慮なく伝えていただけます。' },
      ]},
      { type: 'bulletList', content: [
        { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: '👩 産前産後・育児中の方も気兼ねなく来店できる雰囲気' }] }] },
        { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: '👩 髪や頭皮の繊細な悩みも女性目線で親身に対応' }] }] },
        { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: '👩 男性スタッフへの対応が苦手な方も安心して通えます' }] }] },
      ]},
      { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: '産前産後もリラックスして通える' }] },
      { type: 'paragraph', content: [
        { type: 'text', text: 'ブロレットには、結婚・出産経験のあるスタッフが複数います。ライフステージが変わっても、体の状態や髪質の変化に合わせたカウンセリングをしてもらえるのは、経験者ならではの強みです。赤ちゃん連れのお客様向けの設備も充実しています。' },
      ]},
      { type: 'image', attrs: { src: '/images/staff-tsurumaki.jpg', alt: '鶴巻麗奈 オーナー RISPLENDERE BROLETTO' } },
      { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: '3つのお約束' }] },
      { type: 'horizontalRule' },
      { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: '01. ホームケアを、一緒に育てる。' }] },
      { type: 'paragraph', content: [
        { type: 'text', text: 'サロンでの施術は特別な時間ですが、365日の美しさを作るのはお客様ご自身の' },
        { type: 'text', marks: [{ type: 'bold' }], text: 'デイリーホームケア' },
        { type: 'text', text: 'です。ブロレットでは正しいシャンプーの仕方やヘアケア方法を丁寧にお伝えし、来店していない日も美しい髪でいられるようサポートします。' },
      ]},
      { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: '02. 髪と頭皮に、優しく。' }] },
      { type: 'paragraph', content: [
        { type: 'text', text: '可能な限り優しい処方で施術し、頭皮をプロテクトしながら丁寧に対応します。施術後は化学成分を徹底除去し、' },
        { type: 'text', marks: [{ type: 'bold' }, { type: 'underline' }], text: '髪・頭皮・体全体への負担を最小限に' },
        { type: 'text', text: 'することを心がけています。' },
      ]},
      { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: '03. 来店後も、寄り添い続ける。' }] },
      { type: 'paragraph', content: [
        { type: 'text', text: '来店時だけでなく、次回来店までのヘアスタイル維持をしっかりサポートします。「毎日の髪の悩みがない生活」を実現するため、ヘアドクターとしてフォロー・アドバイスを続けます。' },
      ]},
      { type: 'image', attrs: { src: '/images/salon-02.jpg', alt: 'ブロレット サロン内装' } },
      { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: 'お子様連れも大歓迎——3階建て多機能サロン' }] },
      { type: 'paragraph', content: [
        { type: 'text', text: 'ブロレットは' },
        { type: 'text', marks: [{ type: 'bold' }], text: '3階建ての多機能サロン' },
        { type: 'text', text: 'です。1階にはDVDが見れるキッズスペースと個室スパルーム、2階に通常サロンフロア、3階には半個室のプライベートスペースを完備しています。' },
      ]},
      { type: 'bulletList', content: [
        { type: 'listItem', content: [{ type: 'paragraph', content: [
          { type: 'text', marks: [{ type: 'bold' }], text: '貸切個室ルーム（要予約・無料）' },
          { type: 'text', text: '——お子様連れやゆっくり過ごしたい方に' },
        ]}]},
        { type: 'listItem', content: [{ type: 'paragraph', content: [
          { type: 'text', marks: [{ type: 'bold' }], text: 'キッズスペース' },
          { type: 'text', text: '——DVDで安心してお待ちいただけます' },
        ]}]},
        { type: 'listItem', content: [{ type: 'paragraph', content: [
          { type: 'text', marks: [{ type: 'bold' }], text: '未就学児カット半額' },
          { type: 'text', text: '——子育て世代に嬉しい特典' },
        ]}]},
      ]},
      { type: 'horizontalRule' },
      { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: '新潟市中央区本馬越でお待ちしています' }] },
      { type: 'paragraph', content: [
        { type: 'text', text: '「キラキラ輝く小さな場所」——その名の通り、小さくても心が輝く体験をお届けするために、スタッフ一同お待ちしています。初めてのご来店も、当日予約も大歓迎です。' },
      ]},
      { type: 'paragraph', content: [
        { type: 'text', marks: [{ type: 'bold' }], text: '📍 新潟県新潟市中央区本馬越2丁目8番17号' },
        { type: 'text', text: '（セブンイレブン本馬越店向かい・ウオロク本馬越店の斜め前）' },
      ]},
      { type: 'paragraph', content: [
        { type: 'text', marks: [{ type: 'bold' }], text: '📞 025-278-7274' },
        { type: 'text', text: '　（平日 9:15〜18:00 / 日祝 10:00〜17:00）' },
      ]},
      { type: 'image', attrs: { src: '/images/RB-logo-normal.png', alt: 'RISPLENDERE BROLETTO ロゴ' } },
    ],
  },
  contentHtml: `<h2>「キラキラ輝く小さな場所」が生まれるまで</h2><p>RISPLENDERE（リスプレンデレ）はイタリア語で「キラキラ輝く」、BROLETTO（ブロレット）は「小さな場所」を意味します。そのふたつを合わせたのが、新潟市中央区本馬越にある美容室<strong>RISPLENDERE BROLETTO（ブロレット）</strong>の名前の由来です。</p><p>オーナーの<strong>鶴巻麗奈</strong>は、美容学校を卒業後、1人サロンとしてブロレットをスタートしました。腕一本で施術し続けるうちに、予約はみるみる数ヶ月待ちに。</p><blockquote><p><em>「自分のエゴでお客様の綺麗になりたい時期を遅らせている」——そう気づいたとき、チームを作ることを決断しました。</em></p></blockquote><p>以来、結婚・出産を経てもスタッフが生き生きと働けるサロンづくりを続け、現在は<u><strong>女性スタッフ5名のチームサロン</strong></u>へと進化しました。16年間、新潟のお客様に寄り添い続けてきた、小さくて大切な場所です。</p><img src="/images/staff-team.jpg" alt="ブロレット スタッフチーム 新潟"><h2>全員女性スタッフだから安心できること</h2><p>ブロレットのスタッフは全員女性です。これは偶然ではなく、<strong>「お客様にとってリラックスできる空間であること」</strong>を大切に考えた結果です。女性同士だからこそ話しやすい悩みや、美容についての本音も遠慮なく伝えていただけます。</p><ul><li><p>👩 産前産後・育児中の方も気兼ねなく来店できる雰囲気</p></li><li><p>👩 髪や頭皮の繊細な悩みも女性目線で親身に対応</p></li><li><p>👩 男性スタッフへの対応が苦手な方も安心して通えます</p></li></ul><h3>産前産後もリラックスして通える</h3><p>ブロレットには、結婚・出産経験のあるスタッフが複数います。ライフステージが変わっても、体の状態や髪質の変化に合わせたカウンセリングをしてもらえるのは、経験者ならではの強みです。赤ちゃん連れのお客様向けの設備も充実しています。</p><img src="/images/staff-tsurumaki.jpg" alt="鶴巻麗奈 オーナー RISPLENDERE BROLETTO"><h2>3つのお約束</h2><hr><h3>01. ホームケアを、一緒に育てる。</h3><p>サロンでの施術は特別な時間ですが、365日の美しさを作るのはお客様ご自身の<strong>デイリーホームケア</strong>です。ブロレットでは正しいシャンプーの仕方やヘアケア方法を丁寧にお伝えし、来店していない日も美しい髪でいられるようサポートします。</p><h3>02. 髪と頭皮に、優しく。</h3><p>可能な限り優しい処方で施術し、頭皮をプロテクトしながら丁寧に対応します。施術後は化学成分を徹底除去し、<u><strong>髪・頭皮・体全体への負担を最小限に</strong></u>することを心がけています。</p><h3>03. 来店後も、寄り添い続ける。</h3><p>来店時だけでなく、次回来店までのヘアスタイル維持をしっかりサポートします。「毎日の髪の悩みがない生活」を実現するため、ヘアドクターとしてフォロー・アドバイスを続けます。</p><img src="/images/salon-02.jpg" alt="ブロレット サロン内装"><h2>お子様連れも大歓迎——3階建て多機能サロン</h2><p>ブロレットは<strong>3階建ての多機能サロン</strong>です。1階にはDVDが見れるキッズスペースと個室スパルーム、2階に通常サロンフロア、3階には半個室のプライベートスペースを完備しています。</p><ul><li><p><strong>貸切個室ルーム（要予約・無料）</strong>——お子様連れやゆっくり過ごしたい方に</p></li><li><p><strong>キッズスペース</strong>——DVDで安心してお待ちいただけます</p></li><li><p><strong>未就学児カット半額</strong>——子育て世代に嬉しい特典</p></li></ul><hr><h2>新潟市中央区本馬越でお待ちしています</h2><p>「キラキラ輝く小さな場所」——その名の通り、小さくても心が輝く体験をお届けするために、スタッフ一同お待ちしています。初めてのご来店も、当日予約も大歓迎です。</p><p><strong>📍 新潟県新潟市中央区本馬越2丁目8番17号</strong>（セブンイレブン本馬越店向かい・ウオロク本馬越店の斜め前）</p><p><strong>📞 025-278-7274</strong>　（平日 9:15〜18:00 / 日祝 10:00〜17:00）</p><img src="/images/RB-logo-normal.png" alt="RISPLENDERE BROLETTO ロゴ">`,
};

/* ─── Firestore 挿入 ─────────────────────────────────────────────────────── */
const col = db.collection('sites').doc(SITE).collection('blogs');

for (const article of [article1, article2, article3]) {
  const ref = col.doc();
  await ref.set(article);
  console.log(`✅ Created: ${article.title}`);
  console.log(`   slug: ${article.slug}  id: ${ref.id}`);
}

console.log('\n✨ 3件のブログ記事を Firestore に挿入しました。');
