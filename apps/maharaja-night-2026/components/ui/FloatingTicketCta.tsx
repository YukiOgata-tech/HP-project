import Link from "next/link";
import { Ticket } from "lucide-react";

export function FloatingTicketCta() {
  return (
    <Link
      href="/pre-ticket"
      className="group fixed bottom-4 right-3 z-40 inline-flex max-w-[calc(100vw-1.5rem)] items-center gap-2 rounded-full border border-[#f3de8a]/55 bg-[#070508]/90 px-3 py-2.5 text-left text-white shadow-[0_0_24px_rgba(217,184,79,0.28)] backdrop-blur-xl transition-transform hover:-translate-y-1 sm:bottom-6 sm:right-6 sm:gap-3 sm:px-4 sm:py-3"
      aria-label="事前申込チケットページへ移動"
    >
      <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-[#d9b84f] text-black sm:size-10">
        <Ticket className="size-4 sm:size-5" />
      </span>
      <span className="min-w-0">
        <span className="block truncate text-sm font-black tracking-wide text-[#f3de8a] sm:text-base">
          チケットはこちらから！
        </span>
        <span className="block truncate text-[11px] font-bold text-white/68 sm:text-xs">
          事前申込で当日500円OFF
        </span>
      </span>
    </Link>
  );
}
