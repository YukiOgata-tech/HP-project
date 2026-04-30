import { getAllPosts } from "@client-sites/lib/cms";
import Link from "next/link";

const SITE_ID = process.env.SITE_ID!;

export default async function AdminDashboardPage() {
  const posts = await getAllPosts(SITE_ID);
  const published = posts.filter((p) => p.status === "published");
  const drafts = posts.filter((p) => p.status === "draft");

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">ダッシュボード</h1>
        <p className="text-sm text-gray-500 mt-1">サイト: {SITE_ID}</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "記事総数", value: posts.length, color: "text-gray-800" },
          { label: "公開中", value: published.length, color: "text-green-700" },
          { label: "下書き", value: drafts.length, color: "text-yellow-700" },
        ].map(({ label, value, color }) => (
          <div
            key={label}
            className="bg-white border border-gray-200 rounded-xl p-5"
          >
            <div className={`text-3xl font-bold ${color}`}>{value}</div>
            <div className="text-sm text-gray-500 mt-1">{label}</div>
          </div>
        ))}
      </div>

      <div className="bg-white border border-gray-200 rounded-xl">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h2 className="font-medium text-gray-700">最近の記事</h2>
          <Link
            href="/admin/posts/new"
            className="text-sm px-3 py-1.5 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            ＋ 新規作成
          </Link>
        </div>

        {posts.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-10">
            まだ記事がありません
          </p>
        ) : (
          <ul className="divide-y divide-gray-100">
            {posts.slice(0, 5).map((post) => (
              <li key={post.id} className="flex items-center justify-between px-5 py-3">
                <div>
                  <span className="text-sm font-medium text-gray-800">
                    {post.title}
                  </span>
                  <span
                    className={[
                      "ml-2 text-xs px-2 py-0.5 rounded-full",
                      post.status === "published"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700",
                    ].join(" ")}
                  >
                    {post.status === "published" ? "公開中" : "下書き"}
                  </span>
                </div>
                <Link
                  href={`/admin/posts/${post.id}/edit`}
                  className="text-xs text-gray-500 hover:text-gray-700 underline"
                >
                  編集
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
