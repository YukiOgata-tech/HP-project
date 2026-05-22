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
  const snapshot = await db.collection("sites").doc(siteId).collection("registrations").get();
  const registrations = snapshot.docs.map(d => d.data());
  
  const total = registrations.length;
  const vipCount = registrations.filter(r => r.type === "vip").length;
  const generalCount = registrations.filter(r => r.type === "general").length;
  
  return {
    total,
    vipCount,
    generalCount
  };
}

export default async function AdminDashboardPage() {
  const posts = await getAllPosts(SITE_ID);
  const stats = await getStats(SITE_ID);
  const published = posts.filter((p) => p.status === "published");
  const drafts = posts.filter((p) => p.status === "draft");
  const latestPost = posts[0];

  return (
    <div className="space-y-8">
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

      <div className="grid gap-4 md:grid-cols-3">
        <AdminStatCard label="TOTAL REGISTRATIONS" value={stats.total} hint="申込者総数" />
        <AdminStatCard label="VIP TABLES RESERVED" value={stats.vipCount} hint="VIPテーブル予約" tone="success" />
        <AdminStatCard label="GENERAL TICKETS" value={stats.generalCount} hint="一般チケット" tone="warning" />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.35fr_0.9fr]">
        <AdminSurface className="overflow-hidden bg-black/50 border-white/10">
          <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
            <div>
              <h2 className="text-lg font-bold tracking-widest text-white">LATEST NEWS</h2>
              <p className="text-sm text-gray-400">最近の投稿を5件表示しています。</p>
            </div>
            <AdminSecondaryLink href="/admin/news">すべて見る</AdminSecondaryLink>
          </div>

          {posts.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <p className="text-base font-bold text-gray-400">まだ記事がありません</p>
              <div className="mt-6">
                <AdminPrimaryLink href="/admin/news/new">最初の記事を作成</AdminPrimaryLink>
              </div>
            </div>
          ) : (
            <ul className="divide-y divide-white/10">
              {posts.slice(0, 5).map((post) => (
                <li key={post.id} className="px-6 py-5 transition-colors hover:bg-white/5">
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-base font-bold text-white">{post.title}</h3>
                        <StatusBadge status={post.status} />
                      </div>
                      <p className="text-sm text-gray-500">
                        更新日 {new Date(post.updatedAt).toLocaleDateString("ja-JP")}
                      </p>
                    </div>
                    <Link
                      href={`/admin/news/${post.id}/edit`}
                      className="inline-flex items-center rounded-full border border-white/20 px-4 py-2 text-sm font-bold text-gray-300 transition-colors hover:bg-white/10 hover:text-white"
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
          <AdminSurface className="p-6 bg-black/50 border-white/10">
            <div className="space-y-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#D4AF37]">
                  Site
                </p>
                <h2 className="mt-2 text-xl font-bold text-white tracking-widest">MAHARAJA NIGHT 2026</h2>
              </div>
              <p className="text-sm leading-7 text-gray-400">
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
        </div>
      </div>
    </div>
  );
}
