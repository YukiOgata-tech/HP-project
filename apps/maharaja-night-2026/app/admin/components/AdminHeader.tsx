"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ConfirmActionModal } from "@client-sites/components";
import type { CmsUser } from "@client-sites/lib/cms/types";
import { deleteSession } from "../actions/session";

interface AdminHeaderProps {
  user: CmsUser;
  currentPath?: string;
}

const navItems = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/news", label: "News" },
  { href: "/admin/sponsors", label: "Sponsors" },
  { href: "/admin/registrations", label: "Registrations" },
];

export function AdminHeader({ user, currentPath }: AdminHeaderProps) {
  const pathname = usePathname() ?? currentPath ?? "/admin";

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/50 backdrop-blur-xl">
      <div className="mx-auto flex min-w-0 max-w-full flex-col gap-2 overflow-hidden px-3 py-2.5 sm:w-full sm:max-w-6xl sm:gap-4 sm:px-4 sm:py-4 md:px-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex min-w-0 max-w-full flex-col gap-2 sm:gap-4 lg:flex-row lg:items-center lg:justify-start">
          <div className="flex min-w-0 items-center justify-between gap-3">
            <div className="min-w-0">
            <Link
              href="/admin"
              className="block truncate text-base font-black tracking-widest text-[#D4AF37] sm:text-xl"
            >
              MAHARAJA NIGHT
            </Link>
            <p className="text-[10px] tracking-widest text-[#FF007F] sm:text-xs">
              ADMIN CONSOLE
            </p>
            </div>
            <div className="sm:hidden">
              <ConfirmActionModal
                action={deleteSession}
                triggerLabel="ログアウト"
                title="ログアウトしますか？"
                description="管理コンソールからログアウトします。再度操作するにはログインが必要です。"
                confirmLabel="ログアウト"
                cancelLabel="戻る"
                triggerClassName="h-8 rounded-full border border-[#FF007F]/40 px-3 text-[10px] font-bold tracking-wider text-[#FF5DAF]"
                confirmClassName="inline-flex h-10 w-full items-center justify-center rounded-full bg-[#FF007F] px-4 text-sm font-bold text-white transition-colors hover:bg-[#d8006b]"
              />
            </div>
          </div>

          <nav className="-mx-3 flex min-w-0 max-w-[calc(100vw-1.5rem)] snap-x items-center gap-1.5 overflow-x-auto px-3 pb-1 [scrollbar-width:none] sm:mx-0 sm:max-w-full sm:flex-wrap sm:gap-2 sm:overflow-visible sm:px-0 sm:pb-0 lg:ml-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={[
                  "shrink-0 snap-start rounded-full px-3 py-2 text-[11px] font-bold tracking-wider transition-colors sm:px-4 sm:text-sm",
                  (item.href === "/admin"
                    ? pathname === "/admin"
                    : pathname.startsWith(item.href))
                    ? "bg-[#D4AF37] text-black shadow-[0_0_15px_rgba(212,175,55,0.3)]"
                    : "text-gray-400 hover:bg-white/10 hover:text-white",
                ].join(" ")}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/"
              target="_blank"
              className="shrink-0 rounded-full px-3 py-2 text-[11px] font-bold tracking-wider text-gray-400 transition-colors hover:bg-white/10 hover:text-white sm:px-4 sm:text-sm"
            >
              サイトを表示 ↗
            </Link>
          </nav>
        </div>

        <div className="hidden items-center justify-between gap-4 rounded-full border border-white/10 bg-white/5 px-4 py-2 sm:flex sm:justify-start">
          <div className="min-w-0 text-right">
            <p className="truncate text-sm font-bold text-white">
              {user.displayName || "CMS User"}
            </p>
            <p className="truncate text-xs text-gray-500">{user.email}</p>
          </div>
          <ConfirmActionModal
            action={deleteSession}
            triggerLabel="ログアウト"
            title="ログアウトしますか？"
            description="管理コンソールからログアウトします。再度操作するにはログインが必要です。"
            confirmLabel="ログアウト"
            cancelLabel="戻る"
            triggerClassName="rounded-full border border-[#FF007F]/30 px-4 py-2 text-xs font-bold tracking-wider text-[#FF007F] transition-colors hover:bg-[#FF007F] hover:text-white"
            confirmClassName="inline-flex h-10 w-full items-center justify-center rounded-full bg-[#FF007F] px-4 text-sm font-bold text-white transition-colors hover:bg-[#d8006b]"
          />
        </div>
      </div>
    </header>
  );
}
