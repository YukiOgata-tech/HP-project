import { eventInfo, faqs } from "./eventData";
import Link from "next/link";

export function FaqSection() {
  return (
    <section id="faq" className="bg-[#070508] px-3 py-8 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-4 sm:gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-[13px] font-black uppercase tracking-[0.2em] text-[#d9b84f] sm:text-sm sm:tracking-[0.32em]">
              FAQ / Notes
            </p>
            <h2 className="mt-1 text-2xl font-black text-white sm:mt-3 sm:text-5xl">
              来場前に知っておきたいこと。
            </h2>
            <div className="mt-3 rounded-2xl border border-[#d9b84f]/30 bg-[#d9b84f]/8 p-3 sm:mt-7 sm:rounded-[1.35rem] sm:p-5">
              <p className="text-[12px] font-black tracking-[0.16em] text-[#f3de8a] sm:text-sm">ENTRY CHARGE</p>
              <div className="mt-2 grid grid-cols-2 gap-1.5 text-white sm:mt-4 sm:grid-cols-1 sm:gap-3">
                <p className="text-sm font-black sm:text-xl">{eventInfo.menPrice}</p>
                <p className="text-sm font-black sm:text-xl">{eventInfo.womenPrice}</p>
                <p className="col-span-2 text-[12px] font-bold leading-4 text-white/62 sm:col-span-1 sm:text-sm sm:leading-7">{eventInfo.vipPrice}</p>
              </div>
              <Link
                href="/pre-ticket"
                className="mt-3 inline-flex h-9 w-full items-center justify-center rounded-full bg-[#d9b84f] px-6 text-sm font-black tracking-[0.18em] text-black sm:mt-6 sm:h-11 sm:text-sm"
              >
                事前申込へ進む
              </Link>
            </div>
          </div>

          <div className="grid gap-1.5 sm:gap-4">
            {faqs.map((item) => (
              <article key={item.q} className="rounded-xl border border-white/10 bg-white/5 p-3 sm:rounded-[1.2rem] sm:p-6">
                <h3 className="text-sm font-extrabold text-white sm:text-lg">{item.q}</h3>
                <p className="mt-1.5 text-[13px] font-bold leading-4 text-white sm:mt-3 sm:text-sm sm:leading-7">{item.a}</p>
              </article>
            ))}
            <div className="rounded-xl border border-white/10 bg-black/35 p-3 text-[13px] font-bold leading-5 text-white/52 sm:rounded-[1.2rem] sm:p-6 sm:text-sm sm:leading-7">
              22時以降のイベントでは会場規定により身分証確認が行われる場合があります。飲食物、危険物、法律で禁止されている物の持ち込み、迷惑行為は禁止です。イベント内容や運用は変更となる場合があります。
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
