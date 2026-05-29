"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  createBlog,
  updateBlog,
  deleteBlog,
  blogSlugExists,
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

export async function createBlogAction(formData: {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  status: "draft" | "published";
  coverImageUrl: string;
  category: string;
  tags: string[];
}): Promise<ActionResult<{ id: string }>> {
  try {
    const user = await requireEditor();
    const content = parseContent(formData.content);

    if (await blogSlugExists(SITE_ID, formData.slug)) {
      return { ok: false, error: "このスラッグはすでに使われています" };
    }

    const blog = await createBlog(SITE_ID, {
      ...formData,
      content,
      publishedAt:
        formData.status === "published" ? new Date().toISOString() : null,
      createdBy: user.uid,
      updatedBy: user.uid,
    });

    revalidatePath("/admin/blogs");
    revalidatePath("/blog");
    return { ok: true, data: { id: blog.id } };
  } catch (e) {
    console.error("createBlogAction failed", e);
    return { ok: false, error: (e as Error).message };
  }
}

export async function updateBlogAction(
  blogId: string,
  formData: {
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    status: "draft" | "published";
    coverImageUrl: string;
    category: string;
    tags: string[];
  }
): Promise<ActionResult> {
  try {
    const user = await requireEditor();
    const content = parseContent(formData.content);

    if (await blogSlugExists(SITE_ID, formData.slug, blogId)) {
      return { ok: false, error: "このスラッグはすでに使われています" };
    }

    await updateBlog(SITE_ID, blogId, {
      ...formData,
      content,
      ...(formData.status === "published" && {
        publishedAt: new Date().toISOString(),
      }),
      updatedBy: user.uid,
    });

    revalidatePath("/admin/blogs");
    revalidatePath(`/admin/blogs/${blogId}/edit`);
    revalidatePath("/blog");
    revalidatePath(`/blog/${formData.slug}`);
    return { ok: true };
  } catch (e) {
    console.error("updateBlogAction failed", e);
    return { ok: false, error: (e as Error).message };
  }
}

export async function deleteBlogAction(blogId: string): Promise<ActionResult> {
  try {
    await requireEditor();
    await deleteBlog(SITE_ID, blogId);
    revalidatePath("/admin/blogs");
    revalidatePath("/blog");
    return { ok: true };
  } catch (e) {
    console.error("deleteBlogAction failed", e);
    return { ok: false, error: (e as Error).message };
  }
}

export async function deleteBlogAndRedirect(blogId: string): Promise<void> {
  await requireEditor();
  await deleteBlog(SITE_ID, blogId);
  revalidatePath("/admin/blogs");
  revalidatePath("/blog");
  redirect("/admin/blogs");
}
