import { getAllPosts } from "@client-sites/lib/cms";
import Link from "next/link";
import { deletePostAndRedirect } from "../actions/posts";
import {
  AdminPageHeader,
  AdminPrimaryLink,
  AdminStatTable,
  AdminSurface,
  StatusBadge,
} from "../components/AdminUi";
import { ConfirmSubmitButton } from "../components/ConfirmSubmitButton";

const SITE_ID = process.env.SITE_ID!;

export default async function AdminPostsPage() {
  const posts = await getAllPosts(SITE_ID);
  const published = posts.filter((p) => p.status === "published");
  const drafts = posts.filter((p) => p.status === "draft");

  return (
    <div className="space-y-4 md:space-y-8">
      <AdminPageHeader
        eyebrow="Content Library"
        title="お知らせ管理"
        description="公開状況や更新日を見ながら、既存記事の編集と削除を一か所で行えます。"
        actions={<AdminPrimaryLink href="/admin/posts/new">＋ 新規記事</AdminPrimaryLink>}
      />

      <AdminStatTable
        rows={[
          { labelEn: "Total",     label: "合計",  value: posts.length,     total: posts.length, tone: "default" },
          { labelEn: "Published", label: "公開中", value: published.length, total: posts.length, tone: "success" },
          { labelEn: "Drafts",    label: "下書き", value: drafts.length,    total: posts.length, tone: "warning" },
        ]}
      />

      {posts.length === 0 ? (
        <AdminSurface className="px-4 py-10 text-center md:px-6 md:py-18">
          <p className="text-sm font-bold text-(--fg) md:text-lg">まだ記事がありません</p>
          <p className="mt-1 text-xs text-(--fg-subtle) md:mt-2 md:text-sm">最初の記事を作成すると、ここに一覧表示されます。</p>
          <div className="mt-4 md:mt-6">
            <AdminPrimaryLink href="/admin/posts/new">最初の記事を作成する</AdminPrimaryLink>
          </div>
        </AdminSurface>
      ) : (
        <div className="space-y-2 md:space-y-4">
          {posts.map((post) => (
            <AdminSurface key={post.id} className="p-3 md:p-6">
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div className="min-w-0 space-y-1.5 md:space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <StatusBadge status={post.status} />
                    <span className="text-[10px] uppercase tracking-widest text-(--fg-subtle)">
                      {new Date(post.updatedAt).toLocaleDateString("ja-JP")}
                    </span>
                  </div>
                  <div className="space-y-0.5 md:space-y-2">
                    <h2 className="line-clamp-1 text-sm font-bold text-(--fg) md:font-serif md:text-xl">{post.title}</h2>
                    <p className="hidden font-mono text-xs text-(--fg-subtle) md:block">{post.slug}</p>
                    <p className="hidden max-w-3xl text-sm leading-7 text-(--fg-subtle) md:block">
                      {post.excerpt || "本文中心の記事です。編集画面から内容を確認・更新してください。"}
                    </p>
                  </div>
                  {post.tags.length > 0 && (
                    <div className="hidden flex-wrap gap-2 md:flex">
                      {post.tags.map((tag) => (
                        <span key={tag} className="border border-(--border) px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-(--fg-subtle) md:px-3 md:py-1 md:text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 md:flex-wrap md:justify-end md:gap-3">
                  {post.status === "published" && (
                    <Link
                      href={`/news/${post.slug}`}
                      target="_blank"
                      className="border border-(--border) px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-widest text-(--fg-subtle) transition-colors hover:border-(--fg) hover:text-(--fg) md:px-4 md:py-2 md:text-xs"
                    >
                      公開 ↗
                    </Link>
                  )}
                  <Link
                    href={`/admin/posts/${post.id}/edit`}
                    className="bg-(--cta) px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-widest text-(--cta-text) transition-opacity hover:opacity-75 md:px-4 md:py-2 md:text-xs"
                  >
                    編集
                  </Link>
                  <form action={deletePostAndRedirect.bind(null, post.id)}>
                    <ConfirmSubmitButton
                      className="border border-red-200 px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-widest text-red-600 transition-colors hover:border-red-400 hover:bg-red-50 md:px-4 md:py-2 md:text-xs"
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
