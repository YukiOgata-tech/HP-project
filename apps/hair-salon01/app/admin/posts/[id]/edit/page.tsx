import { notFound } from "next/navigation";
import { getPost } from "@client-sites/lib/cms";
import { PostForm } from "../../../components/PostForm";

const SITE_ID = process.env.SITE_ID!;

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditPostPage({ params }: Props) {
  const { id } = await params;
  const post = await getPost(SITE_ID, id);
  if (!post) notFound();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-800">記事を編集</h1>
      <PostForm post={post} />
    </div>
  );
}
