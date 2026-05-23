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
    <section className="relative min-w-0 max-w-full overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-3 shadow-[0_0_24px_rgba(212,175,55,0.04)] backdrop-blur-xl sm:rounded-[28px] sm:p-7 sm:shadow-[0_0_50px_rgba(212,175,55,0.05)]">
      <div className="absolute inset-y-0 right-0 w-28 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.1),transparent_72%)] sm:w-56" />
      <div className="relative flex min-w-0 flex-col gap-3 sm:gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="min-w-0 max-w-3xl space-y-2 sm:space-y-3">
          {eyebrow && (
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] sm:text-xs">
              {eyebrow}
            </p>
          )}
          <div className="space-y-1.5 sm:space-y-2">
            <h1 className="break-words text-xl font-black leading-tight tracking-widest text-white sm:text-2xl md:text-4xl">
              {title}
            </h1>
            {description && (
              <p className="max-w-2xl break-words text-[11px] font-medium leading-5 text-gray-400 sm:text-xs sm:leading-6 md:text-[15px]">
                {description}
              </p>
            )}
          </div>
        </div>
        {actions && <div className="relative flex min-w-0 flex-wrap gap-2 sm:gap-3">{actions}</div>}
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
        "min-w-0 max-w-full rounded-2xl border border-white/10 bg-white/5 backdrop-blur shadow-[0_0_16px_rgba(0,0,0,0.35)] sm:rounded-3xl sm:shadow-[0_0_20px_rgba(0,0,0,0.5)]",
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
      ? "text-[#D4AF37] border-[#D4AF37]/30 bg-[#D4AF37]/10"
      : tone === "warning"
        ? "text-[#FF007F] border-[#FF007F]/30 bg-[#FF007F]/10"
        : "text-white border-white/20 bg-white/5";

  return (
    <AdminSurface className="p-3 sm:p-5">
      <div className="space-y-2 sm:space-y-3">
        <div
          className={[
            "inline-flex rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest sm:px-3 sm:text-[11px]",
            toneClass,
          ].join(" ")}
        >
          {label}
        </div>
        <div className="space-y-0.5 sm:space-y-1">
          <p className="text-2xl font-black leading-none text-white sm:text-3xl">{value}</p>
          {hint && <p className="text-[11px] font-medium text-gray-500 sm:text-sm">{hint}</p>}
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
        "inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-bold sm:px-3 sm:text-xs",
        isPublished
          ? "bg-[#D4AF37]/10 text-[#D4AF37] border-[#D4AF37]/30"
          : "bg-gray-800 text-gray-300 border-gray-600",
      ].join(" ")}
    >
      <span
        className={[
          "mr-2 h-1.5 w-1.5 rounded-full",
          isPublished ? "bg-[#D4AF37]" : "bg-gray-500",
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
      className="inline-flex h-9 items-center justify-center rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F9E596] px-4 text-[11px] font-black tracking-widest text-black shadow-[0_0_15px_rgba(212,175,55,0.3)] transition-transform duration-200 hover:scale-105 sm:h-auto sm:px-5 sm:py-2.5 sm:text-xs"
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
      className="inline-flex h-9 items-center justify-center rounded-full border border-white/20 bg-black/50 px-4 text-[11px] font-bold tracking-widest text-gray-300 transition-colors hover:border-[#D4AF37] hover:text-white sm:h-auto sm:px-5 sm:py-2.5 sm:text-xs"
    >
      {children}
    </Link>
  );
}
