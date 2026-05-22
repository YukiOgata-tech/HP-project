import { getAdminDb } from "@client-sites/lib/cms/firebase-admin";
import { AdminPageHeader, AdminSurface } from "../components/AdminUi";

const SITE_ID = process.env.SITE_ID!;

interface Registration {
  id: string;
  name: string;
  email: string;
  type: string;
  status: string;
  createdAt: any;
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
    <div className="space-y-8">
      <AdminPageHeader
        eyebrow="Registrations"
        title="申込者管理"
        description="イベントへの事前申込者の一覧です。"
        actions={
          <button className="rounded-full border border-[#D4AF37]/50 bg-[#D4AF37]/10 px-4 py-2 text-sm font-bold tracking-widest text-[#D4AF37] hover:bg-[#D4AF37]/20 transition-colors">
            DOWNLOAD CSV
          </button>
        }
      />

      <AdminSurface className="overflow-hidden bg-black/50 border-white/10">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-300">
            <thead className="border-b border-white/10 bg-white/5 text-xs font-bold tracking-widest text-gray-400">
              <tr>
                <th className="px-6 py-4">DATE</th>
                <th className="px-6 py-4">NAME</th>
                <th className="px-6 py-4">EMAIL</th>
                <th className="px-6 py-4">TYPE</th>
                <th className="px-6 py-4">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {registrations.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center font-bold tracking-widest text-gray-500">
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
                    <td className="px-6 py-4">{reg.email}</td>
                    <td className="px-6 py-4">
                      {reg.type === "vip" ? (
                        <span className="text-[#FF007F] font-bold tracking-widest">VIP</span>
                      ) : (
                        <span className="tracking-widest">GENERAL</span>
                      )}
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
