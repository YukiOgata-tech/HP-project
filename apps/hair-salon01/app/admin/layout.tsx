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
    redirect("/admin/clear-session");
  }

  return (
    <div className="min-h-screen bg-[var(--bg-off)]">
      <AdminHeader user={user} currentPath={pathname ?? "/admin"} />
      <main className="mx-auto max-w-6xl px-4 py-8 md:px-6">
        {children}
      </main>
    </div>
  );
}
