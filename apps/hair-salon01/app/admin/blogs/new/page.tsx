import { AdminPageHeader } from "../../components/AdminUi";
import { BlogForm } from "../../components/BlogForm";

export default function NewBlogPage() {
  return (
    <div className="space-y-8">
      <AdminPageHeader
        eyebrow="Blog"
        title="新規ブログ記事の作成"
        description="本文中に画像を挿入できます。ツールバーの画像アイコンからアップロードしてください。"
      />
      <BlogForm />
    </div>
  );
}
