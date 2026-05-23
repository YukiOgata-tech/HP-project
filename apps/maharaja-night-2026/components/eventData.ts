import {
  CalendarDays,
  Clock,
  Disc3,
  MapPin,
  Music2,
  Radio,
  Sparkles,
  Ticket,
  Users,
  Wine,
} from "lucide-react";

export const eventInfo = {
  name: "MAHARAJA NIGHT in Niigata 2026",
  tagline: "MAHARAJAでバブルへGO！",
  subcopy: "伝説のディスコが、一夜限りで新潟のまちに蘇る。",
  date: "2026年10月24日（土）",
  time: "18:00〜1:00",
  venue: "STUDIO NEXS",
  address: "新潟市中央区万代1-3-1 万代シネモールビルB1",
  access: "新潟駅万代口より徒歩約10分 / 万代バスセンター前より徒歩約1分",
  menPrice: "MEN ¥4,500 / 1D",
  womenPrice: "WOMEN ¥3,500 / 1D",
  vipPrice: "VIP TABLE CHARGE ¥50,000（3時間制）",
  capacity: "500名",
  target: "30〜60代の男女",
  dressCode: "Free",
  organizers: [
    "株式会社メディアライン",
    "グローバルイノベーション合同会社",
    "株式会社 I.D.Additional's",
  ],
  partners: ["マハラジャ六本木", "FM新潟", "UX新潟テレビ21"],
  sponsors: ["アサヒビール", "CHAMPAGNE COLLET"],
};

export const heroHighlights = [
  { icon: CalendarDays, label: "Date", value: eventInfo.date },
  { icon: Clock, label: "Time", value: eventInfo.time },
  { icon: MapPin, label: "Venue", value: eventInfo.venue },
  { icon: Ticket, label: "Charge", value: `${eventInfo.menPrice} / ${eventInfo.womenPrice}` },
];

export const conceptPillars = [
  {
    icon: Disc3,
    title: "Groove",
    heading: "あの頃の音が、今のフロアを動かす。",
    text: "1980年代後半から1990年代のバブル期、トレンディドラマの主題歌、globeの名曲、懐かしのディスコソングを中心に、世代を越えて身体が反応するグルーブを作ります。",
  },
  {
    icon: Sparkles,
    title: "Surprise",
    heading: "突然始まる演出が、一体感を広げる。",
    text: "スペシャルゲスト、ダンサー、テキーラガールによるサプライズ演出を織り交ぜ、ただ聴くだけではない、会場全体が巻き込まれる夜を設計します。",
  },
  {
    icon: Wine,
    title: "Hospitality",
    heading: "大人が安心して楽しめる、華やかな社交場。",
    text: "30〜60代を中心に、久しぶりに踊る人も、ディスコを愛してきた人も、交流と再会を自然に楽しめるおもてなしの場を目指します。",
  },
  {
    icon: Users,
    title: "Festival",
    heading: "500人規模で新潟の夜を熱くする。",
    text: "新潟の飲食店、地元メディア、各種団体、オーガナイザーと連携し、人とのつながりや交流の喜びを祝う一夜限りのフェスティバルとして開催します。",
  },
];

export const lineup = [
  {
    name: "マーク・パンサー",
    role: "SPECIAL GUEST DJ / globe",
    image: "/images/event/proposal-p17-01.jpg",
    accent: "SPECIAL GUEST",
    text: "globeのメンバーとして日本の音楽史に残るヒットを生み、DJ / プロデューサーとしても国内外で活動。懐かしのglobe名曲とディスコミュージックで、会場に大きなフェス感とサプライズを生み出します。",
  },
  {
    name: "ミノルクリス滝沢",
    role: "FM新潟 パーソナリティ DJ",
    image: "/images/event/proposal-p08-04.jpg",
    accent: "FM NIIGATA",
    text: "FM新潟パーソナリティとして知られるDJ。懐かしのディスコソングから最新のクラブミュージックまで、地元新潟のフロアを明るく熱く引き上げます。",
  },
  {
    name: "DJ NaO",
    role: "元新潟マハラジャ DJ",
    image: "/images/event/proposal-p06-01.jpg",
    accent: "NIIGATA MAHARAJA",
    text: "元新潟マハラジャのDJとして、当時を知る世代の記憶に響く選曲と、いまの空気に合わせたパフォーマンスでフロアをつなぎます。",
  },
  {
    name: "DJ MITSUKURI",
    role: "元横濱マハラジャ DJ",
    image: "/images/event/proposal-p07-01.jpg",
    accent: "YOKOHAMA MAHARAJA",
    text: "元横濱マハラジャのDJ。90年代バブル時代の高揚感と、懐かしさだけに留まらない華やかなDISCO感を会場へ持ち込みます。",
  },
];

export const venueFeatures = [
  {
    label: "Main Floor",
    value: "最大400名規模",
    text: "音響・照明・映像システムを備えたメインフロア。立席中心の熱量あるイベントに対応します。",
  },
  {
    label: "Lounge",
    value: "Barカウンター完備",
    text: "ディスコ全盛期のカクテルを片手に、会話や交流を楽しめるラウンジ空間。",
  },
  {
    label: "V.I.P Room",
    value: "VIP個室 / テーブル",
    text: "席を確保して過ごしたい方向けのプライベート感あるエリアを用意します。",
  },
];

export const historyItems = [
  {
    year: "2023",
    image: "/images/event/proposal-p06-02.jpg",
    title: "MAHARAJA NIGHT in Niigata 2023",
    text: "新潟での復活開催として、世代を越えた来場者が集まり、ステージとフロアが一体になる熱気を生みました。",
  },
  {
    year: "2024",
    image: "/images/event/proposal-p07-01.jpg",
    title: "MAHARAJA NIGHT in Niigata 2024",
    text: "DJブースと巨大スクリーンの演出が際立ち、懐かしさと現代的なクラブ演出を融合した一夜に。",
  },
  {
    year: "2025",
    image: "/images/event/proposal-p08-01.jpg",
    title: "MAHARAJA NIGHT in Niigata 2025",
    text: "フロアを埋める来場者と光の演出が重なり、次回への期待を高める盛り上がりを記録しました。",
  },
];

export const faqs = [
  {
    q: "どんなイベントですか？",
    a: "バブル時代やDISCOシーンの象徴として親しまれたMAHARAJAの空気を、新潟で一夜限り復活させる大人向けディスコイベントです。音楽、ダンス、交流、サプライズ演出を楽しめます。",
  },
  {
    q: "初めてでも参加できますか？",
    a: "参加できます。対象は30〜60代を中心に、ディスコ経験者、音楽とダンスを楽しみたい方、社交的な交流を楽しみたい方を想定しています。",
  },
  {
    q: "ドレスコードはありますか？",
    a: "本イベントのドレスコードは Free です。会場規定により、雰囲気にそぐわない服装や危険物・飲食物の持ち込みはお断りする場合があります。",
  },
  {
    q: "VIPテーブルはどのような内容ですか？",
    a: "VIP TABLE CHARGE は50,000円、3時間制です。詳細な席数や利用条件は申込後に運営より個別に案内します。",
  },
];

export const productionNotes = [
  { icon: Music2, text: "懐かしのディスコソング、globeの名曲、クラブミュージックを横断" },
  { icon: Radio, text: "FM新潟、UX新潟テレビ21、マハラジャ六本木との協力体制" },
  { icon: Sparkles, text: "ダンサー & テキーラガール3名によるサプライズ演出" },
];
