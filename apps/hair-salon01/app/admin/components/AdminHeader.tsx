import Link from "next/link";
import type { CmsUser } from "@client-sites/lib/cms/types";
import { LogoutButton } from "./LogoutButton";

interface AdminHeaderProps {
  user: CmsUser;
  currentPath: string;
}

const navItems = [
  { href: "/admin",              label: "Dashboard" },
  { href: "/admin/posts",        label: "お知らせ"   },
  { href: "/admin/blogs",        label: "ブログ"     },
  { href: "/admin/applications", label: "応募"       },
];

export function AdminHeader({ user, currentPath }: AdminHeaderProps) {
  const isActive = (href: string) =>
    href === "/admin" ? currentPath === "/admin" : currentPath.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-(--border) bg-(--header-bg) backdrop-blur-md">

      {/* 上段: ロゴ + ユーザー/ログアウト */}
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-3 py-2.5 md:px-6 md:py-3.5">

        {/* ロゴ */}
        <Link
          href="/admin"
          className="font-serif text-sm font-bold tracking-[0.28em] uppercase text-(--fg)"
        >
          Broletto CMS
        </Link>

        {/* PC ナビ */}
        <nav className="hidden items-center md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={[
                "px-4 py-2 text-xs font-bold uppercase tracking-widest transition-colors",
                isActive(item.href)
                  ? "bg-(--cta) text-(--cta-text)"
                  : "text-(--fg-subtle) hover:text-(--fg)",
              ].join(" ")}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/"
            target="_blank"
            className="px-4 py-2 text-xs font-bold uppercase tracking-widest text-(--fg-subtle) transition-colors hover:text-(--fg)"
          >
            サイト ↗
          </Link>
        </nav>

        {/* ユーザー + ログアウト */}
        <div className="flex items-center gap-3 border border-(--border) bg-(--card) px-3 py-1.5">
          <div className="hidden min-w-0 sm:block">
            <p className="truncate text-xs font-bold text-(--fg)">
              {user.displayName || "CMS User"}
            </p>
            <p className="truncate text-[10px] text-(--fg-subtle)">{user.email}</p>
          </div>
          <LogoutButton />
        </div>
      </div>

      {/* モバイル専用: 横スクロールナビ */}
      <nav className="flex overflow-x-auto border-t border-(--border) md:hidden" style={{ scrollbarWidth: "none" }}>
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={[
              "shrink-0 whitespace-nowrap border-r border-(--border) px-4 py-2.5 text-[10px] font-bold uppercase tracking-widest",
              isActive(item.href)
                ? "bg-(--cta) text-(--cta-text)"
                : "text-(--fg-subtle)",
            ].join(" ")}
          >
            {item.label}
          </Link>
        ))}
        <Link
          href="/"
          target="_blank"
          className="shrink-0 whitespace-nowrap px-4 py-2.5 text-[10px] font-bold uppercase tracking-widest text-(--fg-subtle)"
        >
          サイト ↗
        </Link>
      </nav>

    </header>
  );
}
