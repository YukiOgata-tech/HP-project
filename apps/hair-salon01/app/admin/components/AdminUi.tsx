import Link from "next/link";
import type { ReactNode } from "react";

/* ═══════════════════════════════════════════════
   AdminPageHeader
═══════════════════════════════════════════════ */

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
    <section className="border border-(--border) bg-(--bg) p-6 md:p-8">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl space-y-3">
          {eyebrow && (
            <p className="label-en text-(--fg-subtle)">{eyebrow}</p>
          )}
          <span className="section-rule block" />
          <h1 className="font-serif text-2xl font-bold text-(--fg) md:text-3xl">
            {title}
          </h1>
          {description && (
            <p className="max-w-2xl text-sm leading-7 text-(--fg-subtle)">
              {description}
            </p>
          )}
        </div>
        {actions && (
          <div className="flex flex-wrap gap-3">{actions}</div>
        )}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   AdminSurface
═══════════════════════════════════════════════ */

export function AdminSurface({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={["border border-(--border) bg-(--card)", className].join(" ")}
    >
      {children}
    </section>
  );
}

/* ═══════════════════════════════════════════════
   AdminStatCard
═══════════════════════════════════════════════ */

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
  const valueColor =
    tone === "success" ? "text-emerald-700"
    : tone === "warning" ? "text-amber-700"
    : "text-(--fg)";

  return (
    <div className="border border-(--border) bg-(--card) p-6">
      <p className="label-en text-(--fg-subtle)">{label}</p>
      <p className={["mt-3 text-4xl font-black tabular-nums", valueColor].join(" ")}>
        {value}
      </p>
      {hint && (
        <p className="mt-1.5 text-xs text-(--fg-subtle)">{hint}</p>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   StatusBadge
═══════════════════════════════════════════════ */

export function StatusBadge({ status }: { status: "draft" | "published" }) {
  const isPublished = status === "published";
  return (
    <span
      className={[
        "inline-flex items-center gap-1.5 border px-2.5 py-1 text-xs font-bold uppercase tracking-wider",
        isPublished
          ? "border-emerald-200 bg-emerald-50 text-emerald-700"
          : "border-amber-200 bg-amber-50 text-amber-700",
      ].join(" ")}
    >
      <span
        className={["h-1.5 w-1.5", isPublished ? "bg-emerald-500" : "bg-amber-500"].join(" ")}
      />
      {isPublished ? "公開中" : "下書き"}
    </span>
  );
}

/* ═══════════════════════════════════════════════
   AppStatusBadge
═══════════════════════════════════════════════ */

import type { ApplicationStatus } from "@client-sites/lib/cms/types";

const APP_STATUS_MAP: Record<
  ApplicationStatus,
  { label: string; cls: string }
> = {
  new:       { label: "新着",  cls: "border-sky-200 bg-sky-50 text-sky-700" },
  reviewing: { label: "選考中", cls: "border-amber-200 bg-amber-50 text-amber-700" },
  contacted: { label: "連絡済", cls: "border-violet-200 bg-violet-50 text-violet-700" },
  rejected:  { label: "不採用", cls: "border-neutral-200 bg-neutral-50 text-neutral-500" },
  hired:     { label: "採用",  cls: "border-emerald-200 bg-emerald-50 text-emerald-700" },
};

export function AppStatusBadge({ status }: { status: ApplicationStatus }) {
  const { label, cls } = APP_STATUS_MAP[status];
  return (
    <span className={`inline-flex items-center gap-1.5 border px-2.5 py-1 text-xs font-bold uppercase tracking-wider ${cls}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {label}
    </span>
  );
}

/* ═══════════════════════════════════════════════
   AdminPrimaryLink
═══════════════════════════════════════════════ */

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
      className="inline-flex items-center justify-center bg-(--cta) px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-(--cta-text) transition-opacity hover:opacity-70"
    >
      {children}
    </Link>
  );
}

/* ═══════════════════════════════════════════════
   AdminSecondaryLink
═══════════════════════════════════════════════ */

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
      className="inline-flex items-center justify-center border border-(--border) px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-(--fg-subtle) transition-colors hover:border-(--fg) hover:text-(--fg)"
    >
      {children}
    </Link>
  );
}
