import "server-only";
import { Timestamp } from "firebase-admin/firestore";
import { getAdminDb } from "./firebase-admin";
import { tiptapJsonToHtml } from "./convert";
import type { Post, PostCreateInput, PostUpdateInput } from "./types";
import type { JSONContent } from "@tiptap/core";

interface PostDocument {
  title: string;
  slug: string;
  excerpt: string;
  content: JSONContent;
  contentHtml: string;
  status: "draft" | "published";
  coverImageUrl: string;
  tags: string[];
  publishedAt: Timestamp | null;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  createdBy: string;
  updatedBy: string;
}

function serializePost(id: string, siteId: string, doc: PostDocument): Post {
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
    tags: doc.tags,
    publishedAt: doc.publishedAt?.toDate().toISOString() ?? null,
    createdAt: doc.createdAt.toDate().toISOString(),
    updatedAt: doc.updatedAt.toDate().toISOString(),
    createdBy: doc.createdBy,
    updatedBy: doc.updatedBy,
  };
}

function postsCol(siteId: string) {
  return getAdminDb().collection("sites").doc(siteId).collection("posts");
}

export async function createPost(
  siteId: string,
  input: PostCreateInput
): Promise<Post> {
  const contentHtml = tiptapJsonToHtml(input.content);
  const now = Timestamp.now();
  const ref = postsCol(siteId).doc();

  const doc: PostDocument = {
    title: input.title,
    slug: input.slug,
    excerpt: input.excerpt,
    content: input.content,
    contentHtml,
    status: input.status,
    coverImageUrl: input.coverImageUrl,
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
  return serializePost(ref.id, siteId, doc);
}

export async function updatePost(
  siteId: string,
  postId: string,
  input: PostUpdateInput & { updatedBy: string }
): Promise<Post> {
  const ref = postsCol(siteId).doc(postId);
  const snapshot = await ref.get();
  if (!snapshot.exists) throw new Error(`Post not found: ${postId}`);

  const existing = snapshot.data() as PostDocument;
  const contentHtml = input.content
    ? tiptapJsonToHtml(input.content)
    : existing.contentHtml;

  const updates: Partial<PostDocument> & { updatedAt: Timestamp } = {
    ...(input.title !== undefined && { title: input.title }),
    ...(input.slug !== undefined && { slug: input.slug }),
    ...(input.excerpt !== undefined && { excerpt: input.excerpt }),
    ...(input.content !== undefined && { content: input.content }),
    ...(input.status !== undefined && { status: input.status }),
    ...(input.coverImageUrl !== undefined && {
      coverImageUrl: input.coverImageUrl,
    }),
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
  const updated = { ...existing, ...updates } as PostDocument;
  return serializePost(postId, siteId, updated);
}

export async function deletePost(siteId: string, postId: string): Promise<void> {
  await postsCol(siteId).doc(postId).delete();
}

export async function getPost(
  siteId: string,
  postId: string
): Promise<Post | null> {
  const snapshot = await postsCol(siteId).doc(postId).get();
  if (!snapshot.exists) return null;
  return serializePost(snapshot.id, siteId, snapshot.data() as PostDocument);
}

export async function getPostBySlug(
  siteId: string,
  slug: string
): Promise<Post | null> {
  const snapshot = await postsCol(siteId)
    .where("slug", "==", slug)
    .where("status", "==", "published")
    .limit(1)
    .get();

  if (snapshot.empty) return null;
  const doc = snapshot.docs[0];
  return serializePost(doc.id, siteId, doc.data() as PostDocument);
}

export async function getPublishedPosts(
  siteId: string,
  limit = 20
): Promise<Post[]> {
  const snapshot = await postsCol(siteId)
    .where("status", "==", "published")
    .orderBy("publishedAt", "desc")
    .limit(limit)
    .get();

  return snapshot.docs.map((doc) =>
    serializePost(doc.id, siteId, doc.data() as PostDocument)
  );
}

export async function getAllPosts(siteId: string): Promise<Post[]> {
  const snapshot = await postsCol(siteId)
    .orderBy("updatedAt", "desc")
    .get();

  return snapshot.docs.map((doc) =>
    serializePost(doc.id, siteId, doc.data() as PostDocument)
  );
}

export async function slugExists(
  siteId: string,
  slug: string,
  excludePostId?: string
): Promise<boolean> {
  const snapshot = await postsCol(siteId)
    .where("slug", "==", slug)
    .limit(2)
    .get();

  if (snapshot.empty) return false;
  if (!excludePostId) return true;
  return snapshot.docs.some((doc) => doc.id !== excludePostId);
}
