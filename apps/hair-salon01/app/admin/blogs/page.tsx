import { getAllBlogs } from "@client-sites/lib/cms";
import Link from "next/link";
import { deleteBlogAndRedirect } from "../actions/blogs";
import {
  AdminPageHeader,
  AdminPrimaryLink,
  AdminStatCard,
  AdminSurface,
  StatusBadge,
} from "../components/AdminUi";
import { ConfirmSubmitButton } from "../components/ConfirmSubmitButton";

const SITE_ID = process.env.SITE_ID!;

export default async function AdminBlogsPage() {
  const blogs = await getAllBlogs(SITE_ID);
  const published = blogs.filter((b) => b.status === "published");
  const drafts = blogs.filter((b) => b.status === "draft");

  return (
    <div className="space-y-8">
      <AdminPageHeader
        eyebrow="Blog Management"
        title="ブログ記事の作成・更新・整理"
        description="スタイル紹介やサロン情報など、SEO対策に効果的なブログ記事を管理します。本文中に画像を挿入できます。"
        actions={<AdminPrimaryLink href="/admin/blogs/new">＋ 新規ブログ記事</AdminPrimaryLink>}
      />

      <div className="grid gap-4 md:grid-cols-3">
        <AdminStatCard label="All Entries" value={blogs.length} hint="全ブログ記事数" />
        <AdminStatCard label="Published" value={published.length} hint="公開中の記事" tone="success" />
        <AdminStatCard label="Drafts" value={drafts.length} hint="下書きの記事" tone="warning" />
      </div>

      {blogs.length === 0 ? (
        <AdminSurface className="px-6 py-18 text-center">
          <p className="text-lg font-bold text-(--fg)">まだブログ記事がありません</p>
          <p className="mt-2 text-sm text-(--fg-subtle)">最初のブログ記事を作成すると、ここに一覧表示されます。</p>
          <div className="mt-6">
            <AdminPrimaryLink href="/admin/blogs/new">最初のブログ記事を作成する</AdminPrimaryLink>
          </div>
        </AdminSurface>
      ) : (
        <div className="space-y-4">
          {blogs.map((blog) => (
            <AdminSurface key={blog.id} className="p-5 md:p-6">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                <div className="min-w-0 space-y-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <StatusBadge status={blog.status} />
                    <span className="border border-(--border) px-2 py-0.5 text-xs text-(--fg-subtle)">
                      {blog.category}
                    </span>
                    <span className="text-xs uppercase tracking-widest text-(--fg-subtle)">
                      {new Date(blog.updatedAt).toLocaleDateString("ja-JP")}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <h2 className="font-serif text-xl font-bold text-(--fg)">{blog.title}</h2>
                    <p className="font-mono text-xs text-(--fg-subtle)">{blog.slug}</p>
                    <p className="max-w-3xl text-sm leading-7 text-(--fg-subtle)">
                      {blog.excerpt || "本文中心の記事です。編集画面から内容を確認・更新してください。"}
                    </p>
                  </div>
                  {blog.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {blog.tags.map((tag) => (
                        <span
                          key={tag}
                          className="border border-(--border) px-3 py-1 text-xs font-bold uppercase tracking-wider text-(--fg-subtle)"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-3 lg:justify-end">
                  {blog.status === "published" && (
                    <Link
                      href={`/blog/${blog.slug}`}
                      target="_blank"
                      className="inline-flex items-center border border-(--border) px-4 py-2 text-xs font-bold uppercase tracking-widest text-(--fg-subtle) transition-colors hover:border-(--fg) hover:text-(--fg)"
                    >
                      公開ページを見る ↗
                    </Link>
                  )}
                  <Link
                    href={`/admin/blogs/${blog.id}/edit`}
                    className="inline-flex items-center bg-(--cta) px-4 py-2 text-xs font-bold uppercase tracking-widest text-(--cta-text) transition-opacity hover:opacity-75"
                  >
                    編集する
                  </Link>
                  <form action={deleteBlogAndRedirect.bind(null, blog.id)}>
                    <ConfirmSubmitButton
                      className="inline-flex items-center border border-red-200 px-4 py-2 text-xs font-bold uppercase tracking-widest text-red-600 transition-colors hover:border-red-400 hover:bg-red-50"
                      confirmMessage="このブログ記事を削除しますか？"
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
