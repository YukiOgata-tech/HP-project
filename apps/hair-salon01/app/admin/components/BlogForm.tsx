"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { TiptapEditor } from "@client-sites/components/cms";
import type { Blog } from "@client-sites/lib/cms/types";
import type { JSONContent } from "@client-sites/lib/cms/types";
import { uploadImageToStorage } from "@client-sites/lib/cms/client";
import { createBlogAction, updateBlogAction } from "../actions/blogs";
import { ConfirmModal } from "./ConfirmModal";

const SITE_ID = process.env.NEXT_PUBLIC_SITE_ID ?? "hair-salon01";

const CATEGORIES = [
  "スタイル",
  "ヘアケア",
  "トレンド",
  "サロン情報",
  "スタッフ日記",
  "その他",
];

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[　-鿿！-￮]/g, "")
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

interface BlogFormProps {
  blog?: Blog;
}

export function BlogForm({ blog }: BlogFormProps) {
  const router = useRouter();
  const isEdit = !!blog;

  const [title, setTitle] = useState(blog?.title ?? "");
  const [slug, setSlug] = useState(blog?.slug ?? "");
  const [excerpt, setExcerpt] = useState(blog?.excerpt ?? "");
  const [coverImageUrl, setCoverImageUrl] = useState(blog?.coverImageUrl ?? "");
  const [category, setCategory] = useState(blog?.category ?? CATEGORIES[0]);
  const [tagsInput, setTagsInput] = useState((blog?.tags ?? []).join(", "));
  const [status, setStatus] = useState<"draft" | "published">(
    blog?.status ?? "draft"
  );
  const [content, setContent] = useState<JSONContent>(
    blog?.content ?? { type: "doc", content: [] }
  );
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

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

  async function doSave() {
    setConfirmOpen(false);
    setError("");
    setSaving(true);

    const formData = {
      title,
      slug,
      excerpt,
      content: JSON.stringify(content),
      status,
      coverImageUrl,
      category,
      tags,
    };

    try {
      const result = isEdit
        ? await updateBlogAction(blog.id, formData)
        : await createBlogAction(formData);

      if (!result.ok) {
        setError(result.error);
        return;
      }

      router.push("/admin/blogs");
      router.refresh();
    } finally {
      setSaving(false);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setConfirmOpen(true);
  }

  const confirmTitle = isEdit
    ? isPublished ? "変更を公開しますか？" : "下書きとして保存しますか？"
    : isPublished ? "記事を公開しますか？" : "下書きとして作成しますか？";

  const confirmDescription = isPublished
    ? "保存後、すぐにサイトに反映されます。"
    : "下書きはサイトには表示されません。後から公開できます。";

  return (
    <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
      <div className="grid gap-4 md:gap-6 xl:grid-cols-[minmax(0,1.55fr)_minmax(300px,0.85fr)]">
        <section className="space-y-4 md:space-y-6">

          {/* 基本情報 */}
          <div className="border border-(--border) bg-(--card) p-3 md:p-6">
            <div className="space-y-4 md:space-y-6">
              <div>
                <p className="label-en text-[10px] text-(--fg-subtle) md:text-xs">Basic Info</p>
                <h2 className="mt-1 text-base font-bold text-(--fg) md:mt-2 md:font-serif md:text-xl">記事の基本情報</h2>
              </div>

              <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
                <div className="space-y-1.5 md:space-y-2">
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-(--fg-subtle) md:text-xs">
                    タイトル <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    required
                    className="w-full border border-(--border) bg-(--bg) px-3 py-2.5 text-sm text-(--fg) outline-none transition-colors placeholder:text-(--fg-subtle) focus:border-(--fg) md:px-4 md:py-3"
                    placeholder="記事タイトル"
                  />
                </div>

                <div className="space-y-1.5 md:space-y-2">
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-(--fg-subtle) md:text-xs">
                    スラッグ <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    required
                    pattern="[a-z0-9\-]+"
                    title="半角英小文字・数字・ハイフンのみ"
                    className="w-full border border-(--border) bg-(--bg) px-3 py-2.5 font-mono text-sm text-(--fg) outline-none transition-colors placeholder:text-(--fg-subtle) focus:border-(--fg) md:px-4 md:py-3"
                    placeholder="my-blog-slug"
                  />
                  <p className="text-[10px] text-(--fg-subtle) md:text-xs">
                    半角英小文字・数字・ハイフンで設定してください。
                  </p>
                </div>
              </div>

              <div className="space-y-1.5 md:space-y-2">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-(--fg-subtle) md:text-xs">
                  抜粋
                </label>
                <textarea
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  rows={3}
                  className="w-full resize-none border border-(--border) bg-(--bg) px-3 py-2.5 text-sm text-(--fg) outline-none transition-colors placeholder:text-(--fg-subtle) focus:border-(--fg) md:px-4 md:py-3"
                  placeholder="記事の概要。一覧や OGP・検索結果に使われます。"
                />
              </div>
            </div>
          </div>

          {/* 本文エディタ（途中画像挿入対応） */}
          <div className="border border-(--border) bg-(--card) p-3 md:p-6">
            <div className="space-y-3 md:space-y-4">
              <div>
                <p className="label-en text-[10px] text-(--fg-subtle) md:text-xs">Content</p>
                <h2 className="mt-1 text-base font-bold text-(--fg) md:mt-2 md:font-serif md:text-xl">本文エディタ</h2>
                <p className="mt-0.5 text-[10px] text-(--fg-subtle) md:mt-1 md:text-xs">
                  ツールバーの画像アイコンから本文中の任意の位置に画像を挿入できます。
                </p>
              </div>
              <div className="overflow-hidden border border-(--border) bg-(--bg)">
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

        <aside className="space-y-4 md:space-y-6">

          {/* 公開設定 */}
          <div className="border border-(--border) bg-(--card) p-3 md:p-6">
            <div className="space-y-3 md:space-y-5">
              <div>
                <p className="label-en text-[10px] text-(--fg-subtle) md:text-xs">Publish</p>
                <h2 className="mt-1 text-base font-bold text-(--fg) md:mt-2 md:font-serif md:text-xl">公開設定</h2>
              </div>

              <div className="border border-(--border) bg-(--card-off) p-3 md:p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-bold text-(--fg) md:text-sm">ステータス</p>
                    <p className="mt-0.5 hidden text-xs leading-6 text-(--fg-subtle) md:mt-1 md:block">
                      {isPublished ? "公開ページに反映されます。" : "下書きで保存されます。"}
                    </p>
                  </div>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as "draft" | "published")}
                    className="border border-(--border) bg-(--bg) px-2 py-1.5 text-[10px] font-bold uppercase tracking-widest text-(--fg) outline-none transition-colors focus:border-(--fg) md:px-3 md:py-2 md:text-xs"
                  >
                    <option value="draft">下書き</option>
                    <option value="published">公開</option>
                  </select>
                </div>
              </div>

              {/* カテゴリ */}
              <div className="space-y-1.5 md:space-y-2">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-(--fg-subtle) md:text-xs">
                  カテゴリ
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full border border-(--border) bg-(--bg) px-3 py-2.5 text-sm text-(--fg) outline-none transition-colors focus:border-(--fg) md:px-4 md:py-3"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* カバー画像 */}
              <div className="space-y-1.5 md:space-y-2">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-(--fg-subtle) md:text-xs">
                  カバー画像 URL
                </label>
                <input
                  type="url"
                  value={coverImageUrl}
                  onChange={(e) => setCoverImageUrl(e.target.value)}
                  className="w-full border border-(--border) bg-(--bg) px-3 py-2.5 text-sm text-(--fg) outline-none transition-colors placeholder:text-(--fg-subtle) focus:border-(--fg) md:px-4 md:py-3"
                  placeholder="https://..."
                />
                <p className="hidden text-[10px] text-(--fg-subtle) md:block md:text-xs">
                  エディタの画像ボタンでアップロード後、URLを貼り付けてください。
                </p>
              </div>

              {/* タグ */}
              <div className="space-y-1.5 md:space-y-2">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-(--fg-subtle) md:text-xs">
                  タグ（カンマ区切り）
                </label>
                <input
                  type="text"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  className="w-full border border-(--border) bg-(--bg) px-3 py-2.5 text-sm text-(--fg) outline-none transition-colors placeholder:text-(--fg-subtle) focus:border-(--fg) md:px-4 md:py-3"
                  placeholder="ヘアカラー, ボブ"
                />
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1 md:gap-2 md:pt-2">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="border border-(--border) px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-(--fg-subtle) md:px-3 md:py-1 md:text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {coverImageUrl && (
                <div className="space-y-2 border border-(--border) bg-(--card-off) p-3 md:space-y-3 md:p-4">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-(--fg-subtle) md:text-xs">カバー画像プレビュー</p>
                  <div className="overflow-hidden border border-(--border)">
                    <img src={coverImageUrl} alt="cover preview" className="h-32 w-full object-cover md:h-44" />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 保存操作 */}
          <div className="border border-(--border) bg-(--card) p-3 md:p-6">
            <div className="space-y-3 md:space-y-4">
              <div>
                <p className="label-en text-[10px] text-(--fg-subtle) md:text-xs">Actions</p>
                <h2 className="mt-1 text-base font-bold text-(--fg) md:mt-2 md:font-serif md:text-xl">保存操作</h2>
              </div>

              {error && (
                <p className="border border-red-200 bg-red-50 px-3 py-2.5 text-xs text-red-700 md:px-4 md:py-3">
                  {error}
                </p>
              )}

              <div className="space-y-2 md:space-y-3">
                <button
                  type="submit"
                  disabled={saving}
                  className="w-full bg-(--cta) px-4 py-3 text-xs font-bold uppercase tracking-widest text-(--cta-text) transition-opacity hover:opacity-75 disabled:cursor-not-allowed disabled:opacity-40 md:px-5 md:py-3.5"
                >
                  {saving ? "保存中..." : isEdit ? "変更を保存する" : "記事を作成する"}
                </button>

                <Link
                  href="/admin/blogs"
                  className="flex w-full items-center justify-center border border-(--border) px-4 py-3 text-xs font-bold uppercase tracking-widest text-(--fg-subtle) transition-colors hover:border-(--fg) hover:text-(--fg) md:px-5 md:py-3.5"
                >
                  キャンセル
                </Link>
              </div>
            </div>
          </div>
        </aside>
      </div>

      <ConfirmModal
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={doSave}
        title={confirmTitle}
        description={confirmDescription}
        confirmLabel={saving ? "保存中..." : isEdit ? "保存する" : "作成する"}
        variant="primary"
      />
    </form>
  );
}
