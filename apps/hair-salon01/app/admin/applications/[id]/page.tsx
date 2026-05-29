import Link from "next/link";
import { notFound } from "next/navigation";
import { getApplication } from "@client-sites/lib/cms";
import type { ApplicationStatus } from "@client-sites/lib/cms/types";
import {
  AdminPageHeader,
  AdminSurface,
  AppStatusBadge,
} from "../../components/AdminUi";
import { ConfirmSubmitButton } from "../../components/ConfirmSubmitButton";
import {
  updateApplicationStatusAction,
  deleteApplicationAndRedirect,
} from "../actions";

const SITE_ID = process.env.SITE_ID!;

const STATUS_OPTIONS: { value: ApplicationStatus; label: string }[] = [
  { value: "new",       label: "新着" },
  { value: "reviewing", label: "選考中" },
  { value: "contacted", label: "連絡済" },
  { value: "rejected",  label: "不採用" },
  { value: "hired",     label: "採用" },
];

export default async function ApplicationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const app = await getApplication(SITE_ID, id);
  if (!app) notFound();

  const fields = [
    { label: "氏名",     value: app.name },
    { label: "電話番号", value: app.phone },
    { label: "メール",   value: app.email },
    { label: "希望職種", value: app.position },
    { label: "経験年数", value: app.experience || "未記入" },
    { label: "応募日",   value: new Date(app.createdAt).toLocaleDateString("ja-JP", { year: "numeric", month: "long", day: "numeric" }) },
  ];

  return (
    <div className="space-y-4 md:space-y-8">
      <AdminPageHeader
        eyebrow="Recruit"
        title={app.name}
        description={`${app.position} への応募`}
        actions={
          <Link
            href="/admin/applications"
            className="inline-flex items-center border border-(--border) px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-(--fg-subtle) transition-colors hover:border-(--fg) hover:text-(--fg) md:px-5 md:py-2.5 md:text-xs"
          >
            ← 一覧へ
          </Link>
        }
      />

      <div className="grid gap-4 xl:grid-cols-[1fr_280px]">

        {/* 応募内容 */}
        <div className="space-y-4">
          <AdminSurface>
            <div className="border-b border-(--border) px-3 py-3 md:px-6 md:py-4">
              <div className="flex items-center gap-3">
                <AppStatusBadge status={app.status} />
                <p className="label-en text-[10px] text-(--fg-subtle) md:text-xs">Application Info</p>
              </div>
            </div>

            <dl className="divide-y divide-(--border)">
              {fields.map(({ label, value }) => (
                <div key={label} className="grid grid-cols-[6rem_1fr] gap-3 px-3 py-3 md:grid-cols-[8rem_1fr] md:gap-4 md:px-6 md:py-4">
                  <dt className="text-[10px] font-bold text-(--fg-subtle) md:text-xs">{label}</dt>
                  <dd className="text-xs text-(--fg) md:text-sm">{value}</dd>
                </div>
              ))}
            </dl>
          </AdminSurface>

          {/* 志望動機 */}
          <AdminSurface className="p-3 md:p-6">
            <p className="label-en text-[10px] text-(--fg-subtle) md:text-xs">Message</p>
            <h2 className="mt-1 text-sm font-bold text-(--fg) md:text-base">志望動機・メッセージ</h2>
            <div className="mt-3 border border-(--border) bg-(--card-off) p-3 md:mt-4 md:p-5">
              <p className="whitespace-pre-wrap text-xs leading-7 text-(--fg) md:text-sm md:leading-8">
                {app.message || "（未記入）"}
              </p>
            </div>
          </AdminSurface>

          {/* 履歴書 */}
          {app.resumeUrl && (
            <AdminSurface className="p-3 md:p-6">
              <p className="label-en text-[10px] text-(--fg-subtle) md:text-xs">Resume</p>
              <h2 className="mt-1 text-sm font-bold text-(--fg) md:text-base">添付履歴書</h2>
              <div className="mt-3 flex items-center gap-3 md:mt-4 md:gap-4">
                <span className="min-w-0 flex-1 truncate text-xs text-(--fg-subtle) md:text-sm">
                  {app.resumeFileName ?? "履歴書"}
                </span>
                <a
                  href={app.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 bg-(--cta) px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-(--cta-text) transition-opacity hover:opacity-70 md:px-5 md:py-2.5 md:text-xs"
                >
                  DL
                </a>
              </div>
            </AdminSurface>
          )}
        </div>

        {/* サイドパネル */}
        <div className="space-y-4">

          {/* ステータス更新 */}
          <AdminSurface className="p-3 md:p-6">
            <p className="label-en text-[10px] text-(--fg-subtle) md:text-xs">Status</p>
            <h2 className="mt-1 text-sm font-bold text-(--fg) md:text-base">ステータス更新</h2>
            <div className="mt-3 grid grid-cols-3 gap-1.5 md:mt-4 md:grid-cols-1 md:gap-3">
              {STATUS_OPTIONS.map(({ value, label }) => (
                <form
                  key={value}
                  action={async () => { "use server"; await updateApplicationStatusAction(id, value); }}
                >
                  <button
                    type="submit"
                    className={[
                      "w-full border py-2 text-[10px] font-bold uppercase tracking-widest transition-all md:px-4 md:py-2.5 md:text-xs",
                      app.status === value
                        ? "border-(--fg) bg-(--cta) text-(--cta-text)"
                        : "border-(--border) text-(--fg-subtle) hover:border-(--fg) hover:text-(--fg)",
                    ].join(" ")}
                  >
                    {label}{app.status === value && " ✓"}
                  </button>
                </form>
              ))}
            </div>
          </AdminSurface>

          {/* 削除 */}
          <AdminSurface className="p-3 md:p-6">
            <p className="label-en text-[10px] text-(--fg-subtle) md:text-xs">Danger Zone</p>
            <h2 className="mt-1 text-sm font-bold text-(--fg) md:text-base">応募データの削除</h2>
            <p className="mt-1 text-[10px] leading-5 text-(--fg-subtle) md:mt-2 md:text-xs md:leading-6">
              削除すると元に戻せません。
            </p>
            <form action={deleteApplicationAndRedirect.bind(null, id)} className="mt-3 md:mt-4">
              <ConfirmSubmitButton
                confirmMessage={`${app.name} さんの応募データを削除しますか？`}
                className="w-full border border-red-200 px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-red-600 transition-colors hover:border-red-400 hover:bg-red-50 md:px-4 md:py-2.5 md:text-xs"
              >
                削除する
              </ConfirmSubmitButton>
            </form>
          </AdminSurface>
        </div>
      </div>
    </div>
  );
}
