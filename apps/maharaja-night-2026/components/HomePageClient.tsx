"use client";

import { useState } from "react";
import { HeroSection } from "./HeroSection";
import { AboutSection } from "./AboutSection";
import { GuestSection } from "./GuestSection";
import { VipSection } from "./VipSection";
import { HistorySection } from "./HistorySection";
import { SponsorsSection } from "./SponsorsSection";
import { RegisterModal } from "./RegisterModal";

export function HomePageClient({ sponsors }: { sponsors: any[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"general" | "vip">("general");

  const openModal = (type: "general" | "vip") => {
    setModalType(type);
    setIsModalOpen(true);
  };

  return (
    <>
      <main className="min-h-screen bg-black text-white selection:bg-[#D4AF37] selection:text-black pb-20 sm:pb-0">
        <HeroSection onOpenModal={() => openModal("general")} />
        <AboutSection />
        <GuestSection />
        <VipSection onOpenModal={() => openModal("vip")} />
        <HistorySection />
        <SponsorsSection sponsors={sponsors} />
        
        {/* Footer */}
        <footer className="py-8 sm:py-12 border-t border-white/10 bg-[#050505] text-center">
          <p className="text-[10px] sm:text-xs text-gray-500 tracking-widest">© 2026 MAHARAJA NIGHT in NIIGATA.</p>
        </footer>
      </main>

      <RegisterModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        initialType={modalType} 
      />
    </>
  );
}
