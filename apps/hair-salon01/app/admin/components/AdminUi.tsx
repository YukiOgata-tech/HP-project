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
    <section className="border border-(--border) bg-(--bg) p-3 md:p-8">
      <div className="flex items-center justify-between gap-3 md:flex-col md:items-start md:gap-5 lg:flex-row lg:items-end">
        <div className="min-w-0 flex-1 space-y-1 md:space-y-3">
          {eyebrow && (
            <p className="label-en text-[10px] text-(--fg-subtle) md:text-xs">{eyebrow}</p>
          )}
          <span className="section-rule block" />
          <h1 className="font-serif text-xl font-bold text-(--fg) md:text-2xl lg:text-3xl">
            {title}
          </h1>
          {description && (
            <p className="hidden max-w-2xl text-sm leading-7 text-(--fg-subtle) md:block">
              {description}
            </p>
          )}
        </div>
        {actions && (
          <div className="flex shrink-0 flex-wrap gap-2">{actions}</div>
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
   AdminStatTable — テーブル + CSSバーグラフ
═══════════════════════════════════════════════ */

interface StatRow {
  labelEn: string;
  label: string;
  value: number;
  total: number;
  tone?: "default" | "success" | "warning";
}

export function AdminStatTable({ rows }: { rows: StatRow[] }) {
  return (
    <div className="border border-(--border) bg-(--card)">
      <div className="border-b border-(--border) px-3 py-2 md:px-6 md:py-3">
        <p className="label-en text-[10px] text-(--fg-subtle) md:text-xs">Overview</p>
      </div>
      <table className="w-full">
        <tbody className="divide-y divide-(--border)">
          {rows.map((row) => {
            const pct = row.total > 0 ? Math.round((row.value / row.total) * 100) : 0;
            const numColor =
              row.tone === "success" ? "text-emerald-700"
              : row.tone === "warning" ? "text-amber-700"
              : "text-(--fg)";
            const barColor =
              row.tone === "success" ? "bg-emerald-500"
              : row.tone === "warning" ? "bg-amber-400"
              : "bg-(--fg)";
            return (
              <tr key={row.labelEn}>
                <td className="w-24 px-3 py-2.5 md:w-40 md:px-6 md:py-4">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-(--fg-subtle)">
                    {row.labelEn}
                  </p>
                  <p className="mt-0.5 text-xs text-(--fg)">{row.label}</p>
                </td>
                <td className="w-12 px-2 py-2.5 text-right md:w-20 md:px-4 md:py-4">
                  <span className={`text-xl font-black tabular-nums md:text-3xl ${numColor}`}>
                    {String(row.value).padStart(2, "0")}
                  </span>
                </td>
                <td className="px-3 py-2.5 md:px-6 md:py-4">
                  <div className="h-1.5 w-full bg-(--border-light) md:h-2">
                    <div
                      className={`h-full transition-[width] duration-500 ${barColor}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <p className="mt-1 text-[10px] tabular-nums text-(--fg-subtle)">{pct}%</p>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   AdminStatCard（後方互換用・非推奨）
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
    <div className="border border-(--border) bg-(--card) p-3 md:p-6">
      <p className="label-en text-[10px] text-(--fg-subtle) md:text-xs">{label}</p>
      <p className={["mt-2 text-2xl font-black tabular-nums md:mt-3 md:text-4xl", valueColor].join(" ")}>
        {value}
      </p>
      {hint && (
        <p className="mt-1 text-[10px] text-(--fg-subtle) md:mt-1.5 md:text-xs">{hint}</p>
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
        "inline-flex items-center gap-1 border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider md:gap-1.5 md:px-2.5 md:py-1 md:text-xs",
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
  new:       { label: "新着",   cls: "border-sky-200 bg-sky-50 text-sky-700" },
  reviewing: { label: "選考中", cls: "border-amber-200 bg-amber-50 text-amber-700" },
  contacted: { label: "連絡済", cls: "border-violet-200 bg-violet-50 text-violet-700" },
  rejected:  { label: "不採用", cls: "border-neutral-200 bg-neutral-50 text-neutral-500" },
  hired:     { label: "採用",   cls: "border-emerald-200 bg-emerald-50 text-emerald-700" },
};

export function AppStatusBadge({ status }: { status: ApplicationStatus }) {
  const { label, cls } = APP_STATUS_MAP[status];
  return (
    <span className={`inline-flex items-center gap-1 border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider md:gap-1.5 md:px-2.5 md:py-1 md:text-xs ${cls}`}>
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
      className="inline-flex items-center justify-center bg-(--cta) px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-(--cta-text) transition-opacity hover:opacity-70 md:px-5 md:py-2.5 md:text-xs"
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
      className="inline-flex items-center justify-center border border-(--border) px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-(--fg-subtle) transition-colors hover:border-(--fg) hover:text-(--fg) md:px-5 md:py-2.5 md:text-xs"
    >
      {children}
    </Link>
  );
}
