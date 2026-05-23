"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { RegisterModal } from "./RegisterModal";

export function PublicPageFrame({ children }: { children: ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"general" | "vip">("general");

  const openModal = (type: "general" | "vip") => {
    setModalType(type);
    setIsModalOpen(true);
  };

  return (
    <>
      <SiteHeader onOpenModal={openModal} />
      {children}
      <SiteFooter />
      <RegisterModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialType={modalType}
      />
    </>
  );
}
