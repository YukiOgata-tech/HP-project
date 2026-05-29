import Link from "next/link";
import { getAllApplications } from "@client-sites/lib/cms";
import {
  AdminPageHeader,
  AdminStatTable,
  AdminSurface,
  AppStatusBadge,
} from "../components/AdminUi";

const SITE_ID = process.env.SITE_ID!;

export default async function AdminApplicationsPage() {
  const applications = await getAllApplications(SITE_ID);
  const total = applications.length;

  const counts = {
    new:       applications.filter((a) => a.status === "new").length,
    reviewing: applications.filter((a) => a.status === "reviewing").length,
    contacted: applications.filter((a) => a.status === "contacted").length,
    hired:     applications.filter((a) => a.status === "hired").length,
  };

  return (
    <div className="space-y-4 md:space-y-8">
      <AdminPageHeader
        eyebrow="Recruit"
        title="応募管理"
        description="採用フォームからの応募一覧です。ステータスを更新して選考を進めてください。"
      />

      <AdminStatTable
        rows={[
          { labelEn: "Total",     label: "合計",  value: total,          total,          tone: "default" },
          { labelEn: "New",       label: "新着",  value: counts.new,      total,          tone: "warning" },
          { labelEn: "Reviewing", label: "選考中", value: counts.reviewing, total,         tone: "default" },
          { labelEn: "Hired",     label: "採用",  value: counts.hired,    total,          tone: "success" },
        ]}
      />

      <AdminSurface className="overflow-hidden">
        <div className="border-b border-(--border) px-3 py-3 md:px-6 md:py-5">
          <h2 className="text-sm font-bold text-(--fg) md:text-lg">応募一覧</h2>
          <p className="text-[10px] text-(--fg-subtle) md:text-sm">新着順に表示</p>
        </div>

        {applications.length === 0 ? (
          <div className="px-4 py-10 text-center md:px-6 md:py-16">
            <p className="text-sm font-bold text-(--fg)">まだ応募はありません</p>
            <p className="mt-1 text-xs text-(--fg-subtle) md:mt-2 md:text-sm">
              採用ページのフォームから応募が届くとここに表示されます。
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-(--border)">
            {applications.map((app) => (
              <li key={app.id}>
                <Link
                  href={`/admin/applications/${app.id}`}
                  className="flex items-center justify-between gap-3 px-3 py-3 transition-colors hover:bg-(--card-off) md:px-6 md:py-5"
                >
                  <div className="min-w-0 flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <AppStatusBadge status={app.status} />
                      <span className="text-[10px] text-(--fg-subtle)">
                        {new Date(app.createdAt).toLocaleDateString("ja-JP")}
                      </span>
                    </div>
                    <p className="text-sm font-bold text-(--fg)">{app.name}</p>
                    <p className="text-xs text-(--fg-subtle)">{app.position}</p>
                  </div>
                  <span className="shrink-0 border border-(--border) px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-widest text-(--fg-subtle) md:px-4 md:py-2 md:text-xs">
                    詳細 →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </AdminSurface>
    </div>
  );
}
