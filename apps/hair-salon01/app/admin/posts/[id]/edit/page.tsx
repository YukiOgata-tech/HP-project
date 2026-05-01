import { notFound } from "next/navigation";
import { getPost } from "@client-sites/lib/cms";
import { PostForm } from "../../../components/PostForm";
import {
  AdminPageHeader,
  AdminSecondaryLink,
} from "../../../components/AdminUi";

const SITE_ID = process.env.SITE_ID!;

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditPostPage({ params }: Props) {
  const { id } = await params;
  const post = await getPost(SITE_ID, id);
  if (!post) notFound();

  return (
    <div className="space-y-8">
      <AdminPageHeader
        eyebrow="Edit"
        title="記事を編集"
        description="内容の更新、公開状態の切り替え、スラッグ調整をこの画面から行えます。公開中の記事はフロントへの反映も確認しやすくしています。"
        actions={
          <div className="flex flex-wrap gap-3">
            <AdminSecondaryLink href="/admin/posts">一覧へ戻る</AdminSecondaryLink>
            {post.status === "published" ? (
              <AdminSecondaryLink href={`/news/${post.slug}`}>公開ページを見る</AdminSecondaryLink>
            ) : null}
          </div>
        }
      />
      <PostForm post={post} />
    </div>
  );
}
