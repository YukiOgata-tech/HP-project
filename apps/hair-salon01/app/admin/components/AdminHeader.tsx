import Link from "next/link";
import type { CmsUser } from "@client-sites/lib/cms/types";
import { deleteSession } from "../actions/session";

interface AdminHeaderProps {
  user: CmsUser;
  currentPath: string;
}

const navItems = [
  { href: "/admin", label: "ダッシュボード" },
  { href: "/admin/posts", label: "記事管理" },
];

export function AdminHeader({ user, currentPath }: AdminHeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-white/60 bg-[rgba(250,246,242,0.85)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 md:px-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-center sm:justify-between lg:justify-start">
          <div className="min-w-0">
            <Link
              href="/admin"
              className="block font-serif text-lg font-semibold tracking-[0.18em] text-[#1f1712]"
            >
              BROLETTO CMS
            </Link>
            <p className="text-xs uppercase tracking-[0.24em] text-[#8c694d]">
              BROLETTO HP management
            </p>
          </div>

          <nav className="flex flex-wrap items-center gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={[
                  "rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                  (item.href === "/admin"
                    ? currentPath === "/admin"
                    : currentPath.startsWith(item.href))
                    ? "bg-[#2d221c] text-white shadow-[0_14px_28px_-20px_rgba(45,34,28,0.85)]"
                    : "text-[#66554a] hover:bg-white/80 hover:text-[#1f1712]",
                ].join(" ")}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/"
              target="_blank"
              className="rounded-full px-3.5 py-2 text-sm font-medium text-[#66554a] transition-colors hover:bg-white/80 hover:text-[#1f1712]"
            >
              サイトを表示 ↗
            </Link>
          </nav>
        </div>

        <div className="flex items-center justify-between gap-3 rounded-full border border-white/70 bg-white/75 px-3 py-2 shadow-[0_20px_35px_-28px_rgba(44,36,31,0.55)] sm:justify-start">
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-[#1f1712]">
              {user.displayName || "CMS User"}
            </p>
            <p className="truncate text-xs text-[#7b6a5f]">{user.email}</p>
          </div>
          <form action={deleteSession}>
            <button
              type="submit"
              className="rounded-full border border-[#d8c6b8] px-4 py-2 text-sm font-medium text-[#5f4d40] transition-colors hover:border-[#b99679] hover:bg-[#fcf7f2] hover:text-[#1f1712]"
            >
              ログアウト
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
