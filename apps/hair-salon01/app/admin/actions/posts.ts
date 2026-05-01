"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  createPost,
  updatePost,
  deletePost,
  slugExists,
  canEdit,
} from "@client-sites/lib/cms";
import { getSessionUser } from "./session";
import type { JSONContent } from "@client-sites/lib/cms/types";

const SITE_ID = process.env.SITE_ID!;

type ActionResult<T = undefined> =
  | { ok: true; data?: T }
  | { ok: false; error: string };

async function requireEditor() {
  const user = await getSessionUser();
  if (!user) throw new Error("Unauthorized");
  if (!canEdit(user, SITE_ID)) throw new Error("Access denied");
  return user;
}

function parseContent(content: string): JSONContent {
  try {
    return JSON.parse(content) as JSONContent;
  } catch {
    throw new Error("本文データの形式が不正です");
  }
}

export async function createPostAction(formData: {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  status: "draft" | "published";
  coverImageUrl: string;
  tags: string[];
}): Promise<ActionResult<{ id: string }>> {
  try {
    const user = await requireEditor();
    const content = parseContent(formData.content);

    if (await slugExists(SITE_ID, formData.slug)) {
      return { ok: false, error: "このスラッグはすでに使われています" };
    }

    const post = await createPost(SITE_ID, {
      ...formData,
      content,
      publishedAt:
        formData.status === "published" ? new Date().toISOString() : null,
      createdBy: user.uid,
      updatedBy: user.uid,
    });

    revalidatePath("/admin/posts");
    revalidatePath("/news");
    return { ok: true, data: { id: post.id } };
  } catch (e) {
    console.error("createPostAction failed", e);
    return { ok: false, error: (e as Error).message };
  }
}

export async function updatePostAction(
  postId: string,
  formData: {
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    status: "draft" | "published";
    coverImageUrl: string;
    tags: string[];
  }
): Promise<ActionResult> {
  try {
    const user = await requireEditor();
    const content = parseContent(formData.content);

    if (await slugExists(SITE_ID, formData.slug, postId)) {
      return { ok: false, error: "このスラッグはすでに使われています" };
    }

    await updatePost(SITE_ID, postId, {
      ...formData,
      content,
      ...(formData.status === "published" && {
        publishedAt: new Date().toISOString(),
      }),
      updatedBy: user.uid,
    });

    revalidatePath("/admin/posts");
    revalidatePath(`/admin/posts/${postId}/edit`);
    revalidatePath("/news");
    revalidatePath(`/news/${formData.slug}`);
    return { ok: true };
  } catch (e) {
    console.error("updatePostAction failed", e);
    return { ok: false, error: (e as Error).message };
  }
}

export async function deletePostAction(postId: string): Promise<ActionResult> {
  try {
    await requireEditor();
    await deletePost(SITE_ID, postId);
    revalidatePath("/admin/posts");
    revalidatePath("/news");
    return { ok: true };
  } catch (e) {
    console.error("deletePostAction failed", e);
    return { ok: false, error: (e as Error).message };
  }
}

export async function deletePostAndRedirect(postId: string): Promise<void> {
  await requireEditor();
  await deletePost(SITE_ID, postId);
  revalidatePath("/admin/posts");
  revalidatePath("/news");
  redirect("/admin/posts");
}
