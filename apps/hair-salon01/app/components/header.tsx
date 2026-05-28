"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useTheme } from "../lib/theme";

const reservationUrl = "https://beauty.hotpepper.jp/slnH000142482/";

const navLinks = [
  { href: "/#concept", label: "Concept" },
  { href: "/menu",     label: "Menu"    },
  { href: "/news",     label: "Journal" },
  { href: "/#access",  label: "Access"  },
];

export function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen]     = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted]   = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => { setIsOpen(false); }, [pathname]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === "/news") return pathname.startsWith("/news");
    if (href === "/menu") return pathname.startsWith("/menu");
    return false;
  };

  return (
    <>
      {/* ── Header ── */}
      <header
        className={[
          "fixed inset-x-0 top-0 z-50 bg-[var(--header-bg)] backdrop-blur-md transition-all duration-300",
          scrolled ? "border-b border-[var(--header-border)]" : "",
        ].join(" ")}
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-3">

          {/* Logo */}
          <Link
            href="/"
            className="font-serif text-lg font-bold tracking-[0.32em] uppercase text-[var(--fg)]"
          >
            Broletto
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center md:gap-5 lg:gap-9 md:flex">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={[
                  "label-en transition-colors hover:underline",
                  isActive(href)
                    ? "text-[var(--fg)]"
                    : "text-[var(--fg-subtle)] hover:text-[var(--fg)]",
                ].join(" ")}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-2.5 md:flex">
            {mounted && (
              <button
                onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                className="flex h-8 w-8 items-center justify-center border border-[var(--border)] text-[var(--fg-subtle)] transition-all hover:border-[var(--fg)] hover:text-[var(--fg)]"
                aria-label="テーマ切り替え"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={resolvedTheme}
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.7 }}
                    transition={{ duration: 0.15 }}
                    className="flex items-center justify-center"
                  >
                    {resolvedTheme === "dark" ? <Sun size={13} /> : <Moon size={13} />}
                  </motion.span>
                </AnimatePresence>
              </button>
            )}
            <a
              href={reservationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="label-en bg-[var(--cta)] text-[var(--cta-text)] px-5 py-2 transition-opacity hover:opacity-70"
            >
              Reserve
            </a>
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center gap-2 md:hidden">
            {mounted && (
              <button
                onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                className="flex h-8 w-8 items-center justify-center border border-[var(--border)] text-[var(--fg-subtle)]"
                aria-label="テーマ切り替え"
              >
                {resolvedTheme === "dark" ? <Sun size={13} /> : <Moon size={13} />}
              </button>
            )}
            <button
              onClick={() => setIsOpen((v) => !v)}
              className="flex h-8 w-8 items-center justify-center border border-[var(--border)] text-[var(--fg)]"
              aria-label={isOpen ? "メニューを閉じる" : "メニューを開く"}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={isOpen ? "close" : "open"}
                  initial={{ opacity: 0, rotate: -45 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 45 }}
                  transition={{ duration: 0.15 }}
                  className="flex items-center justify-center"
                >
                  {isOpen ? <X size={15} /> : <Menu size={15} />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile Drawer ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="fixed inset-x-0 top-14.25 z-40 border-b border-[var(--border)] bg-[var(--bg)] md:hidden"
          >
            <nav className="mx-auto max-w-[1400px] flex flex-col px-6">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="label-en border-b border-[var(--border-light)] py-4 text-[var(--fg-subtle)] transition-colors last:border-b-0 hover:text-[var(--fg)]"
                >
                  {label}
                </Link>
              ))}
              <a
                href={reservationUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="label-en my-4 bg-[var(--cta)] text-[var(--cta-text)] py-3.5 text-center"
              >
                Reserve
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
