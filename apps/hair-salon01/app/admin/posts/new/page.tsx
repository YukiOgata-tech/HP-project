import { PostForm } from "../../components/PostForm";

export const metadata = { title: "新規記事作成 | 管理画面" };

export default function NewPostPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-800">新規記事作成</h1>
      <PostForm />
    </div>
  );
}
