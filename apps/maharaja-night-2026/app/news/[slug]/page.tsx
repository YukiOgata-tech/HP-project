import { getPostBySlug } from "@client-sites/lib/cms";
import { notFound } from "next/navigation";
import { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const siteId = process.env.SITE_ID;
  if (!siteId) return {};

  const post = await getPostBySlug(siteId, slug);
  if (!post) return {};

  return {
    title: `${post.title} | MAHARAJA NIGHT 2026`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.coverImageUrl ? [post.coverImageUrl] : [],
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

  return (
    <main className="min-h-screen bg-black text-white py-32 px-6">
      <article className="max-w-3xl mx-auto glass p-8 md:p-12 rounded-2xl border-t border-[#D4AF37]/50">
        {post.coverImageUrl && (
          <img src={post.coverImageUrl} alt={post.title} className="w-full aspect-video object-cover rounded-xl mb-8 shadow-[0_0_20px_rgba(212,175,55,0.2)]" />
        )}
        <div className="mb-8 border-b border-white/10 pb-8">
          <p className="text-[#FF007F] font-bold tracking-widest mb-4">
            {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : ""}
          </p>
          <h1 className="text-4xl md:text-5xl font-black mb-4 text-gradient-gold leading-tight">{post.title}</h1>
          <div className="flex gap-2">
            {post.tags?.map(tag => (
              <span key={tag} className="bg-white/10 px-3 py-1 rounded-full text-xs text-gray-300">#{tag}</span>
            ))}
          </div>
        </div>
        <div 
          className="prose prose-invert prose-gold max-w-none text-gray-300 leading-loose"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />
      </article>
    </main>
  );
}
