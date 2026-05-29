import { getAllBlogs } from "@client-sites/lib/cms";
import Link from "next/link";
import { deleteBlogAndRedirect } from "../actions/blogs";
import {
  AdminPageHeader,
  AdminPrimaryLink,
  AdminStatTable,
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
    <div className="space-y-4 md:space-y-8">
      <AdminPageHeader
        eyebrow="Blog Management"
        title="ブログ管理"
        description="スタイル紹介やサロン情報など、SEO対策に効果的なブログ記事を管理します。"
        actions={<AdminPrimaryLink href="/admin/blogs/new">＋ 新規ブログ</AdminPrimaryLink>}
      />

      <AdminStatTable
        rows={[
          { labelEn: "Total",     label: "合計",  value: blogs.length,     total: blogs.length, tone: "default" },
          { labelEn: "Published", label: "公開中", value: published.length, total: blogs.length, tone: "success" },
          { labelEn: "Drafts",    label: "下書き", value: drafts.length,    total: blogs.length, tone: "warning" },
        ]}
      />

      {blogs.length === 0 ? (
        <AdminSurface className="px-4 py-10 text-center md:px-6 md:py-18">
          <p className="text-sm font-bold text-(--fg) md:text-lg">まだブログ記事がありません</p>
          <p className="mt-1 text-xs text-(--fg-subtle) md:mt-2 md:text-sm">最初のブログ記事を作成すると、ここに一覧表示されます。</p>
          <div className="mt-4 md:mt-6">
            <AdminPrimaryLink href="/admin/blogs/new">最初の記事を作成する</AdminPrimaryLink>
          </div>
        </AdminSurface>
      ) : (
        <div className="space-y-2 md:space-y-4">
          {blogs.map((blog) => (
            <AdminSurface key={blog.id} className="p-3 md:p-6">
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div className="min-w-0 space-y-1.5 md:space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <StatusBadge status={blog.status} />
                    <span className="border border-(--border) px-1.5 py-0.5 text-[10px] text-(--fg-subtle)">
                      {blog.category}
                    </span>
                    <span className="text-[10px] uppercase tracking-widest text-(--fg-subtle)">
                      {new Date(blog.updatedAt).toLocaleDateString("ja-JP")}
                    </span>
                  </div>
                  <div className="space-y-0.5 md:space-y-2">
                    <h2 className="line-clamp-1 text-sm font-bold text-(--fg) md:font-serif md:text-xl">{blog.title}</h2>
                    <p className="hidden font-mono text-xs text-(--fg-subtle) md:block">{blog.slug}</p>
                    <p className="hidden max-w-3xl text-sm leading-7 text-(--fg-subtle) md:block">
                      {blog.excerpt || "本文中心の記事です。編集画面から内容を確認・更新してください。"}
                    </p>
                  </div>
                  {blog.tags.length > 0 && (
                    <div className="hidden flex-wrap gap-2 md:flex">
                      {blog.tags.map((tag) => (
                        <span key={tag} className="border border-(--border) px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-(--fg-subtle) md:px-3 md:py-1 md:text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 md:flex-wrap md:justify-end md:gap-3">
                  {blog.status === "published" && (
                    <Link
                      href={`/blog/${blog.slug}`}
                      target="_blank"
                      className="border border-(--border) px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-widest text-(--fg-subtle) transition-colors hover:border-(--fg) hover:text-(--fg) md:px-4 md:py-2 md:text-xs"
                    >
                      公開 ↗
                    </Link>
                  )}
                  <Link
                    href={`/admin/blogs/${blog.id}/edit`}
                    className="bg-(--cta) px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-widest text-(--cta-text) transition-opacity hover:opacity-75 md:px-4 md:py-2 md:text-xs"
                  >
                    編集
                  </Link>
                  <form action={deleteBlogAndRedirect.bind(null, blog.id)}>
                    <ConfirmSubmitButton
                      className="border border-red-200 px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-widest text-red-600 transition-colors hover:border-red-400 hover:bg-red-50 md:px-4 md:py-2 md:text-xs"
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
