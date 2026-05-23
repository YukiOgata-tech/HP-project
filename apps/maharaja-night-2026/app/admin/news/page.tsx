import { getAllPosts } from "@client-sites/lib/cms";
import Link from "next/link";
import { deletePostAndRedirect } from "../actions/posts";
import {
  AdminPageHeader,
  AdminPrimaryLink,
  AdminStatCard,
  AdminSurface,
  StatusBadge,
} from "../components/AdminUi";
import { ConfirmSubmitButton } from "../components/ConfirmSubmitButton";

const SITE_ID = process.env.SITE_ID!;

export default async function AdminPostsPage() {
  const posts = await getAllPosts(SITE_ID);
  const published = posts.filter((post) => post.status === "published");
  const drafts = posts.filter((post) => post.status === "draft");

  return (
    <div className="space-y-4 sm:space-y-8">
      <AdminPageHeader
        eyebrow="Content Library"
        title="記事の作成・更新・整理"
        description="公開状況や更新日を見ながら、既存記事の編集と削除を一か所で行えます。公開中の記事はフロント側の表示もすぐ確認できます。"
        actions={<AdminPrimaryLink href="/admin/news/new">＋ 新規記事</AdminPrimaryLink>}
      />

      <div className="grid grid-cols-3 gap-2 sm:gap-4">
        <AdminStatCard label="All Entries" value={posts.length} hint="全記事数" />
        <AdminStatCard label="Published" value={published.length} hint="公開中の記事" tone="success" />
        <AdminStatCard label="Drafts" value={drafts.length} hint="下書きの記事" tone="warning" />
      </div>

      {posts.length === 0 ? (
        <AdminSurface className="px-3 py-10 text-center sm:px-6 sm:py-18">
          <p className="text-base font-medium text-[#5f4d40] sm:text-lg">まだ記事がありません</p>
          <p className="mt-1 text-xs text-[#7b6a5f] sm:mt-2 sm:text-sm">最初の記事を作成すると、ここに一覧表示されます。</p>
          <div className="mt-4 sm:mt-6">
            <AdminPrimaryLink href="/admin/news/new">最初の記事を作成する</AdminPrimaryLink>
          </div>
        </AdminSurface>
      ) : (
        <div className="space-y-2 sm:space-y-4">
          {posts.map((post) => (
            <AdminSurface key={post.id} className="p-3 sm:p-5 md:p-6">
              <div className="flex flex-col gap-3 sm:gap-5 lg:flex-row lg:items-start lg:justify-between">
                <div className="min-w-0 space-y-2 sm:space-y-3">
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                    <StatusBadge status={post.status} />
                    <span className="text-[10px] uppercase tracking-[0.18em] text-[#9b8a7d] sm:text-xs">
                      {new Date(post.updatedAt).toLocaleDateString("ja-JP")}
                    </span>
                  </div>
                  <div className="space-y-1.5 sm:space-y-2">
                    <h2 className="text-base font-semibold leading-snug text-[#231912] sm:text-xl">{post.title}</h2>
                    <p className="break-all font-mono text-[10px] text-[#9b8a7d] sm:text-xs">{post.slug}</p>
                    <p className="line-clamp-2 max-w-3xl text-xs leading-5 text-[#6f5d51] sm:line-clamp-none sm:text-sm sm:leading-7">
                      {post.excerpt || "本文中心の記事です。編集画面から内容を確認・更新してください。"}
                    </p>
                  </div>
                  {post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-[#eadbd0] bg-[#fcf9f6] px-2.5 py-1 text-[10px] font-medium text-[#6b594d] sm:px-3 sm:text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:items-center sm:gap-3 lg:justify-end">
                  {post.status === "published" && (
                    <Link
                      href={`/news/${post.slug}`}
                      target="_blank"
                      className="inline-flex h-9 items-center justify-center rounded-full border border-[#d8c6b8] px-3 text-[11px] font-medium text-[#5f4d40] transition-colors hover:border-[#b99679] hover:text-[#241a13] sm:h-auto sm:px-4 sm:py-2 sm:text-sm"
                    >
                      公開ページを見る ↗
                    </Link>
                  )}
                  <Link
                    href={`/admin/news/${post.id}/edit`}
                    className="inline-flex h-9 items-center justify-center rounded-full bg-[#2d221c] px-3 text-[11px] font-medium text-white transition-colors hover:bg-[#1f1712] sm:h-auto sm:px-4 sm:py-2 sm:text-sm"
                  >
                    編集する
                  </Link>
                  <form action={deletePostAndRedirect.bind(null, post.id)}>
                    <ConfirmSubmitButton
                      className="inline-flex h-9 w-full items-center justify-center rounded-full border border-[#ebc8c2] px-3 text-[11px] font-medium text-[#b24536] transition-colors hover:border-[#d98779] hover:bg-[#fff5f3] sm:h-auto sm:w-auto sm:px-4 sm:py-2 sm:text-sm"
                      confirmMessage="この記事を削除しますか？"
                    >
                      削除
                    </ConfirmSubmitButton>
                  </form>
                </div>
              </div>
            </AdminSurface>
          ))}
        </div>
      )}
    </div>
  );
}
