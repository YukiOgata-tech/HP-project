import { conceptPillars, eventInfo } from "./eventData";

export function AboutSection() {
  return (
    <section id="about" className="relative overflow-hidden bg-[#070508] px-3 py-8 sm:px-6 sm:py-24">
      <div className="absolute inset-y-0 left-0 w-1/2 bg-[radial-gradient(circle_at_0%_50%,rgba(255,46,147,0.12),transparent_42%)]" />
      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-3 sm:gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="text-[13px] font-black uppercase tracking-[0.2em] text-[#d9b84f] sm:text-sm sm:tracking-[0.32em]">
              About the event
            </p>
            <h2 className="mt-1 text-2xl font-black leading-tight text-white sm:mt-3 sm:text-5xl">
              4回目<span className="text-base sm:text-2xl">の</span>新潟開催。
              <br />
              記憶<span className="text-base sm:text-2xl">と</span>熱狂<span className="text-base sm:text-2xl">を、</span>もう一度。
            </h2>
          </div>
          <div className="space-y-2 text-sm font-bold leading-5 text-white/72 sm:space-y-5 sm:text-base sm:leading-8">
            <p>
              {eventInfo.name} は、バブル時代やDISCOシーンの元気印として親しまれてきたMAHARAJAの空気を、新潟で一夜限り復活させるイベントです。
            </p>
            <p>
              懐かしい音楽をただ再生するだけではなく、DJ、スペシャルゲスト、ダンサー、テキーラガール、会場演出を組み合わせ、来場者同士の交流と再会が自然に生まれる大人の社交場を目指します。
            </p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-1.5 sm:mt-10 sm:gap-4 md:grid-cols-2 xl:grid-cols-4">
          {conceptPillars.map(({ icon: Icon, title, heading, text }) => (
            <article
              key={title}
              className="group rounded-xl border border-white/10 bg-white/5 p-2.5 transition-all duration-300 hover:-translate-y-1 hover:border-[#d9b84f]/45 hover:bg-[#d9b84f]/8 sm:rounded-[1.35rem] sm:p-6"
            >
              <div className="flex size-8 items-center justify-center rounded-full border border-[#d9b84f]/30 bg-[#d9b84f]/10 text-[#d9b84f] transition-colors group-hover:bg-[#d9b84f] group-hover:text-black sm:size-12">
                <Icon className="size-4 sm:size-5" />
              </div>
              <p className="mt-2 text-[12px] font-black uppercase tracking-[0.18em] text-[#ff4ca5] sm:mt-5 sm:text-sm sm:tracking-[0.28em]">
                {title}
              </p>
              <h3 className="mt-1 text-sm font-black leading-5 text-white sm:mt-3 sm:text-xl sm:leading-7">{heading}</h3>
              <p className="mt-1.5 line-clamp-4 text-[12px] font-bold leading-4 text-white/58 sm:mt-4 sm:line-clamp-none sm:text-sm sm:leading-7">{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
