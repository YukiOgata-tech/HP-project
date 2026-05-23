import { getAdminDb } from "@client-sites/lib/cms/firebase-admin";
import { AdminPageHeader, AdminPrimaryLink, AdminStatCard, AdminSurface } from "../components/AdminUi";
import Link from "next/link";

const SITE_ID = process.env.SITE_ID!;

interface Sponsor {
  id: string;
  name: string;
  logoUrl?: string;
  websiteUrl?: string;
  tier?: string;
  isActive: boolean;
  order: number;
}

async function getSponsors(): Promise<Sponsor[]> {
  const db = getAdminDb();
  const snapshot = await db
    .collection("sites")
    .doc(SITE_ID)
    .collection("sponsors")
    .orderBy("order", "asc")
    .get();

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as Sponsor[];
}

export default async function SponsorsPage() {
  const sponsors = await getSponsors();
  const activeSponsors = sponsors.filter((sponsor) => sponsor.isActive);
  const inactiveSponsors = sponsors.filter((sponsor) => !sponsor.isActive);

  return (
    <div className="space-y-4 sm:space-y-8">
      <AdminPageHeader
        eyebrow="Sponsors"
        title="協賛企業管理"
        description="イベントの協賛企業一覧です。表示順や有効/無効の切り替えが可能です。"
        actions={
          <AdminPrimaryLink href="/admin/sponsors/new">＋ 新規追加</AdminPrimaryLink>
        }
      />

      <div className="grid grid-cols-3 gap-2 sm:gap-4">
        <AdminStatCard label="TOTAL SPONSORS" value={sponsors.length} hint="登録済み協賛企業" />
        <AdminStatCard label="ACTIVE" value={activeSponsors.length} hint="公開サイトに表示中" tone="success" />
        <AdminStatCard label="HIDDEN" value={inactiveSponsors.length} hint="非表示の企業" tone="warning" />
      </div>

      <AdminSurface className="overflow-hidden bg-black/50 border-white/10">
        <div className="divide-y divide-white/10 md:hidden">
          {sponsors.length === 0 ? (
            <div className="px-3 py-10 text-center text-xs font-bold tracking-widest text-gray-500">
              NO SPONSORS YET
            </div>
          ) : (
            sponsors.map((sponsor) => (
              <article key={sponsor.id} className="p-3">
                <div className="flex items-start gap-3">
                  <div className="flex h-12 w-16 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white p-1.5">
                    {sponsor.logoUrl ? (
                      <img src={sponsor.logoUrl} alt={sponsor.name} className="max-h-9 w-full object-contain" />
                    ) : (
                      <span className="text-[9px] font-black text-black/45">NO IMG</span>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-black text-white">{sponsor.name}</p>
                        <p className="mt-1 text-[11px] font-bold uppercase tracking-widest text-gray-500">
                          #{sponsor.order} / {sponsor.tier ?? "regular"}
                        </p>
                      </div>
                      <span className={`shrink-0 rounded-full border px-2 py-1 text-[10px] font-bold tracking-widest ${sponsor.isActive ? "border-[#D4AF37]/40 bg-[#D4AF37]/10 text-[#D4AF37]" : "border-gray-600 bg-gray-800 text-gray-400"}`}>
                        {sponsor.isActive ? "表示" : "非表示"}
                      </span>
                    </div>
                    <div className="mt-3 flex items-center gap-2">
                      {sponsor.websiteUrl ? (
                        <a href={sponsor.websiteUrl} target="_blank" rel="noreferrer" className="inline-flex h-8 items-center rounded-full border border-[#D4AF37]/30 px-3 text-[11px] font-bold text-[#D4AF37]">
                          公式 ↗
                        </a>
                      ) : null}
                      <Link href={`/admin/sponsors/${sponsor.id}/edit`} className="inline-flex h-8 items-center rounded-full bg-white/10 px-3 text-[11px] font-bold text-white">
                        編集
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>

        <div className="hidden overflow-x-auto md:block">
          <table className="w-full text-left text-sm text-gray-300">
            <thead className="border-b border-white/10 bg-white/5 text-xs font-bold tracking-widest text-gray-400">
              <tr>
                <th className="px-6 py-4">表示順</th>
                <th className="px-6 py-4">企業名</th>
                <th className="px-6 py-4">ランク</th>
                <th className="px-6 py-4">公式サイト</th>
                <th className="px-6 py-4">ステータス</th>
                <th className="px-6 py-4">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {sponsors.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center font-bold tracking-widest text-gray-500">
                    NO SPONSORS YET
                  </td>
                </tr>
              ) : (
                sponsors.map(sponsor => (
                  <tr key={sponsor.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">{sponsor.order}</td>
                    <td className="px-6 py-4 font-bold text-white flex items-center gap-4">
                      {sponsor.logoUrl ? (
                        <img src={sponsor.logoUrl} alt={sponsor.name} className="h-8 object-contain bg-white rounded px-1" />
                      ) : (
                        <div className="h-8 w-8 bg-white/10 rounded flex items-center justify-center text-xs">NO IMG</div>
                      )}
                      {sponsor.name}
                    </td>
                    <td className="px-6 py-4">
                      <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-gray-300">
                        {sponsor.tier ?? "regular"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {sponsor.websiteUrl ? (
                        <a href={sponsor.websiteUrl} target="_blank" rel="noreferrer" className="text-[#D4AF37] hover:underline">
                          リンク
                        </a>
                      ) : (
                        <span className="text-gray-600">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`rounded-full px-3 py-1 text-xs tracking-widest border ${sponsor.isActive ? 'bg-[#D4AF37]/10 text-[#D4AF37] border-[#D4AF37]/30' : 'bg-gray-800 text-gray-400 border-gray-600'}`}>
                        {sponsor.isActive ? '表示中' : '非表示'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <Link href={`/admin/sponsors/${sponsor.id}/edit`} className="text-[#00E5FF] hover:underline font-bold text-xs tracking-widest">
                        編集
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </AdminSurface>
    </div>
  );
}
