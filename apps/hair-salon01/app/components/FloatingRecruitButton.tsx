"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function FloatingRecruitButton() {
  return (
    <div className="fixed top-24 right-6 z-40">
      <Link
        href="/recruit"
        aria-label="採用情報ページへ"
        className="animate-float flex items-center gap-2.5 bg-[#8a6c78] px-5 py-3 text-[10px] font-bold uppercase tracking-widest text-white shadow-[0_8px_28px_rgba(138,108,120,0.40)] transition-opacity hover:opacity-80"
      >
        スタッフ募集中
        <ArrowRight size={11} className="shrink-0" />
      </Link>
    </div>
  );
}
