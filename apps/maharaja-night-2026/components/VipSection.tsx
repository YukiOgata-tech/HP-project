import { eventInfo } from "./eventData";

interface VipSectionProps {
  onOpenModal: () => void;
}

export function VipSection({ onOpenModal }: VipSectionProps) {
  return (
    <section id="vip" className="relative overflow-hidden border-y border-[#d9b84f]/20 bg-black px-3 py-8 sm:px-6 sm:py-24">
      <img
        src="/images/event/proposal-p05-01.jpg"
        alt="STUDIO NEXSのVIPとフロア"
        className="absolute inset-0 h-full w-full object-cover opacity-18"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,#070508_0%,rgba(7,5,8,0.84)_42%,rgba(7,5,8,0.48)_100%)]" />
      <div className="relative mx-auto grid max-w-7xl gap-4 sm:gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="text-[13px] font-black uppercase tracking-[0.2em] text-[#d9b84f] sm:text-sm sm:tracking-[0.32em]">
            V.I.P Table
          </p>
          <h2 className="mt-1 text-2xl font-black leading-tight text-gradient-gold sm:mt-3 sm:text-6xl">
            フロア<span className="text-base sm:text-3xl">の</span>熱気<span className="text-base sm:text-3xl">を、</span>
            <br />
            確保された席から。
          </h2>
          <p className="mt-2 text-sm font-bold leading-5 text-white/72 sm:mt-5 sm:text-base sm:leading-8">
            席を確保して楽しみたい方、グループでゆっくり過ごしたい方に向けたVIPテーブルをご用意します。STUDIO NEXSの音響・照明・映像演出を、通常の立席とは違う距離感で体験できます。
          </p>
        </div>

        <div className="rounded-2xl border border-[#d9b84f]/35 bg-black/68 p-3 shadow-[0_0_30px_rgba(217,184,79,0.1)] backdrop-blur sm:rounded-[1.6rem] sm:p-8 sm:shadow-[0_0_48px_rgba(217,184,79,0.14)]">
          <div className="flex flex-col gap-2 border-b border-white/10 pb-3 sm:gap-4 sm:pb-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[12px] font-black uppercase tracking-[0.2em] text-[#ff4ca5] sm:text-[12px] sm:tracking-[0.28em]">
                Table Charge
              </p>
              <h3 className="mt-1 text-2xl font-black text-white sm:mt-2 sm:text-3xl">VIP TABLE</h3>
            </div>
            <p className="text-base font-black text-[#f3de8a] sm:text-2xl">{eventInfo.vipPrice}</p>
          </div>

          <dl className="mt-3 grid grid-cols-3 gap-1.5 sm:mt-6 sm:gap-3">
            {[
              ["形式", "テーブル利用"],
              ["時間", "3時間制"],
              ["案内", "申込後に個別連絡"],
            ].map(([label, value]) => (
              <div key={label} className="rounded-xl bg-white/6 p-2.5 sm:rounded-2xl sm:p-4">
                <dt className="text-[12px] font-black uppercase tracking-[0.16em] text-white/42 sm:text-[12px] sm:tracking-[0.24em]">{label}</dt>
                <dd className="mt-1 text-[12px] font-bold leading-4 text-white sm:mt-2 sm:text-sm">{value}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-3 text-[13px] font-bold leading-5 text-white/62 sm:mt-6 sm:text-sm sm:leading-7">
            席数、人数、利用条件、当日の運用詳細は調整中のため、VIP希望の方には運営より個別にご案内します。
          </p>

          <button
            type="button"
            onClick={onOpenModal}
            className="mt-3 h-9 w-full rounded-full bg-gradient-to-r from-[#d9b84f] to-[#f3de8a] px-5 text-sm font-black tracking-[0.16em] text-black transition-transform hover:-translate-y-1 sm:mt-7 sm:h-12 sm:px-8 sm:text-sm sm:tracking-[0.2em]"
          >
            VIP TABLEを問い合わせる
          </button>
        </div>
      </div>
    </section>
  );
}
