import { PostForm } from "../../components/PostForm";
import {
  AdminPageHeader,
  AdminSecondaryLink,
} from "../../components/AdminUi";

export const metadata = { title: "新規記事作成 | 管理画面" };

export default function NewPostPage() {
  return (
    <div className="space-y-8">
      <AdminPageHeader
        eyebrow="Create"
        title="新しい記事を作成"
        description="タイトル、スラッグ、抜粋、本文、公開状態をまとめて設定できます。下書き保存から公開まで同じ画面で完結します。"
        actions={<AdminSecondaryLink href="/admin/posts">一覧へ戻る</AdminSecondaryLink>}
      />
      <PostForm />
    </div>
  );
}
