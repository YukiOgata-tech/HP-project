import { getPostBySlug } from "@client-sites/lib/cms";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { CalendarDays, ChevronLeft } from "lucide-react";
import { PublicPageFrame } from "@/components/PublicPageFrame";
import { StructuredData } from "@/components/StructuredData";
import { absoluteUrl, defaultOgImage, pageMetadata, siteName } from "@/components/seo";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const siteId = process.env.SITE_ID;
  if (!siteId) return {};

  const post = await getPostBySlug(siteId, slug);
  if (!post) return {};

  const metadata = pageMetadata({
    title: post.title,
    description: post.excerpt || `${siteName} の公式お知らせです。`,
    path: `/news/${post.slug}`,
    image: post.coverImageUrl || defaultOgImage,
    type: "article",
  });

  return {
    ...metadata,
    authors: [{ name: siteName }],
    openGraph: {
      ...metadata.openGraph,
      type: "article",
      publishedTime: post.publishedAt ?? undefined,
      modifiedTime: post.updatedAt ?? undefined,
    },
  };
}

export default async function NewsDetail({ params }: Props) {
  const { slug } = await params;
  const siteId = process.env.SITE_ID;
  if (!siteId) throw new Error("SITE_ID is not defined");

  const post = await getPostBySlug(siteId, slug);
  if (!post) {
    notFound();
  }
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: post.title,
    description: post.excerpt || `${siteName} の公式お知らせです。`,
    url: absoluteUrl(`/news/${post.slug}`),
    image: post.coverImageUrl ? [post.coverImageUrl] : [absoluteUrl(defaultOgImage)],
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: {
      "@type": "Organization",
      name: siteName,
    },
    publisher: {
      "@type": "Organization",
      name: siteName,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl(defaultOgImage),
      },
    },
    mainEntityOfPage: absoluteUrl(`/news/${post.slug}`),
  };

  return (
    <PublicPageFrame>
      <StructuredData data={articleJsonLd} />
      <main className="min-h-screen bg-[#070508] px-3 pb-10 pt-20 text-white sm:px-6 sm:pb-20 sm:pt-36">
        <article className="mx-auto max-w-4xl">
          <Link
            href="/news"
            className="inline-flex h-8 items-center gap-1.5 rounded-full border border-white/15 px-3 text-[12px] font-black uppercase tracking-[0.18em] text-white/58 transition-colors hover:border-[#D4AF37]/45 hover:text-[#F9E596] sm:h-10 sm:gap-2 sm:px-4 sm:text-sm"
          >
            <ChevronLeft className="size-3.5 sm:size-4" />
            News Index
          </Link>

          <header className="mt-5 border-b border-white/10 pb-5 sm:mt-8 sm:pb-8">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <span className="rounded-full bg-[#D4AF37]/10 px-2.5 py-1 text-[12px] font-black uppercase tracking-[0.18em] text-[#D4AF37] sm:px-3 sm:text-[12px] sm:tracking-[0.22em]">
                Official News
              </span>
              <span className="inline-flex items-center gap-1.5 text-[12px] font-bold text-white/45 sm:gap-2 sm:text-sm">
                <CalendarDays className="size-3.5" />
                {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString("ja-JP") : ""}
              </span>
            </div>
            <h1 className="mt-3 text-3xl font-black leading-tight text-gradient-gold sm:mt-5 sm:text-6xl">
              {post.title}
            </h1>
            {post.excerpt ? (
              <p className="mt-3 text-sm font-bold leading-5 text-white/66 sm:mt-5 sm:text-lg sm:leading-8">{post.excerpt}</p>
            ) : null}
            {post.tags?.length ? (
              <div className="mt-3 flex flex-wrap gap-1.5 sm:mt-5 sm:gap-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-white/8 px-2.5 py-1 text-[12px] font-bold text-gray-300 sm:px-3 sm:text-sm">
                    #{tag}
                  </span>
                ))}
              </div>
            ) : null}
          </header>

          {post.coverImageUrl ? (
            <img
              src={post.coverImageUrl}
              alt={post.title}
              className="mt-5 aspect-video w-full rounded-xl border border-white/10 object-cover shadow-[0_0_18px_rgba(212,175,55,0.12)] sm:mt-8 sm:rounded-[1.35rem] sm:shadow-[0_0_28px_rgba(212,175,55,0.18)]"
            />
          ) : null}

          <div className="mt-5 rounded-xl border border-white/10 bg-white/[0.045] p-3 sm:mt-8 sm:rounded-[1.35rem] sm:p-10">
            <div
              className="prose prose-invert max-w-none text-sm text-gray-300 prose-a:font-bold prose-a:text-[#F9E596] prose-strong:text-white sm:text-base [&_blockquote]:border-l-4 [&_blockquote]:border-[#D4AF37] [&_blockquote]:bg-white/[0.045] [&_blockquote]:py-1 [&_blockquote]:pl-4 [&_h1]:mb-5 [&_h1]:mt-10 [&_h1]:border-b [&_h1]:border-[#D4AF37]/35 [&_h1]:pb-3 [&_h1]:text-3xl [&_h1]:font-black [&_h1]:leading-tight [&_h1]:text-white sm:[&_h1]:text-5xl [&_h2]:mb-4 [&_h2]:mt-9 [&_h2]:border-l-4 [&_h2]:border-[#D4AF37] [&_h2]:pl-4 [&_h2]:text-2xl [&_h2]:font-black [&_h2]:leading-tight [&_h2]:text-white sm:[&_h2]:text-4xl [&_h3]:mb-3 [&_h3]:mt-7 [&_h3]:text-xl [&_h3]:font-black [&_h3]:leading-snug [&_h3]:text-[#F9E596] sm:[&_h3]:text-2xl [&_hr]:border-white/15 [&_table]:overflow-hidden [&_table]:rounded-xl [&_td]:border-white/20 [&_th]:border-white/20 [&_th]:bg-white/10 [&_th]:text-white"
              dangerouslySetInnerHTML={{ __html: post.contentHtml }}
            />
          </div>
        </article>
      </main>
    </PublicPageFrame>
  );
}
