import Link from "next/link";
import type { ReactNode } from "react";

interface AdminPageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
}

export function AdminPageHeader({
  eyebrow,
  title,
  description,
  actions,
}: AdminPageHeaderProps) {
  return (
    <section className="relative overflow-hidden rounded-[28px] border border-white/60 bg-[linear-gradient(135deg,rgba(255,255,255,0.96),rgba(245,239,233,0.9))] p-7 shadow-[0_30px_80px_-45px_rgba(44,36,31,0.45)]">
      <div className="absolute inset-y-0 right-0 w-56 bg-[radial-gradient(circle_at_top,rgba(183,143,114,0.24),transparent_72%)]" />
      <div className="relative flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl space-y-3">
          {eyebrow && (
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#8c694d]">
              {eyebrow}
            </p>
          )}
          <div className="space-y-2">
            <h1 className="font-serif text-2xl font-semibold tracking-[0.04em] text-[#201712] md:text-4xl">
              {title}
            </h1>
            {description && (
              <p className="max-w-2xl text-xs leading-6 text-[#6e5d52] md:text-[15px]">
                {description}
              </p>
            )}
          </div>
        </div>
        {actions && <div className="relative flex flex-wrap gap-3">{actions}</div>}
      </div>
    </section>
  );
}

export function AdminSurface({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={[
        "rounded-3xl border border-white/70 bg-white/88 shadow-[0_24px_60px_-38px_rgba(44,36,31,0.4)] backdrop-blur",
        className,
      ].join(" ")}
    >
      {children}
    </section>
  );
}

export function AdminStatCard({
  label,
  value,
  hint,
  tone = "default",
}: {
  label: string;
  value: string | number;
  hint?: string;
  tone?: "default" | "success" | "warning";
}) {
  const toneClass =
    tone === "success"
      ? "text-emerald-700 bg-emerald-50 ring-emerald-100"
      : tone === "warning"
        ? "text-amber-700 bg-amber-50 ring-amber-100"
        : "text-[#3c2d23] bg-[#f7efe8] ring-[#efe2d6]";

  return (
    <AdminSurface className="p-5">
      <div className="space-y-3">
        <div
          className={[
            "inline-flex rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] ring-1 ring-inset",
            toneClass,
          ].join(" ")}
        >
          {label}
        </div>
        <div className="space-y-1">
          <p className="text-3xl font-semibold text-[#1f1712]">{value}</p>
          {hint && <p className="text-sm text-[#78685d]">{hint}</p>}
        </div>
      </div>
    </AdminSurface>
  );
}

export function StatusBadge({ status }: { status: "draft" | "published" }) {
  const isPublished = status === "published";
  return (
    <span
      className={[
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset",
        isPublished
          ? "bg-emerald-50 text-emerald-700 ring-emerald-100"
          : "bg-amber-50 text-amber-700 ring-amber-100",
      ].join(" ")}
    >
      <span
        className={[
          "mr-2 h-1.5 w-1.5 rounded-full",
          isPublished ? "bg-emerald-500" : "bg-amber-500",
        ].join(" ")}
      />
      {isPublished ? "公開中" : "下書き"}
    </span>
  );
}

export function AdminPrimaryLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center rounded-full bg-[#2d221c] px-3 md:px-5 py-2.5 text-xs font-semibold text-white shadow-[0_18px_35px_-22px_rgba(45,34,28,0.85)] transition-transform duration-200 hover:-translate-y-0.5 hover:bg-[#1f1712]"
    >
      {children}
    </Link>
  );
}

export function AdminSecondaryLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center rounded-full border border-[#84542f] bg-white/80 px-3 md:px-5 py-2.5 text-xs md:text-sm font-semibold text-[#5f4d40] transition-colors hover:border-[#b99679] hover:text-[#2d221c]"
    >
      {children}
    </Link>
  );
}
