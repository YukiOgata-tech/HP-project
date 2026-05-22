import { getPublishedPosts } from "@client-sites/lib/cms";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function NewsList() {
  const siteId = process.env.SITE_ID;
  if (!siteId) throw new Error("SITE_ID is not defined");

  const posts = await getPublishedPosts(siteId);

  return (
    <main className="min-h-screen bg-black text-white py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-12 text-gradient-gold text-center tracking-widest">NEWS</h1>
        
        <div className="space-y-6">
          {posts.length === 0 ? (
            <p className="text-center text-gray-500">No news yet.</p>
          ) : (
            posts.map(post => (
              <Link key={post.id} href={`/news/${post.slug}`} className="block">
                <article className="glass hover:glass-gold p-6 rounded-xl transition-all duration-300">
                  <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                    {post.coverImageUrl && (
                      <img src={post.coverImageUrl} alt={post.title} className="w-full md:w-48 aspect-video object-cover rounded-lg" />
                    )}
                    <div className="flex-1">
                      <p className="text-[#FF007F] text-sm font-bold tracking-wider mb-2">
                        {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : ""}
                      </p>
                      <h2 className="text-2xl font-bold mb-2 text-white">{post.title}</h2>
                      <p className="text-gray-400 line-clamp-2">{post.excerpt}</p>
                    </div>
                  </div>
                </article>
              </Link>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
