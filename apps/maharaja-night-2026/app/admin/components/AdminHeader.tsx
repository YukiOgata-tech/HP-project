import Link from "next/link";
import type { CmsUser } from "@client-sites/lib/cms/types";
import { deleteSession } from "../actions/session";

interface AdminHeaderProps {
  user: CmsUser;
  currentPath: string;
}

const navItems = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/news", label: "News" },
  { href: "/admin/sponsors", label: "Sponsors" },
  { href: "/admin/registrations", label: "Registrations" },
];

export function AdminHeader({ user, currentPath }: AdminHeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/50 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 md:px-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-center sm:justify-between lg:justify-start">
          <div className="min-w-0">
            <Link
              href="/admin"
              className="block font-black text-xl tracking-widest text-[#D4AF37]"
            >
              MAHARAJA NIGHT
            </Link>
            <p className="text-xs tracking-widest text-[#FF007F]">
              ADMIN CONSOLE
            </p>
          </div>

          <nav className="flex flex-wrap items-center gap-2 lg:ml-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={[
                  "rounded-full px-4 py-2 text-sm font-bold tracking-wider transition-colors",
                  (item.href === "/admin"
                    ? currentPath === "/admin"
                    : currentPath.startsWith(item.href))
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
              className="rounded-full px-4 py-2 text-sm font-bold tracking-wider text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
            >
              サイトを表示 ↗
            </Link>
          </nav>
        </div>

        <div className="flex items-center justify-between gap-4 rounded-full border border-white/10 bg-white/5 px-4 py-2 sm:justify-start">
          <div className="min-w-0 text-right">
            <p className="truncate text-sm font-bold text-white">
              {user.displayName || "CMS User"}
            </p>
            <p className="truncate text-xs text-gray-500">{user.email}</p>
          </div>
          <form action={deleteSession}>
            <button
              type="submit"
              className="rounded-full border border-[#FF007F]/30 px-4 py-2 text-xs font-bold tracking-wider text-[#FF007F] transition-colors hover:bg-[#FF007F] hover:text-white"
            >
              LOGOUT
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
