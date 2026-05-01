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
    <div className="space-y-8">
      <AdminPageHeader
        eyebrow="Content Library"
        title="記事の作成・更新・整理"
        description="公開状況や更新日を見ながら、既存記事の編集と削除を一か所で行えます。公開中の記事はフロント側の表示もすぐ確認できます。"
        actions={<AdminPrimaryLink href="/admin/posts/new">＋ 新規記事</AdminPrimaryLink>}
      />

      <div className="grid gap-4 md:grid-cols-3">
        <AdminStatCard label="All Entries" value={posts.length} hint="全記事数" />
        <AdminStatCard label="Published" value={published.length} hint="公開中の記事" tone="success" />
        <AdminStatCard label="Drafts" value={drafts.length} hint="下書きの記事" tone="warning" />
      </div>

      {posts.length === 0 ? (
        <AdminSurface className="px-6 py-18 text-center">
          <p className="text-lg font-medium text-[#5f4d40]">まだ記事がありません</p>
          <p className="mt-2 text-sm text-[#7b6a5f]">最初の記事を作成すると、ここに一覧表示されます。</p>
          <div className="mt-6">
            <AdminPrimaryLink href="/admin/posts/new">最初の記事を作成する</AdminPrimaryLink>
          </div>
        </AdminSurface>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <AdminSurface key={post.id} className="p-5 md:p-6">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                <div className="min-w-0 space-y-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <StatusBadge status={post.status} />
                    <span className="text-xs uppercase tracking-[0.18em] text-[#9b8a7d]">
                      {new Date(post.updatedAt).toLocaleDateString("ja-JP")}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-xl font-semibold text-[#231912]">{post.title}</h2>
                    <p className="font-mono text-xs text-[#9b8a7d]">{post.slug}</p>
                    <p className="max-w-3xl text-sm leading-7 text-[#6f5d51]">
                      {post.excerpt || "本文中心の記事です。編集画面から内容を確認・更新してください。"}
                    </p>
                  </div>
                  {post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-[#eadbd0] bg-[#fcf9f6] px-3 py-1 text-xs font-medium text-[#6b594d]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-3 lg:justify-end">
                  {post.status === "published" && (
                    <Link
                      href={`/news/${post.slug}`}
                      target="_blank"
                      className="inline-flex items-center rounded-full border border-[#d8c6b8] px-4 py-2 text-sm font-medium text-[#5f4d40] transition-colors hover:border-[#b99679] hover:text-[#241a13]"
                    >
                      公開ページを見る ↗
                    </Link>
                  )}
                  <Link
                    href={`/admin/posts/${post.id}/edit`}
                    className="inline-flex items-center rounded-full bg-[#2d221c] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#1f1712]"
                  >
                    編集する
                  </Link>
                  <form action={deletePostAndRedirect.bind(null, post.id)}>
                    <ConfirmSubmitButton
                      className="inline-flex items-center rounded-full border border-[#ebc8c2] px-4 py-2 text-sm font-medium text-[#b24536] transition-colors hover:border-[#d98779] hover:bg-[#fff5f3]"
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
