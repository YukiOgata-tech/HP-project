"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";

const segmentLabels: Record<string, string> = {
  menu:    "Menu",
  news:    "Journal",
  salon:   "About",
  faq:     "FAQ",
  recruit: "Recruit",
};

function toLabel(seg: string): string {
  if (segmentLabels[seg]) return segmentLabels[seg];
  const raw = seg.charAt(0).toUpperCase() + seg.slice(1);
  return raw.length > 16 ? raw.slice(0, 14) + "…" : raw;
}

export function Breadcrumb() {
  const pathname = usePathname();

  // ホームページ・管理画面は非表示
  if (pathname === "/" || pathname.startsWith("/admin")) return null;

  const segments = pathname.split("/").filter(Boolean);

  return (
    <nav
      aria-label="パンくずナビゲーション"
      className="fixed inset-x-0 top-[var(--site-header-height)] z-30 border-b border-(--header-border) bg-(--header-bg)"
    >
      <ol className="mx-auto flex max-w-350 items-center gap-0.5 px-6 py-2">

        {/* Home */}
        <li className="flex items-center">
          <Link
            href="/"
            className="label-en text-(--fg-subtle) transition-colors hover:text-(--fg)"
          >
            Home
          </Link>
        </li>

        {segments.map((seg, i) => {
          const href   = "/" + segments.slice(0, i + 1).join("/");
          const label  = toLabel(seg);
          const isLast = i === segments.length - 1;

          return (
            <li key={href} className="flex items-center gap-0.5">
              <ChevronRight size={11} className="mx-0.5 shrink-0 text-(--fg-subtle)" />
              {isLast ? (
                <span className="label-en text-(--fg)" aria-current="page">
                  {label}
                </span>
              ) : (
                <Link
                  href={href}
                  className="label-en text-(--fg-subtle) transition-colors hover:text-(--fg)"
                >
                  {label}
                </Link>
              )}
            </li>
          );
        })}

      </ol>
    </nav>
  );
}
