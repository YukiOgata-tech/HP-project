import Link from "next/link";
import type { CmsUser } from "@client-sites/lib/cms/types";
import { deleteSession } from "../actions/session";

interface AdminHeaderProps {
  user: CmsUser;
  currentPath: string;
}

const navItems = [
  { href: "/admin",              label: "ダッシュボード" },
  { href: "/admin/posts",        label: "記事管理"       },
  { href: "/admin/applications", label: "応募管理"       },
];

export function AdminHeader({ user, currentPath }: AdminHeaderProps) {
  const isActive = (href: string) =>
    href === "/admin" ? currentPath === "/admin" : currentPath.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--header-bg)] backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-3.5 md:px-6">

        {/* ロゴ + ナビ */}
        <div className="flex items-center gap-8">
          <Link
            href="/admin"
            className="font-serif text-sm font-bold tracking-[0.28em] uppercase text-[var(--fg)]"
          >
            Broletto CMS
          </Link>

          <nav className="hidden items-center sm:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={[
                  "px-4 py-2 text-xs font-bold uppercase tracking-widest transition-colors",
                  isActive(item.href)
                    ? "bg-[var(--cta)] text-[var(--cta-text)]"
                    : "text-[var(--fg-subtle)] hover:text-[var(--fg)]",
                ].join(" ")}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/"
              target="_blank"
              className="px-4 py-2 text-xs font-bold uppercase tracking-widest text-[var(--fg-subtle)] transition-colors hover:text-[var(--fg)]"
            >
              サイト ↗
            </Link>
          </nav>
        </div>

        {/* ユーザー情報 */}
        <div className="flex items-center gap-4 border border-[var(--border)] bg-[var(--card)] px-4 py-2">
          <div className="hidden min-w-0 sm:block">
            <p className="truncate text-xs font-bold text-[var(--fg)]">
              {user.displayName || "CMS User"}
            </p>
            <p className="truncate text-xs text-[var(--fg-subtle)]">{user.email}</p>
          </div>
          <form action={deleteSession}>
            <button
              type="submit"
              className="text-xs font-bold uppercase tracking-widest text-[var(--fg-subtle)] transition-colors hover:text-[var(--fg)]"
            >
              ログアウト
            </button>
          </form>
        </div>

      </div>
    </header>
  );
}
