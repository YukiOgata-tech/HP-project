"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";
import { PublicLoadingLink } from "../ui/PublicLoadingLink";

const routeLabels: Record<string, string> = {
  news: "お知らせ",
  sponsors: "協賛企業一覧",
  "pre-ticket": "事前チケット",
  complete: "受付完了",
  lookup: "受付チケット再表示",
};

function getBreadcrumbs(pathname: string) {
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0 || segments[0] === "admin") {
    return [];
  }

  return segments.map((segment, index) => {
    const href = `/${segments.slice(0, index + 1).join("/")}`;
    const isNewsDetail = segments[0] === "news" && index === 1;
    const label = isNewsDetail
      ? "記事詳細"
      : routeLabels[segment] ?? decodeURIComponent(segment);

    return {
      href,
      label,
    };
  });
}

export function SiteBreadcrumbs() {
  const pathname = usePathname();
  const breadcrumbs = getBreadcrumbs(pathname);

  if (breadcrumbs.length === 0) return null;

  return (
    <div className="border-t border-white/8 border-b border-white/10 bg-[#070508]/92 backdrop-blur-xl">
      <nav
        aria-label="パンくずリスト"
        className="mx-auto flex h-9 max-w-7xl items-center overflow-x-auto px-3 sm:h-10 sm:px-6"
      >
        <ol className="flex min-w-max items-center gap-1.5 text-[12px] font-bold text-white/52 sm:gap-2 sm:text-[13px]">
          <li>
            <PublicLoadingLink
              href="/"
              loadingLabel="トップページへ移動中です"
              className="inline-flex size-7 items-center justify-center rounded-full text-white/62 transition-colors hover:bg-white/8 hover:text-[#f3de8a]"
              aria-label="トップページ"
            >
              <Home className="size-3.5" />
            </PublicLoadingLink>
          </li>
          {breadcrumbs.map((item, index) => {
            const isCurrent = index === breadcrumbs.length - 1;

            return (
              <li key={item.href} className="flex items-center gap-1.5 sm:gap-2">
                <ChevronRight className="size-3.5 shrink-0 text-[#d9b84f]/65" />
                {isCurrent ? (
                  <span
                    aria-current="page"
                    className="max-w-[12rem] truncate rounded-full border border-[#d9b84f]/24 bg-[#d9b84f]/10 px-2.5 py-1 text-[#f3de8a] sm:max-w-[24rem]"
                    title={item.label}
                  >
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="rounded-full px-2 py-1 text-white/58 transition-colors hover:bg-white/8 hover:text-[#f3de8a]"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
}
