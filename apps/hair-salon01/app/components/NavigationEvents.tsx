"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useLoading } from "../lib/loading-context";

export function NavigationEvents() {
  const pathname = usePathname();
  const { setLoading } = useLoading();

  // ナビゲーション完了 → ローダーを隠す
  useEffect(() => {
    setLoading(false);
  }, [pathname, setLoading]);

  // リンククリックでナビゲーション開始 → ローダーを表示
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest("a");
      if (!anchor?.href) return;
      if (anchor.target === "_blank" || e.ctrlKey || e.metaKey || e.shiftKey) return;

      try {
        const url = new URL(anchor.href);
        if (
          url.origin === window.location.origin &&
          url.pathname !== window.location.pathname
        ) {
          setLoading(true);
        }
      } catch {
        // ignore malformed URLs
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [setLoading]);

  return null;
}
