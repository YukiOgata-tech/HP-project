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
    { label: "氏名",       value: app.name },
    { label: "電話番号",   value: app.phone },
    { label: "メール",     value: app.email },
    { label: "希望職種",   value: app.position },
    { label: "経験年数",   value: app.experience || "未記入" },
    { label: "応募日",     value: new Date(app.createdAt).toLocaleDateString("ja-JP", { year: "numeric", month: "long", day: "numeric" }) },
  ];

  return (
    <div className="space-y-8">
      <AdminPageHeader
        eyebrow="Recruit"
        title={app.name}
        description={`${app.position} への応募 — ${new Date(app.createdAt).toLocaleDateString("ja-JP")}`}
        actions={
          <Link
            href="/admin/applications"
            className="inline-flex items-center border border-(--border) px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-(--fg-subtle) transition-colors hover:border-(--fg) hover:text-(--fg)"
          >
            ← 一覧へ
          </Link>
        }
      />

      <div className="grid gap-6 xl:grid-cols-[1fr_320px]">

        {/* 応募内容 */}
        <div className="space-y-6">
          <AdminSurface>
            <div className="border-b border-(--border) px-6 py-4">
              <div className="flex items-center gap-3">
                <AppStatusBadge status={app.status} />
                <p className="label-en text-(--fg-subtle)">Application Info</p>
              </div>
            </div>

            <dl className="divide-y divide-(--border)">
              {fields.map(({ label, value }) => (
                <div key={label} className="grid grid-cols-[8rem_1fr] gap-4 px-6 py-4">
                  <dt className="text-xs font-bold text-(--fg-subtle)">{label}</dt>
                  <dd className="text-sm text-(--fg)">{value}</dd>
                </div>
              ))}
            </dl>
          </AdminSurface>

          {/* 志望動機・メッセージ */}
          <AdminSurface className="p-6">
            <p className="label-en text-(--fg-subtle)">Message</p>
            <h2 className="mt-1 font-bold text-(--fg)">志望動機・メッセージ</h2>
            <div className="mt-4 border border-(--border) bg-(--card-off) p-5">
              <p className="whitespace-pre-wrap text-sm leading-8 text-(--fg)">
                {app.message || "（未記入）"}
              </p>
            </div>
          </AdminSurface>

          {/* 履歴書 */}
          {app.resumeUrl && (
            <AdminSurface className="p-6">
              <p className="label-en text-(--fg-subtle)">Resume</p>
              <h2 className="mt-1 font-bold text-(--fg)">添付履歴書</h2>
              <div className="mt-4 flex items-center gap-4">
                <span className="min-w-0 flex-1 truncate text-sm text-(--fg-subtle)">
                  {app.resumeFileName ?? "履歴書"}
                </span>
                <a
                  href={app.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 bg-(--cta) px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-(--cta-text) transition-opacity hover:opacity-70"
                >
                  ダウンロード
                </a>
              </div>
            </AdminSurface>
          )}
        </div>

        {/* サイドパネル */}
        <div className="space-y-6">

          {/* ステータス更新 */}
          <AdminSurface className="p-6">
            <p className="label-en text-(--fg-subtle)">Status</p>
            <h2 className="mt-1 font-bold text-(--fg)">ステータス更新</h2>
            <div className="mt-4 space-y-3">
              {STATUS_OPTIONS.map(({ value, label }) => (
                <form
                  key={value}
                  action={async () => { "use server"; await updateApplicationStatusAction(id, value); }}
                >
                  <button
                    type="submit"
                    className={[
                      "w-full border px-4 py-2.5 text-xs font-bold uppercase tracking-widest transition-all",
                      app.status === value
                        ? "border-(--fg) bg-(--cta) text-(--cta-text)"
                        : "border-(--border) text-(--fg-subtle) hover:border-(--fg) hover:text-(--fg)",
                    ].join(" ")}
                  >
                    {label}
                    {app.status === value && " ✓"}
                  </button>
                </form>
              ))}
            </div>
          </AdminSurface>

          {/* 削除 */}
          <AdminSurface className="p-6">
            <p className="label-en text-(--fg-subtle)">Danger Zone</p>
            <h2 className="mt-1 font-bold text-(--fg)">応募データの削除</h2>
            <p className="mt-2 text-xs leading-6 text-(--fg-subtle)">
              削除すると元に戻せません。
            </p>
            <form action={deleteApplicationAndRedirect.bind(null, id)} className="mt-4">
              <ConfirmSubmitButton
                confirmMessage={`${app.name} さんの応募データを削除しますか？`}
                className="w-full border border-red-200 px-4 py-2.5 text-xs font-bold uppercase tracking-widest text-red-600 transition-colors hover:border-red-400 hover:bg-red-50"
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
