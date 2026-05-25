import { historyItems } from "../data/eventData";
import Image from "next/image";

export function HistorySection() {
  return (
    <section id="history" className="bg-[#070508] py-8 sm:py-24">
      <div className="mx-auto mb-4 max-w-7xl px-3 sm:mb-10 sm:px-6">
        <div className="grid gap-2 sm:gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="text-[13px] font-black uppercase tracking-[0.2em] text-[#d9b84f] sm:text-sm sm:tracking-[0.32em]">
              History
            </p>
            <h2 className="mt-1 text-2xl font-black leading-tight text-gradient-gold sm:mt-3 sm:text-5xl">
              2023、2024、2025。
              <br />
              積み上げた熱気。
            </h2>
          </div>
          <p className="max-w-2xl text-sm font-bold leading-5 text-white/66 sm:text-base sm:leading-8">
            MAHARAJA NIGHT in Niigata は今回で4回目。過去開催では、ステージ、DJブース、巨大スクリーン、照明、そして満員のフロアが一体となり、新潟の夜に特別な時間を作ってきました。
          </p>
        </div>
      </div>

      <div className="overflow-x-auto px-3 pb-4 [scrollbar-color:#d9b84f_#161016] [scrollbar-width:thin] sm:px-6">
        <div className="mx-auto flex max-w-7xl snap-x snap-mandatory gap-3 sm:gap-5">
          {historyItems.map((item) => (
            <article
              className="w-[82vw] max-w-[560px] shrink-0 snap-start overflow-hidden rounded-xl border border-white/10 bg-white/[0.055] shadow-[0_24px_80px_rgba(0,0,0,0.38)] sm:w-[52vw] sm:rounded-[1.35rem] lg:w-[420px]"
              key={item.year}
            >
              <div className="bg-black/35 p-2 sm:p-3">
                <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-lg bg-[#0e0a10] sm:rounded-2xl">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(min-width: 1024px) 420px, (min-width: 640px) 52vw, 82vw"
                    className="object-contain"
                  />
                </div>
              </div>
              <div className="p-4 sm:p-6">
                <p className="text-3xl font-black text-[#d9b84f]/85 sm:text-5xl">{item.year}</p>
                <h3 className="mt-1 text-base font-black text-white sm:mt-3 sm:text-xl">{item.title}</h3>
                <p className="mt-2 text-sm font-bold leading-6 text-white/68 sm:mt-3 sm:text-base sm:leading-7">
                  {item.text}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
