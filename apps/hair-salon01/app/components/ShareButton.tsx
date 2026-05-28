"use client";

import { useState } from "react";
import { Share2, Check } from "lucide-react";

const SHARE_TITLE = "RISPLENDERE BROLETTO";
const SHARE_TEXT  = "新潟市中央区本馬越の美容室 RISPLENDERE BROLETTO";

export function ShareButton() {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    const url = window.location.origin + "/";

    if (typeof navigator.share === "function") {
      try {
        await navigator.share({ title: SHARE_TITLE, text: SHARE_TEXT, url });
      } catch {
        // キャンセルまたは非対応 → 何もしない
      }
    } else {
      try {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      } catch {
        // clipboard 非対応 → 何もしない
      }
    }
  }

  return (
    <button
      onClick={handleShare}
      className="inline-flex items-center gap-2 text-[10px] tracking-[0.2em] text-white/30 transition-colors hover:text-white/60"
      aria-label="このサイトをシェア"
    >
      {copied
        ? <Check size={11} className="shrink-0" />
        : <Share2 size={11} className="shrink-0" />
      }
      {copied ? "コピーしました" : "Share"}
    </button>
  );
}
