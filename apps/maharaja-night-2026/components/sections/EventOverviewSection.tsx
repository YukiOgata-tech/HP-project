import { CalendarDays, Clock, MapPin, Shirt, Ticket, Users } from "lucide-react";
import { eventInfo } from "../data/eventData";

const overviewItems = [
  { icon: CalendarDays, label: "日程", value: eventInfo.date },
  { icon: Clock, label: "時間", value: eventInfo.time },
  { icon: MapPin, label: "会場", value: `${eventInfo.venue} / ${eventInfo.address}` },
  { icon: Ticket, label: "会費", value: `${eventInfo.menPrice}、${eventInfo.womenPrice}` },
  { icon: Users, label: "人数 / 対象", value: `${eventInfo.capacity} / ${eventInfo.target}` },
  { icon: Shirt, label: "DRESS CODE", value: eventInfo.dressCode },
];

export function EventOverviewSection() {
  return (
    <section className="bg-[#070508] px-3 py-7 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-2xl border border-[#d9b84f]/22 bg-[linear-gradient(135deg,rgba(217,184,79,0.1),rgba(255,255,255,0.035))] p-3 shadow-[0_18px_48px_-42px_rgba(217,184,79,0.55)] sm:rounded-[1.6rem] sm:p-8 sm:shadow-[0_28px_80px_-52px_rgba(217,184,79,0.55)]">
          <div className="flex flex-col gap-2 border-b border-white/10 pb-3 sm:gap-5 sm:pb-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[13px] font-black uppercase tracking-[0.2em] text-[#d9b84f] sm:text-sm sm:tracking-[0.32em]">
                Event Outline
              </p>
              <h2 className="mt-1 text-2xl font-black text-white sm:mt-3 sm:text-4xl">開催概要</h2>
            </div>
            <p className="max-w-2xl text-sm font-bold leading-5 text-white/62 sm:text-sm sm:leading-7">
              30〜60代の大人が、懐かしい音楽と華やかな演出を通じて交流する一夜限りのディスコイベントです。
            </p>
          </div>

          <dl className="mt-3 grid grid-cols-2 gap-1.5 sm:mt-6 sm:gap-3 md:grid-cols-2 xl:grid-cols-3">
            {overviewItems.map(({ icon: Icon, label, value }) => (
              <div key={label} className="rounded-xl border border-white/8 bg-black/35 p-2.5 sm:rounded-2xl sm:p-4">
                <dt className="flex items-center gap-1.5 text-[12px] font-black uppercase tracking-[0.16em] text-[#d9b84f] sm:gap-2 sm:text-[13px] sm:tracking-[0.24em]">
                  <Icon className="size-3.5 sm:size-4" />
                  {label}
                </dt>
                <dd className="mt-1.5 text-[12px] font-bold leading-4 text-white sm:mt-3 sm:text-sm sm:leading-7">{value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-2 grid gap-1.5 sm:mt-6 sm:gap-4 md:grid-cols-3">
            <div className="rounded-xl bg-white/6 p-2.5 sm:rounded-2xl sm:p-4">
              <p className="text-[12px] font-black uppercase tracking-[0.18em] text-white/42 sm:text-[12px] sm:tracking-[0.24em]">DJ</p>
              <p className="mt-1 text-[12px] font-bold leading-4 text-white sm:mt-2 sm:text-sm sm:leading-7">
                ミノルクリス滝沢 / DJ NaO / DJ MITSUKURI
              </p>
            </div>
            <div className="rounded-xl bg-white/6 p-2.5 sm:rounded-2xl sm:p-4">
              <p className="text-[12px] font-black uppercase tracking-[0.18em] text-white/42 sm:text-[12px] sm:tracking-[0.24em]">Special Guest</p>
              <p className="mt-1 text-[12px] font-bold leading-4 text-white sm:mt-2 sm:text-sm sm:leading-7">マーク・パンサー</p>
            </div>
            <div className="rounded-xl bg-white/6 p-2.5 sm:rounded-2xl sm:p-4">
              <p className="text-[12px] font-black uppercase tracking-[0.18em] text-white/42 sm:text-[12px] sm:tracking-[0.24em]">Cooperation</p>
              <p className="mt-1 text-[12px] font-bold leading-4 text-white sm:mt-2 sm:text-sm sm:leading-7">{eventInfo.partners.join(" / ")}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
