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
    <section className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/5 p-7 shadow-[0_0_50px_rgba(212,175,55,0.05)] backdrop-blur-xl">
      <div className="absolute inset-y-0 right-0 w-56 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.1),transparent_72%)]" />
      <div className="relative flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl space-y-3">
          {eyebrow && (
            <p className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
              {eyebrow}
            </p>
          )}
          <div className="space-y-2">
            <h1 className="text-2xl font-black tracking-widest text-white md:text-4xl">
              {title}
            </h1>
            {description && (
              <p className="max-w-2xl text-xs leading-6 text-gray-400 md:text-[15px]">
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
        "rounded-3xl border border-white/10 bg-white/5 backdrop-blur shadow-[0_0_20px_rgba(0,0,0,0.5)]",
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
    <AdminSurface className="p-5">
      <div className="space-y-3">
        <div
          className={[
            "inline-flex rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-widest border",
            toneClass,
          ].join(" ")}
        >
          {label}
        </div>
        <div className="space-y-1">
          <p className="text-3xl font-black text-white">{value}</p>
          {hint && <p className="text-sm text-gray-500">{hint}</p>}
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
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-bold border",
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
      className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F9E596] px-5 py-2.5 text-xs font-black tracking-widest text-black shadow-[0_0_15px_rgba(212,175,55,0.3)] transition-transform duration-200 hover:scale-105"
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
      className="inline-flex items-center justify-center rounded-full border border-white/20 bg-black/50 px-5 py-2.5 text-xs font-bold tracking-widest text-gray-300 transition-colors hover:border-[#D4AF37] hover:text-white"
    >
      {children}
    </Link>
  );
}
