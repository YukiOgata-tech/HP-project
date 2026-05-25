"use client";

import { createPortal } from "react-dom";
import Image from "next/image";

interface MaharajaLoadingOverlayProps {
  show: boolean;
  label?: string;
}

export function MaharajaLoadingOverlay({
  show,
  label = "処理中です",
}: MaharajaLoadingOverlayProps) {
  if (!show) return null;
  if (typeof document === "undefined") return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] grid place-items-center bg-black/24 px-6 text-white backdrop-blur-sm">
      <div className="flex flex-col items-center text-center">
        <div className="relative grid size-28 place-items-center rounded-full border border-[#d9b84f]/35 bg-black/88 shadow-[0_0_44px_rgba(217,184,79,0.25)]">
          <div className="absolute inset-[-7px] rounded-full border-2 border-transparent border-t-[#d9b84f] border-r-[#ff4ca5] animate-spin" />
          <Image
            src="/images/maharaja-logo-blackBG.webp"
            alt="MAHARAJA NIGHT"
            width={76}
            height={76}
            className="rounded-full object-contain"
            priority
          />
        </div>
        <p className="mt-5 rounded-full bg-black/58 px-4 py-2 text-sm font-black tracking-[0.18em] text-[#f3de8a] shadow-[0_0_22px_rgba(0,0,0,0.35)]">
          {label}
        </p>
        <p className="mt-2 rounded-full bg-black/38 px-4 py-1.5 text-xs font-bold leading-5 text-white/68">
          画面を閉じずにそのままお待ちください。
        </p>
      </div>
    </div>,
    document.body,
  );
}
