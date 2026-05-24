import { ParticleBackground } from "./3d/ParticleBackground";
import { eventInfo, heroHighlights, productionNotes } from "./eventData";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden px-3 pb-8 pt-18 sm:px-6 sm:pb-20 sm:pt-28">
      <ParticleBackground />
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_20%_15%,rgba(217,184,79,0.2),transparent_26%),radial-gradient(circle_at_80%_20%,rgba(255,46,147,0.16),transparent_28%),linear-gradient(180deg,rgba(5,3,6,0.28),#070508_92%)]" />
      <div className="absolute inset-x-0 bottom-0 z-[1] h-28 bg-gradient-to-t from-[#070508] to-transparent sm:h-48" />

      <div className="relative z-10 mx-auto grid min-h-[calc(100vh-5rem)] max-w-7xl items-center gap-4 sm:gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <p className="font-label inline-flex rounded-full border border-[#d9b84f]/40 bg-black/35 px-3 py-1.5 text-[13px] uppercase text-[#f3de8a] backdrop-blur sm:px-4 sm:py-2 sm:text-[13px]">
            {eventInfo.date} / {eventInfo.venue}
          </p>
          <h1 className="font-display headline-glow mt-3 text-[3.8rem] font-black leading-[0.78] text-gradient-gold drop-shadow-[0_0_24px_rgba(217,184,79,0.35)] sm:mt-6 sm:text-8xl lg:text-9xl">
            MAHARAJA
            <br />
            NIGHT
          </h1>
          <p className="font-display mt-2 text-lg tracking-[0.16em] text-white sm:mt-4 sm:text-3xl">
            in NIIGATA 2026
          </p>
          <div className="mt-3 max-w-2xl border-l-2 border-[#d9b84f] pl-3 sm:mt-6 sm:pl-5">
            <p className="font-jp-display text-lg font-black text-white sm:text-3xl">
              MAHARAJA<span className="text-sm sm:text-xl">で</span>バブル<span className="text-sm sm:text-xl">へ</span>GO！
            </p>
            <p className="mt-2 text-sm font-bold leading-5 text-white/72 sm:mt-3 sm:text-lg sm:leading-8">
              {eventInfo.subcopy} 今年で4回目となる新潟開催。人とのつながりや交流の喜びを祝い、懐かしさとサプライズが交差するダンスフロアへ。
            </p>
          </div>

          <div className="mt-4 flex gap-2 sm:mt-8 sm:flex-row sm:gap-3">
            <Link
              href="/pre-ticket"
              className="font-label inline-flex h-9 flex-1 items-center justify-center rounded-full bg-[#d9b84f] px-4 text-[13px] text-black shadow-[0_0_22px_rgba(217,184,79,0.26)] transition-transform hover:-translate-y-1 sm:h-12 sm:flex-none sm:px-7 sm:text-sm"
            >
              TICKET
            </Link>
            <a
              href="#vip"
              className="font-label inline-flex h-9 flex-1 items-center justify-center rounded-full border border-[#d9b84f]/45 bg-black/25 px-4 text-[13px] text-[#f3de8a] backdrop-blur transition-colors hover:bg-[#d9b84f]/10 sm:h-12 sm:flex-none sm:px-7 sm:text-sm"
            >
              VIP
            </a>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-3 rounded-2xl bg-[#d9b84f]/10 blur-2xl sm:-inset-6 sm:rounded-[2rem] sm:blur-3xl" />
          <div className="relative overflow-hidden rounded-2xl border border-white/12 bg-black/45 shadow-black/30 backdrop-blur sm:rounded-[1.6rem] sm:shadow-2xl">
            <img
              src="/images/event/hero-disco-floor.jpg"
              alt="MAHARAJA NIGHT in Niigataの過去開催の熱気"
              className="h-32 w-full object-cover opacity-80 sm:h-64 md:h-80"
            />
            <div className="grid grid-cols-2 gap-px bg-white/10">
              {heroHighlights.map(({ icon: Icon, label, value }) => (
                <div key={label} className="bg-[#0b070c]/88 p-2.5 sm:p-4">
                  <div className="flex items-center gap-2 text-[#d9b84f]">
                    <Icon className="size-3.5 sm:size-4" />
                    <span className="font-label text-[12px] uppercase sm:text-[12px]">{label}</span>
                  </div>
                  <p className="mt-1 text-[12px] font-bold leading-4 text-white sm:mt-2 sm:text-sm sm:leading-6">{value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-2 grid gap-1.5 sm:mt-4 sm:gap-2">
            {productionNotes.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-2.5 py-2 text-[12px] font-bold leading-4 text-white/72 backdrop-blur sm:gap-3 sm:rounded-full sm:px-4 sm:py-3 sm:text-sm sm:leading-5">
                <Icon className="size-3.5 shrink-0 text-[#ff4ca5] sm:size-4" />
                {text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
