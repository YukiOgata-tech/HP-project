import { redirect } from "next/navigation";
import { getSessionUser, deleteSession } from "./actions/session";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getSessionUser();
  if (!user) redirect("/admin/login");

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <span className="font-semibold text-gray-800 text-sm">
            管理画面
          </span>
          <nav className="flex gap-4 text-sm">
            <a
              href="/admin"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              ダッシュボード
            </a>
            <a
              href="/admin/posts"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              記事管理
            </a>
            <a
              href="/"
              target="_blank"
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              サイトを表示 ↗
            </a>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-500">{user.displayName || user.email}</span>
          <form
            action={async () => {
              "use server";
              await deleteSession();
            }}
          >
            <button
              type="submit"
              className="text-xs text-gray-500 hover:text-gray-700 underline transition-colors"
            >
              ログアウト
            </button>
          </form>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8">{children}</main>
    </div>
  );
}
