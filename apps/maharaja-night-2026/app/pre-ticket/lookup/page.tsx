import Link from "next/link";
import { SearchCheck } from "lucide-react";
import { PublicPageFrame } from "@/components/layout/PublicPageFrame";
import { pageMetadata } from "@/components/data/seo";
import { lookupPreTicket } from "../actions";
import { FormSubmitButton } from "../FormSubmitButton";

export const metadata = {
  ...pageMetadata({
    title: "事前申込 受付画面の再表示",
    description: "受付ID、メールアドレス、申請時のお名前で事前申込の受付画面を再表示します。",
    path: "/pre-ticket/lookup",
  }),
  robots: {
    index: false,
    follow: false,
  },
};

interface Props {
  searchParams: Promise<{ error?: string }>;
}

const errorMessages: Record<string, string> = {
  missing: "受付ID、メールアドレス、申請時のお名前を入力してください。",
  "not-found": "入力内容に一致する申込情報が見つかりませんでした。",
  "rate-limit": "短時間に複数回の確認がありました。しばらく時間をおいてから再度お試しください。",
};

export default async function PreTicketLookupPage({ searchParams }: Props) {
  const { error } = await searchParams;

  return (
    <PublicPageFrame>
      <main className="min-h-screen bg-[#070508] px-3 pb-10 pt-28 text-white sm:px-6 sm:pb-20 sm:pt-44">
        <section className="mx-auto grid max-w-5xl gap-4 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <aside className="rounded-2xl border border-[#d9b84f]/25 bg-white/[0.045] p-4 sm:rounded-[1.6rem] sm:p-7">
            <SearchCheck className="size-8 text-[#d9b84f]" />
            <p className="mt-4 font-label text-[12px] uppercase text-[#d9b84f]">Ticket Lookup</p>
            <h1 className="mt-2 text-3xl font-black leading-tight text-gradient-gold sm:text-5xl">
              受付画面を
              <br />
              再表示
            </h1>
            <p className="mt-3 text-sm font-bold leading-6 text-white/68 sm:text-base sm:leading-8">
              申込後に表示された受付ID、メールアドレス、申請時のお名前が一致した場合のみ、受付提示用の画面を再表示します。
            </p>
          </aside>

          <section className="rounded-2xl border border-white/10 bg-white/[0.965] p-4 text-[#1d1712] shadow-2xl sm:rounded-[1.6rem] sm:p-7">
            <form action={lookupPreTicket} className="grid gap-4">
              <div className="hidden" aria-hidden="true">
                <label>
                  Web site
                  <input name="website" tabIndex={-1} autoComplete="off" />
                </label>
              </div>

              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#725037]">Receipt Check</p>
                <h2 className="mt-1 text-xl font-black sm:text-3xl">確認情報を入力</h2>
                <p className="mt-1 text-xs font-bold leading-5 text-[#67574b] sm:text-sm sm:leading-6">
                  第三者表示を避けるため、3項目が一致した場合のみ受付画面を表示します。
                </p>
              </div>

              {error ? (
                <div className="rounded-xl border border-[#b74b4b] bg-[#fff4f4] p-3 text-sm font-bold leading-6 text-[#7b1f1f]">
                  {errorMessages[error] ?? errorMessages["not-found"]}
                </div>
              ) : null}

              <label className="space-y-1.5">
                <span className="text-sm font-black">受付ID *</span>
                <input name="receiptId" required className="h-11 w-full rounded-xl border border-[#b89b84] bg-white px-3 text-sm font-bold uppercase outline-none focus:border-[#8c694d] focus:ring-2 focus:ring-[#b99679]/25" placeholder="MN2026-XXXXXXXX" />
              </label>

              <label className="space-y-1.5">
                <span className="text-sm font-black">メールアドレス *</span>
                <input name="email" type="email" required className="h-11 w-full rounded-xl border border-[#b89b84] bg-white px-3 text-sm font-bold outline-none focus:border-[#8c694d] focus:ring-2 focus:ring-[#b99679]/25" placeholder="example@mail.com" />
              </label>

              <label className="space-y-1.5">
                <span className="text-sm font-black">申請時のお名前 *</span>
                <input name="name" required className="h-11 w-full rounded-xl border border-[#b89b84] bg-white px-3 text-sm font-bold outline-none focus:border-[#8c694d] focus:ring-2 focus:ring-[#b99679]/25" placeholder="申込時に入力した名前" />
              </label>

              <FormSubmitButton
                label="受付画面を表示する"
                pendingLabel="確認中です"
                className="h-11 rounded-full bg-[#2d221c] px-6 text-sm font-black tracking-[0.16em] text-white transition-colors hover:bg-[#1f1712]"
              />

              <Link href="/pre-ticket" className="text-center text-xs font-black tracking-widest text-[#725037] hover:text-[#1d1712]">
                まだ申し込んでいない方はこちら
              </Link>
            </form>
          </section>
        </section>
      </main>
    </PublicPageFrame>
  );
}
