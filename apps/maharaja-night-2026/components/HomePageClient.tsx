import { SiteHeader } from "./SiteHeader";
import { HeroSection } from "./HeroSection";
import { EventOverviewSection } from "./EventOverviewSection";
import { AboutSection } from "./AboutSection";
import { GuestSection } from "./GuestSection";
import { VipSection } from "./VipSection";
import { HistorySection } from "./HistorySection";
import { SponsorsSection } from "./SponsorsSection";
import { VenueSection } from "./VenueSection";
import { FaqSection } from "./FaqSection";
import { SiteFooter } from "./SiteFooter";
import { FloatingTicketCta } from "./FloatingTicketCta";
import { LatestNewsSection } from "./LatestNewsSection";

interface Sponsor {
  id: string;
  name?: string;
  logoUrl?: string;
  websiteUrl?: string;
  isActive?: boolean;
}

interface NewsItem {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  publishedAt?: string | null;
}

export function HomePageClient({ sponsors, posts }: { sponsors: Sponsor[]; posts: NewsItem[] }) {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-[#070508] text-white selection:bg-[#d9b84f] selection:text-black">
        <HeroSection />
        <LatestNewsSection posts={posts} />
        <EventOverviewSection />
        <AboutSection />
        <GuestSection />
        <VipSection />
        <HistorySection />
        <VenueSection />
        <SponsorsSection sponsors={sponsors} />
        <FaqSection />
      </main>
      <FloatingTicketCta />
      <SiteFooter />
    </>
  );
}
