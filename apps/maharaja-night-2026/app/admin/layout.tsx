import { headers } from "next/headers";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSessionUser } from "./actions/session";
import { AdminHeader } from "./components/AdminHeader";

export const metadata: Metadata = {
  title: "管理画面",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

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
    <div className="min-h-screen bg-[#0A0A0A] text-gray-200 font-sans selection:bg-[#D4AF37] selection:text-black">
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
        <div className="absolute left-[-12rem] top-[-8rem] h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.05),transparent_68%)]" />
        <div className="absolute bottom-[-10rem] right-[-8rem] h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle,rgba(255,0,127,0.05),transparent_70%)]" />
      </div>
      <div className="relative z-10 flex flex-col min-h-screen">
        <AdminHeader user={user} currentPath={pathname ?? "/admin"} />
        <main className="mx-auto min-w-0 max-w-full flex-1 overflow-hidden px-3 py-4 sm:w-full sm:max-w-6xl sm:px-4 sm:py-6 md:px-6 md:py-8">
          {children}
        </main>
      </div>
    </div>
  );
}
