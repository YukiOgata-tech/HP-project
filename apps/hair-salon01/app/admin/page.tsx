import { getAllPosts } from "@client-sites/lib/cms";
import Link from "next/link";
import {
  AdminPageHeader,
  AdminPrimaryLink,
  AdminSecondaryLink,
  AdminStatCard,
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
    <div className="space-y-8">
      <AdminPageHeader
        eyebrow="Overview"
        title="運用状況をひと目で把握"
        description="公開記事、下書き、最新更新をまとめて確認できます。新規記事作成と既存記事のメンテナンスを、同じ導線で素早く進められる管理画面です。"
        actions={
          <>
            <AdminPrimaryLink href="/admin/posts/new">＋ 新規記事を作成</AdminPrimaryLink>
            <AdminSecondaryLink href="/admin/posts">記事一覧を見る</AdminSecondaryLink>
          </>
        }
      />

      <div className="grid gap-2 md:gap-4 md:grid-cols-3">
        <AdminStatCard
          label="Total Posts"
          value={posts.length}
          hint="管理対象の記事総数"
        />
        <AdminStatCard
          label="Published"
          value={published.length}
          hint="サイト上に公開中の記事"
          tone="success"
        />
        <AdminStatCard
          label="Drafts"
          value={drafts.length}
          hint="公開前の下書き"
          tone="warning"
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.35fr_0.9fr]">
        <AdminSurface className="overflow-hidden">
          <div className="flex items-center justify-between border-b border-(--border) px-6 py-5">
            <div>
              <h2 className="text-lg font-bold text-(--fg)">最近の記事</h2>
              <p className="text-sm text-(--fg-subtle)">更新の新しい順に 5 件表示しています。</p>
            </div>
            <AdminSecondaryLink href="/admin/posts">すべて見る</AdminSecondaryLink>
          </div>

          {posts.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <p className="text-base font-bold text-(--fg)">まだ記事がありません</p>
              <p className="mt-2 text-sm text-(--fg-subtle)">最初の記事を作成して、ニュース一覧を育てていきましょう。</p>
              <div className="mt-6">
                <AdminPrimaryLink href="/admin/posts/new">最初の記事を作成</AdminPrimaryLink>
              </div>
            </div>
          ) : (
            <ul className="divide-y divide-(--border)">
              {posts.slice(0, 5).map((post) => (
                <li key={post.id} className="px-6 py-5 transition-colors hover:bg-(--card-off)">
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-base font-bold text-(--fg)">{post.title}</h3>
                        <StatusBadge status={post.status} />
                      </div>
                      <p className="font-mono text-xs text-(--fg-subtle)">{post.slug}</p>
                      <p className="text-sm text-(--fg-subtle)">
                        更新日 {new Date(post.updatedAt).toLocaleDateString("ja-JP")}
                      </p>
                    </div>
                    <Link
                      href={`/admin/posts/${post.id}/edit`}
                      className="inline-flex items-center border border-(--border) px-4 py-2 text-xs font-bold uppercase tracking-widest text-(--fg-subtle) transition-colors hover:border-(--fg) hover:text-(--fg)"
                    >
                      編集する
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </AdminSurface>

        <div className="space-y-6">
          <AdminSurface className="p-6">
            <div className="space-y-4">
              <div>
                <p className="label-en text-(--fg-subtle)">Site</p>
                <h2 className="mt-2 font-serif text-xl font-bold text-(--fg)">{SITE_ID}</h2>
              </div>
              <p className="text-sm leading-7 text-(--fg-subtle)">
                管理画面は公開中記事と下書きの両方を横断して管理できます。更新後はニュース一覧も自動で再検証されます。
              </p>
              <Link
                href="/"
                target="_blank"
                className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-(--fg-subtle) transition-colors hover:text-(--fg)"
              >
                公開サイトを確認する ↗
              </Link>
            </div>
          </AdminSurface>

          <AdminSurface className="p-4 md:p-6">
            <div className="space-y-4">
              <div>
                <p className="label-en text-(--fg-subtle)">Latest Activity</p>
                <h2 className="mt-2 font-serif text-xl font-bold text-(--fg)">最近の更新</h2>
              </div>
              {latestPost ? (
                <div className="border border-(--border) bg-(--card-off) p-5">
                  <div className="flex flex-wrap items-center gap-3">
                    <StatusBadge status={latestPost.status} />
                    <span className="text-xs uppercase tracking-widest text-(--fg-subtle)">
                      {new Date(latestPost.updatedAt).toLocaleDateString("ja-JP")}
                    </span>
                  </div>
                  <h3 className="mt-4 font-serif text-lg font-bold text-(--fg)">{latestPost.title}</h3>
                  <p className="mt-2 text-sm text-(--fg-subtle) line-clamp-3">
                    {latestPost.excerpt || "本文を中心に構成された記事です。編集画面から内容を確認してください。"}
                  </p>
                </div>
              ) : (
                <p className="text-sm text-(--fg-subtle)">まだ更新履歴はありません。</p>
              )}
            </div>
          </AdminSurface>
        </div>
      </div>
    </div>
  );
}
