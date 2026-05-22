import { getAdminDb } from "@client-sites/lib/cms/firebase-admin";
import { AdminPageHeader, AdminPrimaryLink, AdminSurface } from "../components/AdminUi";
import Link from "next/link";

const SITE_ID = process.env.SITE_ID!;

interface Sponsor {
  id: string;
  name: string;
  logoUrl?: string;
  websiteUrl?: string;
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

  return (
    <div className="space-y-8">
      <AdminPageHeader
        eyebrow="Sponsors"
        title="協賛企業管理"
        description="イベントの協賛企業一覧です。表示順や有効/無効の切り替えが可能です。"
        actions={
          <AdminPrimaryLink href="/admin/sponsors/new">＋ 新規追加</AdminPrimaryLink>
        }
      />

      <AdminSurface className="overflow-hidden bg-black/50 border-white/10">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-300">
            <thead className="border-b border-white/10 bg-white/5 text-xs font-bold tracking-widest text-gray-400">
              <tr>
                <th className="px-6 py-4">表示順</th>
                <th className="px-6 py-4">企業名</th>
                <th className="px-6 py-4">公式サイト</th>
                <th className="px-6 py-4">ステータス</th>
                <th className="px-6 py-4">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {sponsors.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center font-bold tracking-widest text-gray-500">
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
