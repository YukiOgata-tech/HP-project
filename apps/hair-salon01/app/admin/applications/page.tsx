import Link from "next/link";
import { getAllApplications } from "@client-sites/lib/cms";
import {
  AdminPageHeader,
  AdminStatCard,
  AdminSurface,
  AppStatusBadge,
} from "../components/AdminUi";

const SITE_ID = process.env.SITE_ID!;

export default async function AdminApplicationsPage() {
  const applications = await getAllApplications(SITE_ID);

  const counts = {
    new:       applications.filter((a) => a.status === "new").length,
    reviewing: applications.filter((a) => a.status === "reviewing").length,
    contacted: applications.filter((a) => a.status === "contacted").length,
    hired:     applications.filter((a) => a.status === "hired").length,
  };

  return (
    <div className="space-y-8">
      <AdminPageHeader
        eyebrow="Recruit"
        title="応募管理"
        description="採用フォームからの応募一覧です。ステータスを更新して選考を進めてください。"
      />

      <div className="grid gap-2 md:gap-4 md:grid-cols-4">
        <AdminStatCard label="Total"     value={applications.length} hint="応募総数" />
        <AdminStatCard label="New"       value={counts.new}       hint="未確認の新着" tone="warning" />
        <AdminStatCard label="Reviewing" value={counts.reviewing} hint="選考中" />
        <AdminStatCard label="Hired"     value={counts.hired}     hint="採用決定" tone="success" />
      </div>

      <AdminSurface className="overflow-hidden">
        <div className="border-b border-[var(--border)] px-6 py-5">
          <h2 className="text-lg font-bold text-[var(--fg)]">応募一覧</h2>
          <p className="text-sm text-[var(--fg-subtle)]">新着順に表示しています</p>
        </div>

        {applications.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <p className="text-base font-bold text-[var(--fg)]">まだ応募はありません</p>
            <p className="mt-2 text-sm text-[var(--fg-subtle)]">
              採用ページのフォームから応募が届くとここに表示されます。
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-[var(--border)]">
            {applications.map((app) => (
              <li key={app.id}>
                <Link
                  href={`/admin/applications/${app.id}`}
                  className="flex flex-col gap-3 px-6 py-5 transition-colors hover:bg-[var(--card-off)] md:flex-row md:items-center md:justify-between"
                >
                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-3">
                      <AppStatusBadge status={app.status} />
                      <span className="text-xs uppercase tracking-widest text-[var(--fg-subtle)]">
                        {new Date(app.createdAt).toLocaleDateString("ja-JP")}
                      </span>
                    </div>
                    <p className="font-bold text-[var(--fg)]">{app.name}</p>
                    <p className="text-sm text-[var(--fg-subtle)]">{app.position}</p>
                  </div>
                  <span className="inline-flex items-center border border-[var(--border)] px-4 py-2 text-xs font-bold uppercase tracking-widest text-[var(--fg-subtle)] transition-colors hover:border-[var(--fg)] hover:text-[var(--fg)]">
                    詳細を見る
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
