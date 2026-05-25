import Link from "next/link";
import { CheckCircle2, Mail, Ticket, Wine } from "lucide-react";
import { PublicPageFrame } from "@/components/layout/PublicPageFrame";
import { pageMetadata } from "@/components/data/seo";
import { submitPreTicket } from "./actions";
import { FormSubmitButton } from "./FormSubmitButton";
import { PreTicketSpamFields } from "./PreTicketSpamFields";

export const metadata = pageMetadata({
  title: "事前申込・500円割引チケット",
  description:
    "MAHARAJA NIGHT in Niigata 2026 の事前申込ページです。当日受付で予約完了画面または申込名を提示すると、通常価格より500円引きで入場できます。",
  path: "/pre-ticket",
});

const sourceOptions = [
  "クチコミ",
  "ラジオ",
  "イベントサイト（こくちーず、Peatix等）",
  "Facebook",
  "X（Twitter）",
  "Instagram",
  "チラシ",
  "クラウドファンディング",
  "飲食店に置いてあるフライヤー",
  "その他",
];

const vipOptions = [
  "必要（前半 18:00〜21:00）",
  "必要（後半 21:30〜ラスト）",
  "不要",
  "その他",
];

const errorMessages: Record<string, { title: string; body: string }> = {
  missing: {
    title: "入力内容を確認してください",
    body: "メールアドレス、お名前、性別などの必須項目が不足しています。",
  },
  source: {
    title: "流入経路を選択してください",
    body: "「このイベントを何で知りましたか？」の項目を選択してから送信してください。",
  },
  vip: {
    title: "VIP TABLE CHARGEの項目を確認してください",
    body: "VIP TABLE CHARGEの希望項目が正しく選択されていません。",
  },
  "rate-limit": {
    title: "短時間に複数回の送信がありました",
    body: "しばらく時間をおいてから再度お試しください。すでに送信済みの場合は、受付IDから再表示できます。",
  },
  "submit-failed": {
    title: "送信に失敗しました",
    body: "通信状況やサーバー状態により保存できませんでした。入力内容を確認し、時間をおいて再度送信してください。",
  },
  config: {
    title: "送信設定に問題があります",
    body: "現在フォームを受け付けできません。運営側の設定確認が必要です。",
  },
};

interface Props {
  searchParams: Promise<{ error?: string; submitted?: string }>;
}

