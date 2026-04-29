"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useTheme } from "next-themes";

const reservationUrl = "https://beauty.hotpepper.jp/slnH000142482/";

const navLinks = [
  { href: "#concept", label: "Concept" },
  { href: "#stylists", label: "Stylists" },
  { href: "#menu", label: "Menu" },
  { href: "#access", label: "Access" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-amber-950 dark:border-white bg-[var(--bg)]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:py-3">
          <a href="#" className="font-serif text-lg font-bold tracking-[0.2em] md:text-xl">
            BROLETTO
          </a>

          <nav className="hidden gap-8 text-sm font-bold md:flex">
            {navLinks.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className="transition-colors hover:text-[var(--accent)]"
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={reservationUrl}
              className="rounded-full bg-[var(--cta)] px-4 py-2 text-xs font-bold text-white shadow-lg md:px-5 md:text-sm"
            >
              Web予約
            </a>
            <button
              onClick={() => setIsOpen((v) => !v)}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--border)] transition-colors hover:border-[var(--accent)] md:hidden"
              aria-label={isOpen ? "メニューを閉じる" : "メニューを開く"}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={isOpen ? "close" : "open"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  {isOpen ? <X size={16} /> : <Menu size={16} />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

      {/* テーマ切り替えボタン — ヘッダー直下に固定 */}
      {mounted && (
        <button
          onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
          className="fixed right-4 top-18 z-40 flex h-7 w-7 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--bg-section)] text-[var(--fg-muted)] shadow-md transition-all duration-200 hover:text-[var(--accent)] md:right-6 md:top-18"
          aria-label="テーマ切り替え"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={resolvedTheme}
              initial={{ scale: 0.6, opacity: 0, rotate: -30 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.6, opacity: 0, rotate: 30 }}
              transition={{ duration: 0.2 }}
            >
              {resolvedTheme === "dark" ? <Sun size={13} /> : <Moon size={13} />}
            </motion.span>
          </AnimatePresence>
        </button>
      )}

      {/* モバイルメニュー */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="fixed inset-x-0 top-[56px] z-40 border-b border-[var(--header-border)] bg-[var(--bg)]/95 backdrop-blur-xl md:hidden"
          >
            <nav className="mx-auto flex max-w-7xl flex-col px-5">
              {navLinks.map(({ href, label }) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => setIsOpen(false)}
                  className="border-b border-[var(--border-light)] py-3.5 text-sm font-bold transition-colors last:border-b-0 hover:text-[var(--accent)]"
                >
                  {label}
                </a>
              ))}
              <a
                href={reservationUrl}
                onClick={() => setIsOpen(false)}
                className="my-3 flex items-center justify-center rounded-full bg-[var(--cta)] py-3 text-sm font-bold text-white"
              >
                Hot Pepperで予約
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
