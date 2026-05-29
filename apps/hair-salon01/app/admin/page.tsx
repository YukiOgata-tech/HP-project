import { getAllPosts } from "@client-sites/lib/cms";
import Link from "next/link";
import {
  AdminPageHeader,
  AdminPrimaryLink,
  AdminSecondaryLink,
  AdminStatTable,
  AdminSurface,
  StatusBadge,
} from "./components/AdminUi";

const SITE_ID = process.env.SITE_ID!;

export default async function AdminDashboardPage() {
  const posts = await getAllPosts(SITE_ID);
  const published = posts.filter((p) => p.status === "published");
  const drafts = posts.filter((p) => p.status === "draft");
  const latestPost = posts[0];

  return (
    <div className="space-y-4 md:space-y-8">
      <AdminPageHeader
        eyebrow="Overview"
        title="運用状況"
        description="公開記事、下書き、最新更新をまとめて確認できます。"
        actions={
          <>
            <AdminPrimaryLink href="/admin/posts/new">＋ 新規記事</AdminPrimaryLink>
            <AdminSecondaryLink href="/admin/posts">記事一覧</AdminSecondaryLink>
          </>
        }
      />

      {/* 統計テーブル */}
      <AdminStatTable
        rows={[
          { labelEn: "Total",     label: "合計",  value: posts.length,     total: posts.length, tone: "default" },
          { labelEn: "Published", label: "公開中", value: published.length, total: posts.length, tone: "success" },
          { labelEn: "Drafts",    label: "下書き", value: drafts.length,    total: posts.length, tone: "warning" },
        ]}
      />

      <div className="grid gap-4 xl:grid-cols-[1.35fr_0.9fr]">

        {/* 最近の記事 */}
        <AdminSurface className="overflow-hidden">
          <div className="flex items-center justify-between border-b border-(--border) px-3 py-3 md:px-6 md:py-5">
            <div>
              <h2 className="text-sm font-bold text-(--fg) md:text-lg">最近の記事</h2>
              <p className="text-[10px] text-(--fg-subtle) md:text-sm">更新の新しい順に 5 件</p>
            </div>
            <AdminSecondaryLink href="/admin/posts">すべて見る</AdminSecondaryLink>
          </div>

          {posts.length === 0 ? (
            <div className="px-4 py-10 text-center md:px-6 md:py-16">
              <p className="text-sm font-bold text-(--fg)">まだ記事がありません</p>
              <p className="mt-1 text-xs text-(--fg-subtle)">最初の記事を作成してください。</p>
              <div className="mt-4">
                <AdminPrimaryLink href="/admin/posts/new">最初の記事を作成</AdminPrimaryLink>
              </div>
            </div>
          ) : (
            <ul className="divide-y divide-(--border)">
              {posts.slice(0, 5).map((post) => (
                <li key={post.id} className="px-3 py-3 transition-colors hover:bg-(--card-off) md:px-6 md:py-5">
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0 flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <StatusBadge status={post.status} />
                        <span className="text-[10px] text-(--fg-subtle)">
                          {new Date(post.updatedAt).toLocaleDateString("ja-JP")}
                        </span>
                      </div>
                      <h3 className="line-clamp-1 text-sm font-bold text-(--fg)">{post.title}</h3>
                      <p className="hidden font-mono text-xs text-(--fg-subtle) md:block">{post.slug}</p>
                    </div>
                    <Link
                      href={`/admin/posts/${post.id}/edit`}
                      className="shrink-0 border border-(--border) px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-widest text-(--fg-subtle) transition-colors hover:border-(--fg) hover:text-(--fg)"
                    >
                      編集
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </AdminSurface>

        {/* 右サイドパネル */}
        <div className="space-y-4">
          <AdminSurface className="p-3 md:p-6">
            <div className="space-y-3">
              <div>
                <p className="label-en text-[10px] text-(--fg-subtle) md:text-xs">Site</p>
                <h2 className="mt-1 font-serif text-base font-bold text-(--fg) md:text-xl">{SITE_ID}</h2>
              </div>
              <p className="hidden text-sm leading-7 text-(--fg-subtle) md:block">
                公開記事と下書きを横断して管理できます。更新後はニュース一覧も自動で再検証されます。
              </p>
              <Link
                href="/"
                target="_blank"
                className="inline-flex items-center text-[10px] font-bold uppercase tracking-widest text-(--fg-subtle) transition-colors hover:text-(--fg) md:text-xs"
              >
                公開サイトを確認する ↗
              </Link>
            </div>
          </AdminSurface>

          <AdminSurface className="p-3 md:p-6">
            <div className="space-y-3">
              <div>
                <p className="label-en text-[10px] text-(--fg-subtle) md:text-xs">Latest Activity</p>
                <h2 className="mt-1 font-serif text-base font-bold text-(--fg) md:text-xl">最近の更新</h2>
              </div>
              {latestPost ? (
                <div className="border border-(--border) bg-(--card-off) p-3 md:p-5">
                  <div className="flex flex-wrap items-center gap-2">
                    <StatusBadge status={latestPost.status} />
                    <span className="text-[10px] uppercase tracking-widest text-(--fg-subtle)">
                      {new Date(latestPost.updatedAt).toLocaleDateString("ja-JP")}
                    </span>
                  </div>
                  <h3 className="mt-2 line-clamp-2 text-sm font-bold text-(--fg) md:font-serif md:text-lg">{latestPost.title}</h3>
                  <p className="mt-1 line-clamp-2 text-xs text-(--fg-subtle) md:mt-2 md:line-clamp-3 md:text-sm">
                    {latestPost.excerpt || "本文中心の記事です。"}
                  </p>
                </div>
              ) : (
                <p className="text-xs text-(--fg-subtle)">まだ更新履歴はありません。</p>
              )}
            </div>
          </AdminSurface>
        </div>
      </div>
    </div>
  );
}
