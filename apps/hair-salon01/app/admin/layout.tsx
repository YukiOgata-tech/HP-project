import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getSessionUser } from "./actions/session";
import { AdminHeader } from "./components/AdminHeader";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = (await headers()).get("x-admin-pathname");
  if (pathname === "/admin/login") {
    return children;
  }

  const user = await getSessionUser();
  if (!user) {
    // Route Handler で __session を削除してからログインへ（無限ループ防止）
    redirect("/admin/clear-session");
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f6efe8_0%,#f5f1ec_32%,#f8f6f2_100%)] text-[#2b2018]">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-[-12rem] top-[-8rem] h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(circle,rgba(180,145,118,0.18),transparent_68%)]" />
        <div className="absolute bottom-[-10rem] right-[-8rem] h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle,rgba(122,99,82,0.12),transparent_70%)]" />
      </div>
      <AdminHeader user={user} currentPath={pathname ?? "/admin"} />
      <main className="relative mx-auto max-w-6xl px-4 py-6 md:px-6 md:py-8">
        {children}
      </main>
    </div>
  );
}
