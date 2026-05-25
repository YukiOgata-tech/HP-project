"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { PublicLoadingLink } from "../ui/PublicLoadingLink";
import { SiteBreadcrumbs } from "./SiteBreadcrumbs";

const navItems = [
  { href: "/#about", label: "ABOUT" },
  { href: "/#lineup", label: "GUEST" },
  { href: "/#vip", label: "VIP" },
  { href: "/#history", label: "HISTORY" },
  { href: "/#access", label: "ACCESS" },
  { href: "/sponsors", label: "SPONSORS" },
  { href: "/news", label: "NEWS" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-[#070508]/85 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between border-b border-white/10 px-3 sm:h-20 sm:px-6">
        <Link href="/" className="group min-w-0">
          <p className="hidden sm:block font-label text-[12px] uppercase text-[#d9b84f] sm:text-[12px]">
            Official Site
          </p>
          <p className="font-jp-display mt-0.5 truncate text-lg leading-none text-white sm:mt-1 sm:text-3xl">
            MAHARAJA NIGHT in NIIGATA
          </p>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {navItems.map((item) =>
            item.href.startsWith("/") ? (
              <PublicLoadingLink
                key={item.href}
                href={item.href}
                loadingLabel={`${item.label}ページへ移動中です`}
                className="font-label text-sm text-white/68 transition-colors hover:text-[#f3de8a]"
              >
                {item.label}
              </PublicLoadingLink>
            ) : (
              <a
                key={item.href}
                href={item.href}
                className="font-label text-sm text-white/68 transition-colors hover:text-[#f3de8a]"
              >
                {item.label}
              </a>
            )
          )}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Link
            href="/#vip"
            className="font-label rounded-full border border-[#d9b84f]/50 px-4 py-2 text-sm text-[#f3de8a] transition-colors hover:bg-[#d9b84f]/10"
          >
            VIP
          </Link>
          <Link
            href="/pre-ticket"
            className="font-label rounded-full bg-[#d9b84f] px-4 py-2 text-sm text-black transition-transform hover:-translate-y-0.5"
          >
            TICKET
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="inline-flex size-9 items-center justify-center rounded-full border border-white/15 text-white md:hidden"
          aria-label="メニュー"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      <SiteBreadcrumbs />

      {open && (
        <div className="border-t border-white/10 bg-[#070508] px-3 py-3 md:hidden">
          <div className="grid grid-cols-2 gap-1.5">
            {navItems.map((item) =>
              item.href.startsWith("/") ? (
                <PublicLoadingLink
                  key={item.href}
                  href={item.href}
                  loadingLabel={`${item.label}ページへ移動中です`}
                  onClick={() => setOpen(false)}
                  className="font-label rounded-lg px-3 py-2.5 text-sm text-white/80 hover:bg-white/8"
                >
                  {item.label}
                </PublicLoadingLink>
              ) : (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="font-label rounded-lg px-3 py-2.5 text-sm text-white/80 hover:bg-white/8"
                >
                  {item.label}
                </a>
              )
            )}
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <Link
              href="/#vip"
              onClick={() => setOpen(false)}
              className="font-label inline-flex h-9 items-center justify-center rounded-full border border-[#d9b84f]/50 px-4 text-sm text-[#f3de8a]"
            >
              VIP
            </Link>
            <Link
              href="/pre-ticket"
              onClick={() => setOpen(false)}
              className="font-label inline-flex h-9 items-center justify-center rounded-full bg-[#d9b84f] px-4 text-sm text-black"
            >
              TICKET
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
