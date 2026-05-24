"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { flushSync } from "react-dom";
import { useState, type AnchorHTMLAttributes, type ReactNode } from "react";
import { MaharajaLoadingOverlay } from "./MaharajaLoadingOverlay";

interface PublicLoadingLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  href: string;
  children: ReactNode;
  loadingLabel?: string;
}

export function PublicLoadingLink({
  href,
  children,
  loadingLabel = "ページを移動中です",
  onClick,
  target,
  ...props
}: PublicLoadingLinkProps) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  return (
    <>
      <MaharajaLoadingOverlay show={loading} label={loadingLabel} />
      <Link
        href={href}
        target={target}
        onClick={(event) => {
          onClick?.(event);
          if (event.defaultPrevented) return;
          if (target && target !== "_self") return;
          if (href.startsWith("#")) return;
          if (href.startsWith("/#")) return;
          if (href === pathname) return;
          flushSync(() => setLoading(true));
        }}
        {...props}
      >
        {children}
      </Link>
    </>
  );
}
