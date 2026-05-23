import { Car, MapPin, Train } from "lucide-react";
import { eventInfo, venueFeatures } from "./eventData";

export function VenueSection() {
  return (
    <section id="access" className="relative overflow-hidden bg-[#0b070c] px-3 py-8 sm:px-6 sm:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_20%,rgba(0,229,255,0.12),transparent_32%),radial-gradient(circle_at_80%_85%,rgba(217,184,79,0.12),transparent_30%)]" />
      <div className="relative mx-auto grid max-w-7xl gap-4 sm:gap-8 lg:grid-cols-[1fr_1fr] lg:items-start">
        <div>
          <p className="text-[13px] font-black uppercase tracking-[0.2em] text-[#d9b84f] sm:text-sm sm:tracking-[0.32em]">
            Venue / Access
          </p>
          <h2 className="mt-1 text-2xl font-black leading-tight text-white sm:mt-3 sm:text-5xl">
            日本海側最大級<span className="text-base sm:text-2xl">の</span>
            <br />
            エンタメ空間へ。
          </h2>
          <p className="mt-2 text-sm font-bold leading-5 text-white/68 sm:mt-5 sm:text-base sm:leading-8">
            会場は新潟・万代の STUDIO NEXS。音響、照明、映像システム、巨大スクリーン、DJブースを備えた空間で、当日のフロアを一夜限りのMAHARAJAへ変えます。
          </p>

          <div className="mt-3 grid gap-1.5 sm:mt-8 sm:gap-3">
            {venueFeatures.map((feature) => (
              <article key={feature.label} className="rounded-xl border border-white/10 bg-white/5 p-2.5 sm:rounded-2xl sm:p-5">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-2">
                  <h3 className="text-[13px] font-black uppercase tracking-[0.18em] text-[#d9b84f] sm:text-sm sm:tracking-[0.24em]">
                    {feature.label}
                  </h3>
                  <p className="text-base font-black text-white sm:text-xl">{feature.value}</p>
                </div>
                <p className="mt-1 text-sm font-bold leading-4 text-white/60 sm:mt-3 sm:text-lg sm:leading-7">{feature.text}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/40 shadow-black/30 sm:rounded-[1.6rem] sm:shadow-2xl">
          <img
            src="/images/event/proposal-p05-01.jpg"
            alt="STUDIO NEXSの会場イメージ"
            className="h-40 w-full object-cover sm:h-64 md:h-80"
          />
          <div className="space-y-3 p-3 sm:space-y-5 sm:p-7">
            <div className="flex gap-2 sm:gap-3">
              <MapPin className="mt-1 size-4 shrink-0 text-[#d9b84f] sm:size-5" />
              <div>
                <h3 className="text-sm font-black text-white sm:text-base">{eventInfo.venue}</h3>
                <p className="mt-0.5 text-[13px] font-bold leading-5 text-white/66 sm:mt-1 sm:text-sm sm:leading-7">{eventInfo.address}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-1.5 sm:gap-3">
              <div className="rounded-xl bg-white/6 p-2.5 sm:rounded-2xl sm:p-4">
                <Train className="size-4 text-[#ff4ca5] sm:size-5" />
                <p className="mt-2 text-[12px] font-bold leading-4 text-white sm:mt-3 sm:text-sm">新潟駅万代口より徒歩約10分</p>
              </div>
              <div className="rounded-xl bg-white/6 p-2.5 sm:rounded-2xl sm:p-4">
                <Car className="size-4 text-[#ff4ca5] sm:size-5" />
                <p className="mt-2 text-[12px] font-bold leading-4 text-white sm:mt-3 sm:text-sm">専用駐車・駐輪スペースなし</p>
              </div>
            </div>
            <a
              href="https://www.google.com/maps/search/?api=1&query=%E6%96%B0%E6%BD%9F%E5%B8%82%E4%B8%AD%E5%A4%AE%E5%8C%BA%E4%B8%87%E4%BB%A31-3-1%20%E4%B8%87%E4%BB%A3%E3%82%B7%E3%83%8D%E3%83%A2%E3%83%BC%E3%83%AB%E3%83%93%E3%83%ABB1"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-9 w-full items-center justify-center rounded-full border border-[#d9b84f]/45 px-5 text-sm font-black tracking-[0.16em] text-[#f3de8a] transition-colors hover:bg-[#d9b84f]/10 sm:h-11 sm:text-sm"
            >
              GOOGLE MAP
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
