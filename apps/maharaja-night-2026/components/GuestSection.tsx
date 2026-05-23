import { TiltCard } from "./3d/TiltCard";
import { lineup } from "./eventData";

export function GuestSection() {
  return (
    <section id="lineup" className="relative overflow-hidden bg-[#0b070c] px-3 py-8 sm:px-6 sm:py-24">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(217,184,79,0.08),transparent_32%),radial-gradient(circle_at_88%_10%,rgba(0,229,255,0.12),transparent_30%)]" />
      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[13px] font-black uppercase tracking-[0.2em] text-[#d9b84f] sm:text-sm sm:tracking-[0.32em]">
            Guest & DJs
          </p>
          <h2 className="mt-1 text-2xl font-black leading-tight text-gradient-gold sm:mt-3 sm:text-5xl">
            懐かしさ<span className="text-base sm:text-2xl">を知る</span>DJ<span className="text-base sm:text-2xl">と、</span>
            <br />
            スペシャルゲスト。
          </h2>
          <p className="mt-2 text-sm font-bold leading-5 text-white/66 sm:mt-5 sm:text-base sm:leading-8">
            FM新潟パーソナリティ、元新潟マハラジャ、元横濱マハラジャ、そしてマーク・パンサー。新潟の一夜をMAHARAJAダンスフロアへ変える出演陣です。
          </p>
        </div>

        <div className="mt-4 grid gap-2 sm:mt-10 sm:gap-5 md:grid-cols-2">
          {lineup.map((guest) => (
            <TiltCard key={guest.name} className="min-h-[18rem] sm:min-h-[28rem]">
              <article className="relative flex h-full min-h-[18rem] flex-col justify-end overflow-hidden rounded-xl border border-white/8 bg-[#111] p-3 sm:min-h-[28rem] sm:p-7">
                <img
                  src={guest.image}
                  alt={`${guest.name}のイメージ`}
                  className="absolute inset-0 h-full w-full object-cover opacity-55 transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/10" />
                <div className="relative z-10">
                  <p className="text-[12px] font-black uppercase tracking-[0.2em] text-[#ff4ca5] drop-shadow-[0_0_10px_rgba(255,46,147,0.8)] sm:text-[12px] sm:tracking-[0.28em]">
                    {guest.accent}
                  </p>
                  <h3 className="mt-1 text-2xl font-black text-white sm:mt-3 sm:text-5xl">{guest.name}</h3>
                  <p className="mt-1 text-[12px] font-bold tracking-[0.14em] text-[#f3de8a] sm:mt-2 sm:text-sm sm:tracking-[0.16em]">
                    {guest.role}
                  </p>
                  <p className="mt-2 line-clamp-4 max-w-xl text-[13px] font-bold leading-5 text-white/72 sm:mt-5 sm:line-clamp-none sm:text-sm sm:leading-7">{guest.text}</p>
                </div>
              </article>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
