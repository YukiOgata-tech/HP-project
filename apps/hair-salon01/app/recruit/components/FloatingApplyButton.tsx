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
        className="animate-float flex items-center gap-2.5 bg-[#8a6c78] px-5 py-3 text-[10px] font-bold uppercase tracking-widest text-white shadow-[0_8px_28px_rgba(138,108,120,0.40)] transition-opacity hover:opacity-80"
      >
        応募フォームへ
        <ArrowDown size={11} className="shrink-0" />
      </button>
    </div>
  );
}
