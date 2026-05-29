import { notFound } from "next/navigation";
import { getBlog } from "@client-sites/lib/cms";
import { BlogForm } from "../../../components/BlogForm";
import {
  AdminPageHeader,
  AdminSecondaryLink,
} from "../../../components/AdminUi";

const SITE_ID = process.env.SITE_ID!;

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditBlogPage({ params }: Props) {
  const { id } = await params;
  const blog = await getBlog(SITE_ID, id);
  if (!blog) notFound();

  return (
    <div className="space-y-8">
      <AdminPageHeader
        eyebrow="Edit Blog"
        title="ブログ記事を編集"
        description="内容の更新、公開状態の切り替え、スラッグ調整をこの画面から行えます。本文中に画像を挿入することもできます。"
        actions={
          <div className="flex flex-wrap gap-3">
            <AdminSecondaryLink href="/admin/blogs">一覧へ戻る</AdminSecondaryLink>
            {blog.status === "published" ? (
              <AdminSecondaryLink href={`/blog/${blog.slug}`}>公開ページを見る</AdminSecondaryLink>
            ) : null}
          </div>
        }
      />
      <BlogForm blog={blog} />
    </div>
  );
}
