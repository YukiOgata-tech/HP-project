import { getAllPosts } from "@client-sites/lib/cms";
import { getAdminDb } from "@client-sites/lib/cms/firebase-admin";
import Link from "next/link";
import {
  AdminPageHeader,
  AdminPrimaryLink,
  AdminSecondaryLink,
  AdminStatCard,
  AdminSurface,
  StatusBadge,
} from "./components/AdminUi";

const SITE_ID = process.env.SITE_ID!;

async function getStats(siteId: string) {
  const db = getAdminDb();
  const snapshot = await db.collection("sites").doc(siteId).collection("preTickets").get();
  const preTickets = snapshot.docs.map(d => d.data());
  
  const total = preTickets.length;
  const people = preTickets.reduce((sum, ticket) => sum + (Number(ticket.numberOfPeople) || 1), 0);
  const vipInterest = preTickets.filter(ticket => String(ticket.vipTable ?? "").startsWith("必要")).length;
  
  return {
    total,
    people,
    vipInterest
  };
}

export default async function AdminDashboardPage() {
  const posts = await getAllPosts(SITE_ID);
  const stats = await getStats(SITE_ID);
  const published = posts.filter((p) => p.status === "published");
  const drafts = posts.filter((p) => p.status === "draft");
  const latestPost = posts[0];

  return (
    <div className="space-y-4 sm:space-y-8">
      <AdminPageHeader
        eyebrow="Dashboard"
        title="イベント集計 & コンテンツ管理"
        description="MAHARAJA NIGHT 2026 の統合管理ダッシュボードです。参加者数のリアルタイムな把握や、お知らせ・協賛企業の更新をここから行います。"
        actions={
          <>
            <AdminPrimaryLink href="/admin/news/new">＋ NEW POST</AdminPrimaryLink>
          </>
        }
      />

      <div className="grid grid-cols-3 gap-2 sm:gap-4">
        <AdminStatCard label="PRE TICKET ENTRIES" value={stats.total} hint="事前申込件数" />
        <AdminStatCard label="EXPECTED PEOPLE" value={stats.people} hint="参加予定人数" tone="success" />
        <AdminStatCard label="VIP INTEREST" value={stats.vipInterest} hint="VIP希望あり" tone="warning" />
      </div>

      <div className="grid grid-cols-3 gap-2 sm:gap-4">
        <AdminStatCard label="NEWS TOTAL" value={posts.length} hint="全記事数" />
        <AdminStatCard label="PUBLISHED NEWS" value={published.length} hint="公開中のお知らせ" tone="success" />
        <AdminStatCard label="DRAFT NEWS" value={drafts.length} hint="下書きのお知らせ" tone="warning" />
      </div>

      <div className="grid gap-4 sm:gap-6 xl:grid-cols-[1.35fr_0.9fr]">
        <AdminSurface className="overflow-hidden bg-black/50 border-white/10">
          <div className="flex items-center justify-between gap-3 border-b border-white/10 px-3 py-3 sm:px-6 sm:py-5">
            <div>
              <h2 className="text-sm font-bold tracking-widest text-white sm:text-lg">LATEST NEWS</h2>
              <p className="text-[11px] text-gray-400 sm:text-sm">最近の投稿を5件表示しています。</p>
            </div>
            <AdminSecondaryLink href="/admin/news">すべて見る</AdminSecondaryLink>
          </div>

          {posts.length === 0 ? (
            <div className="px-3 py-10 text-center sm:px-6 sm:py-16">
              <p className="text-sm font-bold text-gray-400 sm:text-base">まだ記事がありません</p>
              <div className="mt-4 sm:mt-6">
                <AdminPrimaryLink href="/admin/news/new">最初の記事を作成</AdminPrimaryLink>
              </div>
            </div>
          ) : (
            <ul className="divide-y divide-white/10">
              {posts.slice(0, 5).map((post) => (
                <li key={post.id} className="px-3 py-3 transition-colors hover:bg-white/5 sm:px-6 sm:py-5">
                  <div className="flex flex-col gap-3 sm:gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="min-w-0 space-y-2">
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                        <h3 className="min-w-0 text-sm font-bold text-white sm:text-base">{post.title}</h3>
                        <StatusBadge status={post.status} />
                      </div>
                      <p className="text-[11px] text-gray-500 sm:text-sm">
                        更新日 {new Date(post.updatedAt).toLocaleDateString("ja-JP")}
                      </p>
                    </div>
                    <Link
                      href={`/admin/news/${post.id}/edit`}
                      className="inline-flex h-9 items-center justify-center rounded-full border border-white/20 px-4 text-[11px] font-bold text-gray-300 transition-colors hover:bg-white/10 hover:text-white sm:h-auto sm:py-2 sm:text-sm"
                    >
                      編集する
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </AdminSurface>

        <div className="space-y-6">
          <AdminSurface className="bg-black/50 p-3 border-white/10 sm:p-6">
            <div className="space-y-3 sm:space-y-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#D4AF37] sm:text-xs">
                  Site
                </p>
                <h2 className="mt-1 text-base font-bold tracking-widest text-white sm:mt-2 sm:text-xl">MAHARAJA NIGHT 2026</h2>
              </div>
              <p className="text-xs leading-5 text-gray-400 sm:text-sm sm:leading-7">
                最新のお知らせやスポンサー情報はサイトへ即時反映されます。
              </p>
              <Link
                href="/"
                target="_blank"
                className="inline-flex items-center text-sm font-bold text-[#D4AF37] transition-colors hover:text-white"
              >
                公開サイトを確認する ↗
              </Link>
            </div>
          </AdminSurface>

          <AdminSurface className="bg-black/50 p-3 border-white/10 sm:p-6">
            <div className="space-y-3 sm:space-y-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#D4AF37] sm:text-xs">
                  Latest Activity
                </p>
                <h2 className="mt-1 text-base font-bold tracking-widest text-white sm:mt-2 sm:text-xl">最近の更新</h2>
              </div>
              {latestPost ? (
                <div className="rounded-2xl border border-white/10 bg-white/5 p-3 sm:p-4">
                  <StatusBadge status={latestPost.status} />
                  <h3 className="mt-3 text-sm font-bold text-white sm:mt-4 sm:text-base">{latestPost.title}</h3>
                  <p className="mt-1 text-xs leading-5 text-gray-500 sm:mt-2 sm:text-sm sm:leading-6">
                    {new Date(latestPost.updatedAt).toLocaleDateString("ja-JP")}
                  </p>
                </div>
              ) : (
                <p className="text-sm text-gray-500">まだ記事更新はありません。</p>
              )}
            </div>
          </AdminSurface>
        </div>
      </div>
    </div>
  );
}
