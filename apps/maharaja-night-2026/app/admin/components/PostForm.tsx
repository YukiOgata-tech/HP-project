"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { TiptapEditor } from "@client-sites/components/cms";
import type { Post } from "@client-sites/lib/cms/types";
import type { JSONContent } from "@client-sites/lib/cms/types";
import { uploadImageToStorage } from "@client-sites/lib/cms/client";
import { createPostAction, updatePostAction } from "../actions/posts";

const SITE_ID = process.env.NEXT_PUBLIC_SITE_ID ?? "maharaja-night-2026";

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

      router.push("/admin/news");
      router.refresh();
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="min-w-0 max-w-full space-y-2 sm:space-y-6">
      <div className="grid min-w-0 max-w-full grid-cols-1 gap-2 sm:gap-6 xl:grid-cols-[minmax(0,1.55fr)_minmax(320px,0.85fr)]">
        <section className="min-w-0 max-w-full space-y-4 sm:space-y-6">
          <div className="min-w-0 max-w-full overflow-hidden rounded-2xl border border-[#c8aa91] bg-white/95 p-3 shadow-[0_18px_42px_-34px_rgba(45,34,28,0.45)] sm:rounded-[28px] sm:p-6 sm:shadow-[0_24px_60px_-40px_rgba(45,34,28,0.45)]">
            <div className="space-y-4 sm:space-y-6">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#725037] sm:text-xs">
                  Basic Info
                </p>
                <h2 className="mt-1 text-base font-semibold text-[#241a13] sm:mt-2 sm:text-xl">記事の基本情報</h2>
              </div>

              <div className="grid min-w-0 grid-cols-1 gap-1 sm:gap-4 md:grid-cols-2">
                <div className="space-y-0.5 sm:space-y-2">
                  <label className="block text-sm font-semibold text-[#2f241d]">
                    タイトル <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    required
                    className="h-9 sm:h-11 min-w-0 w-full rounded-xl border border-[#b89b84] bg-white px-3 text-sm font-medium text-[#1d1712] outline-none transition-colors placeholder:text-[#7d6d61] focus:border-[#8c694d] focus:bg-white focus:ring-2 focus:ring-[#b99679]/25 sm:rounded-2xl sm:px-4"
                    placeholder="記事タイトル"
                  />
                </div>

                <div className="space-y-0.5 sm:space-y-2">
                  <label className="block text-sm font-semibold text-[#2f241d]">
                    スラッグ <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    required
                    pattern="[a-z0-9\-]+"
                    title="半角英小文字・数字・ハイフンのみ"
                    className="h-9 sm:h-11 min-w-0 w-full rounded-xl border border-[#b89b84] bg-white px-3 font-mono text-sm font-medium text-[#1d1712] outline-none transition-colors placeholder:text-[#7d6d61] focus:border-[#8c694d] focus:bg-white focus:ring-2 focus:ring-[#b99679]/25 sm:rounded-2xl sm:px-4"
                    placeholder="my-post-slug"
                  />
                  <p className="text-xs font-medium text-[#67574b]">
                    URL に使われます。半角英小文字・数字・ハイフンで設定してください。
                  </p>
                </div>
              </div>

              <div className="space-y-0.5 sm:space-y-2">
                <label className="block text-sm font-semibold text-[#2f241d]">
                  抜粋
                </label>
                <textarea
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  rows={3}
                  className="min-w-0 w-full resize-none rounded-xl border border-[#b89b84] bg-white px-3 py-1.5 text-sm font-medium text-[#1d1712] outline-none transition-colors placeholder:text-[#7d6d61] focus:border-[#8c694d] focus:bg-white focus:ring-2 focus:ring-[#b99679]/25 sm:rounded-2xl sm:px-4 sm:py-3"
                  placeholder="記事の概要。一覧や OGP に使われます。"
                />
              </div>
            </div>
          </div>

          <div className="min-w-0 max-w-full overflow-hidden rounded-2xl border border-[#c8aa91] bg-white/95 p-3 shadow-[0_18px_42px_-34px_rgba(45,34,28,0.45)] sm:rounded-[28px] sm:p-6 sm:shadow-[0_24px_60px_-40px_rgba(45,34,28,0.45)]">
            <div className="space-y-3 sm:space-y-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#725037] sm:text-xs">
                  Content
                </p>
                <h2 className="mt-1 text-base font-semibold text-[#241a13] sm:mt-2 sm:text-xl">本文エディタ</h2>
              </div>
              <div className="min-w-0 max-w-full overflow-hidden rounded-xl border border-[#aa8b73] bg-white sm:rounded-[24px]">
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

        <aside className="min-w-0 max-w-full space-y-4 sm:space-y-6">
          <div className="min-w-0 max-w-full overflow-hidden rounded-2xl border border-[#c8aa91] bg-white/95 p-3 shadow-[0_18px_42px_-34px_rgba(45,34,28,0.45)] sm:rounded-[28px] sm:p-6 sm:shadow-[0_24px_60px_-40px_rgba(45,34,28,0.45)]">
            <div className="space-y-2 sm:space-y-5">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#725037] sm:text-xs">
                  Publish
                </p>
                <h2 className="mt-1 text-base font-semibold text-[#241a13] sm:mt-2 sm:text-xl">公開設定</h2>
              </div>

              <div className="rounded-xl border border-[#b89b84] bg-[#fffdf9] px-3 py-2 sm:rounded-[22px] sm:p-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-[#241a13]">ステータス</p>
                    <p className="mt-1 text-xs font-medium leading-5 text-[#5f4e43]">
                      {isPublished
                        ? "公開ページに反映される状態です。"
                        : "下書き保存され、サイトに公開されません。"}
                    </p>
                  </div>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as "draft" | "published")}
                    className="rounded-full border border-[#9f8069] bg-white px-4 py-1 sm:py-2 text-sm font-semibold text-[#1d1712] outline-none transition-colors focus:border-[#8c694d] focus:ring-2 focus:ring-[#b99679]/25"
                  >
                    <option value="draft">下書き</option>
                    <option value="published">公開</option>
                  </select>
                </div>
              </div>

              <div className="space-y-0.5 sm:space-y-2">
                <label className="block text-sm font-semibold text-[#2f241d]">
                  カバー画像 URL
                </label>
                <input
                  type="url"
                  value={coverImageUrl}
                  onChange={(e) => setCoverImageUrl(e.target.value)}
                    className="h-9 sm:h-11 min-w-0 w-full rounded-xl border border-[#b89b84] bg-white px-3 text-sm font-medium text-[#1d1712] outline-none transition-colors placeholder:text-[#7d6d61] focus:border-[#8c694d] focus:bg-white focus:ring-2 focus:ring-[#b99679]/25 sm:rounded-2xl sm:px-4"
                  placeholder="https://..."
                />
              </div>

              <div className="space-y-0.5 sm:space-y-2">
                <label className="block text-sm font-semibold text-[#2f241d]">
                  タグ（カンマ区切り）
                </label>
                <input
                  type="text"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  className="h-9 sm:h-11 min-w-0 w-full rounded-xl border border-[#b89b84] bg-white px-3 text-sm font-medium text-[#1d1712] outline-none transition-colors placeholder:text-[#7d6d61] focus:border-[#8c694d] focus:bg-white focus:ring-2 focus:ring-[#b99679]/25 sm:rounded-2xl sm:px-4"
                  placeholder="お知らせ, ブログ"
                />
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-[#b89b84] bg-[#fffdf9] px-3 py-1 text-xs font-semibold text-[#4a382c]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {coverImageUrl && (
                <div className="space-y-3 rounded-xl border border-[#b89b84] bg-[#fffdf9] p-3 sm:rounded-[22px] sm:p-4">
                  <p className="text-sm font-semibold text-[#241a13]">カバー画像プレビュー</p>
                  <div className="overflow-hidden rounded-2xl border border-[#b89b84] bg-white">
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

          <div className="min-w-0 max-w-full overflow-hidden rounded-2xl border border-[#c8aa91] bg-white/95 p-3 shadow-[0_18px_42px_-34px_rgba(45,34,28,0.45)] sm:rounded-[28px] sm:p-6 sm:shadow-[0_24px_60px_-40px_rgba(45,34,28,0.45)]">
            <div className="space-y-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#725037] sm:text-xs">
                  Actions
                </p>
                <h2 className="mt-1 text-base font-semibold text-[#241a13] sm:mt-2 sm:text-xl">保存操作</h2>
              </div>

              {error && (
                <p className="rounded-xl border border-[#f0c6c0] bg-[#fff3f1] px-3 py-2.5 text-xs font-semibold text-[#a73d33] sm:rounded-2xl sm:px-4 sm:py-3 sm:text-sm">
                  {error}
                </p>
              )}

              <div className="space-y-3">
                <button
                  type="submit"
                  disabled={saving}
                  className="h-10 w-full rounded-full bg-[#2d221c] px-4 text-sm font-semibold text-white shadow-[0_20px_36px_-24px_rgba(45,34,28,0.82)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#1f1712] disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-55 sm:h-auto sm:px-5 sm:py-3"
                >
                  {saving ? "保存中..." : isEdit ? "変更を保存する" : "記事を作成する"}
                </button>

                <Link
                  href="/admin/news"
                  className="flex h-10 w-full items-center justify-center rounded-full border border-[#9f8069] px-4 text-sm font-semibold text-[#3b2d24] transition-colors hover:border-[#725037] hover:text-[#1d1712] sm:h-auto sm:px-5 sm:py-3"
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
