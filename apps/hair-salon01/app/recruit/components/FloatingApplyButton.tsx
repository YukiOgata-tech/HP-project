"use client";

import { useEffect, useState } from "react";
import { ArrowDown } from "lucide-react";

export function FloatingApplyButton() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const applySection = document.getElementById("apply");
    if (!applySection) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0.15 }
    );
    observer.observe(applySection);
    return () => observer.disconnect();
  }, []);

  function handleClick() {
    document.getElementById("apply")?.scrollIntoView({ behavior: "smooth" });
  }

  if (!visible) return null;

  return (
    <div className="fixed top-24 right-6 z-40">
      <button
        onClick={handleClick}
        aria-label="応募フォームへ移動"
        className="animate-float flex items-center gap-2.5 border border-[var(--cta)] bg-[var(--cta)] px-5 py-3 text-[10px] font-bold uppercase tracking-widest text-[var(--cta-text)] shadow-[0_8px_32px_rgba(0,0,0,0.18)] transition-opacity hover:opacity-75"
      >
        応募フォームへ
        <ArrowDown size={11} className="shrink-0" />
      </button>
    </div>
  );
}
