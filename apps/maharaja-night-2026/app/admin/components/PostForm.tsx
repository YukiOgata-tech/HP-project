"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { TiptapEditor } from "@client-sites/components/cms";
import type { Post } from "@client-sites/lib/cms/types";
import type { JSONContent } from "@client-sites/lib/cms/types";
import { uploadImageToStorage } from "@client-sites/lib/cms/client";
import { createPostAction, updatePostAction } from "../actions/posts";

const SITE_ID = process.env.NEXT_PUBLIC_SITE_ID ?? "hair-salon01";

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[　-鿿！-￮]/g, "")
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

interface PostFormProps {
  post?: Post;
}

export function PostForm({ post }: PostFormProps) {
  const router = useRouter();
  const isEdit = !!post;

  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? "");
  const [coverImageUrl, setCoverImageUrl] = useState(post?.coverImageUrl ?? "");
  const [tagsInput, setTagsInput] = useState((post?.tags ?? []).join(", "));
  const [status, setStatus] = useState<"draft" | "published">(
    post?.status ?? "draft"
  );
  const [content, setContent] = useState<JSONContent>(
    post?.content ?? { type: "doc", content: [] }
  );
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const isPublished = status === "published";
  const tags = tagsInput
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (!isEdit || slug === "") {
      setSlug(generateSlug(value));
    }
  };

  const handleImageUpload = useCallback(
    async (file: File): Promise<string> => {
      return uploadImageToStorage(file, SITE_ID);
    },
    []
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSaving(true);

    const formData = {
      title,
      slug,
      excerpt,
      content: JSON.stringify(content),
      status,
      coverImageUrl,
      tags,
    };

    try {
      const result = isEdit
        ? await updatePostAction(post.id, formData)
        : await createPostAction(formData);

      if (!result.ok) {
        setError(result.error);
        return;
      }

      router.push("/admin/posts");
      router.refresh();
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.55fr)_minmax(320px,0.85fr)]">
        <section className="space-y-6">
          <div className="rounded-[28px] border border-white/70 bg-white/90 p-6 shadow-[0_24px_60px_-40px_rgba(45,34,28,0.45)]">
            <div className="space-y-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8c694d]">
                  Basic Info
                </p>
                <h2 className="mt-2 text-xl font-semibold text-[#241a13]">記事の基本情報</h2>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-[#493a31]">
                    タイトル <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    required
                    className="w-full rounded-2xl border border-[#e6d7ca] bg-[#fcfaf8] px-4 py-3 text-sm text-[#241a13] outline-none transition-colors placeholder:text-[#b1a296] focus:border-[#b99679] focus:bg-white"
                    placeholder="記事タイトル"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-[#493a31]">
                    スラッグ <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    required
                    pattern="[a-z0-9\-]+"
                    title="半角英小文字・数字・ハイフンのみ"
                    className="w-full rounded-2xl border border-[#e6d7ca] bg-[#fcfaf8] px-4 py-3 font-mono text-sm text-[#241a13] outline-none transition-colors placeholder:text-[#b1a296] focus:border-[#b99679] focus:bg-white"
                    placeholder="my-post-slug"
                  />
                  <p className="text-xs text-[#8f8074]">
                    URL に使われます。半角英小文字・数字・ハイフンで設定してください。
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-[#493a31]">
                  抜粋
                </label>
                <textarea
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  rows={4}
                  className="w-full resize-none rounded-2xl border border-[#e6d7ca] bg-[#fcfaf8] px-4 py-3 text-sm text-[#241a13] outline-none transition-colors placeholder:text-[#b1a296] focus:border-[#b99679] focus:bg-white"
                  placeholder="記事の概要。一覧や OGP に使われます。"
                />
              </div>
            </div>
          </div>

          <div className="rounded-[28px] border border-white/70 bg-white/90 p-6 shadow-[0_24px_60px_-40px_rgba(45,34,28,0.45)]">
            <div className="space-y-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8c694d]">
                  Content
                </p>
                <h2 className="mt-2 text-xl font-semibold text-[#241a13]">本文エディタ</h2>
              </div>
              <div className="overflow-hidden rounded-[24px] border border-[#eadfd6] bg-[#fffdfb]">
                <TiptapEditor
                  initialContent={content}
                  onChange={setContent}
                  onImageUpload={handleImageUpload}
                  placeholder="本文を入力してください..."
                  className="border-0 bg-transparent"
                />
              </div>
            </div>
          </div>
        </section>

        <aside className="space-y-6">
          <div className="rounded-[28px] border border-white/70 bg-white/90 p-6 shadow-[0_24px_60px_-40px_rgba(45,34,28,0.45)]">
            <div className="space-y-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8c694d]">
                  Publish
                </p>
                <h2 className="mt-2 text-xl font-semibold text-[#241a13]">公開設定</h2>
              </div>

              <div className="rounded-[22px] border border-[#eadfd6] bg-[#fcfaf8] p-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-[#352821]">ステータス</p>
                    <p className="mt-1 text-xs leading-6 text-[#7b6a5f]">
                      {isPublished
                        ? "公開ページに反映される状態です。"
                        : "下書きのまま保存され、サイトには表示されません。"}
                    </p>
                  </div>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as "draft" | "published")}
                    className="rounded-full border border-[#d8c6b8] bg-white px-4 py-2 text-sm font-medium text-[#2b2018] outline-none transition-colors focus:border-[#b99679]"
                  >
                    <option value="draft">下書き</option>
                    <option value="published">公開</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-[#493a31]">
                  カバー画像 URL
                </label>
                <input
                  type="url"
                  value={coverImageUrl}
                  onChange={(e) => setCoverImageUrl(e.target.value)}
                  className="w-full rounded-2xl border border-[#e6d7ca] bg-[#fcfaf8] px-4 py-3 text-sm text-[#241a13] outline-none transition-colors placeholder:text-[#b1a296] focus:border-[#b99679] focus:bg-white"
                  placeholder="https://..."
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-[#493a31]">
                  タグ（カンマ区切り）
                </label>
                <input
                  type="text"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  className="w-full rounded-2xl border border-[#e6d7ca] bg-[#fcfaf8] px-4 py-3 text-sm text-[#241a13] outline-none transition-colors placeholder:text-[#b1a296] focus:border-[#b99679] focus:bg-white"
                  placeholder="お知らせ, ブログ"
                />
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {tags.map((tag) => (
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

              {coverImageUrl && (
                <div className="space-y-3 rounded-[22px] border border-[#eadfd6] bg-[#fcfaf8] p-4">
                  <p className="text-sm font-medium text-[#352821]">カバー画像プレビュー</p>
                  <div className="overflow-hidden rounded-2xl border border-[#ede4db] bg-white">
                    <img
                      src={coverImageUrl}
                      alt="cover preview"
                      className="h-44 w-full object-cover"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="rounded-[28px] border border-white/70 bg-white/90 p-6 shadow-[0_24px_60px_-40px_rgba(45,34,28,0.45)]">
            <div className="space-y-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8c694d]">
                  Actions
                </p>
                <h2 className="mt-2 text-xl font-semibold text-[#241a13]">保存操作</h2>
              </div>

              {error && (
                <p className="rounded-2xl border border-[#f0c6c0] bg-[#fff3f1] px-4 py-3 text-sm text-[#a73d33]">
                  {error}
                </p>
              )}

              <div className="space-y-3">
                <button
                  type="submit"
                  disabled={saving}
                  className="w-full rounded-full bg-[#2d221c] px-5 py-3 text-sm font-semibold text-white shadow-[0_20px_36px_-24px_rgba(45,34,28,0.82)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#1f1712] disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-55"
                >
                  {saving ? "保存中..." : isEdit ? "変更を保存する" : "記事を作成する"}
                </button>

                <Link
                  href="/admin/posts"
                  className="flex w-full items-center justify-center rounded-full border border-[#d8c6b8] px-5 py-3 text-sm font-semibold text-[#5f4d40] transition-colors hover:border-[#b99679] hover:text-[#241a13]"
                >
                  キャンセル
                </Link>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </form>
  );
}
