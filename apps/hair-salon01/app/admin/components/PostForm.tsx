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

          {/* 基本情報 */}
          <div className="border border-[var(--border)] bg-[var(--card)] p-6">
            <div className="space-y-6">
              <div>
                <p className="label-en text-[var(--fg-subtle)]">Basic Info</p>
                <h2 className="mt-2 font-serif text-xl font-bold text-[var(--fg)]">記事の基本情報</h2>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-widest text-[var(--fg-subtle)]">
                    タイトル <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    required
                    className="w-full border border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-sm text-[var(--fg)] outline-none transition-colors placeholder:text-[var(--fg-subtle)] focus:border-[var(--fg)]"
                    placeholder="記事タイトル"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-widest text-[var(--fg-subtle)]">
                    スラッグ <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    required
                    pattern="[a-z0-9\-]+"
                    title="半角英小文字・数字・ハイフンのみ"
                    className="w-full border border-[var(--border)] bg-[var(--bg)] px-4 py-3 font-mono text-sm text-[var(--fg)] outline-none transition-colors placeholder:text-[var(--fg-subtle)] focus:border-[var(--fg)]"
                    placeholder="my-post-slug"
                  />
                  <p className="text-xs text-[var(--fg-subtle)]">
                    URL に使われます。半角英小文字・数字・ハイフンで設定してください。
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-widest text-[var(--fg-subtle)]">
                  抜粋
                </label>
                <textarea
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  rows={4}
                  className="w-full resize-none border border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-sm text-[var(--fg)] outline-none transition-colors placeholder:text-[var(--fg-subtle)] focus:border-[var(--fg)]"
                  placeholder="記事の概要。一覧や OGP に使われます。"
                />
              </div>
            </div>
          </div>

          {/* 本文エディタ */}
          <div className="border border-[var(--border)] bg-[var(--card)] p-6">
            <div className="space-y-4">
              <div>
                <p className="label-en text-[var(--fg-subtle)]">Content</p>
                <h2 className="mt-2 font-serif text-xl font-bold text-[var(--fg)]">本文エディタ</h2>
              </div>
              <div className="overflow-hidden border border-[var(--border)] bg-[var(--bg)]">
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

          {/* 公開設定 */}
          <div className="border border-[var(--border)] bg-[var(--card)] p-6">
            <div className="space-y-5">
              <div>
                <p className="label-en text-[var(--fg-subtle)]">Publish</p>
                <h2 className="mt-2 font-serif text-xl font-bold text-[var(--fg)]">公開設定</h2>
              </div>

              <div className="border border-[var(--border)] bg-[var(--card-off)] p-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-bold text-[var(--fg)]">ステータス</p>
                    <p className="mt-1 text-xs leading-6 text-[var(--fg-subtle)]">
                      {isPublished
                        ? "公開ページに反映される状態です。"
                        : "下書きのまま保存され、サイトには表示されません。"}
                    </p>
                  </div>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as "draft" | "published")}
                    className="border border-[var(--border)] bg-[var(--bg)] px-3 py-2 text-xs font-bold uppercase tracking-widest text-[var(--fg)] outline-none transition-colors focus:border-[var(--fg)]"
                  >
                    <option value="draft">下書き</option>
                    <option value="published">公開</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-widest text-[var(--fg-subtle)]">
                  カバー画像 URL
                </label>
                <input
                  type="url"
                  value={coverImageUrl}
                  onChange={(e) => setCoverImageUrl(e.target.value)}
                  className="w-full border border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-sm text-[var(--fg)] outline-none transition-colors placeholder:text-[var(--fg-subtle)] focus:border-[var(--fg)]"
                  placeholder="https://..."
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-widest text-[var(--fg-subtle)]">
                  タグ（カンマ区切り）
                </label>
                <input
                  type="text"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  className="w-full border border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-sm text-[var(--fg)] outline-none transition-colors placeholder:text-[var(--fg-subtle)] focus:border-[var(--fg)]"
                  placeholder="お知らせ, ブログ"
                />
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="border border-[var(--border)] px-3 py-1 text-xs font-bold uppercase tracking-wider text-[var(--fg-subtle)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {coverImageUrl && (
                <div className="space-y-3 border border-[var(--border)] bg-[var(--card-off)] p-4">
                  <p className="text-xs font-bold uppercase tracking-widest text-[var(--fg-subtle)]">カバー画像プレビュー</p>
                  <div className="overflow-hidden border border-[var(--border)]">
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

          {/* 保存操作 */}
          <div className="border border-[var(--border)] bg-[var(--card)] p-6">
            <div className="space-y-4">
              <div>
                <p className="label-en text-[var(--fg-subtle)]">Actions</p>
                <h2 className="mt-2 font-serif text-xl font-bold text-[var(--fg)]">保存操作</h2>
              </div>

              {error && (
                <p className="border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-700">
                  {error}
                </p>
              )}

              <div className="space-y-3">
                <button
                  type="submit"
                  disabled={saving}
                  className="w-full bg-[var(--cta)] px-5 py-3.5 text-xs font-bold uppercase tracking-widest text-[var(--cta-text)] transition-opacity hover:opacity-75 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {saving ? "保存中..." : isEdit ? "変更を保存する" : "記事を作成する"}
                </button>

                <Link
                  href="/admin/posts"
                  className="flex w-full items-center justify-center border border-[var(--border)] px-5 py-3.5 text-xs font-bold uppercase tracking-widest text-[var(--fg-subtle)] transition-colors hover:border-[var(--fg)] hover:text-[var(--fg)]"
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
