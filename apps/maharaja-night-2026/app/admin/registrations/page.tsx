import { getAdminDb } from "@client-sites/lib/cms/firebase-admin";
import { AdminPageHeader, AdminSurface } from "../components/AdminUi";

const SITE_ID = process.env.SITE_ID!;

interface Registration {
  id: string;
  name: string;
  email: string;
  phone?: string;
  type: string;
  numberOfPeople?: number;
  note?: string;
  status: string;
  createdAt?: {
    toDate?: () => Date;
  };
}

async function getRegistrations(): Promise<Registration[]> {
  const db = getAdminDb();
  const snapshot = await db
    .collection("sites")
    .doc(SITE_ID)
    .collection("registrations")
    .orderBy("createdAt", "desc")
    .get();

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as Registration[];
}

export default async function RegistrationsPage() {
  const registrations = await getRegistrations();

  return (
    <div className="space-y-4 sm:space-y-8">
      <AdminPageHeader
        eyebrow="Registrations"
        title="申込者管理"
        description="イベントへの事前申込者の一覧です。"
        actions={
          <button className="h-9 rounded-full border border-[#D4AF37]/50 bg-[#D4AF37]/10 px-4 text-[11px] font-bold tracking-widest text-[#D4AF37] transition-colors hover:bg-[#D4AF37]/20 sm:h-auto sm:py-2 sm:text-sm">
            DOWNLOAD CSV
          </button>
        }
      />

      <AdminSurface className="overflow-hidden bg-black/50 border-white/10">
        <div className="divide-y divide-white/10 md:hidden">
          {registrations.length === 0 ? (
            <div className="px-3 py-10 text-center text-xs font-bold tracking-widest text-gray-500">
              NO REGISTRATIONS YET
            </div>
          ) : (
            registrations.map((reg) => (
              <article key={reg.id} className="p-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-black text-white">{reg.name}</p>
                      <span className={reg.type === "vip" ? "text-[11px] font-black tracking-widest text-[#FF5DAF]" : "text-[11px] font-bold tracking-widest text-gray-300"}>
                        {reg.type === "vip" ? "VIP" : "GENERAL"}
                      </span>
                    </div>
                    <p className="mt-1 truncate text-[11px] font-medium text-gray-400">{reg.email}</p>
                    {reg.phone ? <p className="mt-0.5 text-[11px] text-gray-500">{reg.phone}</p> : null}
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-xl font-black leading-none text-white">{reg.numberOfPeople ?? 1}</p>
                    <p className="mt-1 text-[9px] font-bold uppercase tracking-widest text-gray-500">people</p>
                  </div>
                </div>
                <div className="mt-3 grid grid-cols-[1fr_auto] items-end gap-3">
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                      {reg.createdAt?.toDate ? new Date(reg.createdAt.toDate()).toLocaleString("ja-JP") : ""}
                    </p>
                    {reg.note ? <p className="mt-1 line-clamp-2 text-xs leading-5 text-gray-400">{reg.note}</p> : null}
                  </div>
                  <span className="rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-bold tracking-widest text-gray-300">
                    {reg.status.toUpperCase()}
                  </span>
                </div>
              </article>
            ))
          )}
        </div>

        <div className="hidden overflow-x-auto md:block">
          <table className="w-full text-left text-sm text-gray-300">
            <thead className="border-b border-white/10 bg-white/5 text-xs font-bold tracking-widest text-gray-400">
              <tr>
                <th className="px-6 py-4">DATE</th>
                <th className="px-6 py-4">NAME</th>
                <th className="px-6 py-4">CONTACT</th>
                <th className="px-6 py-4">TYPE</th>
                <th className="px-6 py-4">PEOPLE</th>
                <th className="px-6 py-4">NOTE</th>
                <th className="px-6 py-4">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {registrations.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center font-bold tracking-widest text-gray-500">
                    NO REGISTRATIONS YET
                  </td>
                </tr>
              ) : (
                registrations.map(reg => (
                  <tr key={reg.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      {reg.createdAt?.toDate ? new Date(reg.createdAt.toDate()).toLocaleString() : ""}
                    </td>
                    <td className="px-6 py-4 font-bold text-white">{reg.name}</td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <p>{reg.email}</p>
                        {reg.phone ? <p className="text-xs text-gray-500">{reg.phone}</p> : null}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {reg.type === "vip" ? (
                        <span className="text-[#FF007F] font-bold tracking-widest">VIP</span>
                      ) : (
                        <span className="tracking-widest">GENERAL</span>
                      )}
                    </td>
                    <td className="px-6 py-4 font-bold text-white">
                      {reg.numberOfPeople ?? 1}
                    </td>
                    <td className="max-w-xs px-6 py-4 text-gray-400">
                      <p className="line-clamp-2">{reg.note || "-"}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="rounded-full bg-white/10 px-3 py-1 text-xs tracking-widest">{reg.status.toUpperCase()}</span>
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
