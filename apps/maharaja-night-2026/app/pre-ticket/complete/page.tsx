import Link from "next/link";
import { CheckCircle2, ShieldCheck } from "lucide-react";
import { PublicPageFrame } from "@/components/layout/PublicPageFrame";
import { pageMetadata } from "@/components/data/seo";
import { getReceiptTicketByToken } from "../receipt";
import { ReceiptExportButtons } from "./ReceiptExportButtons";

export const metadata = {
  ...pageMetadata({
    title: "事前申込 受付完了",
    description: "MAHARAJA NIGHT in Niigata 2026 事前申込の受付完了画面です。",
    path: "/pre-ticket/complete",
  }),
  robots: {
    index: false,
    follow: false,
  },
};

interface Props {
  searchParams: Promise<{ token?: string }>;
}

function formatDate(raw?: { toDate?: () => Date }) {
  return raw?.toDate ? raw.toDate().toLocaleString("ja-JP") : "";
}

function genderLabel(gender?: string) {
  if (gender === "WOMEN") return "WOMEN / 3,000円";
  return "MEN / 4,000円";
}

export default async function PreTicketCompletePage({ searchParams }: Props) {
  const { token } = await searchParams;
  const ticket = await getReceiptTicketByToken(token ?? "");

  return (
    <PublicPageFrame>
      <main className="min-h-screen bg-[#070508] px-3 pb-10 pt-28 text-white sm:px-6 sm:pb-20 sm:pt-44">
        <section className="mx-auto max-w-3xl">
          {!ticket ? (
            <div className="rounded-2xl border border-white/10 bg-white/95 p-5 text-center text-[#1d1712] shadow-2xl sm:rounded-[1.6rem] sm:p-9">
              <ShieldCheck className="mx-auto size-12 text-[#8b6c3d]" />
              <h1 className="mt-4 text-2xl font-black sm:text-4xl">受付画面を表示できません</h1>
              <p className="mx-auto mt-3 max-w-xl text-sm font-bold leading-6 text-[#5f4e43] sm:text-base sm:leading-8">
                表示期限切れか、URLが正しくありません。<br />受付ID、メールアドレス、申請時のお名前で再表示できます。
              </p>
              <div className="mt-6 flex flex-col justify-center gap-2 sm:flex-row">
                <Link href="/pre-ticket/lookup" className="inline-flex h-9 sm:h-11 items-center justify-center rounded-full bg-[#2d221c] px-6 text-sm font-black text-white">
                  受付画面を再表示する
                </Link>
                <Link href="/pre-ticket" className="inline-flex h-9 sm:h-11 items-center justify-center rounded-full border border-[#2d221c]/50 px-6 text-sm font-black text-[#2d221c]">
                  申込フォームへ
                </Link>
              </div>
            </div>
          ) : (
            <div className="mx-auto max-w-97.5 space-y-4">
              <div
                id="pre-ticket-receipt-card"
                className="relative w-full overflow-hidden rounded-[1.45rem] border border-[#d9b84f]/45 bg-[#070508] text-white shadow-[0_0_45px_rgba(217,184,79,0.18)]"
              >
                <div className="absolute -left-4.5 top-[46%] z-10 size-9 rounded-full border border-[#d9b84f]/35 bg-[#070508]" />
                <div className="absolute -right-4.5 top-[46%] z-10 size-9 rounded-full border border-[#d9b84f]/35 bg-[#070508]" />
                <div className="bg-[radial-gradient(circle_at_top_left,rgba(217,184,79,0.32),transparent_34%),radial-gradient(circle_at_88%_12%,rgba(255,76,165,0.18),transparent_30%),linear-gradient(150deg,#171018,#070508_66%)] p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-label text-[11px] uppercase tracking-[0.2em] text-[#d9b84f]">MAHARAJA NIGHT 2026</p>
                      <h1 className="mt-1 text-3xl font-black leading-none text-gradient-gold">
                        ENTRY TICKET
                      </h1>
                      <p className="mt-1 text-[12px] font-black tracking-[0.2em] text-white/58">PRE-REGISTRATION RECEIPT</p>
                    </div>
                    <CheckCircle2 className="size-9 shrink-0 text-[#d9b84f]" />
                  </div>

                  <div className="mt-2 rounded-2xl border border-[#d9b84f]/35 bg-black/44 px-4 py-2 text-center">
                    <p className="text-[11px] font-black uppercase tracking-[0.24em] text-white/52">受付ID</p>
                    <p className="mt-1 break-all text-3xl font-bold leading-none tracking-wide text-[#f3de8a]">
                      {ticket.receiptId}
                    </p>
                  </div>

                  <div className="relative my-4 border-t border-dashed border-[#d9b84f]/40" />

                  <div className="grid gap-2">
                    <div className="rounded-xl border border-white/10 bg-white/6 p-3">
                      <p className="text-[11px] font-black uppercase tracking-[0.18em] text-white/42">Name</p>
                      <p className="mt-1 wrap-break-word text-2xl font-black leading-tight text-white">{ticket.name}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="rounded-xl border border-white/10 bg-white/6 p-3">
                        <p className="text-[11px] font-black uppercase tracking-[0.18em] text-white/42">Ticket</p>
                        <p className="mt-1 text-base font-black leading-5 text-white">{genderLabel(ticket.gender)}</p>
                      </div>
                      <div className="rounded-xl border border-white/10 bg-white/6 p-3">
                        <p className="text-[11px] font-black uppercase tracking-[0.18em] text-white/42">People</p>
                        <p className="mt-1 text-xl font-black leading-none text-white">{ticket.numberOfPeople ?? 1}名</p>
                      </div>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-white/6 p-3">
                      <p className="text-[11px] font-black uppercase tracking-[0.18em] text-white/42">Applied</p>
                      <p className="mt-1 text-sm font-black leading-5 text-white">{formatDate(ticket.createdAt)}</p>
                    </div>
                  </div>

                  <div className="mt-4 rounded-sm border-y border-[#ff4ca5]/25 bg-[#ff4ca5]/10 px-3 py-2 text-[13px] font-bold leading-4 text-white/78">
                    当日はこの画面を受付で提示してください。受付では申請時のお名前と受付IDを確認します。
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-dashed border-white/18 pt-3">
                    <p className="font-label text-[11px] tracking-[0.2em] text-white/42">500yen off</p>
                    <p className="font-label text-[11px] uppercase tracking-[0.2em] text-[#d9b84f]">STUDIO NEXS</p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/8 p-3 backdrop-blur sm:p-4">
                <ReceiptExportButtons fileName={`maharaja-pre-ticket-${ticket.receiptId ?? "receipt"}`} targetId="pre-ticket-receipt-card" />
                <p className="mt-3 text-center text-[12px] font-bold leading-5 text-white/52">
                  メールアドレス等、この画面には表示していません。
                </p>
              </div>

              <Link
                href="/"
                className="inline-flex h-11 w-full items-center justify-center rounded-full border border-[#d9b84f]/45 bg-black/42 px-6 text-sm font-black tracking-[0.16em] text-[#f3de8a] transition-colors hover:bg-[#d9b84f] hover:text-black"
              >
                トップページへ戻る
              </Link>
            </div>
          )}
        </section>
      </main>
    </PublicPageFrame>
  );
}
