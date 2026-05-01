import { getAllPosts } from "@client-sites/lib/cms";
import Link from "next/link";
import { deletePostAndRedirect } from "../actions/posts";
import { ConfirmSubmitButton } from "../components/ConfirmSubmitButton";

const SITE_ID = process.env.SITE_ID!;

export default async function AdminPostsPage() {
  const posts = await getAllPosts(SITE_ID);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-800">記事管理</h1>
        <Link
          href="/admin/posts/new"
          className="px-4 py-2 bg-gray-800 text-white text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors"
        >
          ＋ 新規作成
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-xl py-16 text-center">
          <p className="text-gray-400 text-sm">まだ記事がありません</p>
          <Link
            href="/admin/posts/new"
            className="mt-4 inline-block text-sm text-gray-600 underline"
          >
            最初の記事を作成する
          </Link>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-gray-600">タイトル</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">ステータス</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">更新日</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="font-medium text-gray-800">{post.title}</div>
                    <div className="text-xs text-gray-400 font-mono">{post.slug}</div>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={[
                        "text-xs px-2 py-1 rounded-full font-medium",
                        post.status === "published"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700",
                      ].join(" ")}
                    >
                      {post.status === "published" ? "公開中" : "下書き"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-500 text-xs">
                    {new Date(post.updatedAt).toLocaleDateString("ja-JP")}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3 justify-end">
                      {post.status === "published" && (
                        <Link
                          href={`/news/${post.slug}`}
                          target="_blank"
                          className="text-gray-400 hover:text-gray-600 transition-colors"
                          title="表示"
                        >
                          ↗
                        </Link>
                      )}
                      <Link
                        href={`/admin/posts/${post.id}/edit`}
                        className="text-gray-600 hover:text-gray-800 underline transition-colors"
                      >
                        編集
                      </Link>
                      <form
                        action={deletePostAndRedirect.bind(null, post.id)}
                      >
                        <ConfirmSubmitButton
                          className="text-red-500 hover:text-red-700 underline transition-colors"
                          confirmMessage="この記事を削除しますか？"
                        >
                          削除
                        </ConfirmSubmitButton>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
