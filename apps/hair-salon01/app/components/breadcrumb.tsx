"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";

const segmentLabels: Record<string, string> = {
  menu:   "Menu",
  news:   "Journal",
  salon:  "About",
};

function toLabel(seg: string): string {
  return segmentLabels[seg] ?? "記事";
}

export function Breadcrumb() {
  const pathname = usePathname();

  // ホームページ・管理画面は非表示
  if (pathname === "/" || pathname.startsWith("/admin")) return null;

  const segments = pathname.split("/").filter(Boolean);

  return (
    <nav
      aria-label="パンくずナビゲーション"
      className="fixed inset-x-0 top-14.25 z-30 border-b border-[var(--header-border)] bg-[var(--header-bg)] backdrop-blur-md"
    >
      <ol className="mx-auto flex max-w-350 items-center gap-0.5 px-6 py-2">

        {/* Home */}
        <li className="flex items-center">
          <Link
            href="/"
            className="label-en text-[var(--fg-subtle)] transition-colors hover:text-[var(--fg)]"
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
              <ChevronRight size={11} className="mx-0.5 shrink-0 text-[var(--fg-subtle)]" />
              {isLast ? (
                <span className="label-en text-[var(--fg)]" aria-current="page">
                  {label}
                </span>
              ) : (
                <Link
                  href={href}
                  className="label-en text-[var(--fg-subtle)] transition-colors hover:text-[var(--fg)]"
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
