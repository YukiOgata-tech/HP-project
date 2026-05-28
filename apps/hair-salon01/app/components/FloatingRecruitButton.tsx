"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function FloatingRecruitButton() {
  return (
    <div className="fixed top-24 right-6 z-40">
      <Link
        href="/recruit"
        aria-label="採用情報ページへ"
        className="animate-float flex items-center gap-2.5 bg-[var(--cta)] px-5 py-3 text-[10px] font-bold uppercase tracking-widest text-[var(--cta-text)] shadow-[0_8px_32px_rgba(0,0,0,0.18)] transition-opacity hover:opacity-75"
      >
        スタッフ募集中
        <ArrowRight size={11} className="shrink-0" />
      </Link>
    </div>
  );
}
