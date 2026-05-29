import "server-only";
import { Timestamp } from "firebase-admin/firestore";
import { getAdminDb } from "./firebase-admin";
import { tiptapJsonToHtml } from "./convert";
import type { Blog, BlogCreateInput, BlogUpdateInput } from "./types";
import type { JSONContent } from "@tiptap/core";

interface BlogDocument {
  title: string;
  slug: string;
  excerpt: string;
  content: JSONContent;
  contentHtml: string;
  status: "draft" | "published";
  coverImageUrl: string;
  category: string;
  tags: string[];
  publishedAt: Timestamp | null;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  createdBy: string;
  updatedBy: string;
}

function serializeBlog(id: string, siteId: string, doc: BlogDocument): Blog {
  return {
    id,
    siteId,
    title: doc.title,
    slug: doc.slug,
    excerpt: doc.excerpt,
    content: doc.content,
    contentHtml: doc.contentHtml,
    status: doc.status,
    coverImageUrl: doc.coverImageUrl,
    category: doc.category,
    tags: doc.tags,
    publishedAt: doc.publishedAt?.toDate().toISOString() ?? null,
    createdAt: doc.createdAt.toDate().toISOString(),
    updatedAt: doc.updatedAt.toDate().toISOString(),
    createdBy: doc.createdBy,
    updatedBy: doc.updatedBy,
  };
}

function blogsCol(siteId: string) {
  return getAdminDb().collection("sites").doc(siteId).collection("blogs");
}

export async function createBlog(
  siteId: string,
  input: BlogCreateInput
): Promise<Blog> {
  const contentHtml = tiptapJsonToHtml(input.content);
  const now = Timestamp.now();
  const ref = blogsCol(siteId).doc();

  const doc: BlogDocument = {
    title: input.title,
    slug: input.slug,
    excerpt: input.excerpt,
    content: input.content,
    contentHtml,
    status: input.status,
    coverImageUrl: input.coverImageUrl,
    category: input.category,
    tags: input.tags,
    publishedAt: input.publishedAt
      ? Timestamp.fromDate(new Date(input.publishedAt))
      : null,
    createdAt: now,
    updatedAt: now,
    createdBy: input.createdBy,
    updatedBy: input.updatedBy,
  };

  await ref.set(doc);
  return serializeBlog(ref.id, siteId, doc);
}

export async function updateBlog(
  siteId: string,
  blogId: string,
  input: BlogUpdateInput & { updatedBy: string }
): Promise<Blog> {
  const ref = blogsCol(siteId).doc(blogId);
  const snapshot = await ref.get();
  if (!snapshot.exists) throw new Error(`Blog not found: ${blogId}`);

  const existing = snapshot.data() as BlogDocument;
  const contentHtml = input.content
    ? tiptapJsonToHtml(input.content)
    : existing.contentHtml;

  const updates: Partial<BlogDocument> & { updatedAt: Timestamp } = {
    ...(input.title !== undefined && { title: input.title }),
    ...(input.slug !== undefined && { slug: input.slug }),
    ...(input.excerpt !== undefined && { excerpt: input.excerpt }),
    ...(input.content !== undefined && { content: input.content }),
    ...(input.status !== undefined && { status: input.status }),
    ...(input.coverImageUrl !== undefined && { coverImageUrl: input.coverImageUrl }),
    ...(input.category !== undefined && { category: input.category }),
    ...(input.tags !== undefined && { tags: input.tags }),
    ...(input.publishedAt !== undefined && {
      publishedAt: input.publishedAt
        ? Timestamp.fromDate(new Date(input.publishedAt))
        : null,
    }),
    contentHtml,
    updatedBy: input.updatedBy,
    updatedAt: Timestamp.now(),
  };

  await ref.update(updates);
  const updated = { ...existing, ...updates } as BlogDocument;
  return serializeBlog(blogId, siteId, updated);
}

export async function deleteBlog(siteId: string, blogId: string): Promise<void> {
  await blogsCol(siteId).doc(blogId).delete();
}

export async function getBlog(
  siteId: string,
  blogId: string
): Promise<Blog | null> {
  const snapshot = await blogsCol(siteId).doc(blogId).get();
  if (!snapshot.exists) return null;
  return serializeBlog(snapshot.id, siteId, snapshot.data() as BlogDocument);
}

export async function getBlogBySlug(
  siteId: string,
  slug: string
): Promise<Blog | null> {
  const snapshot = await blogsCol(siteId)
    .where("slug", "==", slug)
    .where("status", "==", "published")
    .limit(1)
    .get();

  if (snapshot.empty) return null;
  const doc = snapshot.docs[0];
  return serializeBlog(doc.id, siteId, doc.data() as BlogDocument);
}

export async function getPublishedBlogs(
  siteId: string,
  limit = 20
): Promise<Blog[]> {
  const snapshot = await blogsCol(siteId)
    .where("status", "==", "published")
    .orderBy("publishedAt", "desc")
    .limit(limit)
    .get();

  return snapshot.docs.map((doc) =>
    serializeBlog(doc.id, siteId, doc.data() as BlogDocument)
  );
}

export async function getPublishedBlogsByCategory(
  siteId: string,
  category: string,
  limit = 20
): Promise<Blog[]> {
  const snapshot = await blogsCol(siteId)
    .where("status", "==", "published")
    .where("category", "==", category)
    .orderBy("publishedAt", "desc")
    .limit(limit)
    .get();

  return snapshot.docs.map((doc) =>
    serializeBlog(doc.id, siteId, doc.data() as BlogDocument)
  );
}

export async function getAllBlogs(siteId: string): Promise<Blog[]> {
  const snapshot = await blogsCol(siteId)
    .orderBy("updatedAt", "desc")
    .get();

  return snapshot.docs.map((doc) =>
    serializeBlog(doc.id, siteId, doc.data() as BlogDocument)
  );
}

export async function blogSlugExists(
  siteId: string,
  slug: string,
  excludeBlogId?: string
): Promise<boolean> {
  const snapshot = await blogsCol(siteId)
    .where("slug", "==", slug)
    .limit(2)
    .get();

  if (snapshot.empty) return false;
  if (!excludeBlogId) return true;
  return snapshot.docs.some((doc) => doc.id !== excludeBlogId);
}
