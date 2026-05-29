import type { MetadataRoute } from "next";
import { getPublishedPosts, getPublishedBlogs } from "@client-sites/lib/cms";

const SITE_ID = process.env.SITE_ID!;
const BASE    = (process.env.NEXT_PUBLIC_SITE_URL ?? "").replace(/\/$/, "");

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, blogs] = await Promise.all([
    getPublishedPosts(SITE_ID),
    getPublishedBlogs(SITE_ID),
  ]);

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${BASE}/`,      lastModified: new Date(), changeFrequency: "weekly",  priority: 1.0 },
    { url: `${BASE}/menu`,  lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/salon`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/news`,  lastModified: new Date(), changeFrequency: "weekly",  priority: 0.8 },
    { url: `${BASE}/blog`,  lastModified: new Date(), changeFrequency: "weekly",  priority: 0.8 },
    { url: `${BASE}/faq`,   lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
  ];

  const postPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url:             `${BASE}/news/${post.slug}`,
    lastModified:    new Date(post.updatedAt),
    changeFrequency: "monthly",
    priority:        0.6,
  }));

  const blogPages: MetadataRoute.Sitemap = blogs.map((blog) => ({
    url:             `${BASE}/blog/${blog.slug}`,
    lastModified:    new Date(blog.updatedAt),
    changeFrequency: "weekly",
    priority:        0.7,
  }));

  return [...staticPages, ...postPages, ...blogPages];
}