export default async function PreTicketPage({ searchParams }: Props) {
  const { error, submitted } = await searchParams;
  const isSubmitted = submitted === "1";
  const errorMessage = error ? errorMessages[error] ?? errorMessages["submit-failed"] : null;

  return (
    <PublicPageFrame>
      <main className="min-h-screen bg-[#070508] px-3 pb-10 pt-28 text-white sm:px-6 sm:pb-20 sm:pt-44">
        <section className="mx-auto grid max-w-7xl gap-4 lg:grid-cols-[0.84fr_1.16fr] lg:items-start">
          <aside className="rounded-2xl border border-[#d9b84f]/25 bg-white/5 p-3 sm:rounded-3xl sm:p-7">
            <p className="font-label text-[12px] uppercase text-[#d9b84f]">Pre Ticket</p>
            <h1 className="mt-2 text-3xl font-black leading-tight text-gradient-gold sm:text-6xl">
              事前申込<span className="text-lg sm:text-3xl">で</span>
              <br className="hidden sm:block"/>
              500円OFF
            </h1>
            <p className="mt-1 sm:mt-3 text-sm font-bold leading-6 text-white/68 sm:text-base sm:leading-8">
              当日受付にて予約完了画面を提示、または事前申込したお名前をお伝えください。通常価格より500円割引で入場できます。
            </p>

            <div className="mt-2 grid grid-cols-2 gap-2 sm:mt-7 sm:gap-3">
              <div className="rounded-xl border border-white/10 bg-black/35 px-3 py-2 sm:p-3">
                <div className="flex items-center gap-2">
                  <Ticket className="size-4 text-[#d9b84f]" />
                  <p className="text-sm font-black text-white">MEN</p>
                </div>
                <p className="text-lg font-black text-[#f3de8a]">¥4,000</p>
                <p className="text-[11px] font-bold text-white/60">通常 ¥4,500</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-black/35 px-3 py-2 sm:p-3">
                <div className="flex items-center gap-2">
                  <Ticket className="size-4 text-[#ff4ca5]" />
                  <p className="text-sm font-black text-white">WOMEN</p>
                </div>
                <p className="text-lg font-black text-[#f3de8a]">¥3,000</p>
                <p className="text-[11px] font-bold text-white/60">通常 ¥3,500</p>
              </div>
            </div>

            <div className="mt-2 rounded-xl border border-white/10 bg-black/30 p-3 text-[12px] font-bold leading-5 text-white/58 sm:mt-6 sm:text-sm sm:leading-7">
              20歳未満の方は入場できません。当日は身分証明書の確認を行う場合があります。
            </div>

            <div className="mt-2 rounded-xl border border-[#d9b84f]/24 bg-[#d9b84f]/8 p-3 sm:mt-6">
              <div className="flex items-center gap-2">
                <Wine className="size-4 text-[#d9b84f]" />
                <p className="text-sm font-black text-white">VIP TABLE</p>
              </div>
              <p className="mt-1 text-[12px] font-bold leading-5 text-white/62">
                ¥50,000 / シャンパン1本付き / 4名まで / 3時間制。希望者には担当より個別にご連絡します。
              </p>
            </div>
          </aside>

          <section className="rounded-2xl border border-white/10 bg-white/95 p-3 text-[#1d1712] shadow-2xl sm:rounded-[1.6rem] sm:p-7">
            {isSubmitted ? (
              <div className="py-10 text-center sm:py-16">
                <CheckCircle2 className="mx-auto size-12 text-[#19764b] sm:size-16" />
                <h2 className="mt-4 text-2xl font-black sm:text-4xl">事前申込を受け付けました</h2>
                <p className="mx-auto mt-3 max-w-xl text-sm font-bold leading-6 text-[#5f4e43] sm:text-base sm:leading-8">
                  当日はこの完了画面、または申込したお名前を受付でお伝えください。500円割引価格でご入場いただけます。
                </p>
                <div className="mt-6">
                  <Link href="/" className="inline-flex h-10 items-center justify-center rounded-full bg-[#2d221c] px-6 text-sm font-bold text-white">
                    トップへ戻る
                  </Link>
                </div>
              </div>
            ) : (
              <form action={submitPreTicket} className="grid gap-3 sm:gap-5">
                <PreTicketSpamFields />
                <div>
                  <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#725037]">Entry Form</p>
                  <h2 className="mt-1 text-xl font-black sm:text-3xl">参加申込み</h2>
                  <p className="mt-1 text-xs font-bold leading-5 text-[#67574b] sm:text-sm sm:leading-6">
                    必須項目を入力して送信してください。
                  </p>
                  <Link
                    href="/pre-ticket/lookup"
                    className="mt-3 inline-flex text-xs font-black tracking-widest text-[#8a5b32] underline decoration-[#d9b84f]/50 underline-offset-4 hover:text-[#1d1712]"
                  >
                    既に申し込んだ方はこちら
                  </Link>
                </div>

                {errorMessage ? (
                  <div className="rounded-xl border border-[#b74b4b] bg-[#fff4f4] p-3 text-sm font-bold leading-6 text-[#7b1f1f]">
                    <p className="text-base font-black">{errorMessage.title}</p>
                    <p className="mt-1 text-[13px] leading-5">{errorMessage.body}</p>
                    <Link
                      href="/pre-ticket/lookup"
                      className="mt-3 inline-flex h-9 items-center justify-center rounded-full border border-[#7b1f1f]/25 px-4 text-[12px] font-black text-[#7b1f1f]"
                    >
                      申込済みの方は受付画面を再表示
                    </Link>
                  </div>
                ) : null}

                <div className="grid gap-1 sm:gap-3 sm:grid-cols-2">
                  <label className="space-y-1.5">
                    <span className="text-sm font-black">メールアドレス *</span>
                    <input name="email" type="email" required className="h-9 sm:h-11 w-full rounded-xl border border-[#b89b84] bg-white px-3 text-sm font-bold outline-none focus:border-[#8c694d] focus:ring-2 focus:ring-[#b99679]/25" placeholder="example@mail.com" />
                  </label>
                  <label className="space-y-1.5">
                    <span className="text-sm font-black">お名前（ニックネーム可） *</span>
                    <input name="name" required className="h-9 sm:h-11 w-full rounded-xl border border-[#b89b84] bg-white px-3 text-sm font-bold outline-none focus:border-[#8c694d] focus:ring-2 focus:ring-[#b99679]/25" placeholder="マハラジャ 太郎" />
                  </label>
                </div>

                <fieldset className="space-y-2">
                  <legend className="text-sm font-black">性別 *</legend>
                  <div className="grid grid-cols-2 gap-2">
                    {["MEN", "WOMEN"].map((gender) => (
                      <label key={gender} className="flex h-9 sm:h-11 items-center gap-2 rounded-xl border border-[#b89b84] bg-white px-3 text-sm font-black">
                        <input type="radio" name="gender" value={gender} required className="accent-[#d9b84f]" />
                        {gender} {gender === "MEN" ? "¥4,000" : "¥3,000"}
                      </label>
                    ))}
                  </div>
                </fieldset>

                <label className="space-y-1.5">
                  <span className="text-sm font-black">このイベントを何で知りましたか？ *</span>
                  <select name="source" required className="h-9 sm:h-11 w-full rounded-xl border border-[#b89b84] bg-white px-3 text-sm font-bold outline-none focus:border-[#8c694d] focus:ring-2 focus:ring-[#b99679]/25">
                    <option value="">選択してください</option>
                    {sourceOptions.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </label>

                <label className="space-y-1.5">
                  <span className="text-sm font-black">その他の場合</span>
                  <input name="sourceOther" className="h-9 sm:h-11 w-full rounded-xl border border-[#b89b84] bg-white px-3 text-sm font-bold outline-none focus:border-[#8c694d] focus:ring-2 focus:ring-[#b99679]/25" placeholder="具体的にご記入ください" />
                </label>

                <div className="grid gap-3 sm:grid-cols-2">
                  <label className="space-y-1.5">
                    <span className="text-sm font-black">参加人数</span>
                    <input name="numberOfPeople" type="number" min="1" max="20" defaultValue="1" className="h-9 sm:h-11 w-full rounded-xl border border-[#b89b84] bg-white px-3 text-sm font-bold outline-none focus:border-[#8c694d] focus:ring-2 focus:ring-[#b99679]/25" />
                  </label>
                  <label className="space-y-1.5">
                    <span className="text-sm font-black">紹介者</span>
                    <input name="referrer" className="h-9 sm:h-11 w-full rounded-xl border border-[#b89b84] bg-white px-3 text-sm font-bold outline-none focus:border-[#8c694d] focus:ring-2 focus:ring-[#b99679]/25" placeholder="紹介者名があれば" />
                  </label>
                </div>

                <label className="space-y-1.5">
                  <span className="text-sm font-black">VIP TABLE CHARGE</span>
                  <select name="vipTable" defaultValue="不要" className="h-9 sm:h-11 w-full rounded-xl border border-[#b89b84] bg-white px-3 text-sm font-bold outline-none focus:border-[#8c694d] focus:ring-2 focus:ring-[#b99679]/25">
                    {vipOptions.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </label>

                <label className="space-y-1.5">
                  <span className="text-sm font-black">その他</span>
                  <textarea name="note" rows={2} className="w-full resize-none rounded-xl border border-[#b89b84] bg-white px-3 py-1 sm:py-2.5 text-sm font-bold outline-none focus:border-[#8c694d] focus:ring-2 focus:ring-[#b99679]/25" placeholder="ご質問や連絡事項があればご記入ください" />
                </label>

                <div className="rounded-xl border border-[#b89b84] bg-[#fffdf9] p-3 text-[12px] font-bold leading-4 text-[#5f4e43]">
                  <div className="flex gap-2">
                    <Mail className="mt-0.5 size-4 shrink-0" />
                    <p>送信後、入力内容は運営側で確認されます。当日は送信後の画面を受付でご提示していただきます</p>
                  </div>
                </div>

                <FormSubmitButton
                  label="事前申込を送信する →"
                  pendingLabel="送信中です"
                  className="h-9 rounded-full bg-[#2d221c] px-6 text-sm font-black tracking-[0.16em] text-white transition-colors hover:bg-[#1f1712] sm:h-11"
                />
              </form>
            )}
          </section>
        </section>
      </main>
    </PublicPageFrame>
  );
}
