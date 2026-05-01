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
          <div className="flex items-center justify-between border-b border-[#efe4da] px-6 py-5">
            <div>
              <h2 className="text-lg font-semibold text-[#231912]">最近の記事</h2>
              <p className="text-sm text-[#77665b]">更新の新しい順に 5 件表示しています。</p>
            </div>
            <AdminSecondaryLink href="/admin/posts">すべて見る</AdminSecondaryLink>
          </div>

          {posts.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <p className="text-base font-medium text-[#5f4d40]">まだ記事がありません</p>
              <p className="mt-2 text-sm text-[#857467]">最初の記事を作成して、ニュース一覧を育てていきましょう。</p>
              <div className="mt-6">
                <AdminPrimaryLink href="/admin/posts/new">最初の記事を作成</AdminPrimaryLink>
              </div>
            </div>
          ) : (
            <ul className="divide-y divide-[#f0e6de]">
              {posts.slice(0, 5).map((post) => (
                <li key={post.id} className="px-6 py-5 transition-colors hover:bg-[#fcfaf8]">
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-base font-semibold text-[#241a13]">{post.title}</h3>
                        <StatusBadge status={post.status} />
                      </div>
                      <p className="font-mono text-xs text-[#9b8a7d]">{post.slug}</p>
                      <p className="text-sm text-[#6f5d51]">
                        更新日 {new Date(post.updatedAt).toLocaleDateString("ja-JP")}
                      </p>
                    </div>
                    <Link
                      href={`/admin/posts/${post.id}/edit`}
                      className="inline-flex items-center rounded-full border border-[#dac8ba] px-4 py-2 text-sm font-medium text-[#5f4d40] transition-colors hover:border-[#b99679] hover:text-[#241a13]"
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
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8c694d]">
                  Site
                </p>
                <h2 className="mt-2 text-xl font-semibold text-[#241a13]">{SITE_ID}</h2>
              </div>
              <p className="text-sm leading-7 text-[#6f5d51]">
                管理画面は公開中記事と下書きの両方を横断して管理できます。更新後はニュース一覧も自動で再検証されます。
              </p>
              <Link
                href="/"
                target="_blank"
                className="inline-flex items-center text-sm font-semibold text-[#8c694d] transition-colors hover:text-[#2d221c]"
              >
                公開サイトを確認する ↗
              </Link>
            </div>
          </AdminSurface>

          <AdminSurface className="p-4 md:p-6">
            <div className="space-y-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8c694d]">
                  Latest Activity
                </p>
                <h2 className="mt-2 text-xl font-semibold text-[#241a13]">最近の更新</h2>
              </div>
              {latestPost ? (
                <div className="rounded-[20px] border border-[#efe4da] bg-[#fcfaf8] p-5">
                  <div className="flex flex-wrap items-center gap-3">
                    <StatusBadge status={latestPost.status} />
                    <span className="text-xs uppercase tracking-[0.18em] text-[#9b8a7d]">
                      {new Date(latestPost.updatedAt).toLocaleDateString("ja-JP")}
                    </span>
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-[#241a13]">{latestPost.title}</h3>
                  <p className="mt-2 text-sm text-[#6f5d51] line-clamp-3">
                    {latestPost.excerpt || "本文を中心に構成された記事です。編集画面から内容を確認してください。"}
                  </p>
                </div>
              ) : (
                <p className="text-sm text-[#77665b]">まだ更新履歴はありません。</p>
              )}
            </div>
          </AdminSurface>
        </div>
      </div>
    </div>
  );
}
