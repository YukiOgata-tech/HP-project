import Link from "next/link";
import { ShareButton } from "./ShareButton";

const tel            = "025-278-7274";
const reservationUrl = "https://beauty.hotpepper.jp/slnH000142482/";
const instagramUrl   = "https://www.instagram.com/risplendere_broletto/";

const navLinks = [
  { href: "/#concept", label: "Concept" },
  { href: "/menu",     label: "Menu"    },
  { href: "/news",     label: "Journal" },
  { href: "/salon",    label: "About"   },
  { href: "/faq",      label: "FAQ"     },
  { href: "/recruit",  label: "Recruit" },
  { href: "/#access",  label: "Access"  },
];

export function Footer() {
  return (
    <footer className="bg-(--bg-darkest) text-white">
      <div className="mx-auto max-w-350 px-6 py-8 md:py-20">

        {/* Top grid */}
        <div className="grid gap-5 sm:gap-10 md:grid-cols-[1.4fr_1fr_1fr]">

          {/* Brand block */}
          <div>
            <p className="font-serif text-xl font-bold tracking-wide sm:tracking-[0.28em] uppercase">
              Risplendere Broletto
            </p>

            <div className="mt-6 space-y-1 text-xs leading-6 text-white/50">
              <p>〒950-0865</p>
              <p>新潟市中央区本馬越2丁目8番17号</p>
              <p className="mt-3">
                <a href={`tel:${tel}`} className="transition-colors hover:text-white/70">
                  {tel}
                </a>
              </p>
            </div>

            <div className="mt-2 sm:mt-5 space-y-2 text-xs sm:text-sm text-white/50 font-semibold">
              <p>平日 9:15〜18:00</p>
              <p>日曜・祝日 10:00〜17:00</p>
              <p>定休日：毎週月曜・第3日曜</p>
            </div>

            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-xs text-pink-500 transition-colors hover:text-white/70"
            >
              {/* Instagram icon (inline SVG) */}
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
              </svg>
              @risplendere_broletto
            </a>
          </div>

          {/* Nav block */}
          <div>
            <p className="label-en text-white/50 mb-2 sm:mb-5">- Navigation</p>
            <nav className="flex flex-col gap-1.5 sm:gap-3">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="label-en text-white/40 hover:text-white/75 transition-colors"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Reserve block */}
          <div>
            <p className="label-en text-white/50 mb-2 sm:mb-5">- Reserve</p>
            <a
              href={reservationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-xs text-white/40 hover:text-white/75 transition-colors leading-5"
            >
              Hot Pepper Beauty
            </a>
            <div className="mt-4 space-y-1 text-xs text-white/25">
              <p>ご予約優先制</p>
              <p>当日予約OK</p>
            </div>

            <a
              href={`tel:${tel}`}
              className="mt-6 inline-block label-en border border-white/15 px-5 py-2.5 text-white/50 transition-all hover:border-white/40 hover:text-white/80"
            >
              {tel}
            </a>
          </div>
        </div>

        {/* Bottom rule */}
        <div className="mt-14 border-t border-white/8 pt-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <p className="text-[10px] tracking-[0.2em] text-white/20">
            © RISPLENDERE BROLETTO. All Rights Reserved.
          </p>
          <div className="flex items-center gap-5">
            <ShareButton />
            <p className="text-[10px] text-white/15 tracking-widest">
              NIIGATA / HAIR SALON
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
