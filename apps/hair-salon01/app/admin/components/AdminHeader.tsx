import Link from "next/link";
import type { CmsUser } from "@client-sites/lib/cms/types";
import { deleteSession } from "../actions/session";

interface AdminHeaderProps {
  user: CmsUser;
  currentPath: string;
}

const navItems = [
  { href: "/admin",              label: "ダッシュボード" },
  { href: "/admin/posts",        label: "お知らせ"       },
  { href: "/admin/blogs",        label: "ブログ"         },
  { href: "/admin/applications", label: "応募管理"       },
];

export function AdminHeader({ user, currentPath }: AdminHeaderProps) {
  const isActive = (href: string) =>
    href === "/admin" ? currentPath === "/admin" : currentPath.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-(--border) bg-(--header-bg) backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-3.5 md:px-6">

        {/* ロゴ + ナビ */}
        <div className="flex items-center gap-8">
          <Link
            href="/admin"
            className="font-serif text-sm font-bold tracking-[0.28em] uppercase text-(--fg)"
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
        </div>

        {/* ユーザー情報 */}
        <div className="flex items-center gap-4 border border-(--border) bg-(--card) px-4 py-2">
          <div className="hidden min-w-0 sm:block">
            <p className="truncate text-xs font-bold text-(--fg)">
              {user.displayName || "CMS User"}
            </p>
            <p className="truncate text-xs text-(--fg-subtle)">{user.email}</p>
          </div>
          <form action={deleteSession}>
            <button
              type="submit"
              className="text-xs font-bold uppercase tracking-widest text-(--fg-subtle) transition-colors hover:text-(--fg)"
            >
              ログアウト
            </button>
          </form>
        </div>

      </div>
    </header>
  );
}
