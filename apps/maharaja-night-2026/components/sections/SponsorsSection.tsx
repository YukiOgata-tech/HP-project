import { eventInfo } from "../data/eventData";
import { PublicLoadingLink } from "../ui/PublicLoadingLink";

interface Sponsor {
  id: string;
  name?: string;
  logoUrl?: string;
  websiteUrl?: string;
  isActive?: boolean;
}

export function SponsorsSection({ sponsors }: { sponsors: Sponsor[] }) {
  const activeSponsors = sponsors.filter((s) => s.isActive);
  const displaySponsors = activeSponsors.slice(0, 8);
  const hiddenSponsorCount = Math.max(activeSponsors.length - displaySponsors.length, 0);

  return (
    <section id="sponsors" className="bg-[#050306] px-3 py-8 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[13px] font-black uppercase tracking-[0.2em] text-[#d9b84f] sm:text-sm sm:tracking-[0.32em]">
            Sponsors & Partners
          </p>
          <h2 className="mt-1 text-2xl font-black leading-tight text-white sm:mt-3 sm:text-4xl">
            新潟<span className="text-base sm:text-2xl">の夜を支える</span>協賛・協力企業。
          </h2>
        </div>

        <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.035] p-3 sm:mt-10 sm:rounded-[1.35rem] sm:p-8">
          <p className="text-center text-[12px] font-black uppercase tracking-[0.22em] text-white/42 sm:text-[12px] sm:tracking-[0.3em]">
            Sponsors
          </p>
          <div className="mt-3 grid grid-cols-2 items-center justify-center gap-1.5 sm:mt-6 sm:gap-4 md:flex md:flex-wrap md:gap-8">
            {displaySponsors.map((sponsor) => (
              <a
                key={sponsor.id}
                href={sponsor.websiteUrl || "#sponsors"}
                className="flex min-h-14 items-center justify-center rounded-xl border border-white/8 bg-black/32 p-2 grayscale transition-all duration-500 hover:border-[#d9b84f]/40 hover:grayscale-0 sm:min-h-20 sm:p-4"
              >
              {sponsor.logoUrl ? (
                <img src={sponsor.logoUrl} alt={sponsor.name ?? "Sponsor"} className="max-h-9 object-contain sm:max-h-14" />
              ) : (
                <span className="text-center text-[13px] font-bold text-white/62 transition-colors hover:text-white sm:text-sm md:text-lg">
                  {sponsor.name}
                </span>
              )}
              </a>
            ))}
            {hiddenSponsorCount > 0 ? (
              <PublicLoadingLink
                href="/sponsors"
                loadingLabel="協賛企業ページへ移動中です"
                className="flex min-h-14 items-center justify-center rounded-xl border border-[#d9b84f]/24 bg-[#d9b84f]/8 p-2 text-center text-[12px] font-black text-[#f3de8a] sm:min-h-20 sm:p-4 sm:text-sm"
              >
                ほか{hiddenSponsorCount}社を見る
              </PublicLoadingLink>
            ) : null}
            {activeSponsors.length === 0 &&
              eventInfo.sponsors.map((name) => (
                <div key={name} className="flex min-h-14 items-center justify-center rounded-xl border border-white/8 bg-black/32 p-2 text-center text-[13px] font-bold text-white/58 sm:min-h-20 sm:p-4 sm:text-sm md:text-lg">
                  {name}
                </div>
              ))}
          </div>
        </div>

        <div className="mt-2 rounded-2xl border border-white/10 bg-white/[0.035] p-3 sm:mt-5 sm:rounded-[1.35rem] sm:p-8">
          <p className="text-center text-[12px] font-black uppercase tracking-[0.22em] text-white/42 sm:text-[12px] sm:tracking-[0.3em]">
            Cooperation
          </p>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-1.5 sm:mt-6 sm:gap-3">
            {eventInfo.partners.map((name) => (
              <span key={name} className="rounded-full border border-[#d9b84f]/24 bg-[#d9b84f]/8 px-3 py-2 text-[12px] font-bold text-[#f3de8a] sm:px-5 sm:py-3 sm:text-sm">
                {name}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-3 flex justify-center sm:mt-6">
          <PublicLoadingLink
            href="/sponsors"
            loadingLabel="協賛企業ページへ移動中です"
            className="inline-flex h-9 items-center justify-center rounded-full border border-[#d9b84f]/45 px-5 text-sm font-black tracking-[0.18em] text-[#f3de8a] transition-colors hover:bg-[#d9b84f]/10 sm:h-11 sm:px-7 sm:text-sm"
          >
            協賛企業一覧を見る
          </PublicLoadingLink>
        </div>
      </div>
    </section>
  );
}
