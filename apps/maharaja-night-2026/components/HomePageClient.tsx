"use client";

import { useState } from "react";
import { SiteHeader } from "./SiteHeader";
import { HeroSection } from "./HeroSection";
import { EventOverviewSection } from "./EventOverviewSection";
import { AboutSection } from "./AboutSection";
import { GuestSection } from "./GuestSection";
import { VipSection } from "./VipSection";
import { HistorySection } from "./HistorySection";
import { SponsorsSection } from "./SponsorsSection";
import { RegisterModal } from "./RegisterModal";
import { VenueSection } from "./VenueSection";
import { FaqSection } from "./FaqSection";
import { SiteFooter } from "./SiteFooter";

interface Sponsor {
  id: string;
  name?: string;
  logoUrl?: string;
  websiteUrl?: string;
  isActive?: boolean;
}

export function HomePageClient({ sponsors }: { sponsors: Sponsor[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"general" | "vip">("general");

  const openModal = (type: "general" | "vip") => {
    setModalType(type);
    setIsModalOpen(true);
  };

  return (
    <>
      <SiteHeader onOpenModal={openModal} />
      <main className="min-h-screen bg-[#070508] text-white selection:bg-[#d9b84f] selection:text-black">
        <HeroSection onOpenModal={openModal} />
        <EventOverviewSection />
        <AboutSection />
        <GuestSection />
        <VipSection onOpenModal={() => openModal("vip")} />
        <HistorySection />
        <VenueSection />
        <SponsorsSection sponsors={sponsors} />
        <FaqSection onOpenModal={openModal} />
      </main>
      <SiteFooter />

      <RegisterModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        initialType={modalType} 
      />
    </>
  );
}
