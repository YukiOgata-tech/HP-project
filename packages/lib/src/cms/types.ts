import type { JSONContent } from "@tiptap/core";

export type { JSONContent };

export type Role = "superAdmin" | "siteAdmin" | "editor" | "viewer";

export type PostStatus = "draft" | "published";

export interface Site {
  id: string;
  name: string;
  domain: string;
  createdAt: string;
  updatedAt: string;
}

export interface Post {
  id: string;
  siteId: string;
  title: string;
  slug: string;
  excerpt: string;
  content: JSONContent;
  contentHtml: string;
  status: PostStatus;
  coverImageUrl: string;
  tags: string[];
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
}

export type PostCreateInput = {
  title: string;
  slug: string;
  excerpt: string;
  content: JSONContent;
  status: PostStatus;
  coverImageUrl: string;
  tags: string[];
  publishedAt: string | null;
  createdBy: string;
  updatedBy: string;
};

export type PostUpdateInput = Partial<{
  title: string;
  slug: string;
  excerpt: string;
  content: JSONContent;
  status: PostStatus;
  coverImageUrl: string;
  tags: string[];
  publishedAt: string | null;
  updatedBy: string;
}>;

export interface CmsUser {
  uid: string;
  email: string;
  displayName: string;
  role: Role;
  siteIds: string[];
  createdAt: string;
  updatedAt: string;
}
