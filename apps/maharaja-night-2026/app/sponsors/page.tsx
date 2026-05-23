import { ExternalLink, Handshake, Sparkles } from "lucide-react";
import { getAdminDb } from "@client-sites/lib/cms/firebase-admin";
import { PublicPageFrame } from "@/components/PublicPageFrame";
import { eventInfo } from "@/components/eventData";
import { StructuredData } from "@/components/StructuredData";
import { absoluteUrl, pageMetadata, siteName } from "@/components/seo";

const SITE_ID = process.env.SITE_ID!;

interface Sponsor {
  id: string;
  name?: string;
  logoUrl?: string;
  websiteUrl?: string;
  tier?: "platinum" | "gold" | "regular" | string;
  isActive?: boolean;
  order?: number;
}

async function getSponsors(): Promise<Sponsor[]> {
  const db = getAdminDb();
  const snapshot = await db
    .collection("sites")
    .doc(SITE_ID)
    .collection("sponsors")
    .orderBy("order", "asc")
    .get();

  return snapshot.docs
    .map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    .filter((sponsor): sponsor is Sponsor => Boolean((sponsor as Sponsor).isActive));
}

function tierLabel(tier?: string) {
  if (tier === "platinum") return "Platinum Sponsor";
  if (tier === "gold") return "Gold Sponsor";
  return "Sponsor";
}

const sponsorsDescription =
  "MAHARAJA NIGHT in Niigata 2026 を支える協賛企業・協力企業の一覧です。";

export const metadata = pageMetadata({
  title: "協賛企業一覧",
  description: sponsorsDescription,
  path: "/sponsors",
});

export default async function SponsorsPage() {
  const sponsors = await getSponsors();
  const displaySponsors: Sponsor[] =
    sponsors.length > 0
      ? sponsors
      : eventInfo.sponsors.map((name, index) => ({
          id: `fallback-${index}`,
          name,
          tier: "regular",
          isActive: true,
        }));
  const sponsorsJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${siteName} 協賛企業一覧`,
    description: sponsorsDescription,
    url: absoluteUrl("/sponsors"),
    mainEntity: displaySponsors.map((sponsor) => ({
      "@type": "Organization",
      name: sponsor.name,
      url: sponsor.websiteUrl,
      logo: sponsor.logoUrl,
    })),
  };

  return (
    <PublicPageFrame>
      <StructuredData data={sponsorsJsonLd} />
      <main className="min-h-screen bg-[#070508] px-3 pb-10 pt-20 text-white sm:px-6 sm:pb-20 sm:pt-36">
        <section className="mx-auto max-w-7xl">
          <div className="grid gap-3 border-b border-white/10 pb-5 sm:gap-8 sm:pb-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
            <div>
              <p className="text-[13px] font-black uppercase tracking-[0.2em] text-[#d9b84f] sm:text-sm sm:tracking-[0.32em]">
                Sponsors
              </p>
              <h1 className="mt-1 text-3xl font-black leading-tight text-gradient-gold sm:mt-3 sm:text-6xl">
                協賛企業<span className="text-lg sm:text-3xl">一覧</span>
              </h1>
            </div>
            <p className="max-w-2xl text-sm font-bold leading-5 text-white/66 sm:text-base sm:leading-8">
              MAHARAJA NIGHT in Niigata 2026 は、地域企業、メディア、ブランドの協力によって支えられています。協賛企業は管理画面から追加・更新され、このページへ反映されます。
            </p>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-1.5 sm:mt-8 sm:gap-4 md:grid-cols-4">
            <div className="rounded-xl border border-[#d9b84f]/25 bg-[#d9b84f]/8 p-3 sm:rounded-2xl sm:p-5">
              <Handshake className="size-4 text-[#d9b84f] sm:size-5" />
              <p className="mt-2 text-2xl font-black text-white sm:text-4xl">{displaySponsors.length}</p>
              <p className="text-[12px] font-bold text-white/52 sm:text-sm">掲載協賛</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.045] p-3 sm:rounded-2xl sm:p-5">
              <Sparkles className="size-4 text-[#ff4ca5] sm:size-5" />
              <p className="mt-2 text-2xl font-black text-white sm:text-4xl">{eventInfo.partners.length}</p>
              <p className="text-[12px] font-bold text-white/52 sm:text-sm">協力団体</p>
            </div>
          </div>

          <div className="mt-4 grid gap-2 sm:mt-8 sm:gap-4 md:grid-cols-2 xl:grid-cols-3">
            {displaySponsors.map((sponsor) => {
              const card = (
                <article className="group min-h-36 rounded-xl border border-white/10 bg-white/[0.045] p-3 transition-all duration-300 hover:-translate-y-1 hover:border-[#d9b84f]/45 sm:min-h-48 sm:rounded-[1.35rem] sm:p-6">
                  <div className="flex items-start justify-between gap-3">
                    <p className="rounded-full bg-[#d9b84f]/10 px-2.5 py-1 text-[12px] font-black uppercase tracking-[0.18em] text-[#d9b84f] sm:text-[12px]">
                      {tierLabel(sponsor.tier)}
                    </p>
                    {sponsor.websiteUrl ? (
                      <ExternalLink className="size-3.5 text-white/35 transition-colors group-hover:text-[#f3de8a] sm:size-4" />
                    ) : null}
                  </div>

                  <div className="mt-4 flex min-h-16 items-center justify-center rounded-xl bg-black/32 p-3 sm:mt-6 sm:min-h-24 sm:p-5">
                    {sponsor.logoUrl ? (
                      <img
                        src={sponsor.logoUrl}
                        alt={sponsor.name ?? "Sponsor"}
                        className="max-h-12 object-contain sm:max-h-16"
                      />
                    ) : (
                      <p className="text-center text-base font-black text-white sm:text-xl">
                        {sponsor.name}
                      </p>
                    )}
                  </div>

                  <p className="mt-3 text-center text-[13px] font-bold leading-5 text-white/54 sm:mt-5 sm:text-sm sm:leading-6">
                    {sponsor.name}
                  </p>
                </article>
              );

              return sponsor.websiteUrl ? (
                <a key={sponsor.id} href={sponsor.websiteUrl} target="_blank" rel="noreferrer">
                  {card}
                </a>
              ) : (
                <div key={sponsor.id}>{card}</div>
              );
            })}
          </div>

          <section className="mt-5 rounded-2xl border border-white/10 bg-white/[0.035] p-3 sm:mt-10 sm:rounded-[1.35rem] sm:p-8">
            <p className="text-center text-[12px] font-black uppercase tracking-[0.22em] text-white/42 sm:text-[12px] sm:tracking-[0.3em]">
              Cooperation
            </p>
            <div className="mt-3 flex flex-wrap items-center justify-center gap-1.5 sm:mt-6 sm:gap-3">
              {eventInfo.partners.map((name) => (
                <span
                  key={name}
                  className="rounded-full border border-[#d9b84f]/24 bg-[#d9b84f]/8 px-3 py-2 text-[12px] font-bold text-[#f3de8a] sm:px-5 sm:py-3 sm:text-sm"
                >
                  {name}
                </span>
              ))}
            </div>
          </section>
        </section>
      </main>
    </PublicPageFrame>
  );
}
