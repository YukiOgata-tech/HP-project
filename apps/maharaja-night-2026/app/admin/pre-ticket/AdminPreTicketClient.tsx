"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { RefreshCw } from "lucide-react";
import { MaharajaLoadingOverlay } from "@/components/ui/MaharajaLoadingOverlay";
import { AdminPageHeader, AdminPrimaryLink, AdminStatCard, AdminSurface } from "../components/AdminUi";

interface PreTicket {
  id: string;
  receiptId: string;
  email: string;
  name: string;
  gender: string;
  source: string;
  sourceOther: string;
  numberOfPeople: number;
  referrer: string;
  vipTable: string;
  note: string;
  status: string;
  createdAtMs: number;
  createdAtLabel: string;
}

interface CachedPreTickets {
  fetchedAt: number;
  tickets: PreTicket[];
  version: 1;
}

const CACHE_KEY = "maharaja-admin-pre-ticket-cache-v1";
const POLL_INTERVAL_MS = 30_000;

function countBy(items: string[]) {
  return items.reduce<Record<string, number>>((acc, item) => {
    acc[item || "未設定"] = (acc[item || "未設定"] ?? 0) + 1;
    return acc;
  }, {});
}

function getPricing(gender?: string) {
  if (gender === "WOMEN") {
    return { regular: 3500, discounted: 3000 };
  }

  return { regular: 4500, discounted: 4000 };
}

function mergeTickets(current: PreTicket[], incoming: PreTicket[]) {
  const map = new Map(current.map((ticket) => [ticket.id, ticket]));
  incoming.forEach((ticket) => map.set(ticket.id, ticket));
  return Array.from(map.values()).sort((a, b) => b.createdAtMs - a.createdAtMs);
}

function readCache(): CachedPreTickets | null {
  try {
    const raw = window.localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CachedPreTickets;
    if (parsed.version !== 1 || !Array.isArray(parsed.tickets)) return null;
    return parsed;
  } catch {
    return null;
  }
}

function writeCache(tickets: PreTicket[], fetchedAt: number) {
  const cache: CachedPreTickets = {
    version: 1,
    tickets,
    fetchedAt,
  };
  window.localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
}

async function fetchTickets(since?: number) {
  const params = since && since > 0 ? `?since=${since}` : "";
  const response = await fetch(`/admin/pre-ticket/data${params}`, {
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error("事前申込データを取得できませんでした。");
  }
  return response.json() as Promise<{ fetchedAt: number; tickets: PreTicket[] }>;
}

export function AdminPreTicketClient() {
  const [tickets, setTickets] = useState<PreTicket[]>([]);
  const [fetchedAt, setFetchedAt] = useState<number | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isCheckingNew, setIsCheckingNew] = useState(false);
  const [error, setError] = useState("");
  const [visibleMobileCount, setVisibleMobileCount] = useState(20);
  const ticketsRef = useRef<PreTicket[]>([]);
  const fetchedAtRef = useRef<number | null>(null);

  const saveState = useCallback((nextTickets: PreTicket[], nextFetchedAt: number) => {
    ticketsRef.current = nextTickets;
    fetchedAtRef.current = nextFetchedAt;
    setTickets(nextTickets);
    setFetchedAt(nextFetchedAt);
    writeCache(nextTickets, nextFetchedAt);
  }, []);

  const refreshAll = useCallback(async () => {
    setIsRefreshing(true);
    setError("");
    try {
      const result = await fetchTickets();
      saveState(result.tickets, result.fetchedAt);
    } catch (err) {
      setError(err instanceof Error ? err.message : "データ取得に失敗しました。");
    } finally {
      setIsRefreshing(false);
      setIsReady(true);
    }
  }, [saveState]);

  const checkNew = useCallback(async () => {
    const current = ticketsRef.current;
    const latestCreatedAt = current.length > 0
      ? Math.max(...current.map((ticket) => ticket.createdAtMs))
      : fetchedAtRef.current;
    if (!latestCreatedAt) return;

    setIsCheckingNew(true);
    try {
      const result = await fetchTickets(latestCreatedAt);
      if (result.tickets.length > 0) {
        saveState(mergeTickets(current, result.tickets), result.fetchedAt);
      }
    } catch {
      // 差分確認は表示を止めない。完全更新ボタンで復旧できる。
    } finally {
      setIsCheckingNew(false);
    }
  }, [saveState]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const cache = readCache();
      if (cache) {
        ticketsRef.current = cache.tickets;
        fetchedAtRef.current = cache.fetchedAt;
        setTickets(cache.tickets);
        setFetchedAt(cache.fetchedAt);
        setIsReady(true);
        return;
      }

      void refreshAll();
    }, 0);

    return () => window.clearTimeout(timer);
  }, [checkNew, refreshAll]);

  useEffect(() => {
    if (!isReady) return;
    const id = window.setInterval(() => {
      void checkNew();
    }, POLL_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [checkNew, isReady]);

  const stats = useMemo(() => {
    const totalPeople = tickets.reduce((sum, ticket) => sum + (ticket.numberOfPeople ?? 1), 0);
    const menPeople = tickets
      .filter((ticket) => ticket.gender === "MEN")
      .reduce((sum, ticket) => sum + (ticket.numberOfPeople ?? 1), 0);
    const womenPeople = tickets
      .filter((ticket) => ticket.gender === "WOMEN")
      .reduce((sum, ticket) => sum + (ticket.numberOfPeople ?? 1), 0);
    const vipNeeded = tickets.filter((ticket) => ticket.vipTable?.startsWith("必要"));
    const expectedRevenue = tickets.reduce((sum, ticket) => {
      const pricing = getPricing(ticket.gender);
      return sum + pricing.discounted * (ticket.numberOfPeople ?? 1);
    }, 0);
    const discountTotal = tickets.reduce((sum, ticket) => {
      const pricing = getPricing(ticket.gender);
      return sum + (pricing.regular - pricing.discounted) * (ticket.numberOfPeople ?? 1);
    }, 0);

    return {
      totalPeople,
      menPeople,
      womenPeople,
      vipNeeded: vipNeeded.length,
      expectedRevenue,
      discountTotal,
      sourceCounts: countBy(tickets.map((ticket) => ticket.source ?? "未設定")),
      referrerCounts: countBy(tickets.map((ticket) => ticket.referrer?.trim()).filter(Boolean)),
    };
  }, [tickets]);

  const fetchedAtLabel = fetchedAt ? new Date(fetchedAt).toLocaleString("ja-JP") : "未取得";
  const mobileTickets = tickets.slice(0, visibleMobileCount);
  const hasMoreMobileTickets = visibleMobileCount < tickets.length;

  return (
    <div className="space-y-3 sm:space-y-8">
      <MaharajaLoadingOverlay show={!isReady || isRefreshing} label={isRefreshing ? "完全更新中です" : "申込データを読込中です"} />
      <AdminPageHeader
        eyebrow="Pre Ticket"
        title="事前申込・割引チケット管理"
        description="一覧はローカルキャッシュから表示します。新規申込は差分確認で反映し、完全更新はリロードボタン時のみ実行します。"
        actions={
          <>
            <button
              type="button"
              onClick={refreshAll}
              disabled={isRefreshing}
              className="inline-flex h-9 items-center justify-center gap-2 rounded-full border border-white/20 bg-black/50 px-4 text-[11px] font-black tracking-widest text-gray-200 transition-colors hover:border-[#D4AF37] hover:text-white disabled:cursor-wait disabled:opacity-60 sm:h-auto sm:px-5 sm:py-2.5 sm:text-xs"
            >
              <RefreshCw className={["size-3.5", isRefreshing ? "animate-spin" : ""].join(" ")} />
              完全更新
            </button>
            <AdminPrimaryLink href="/admin/pre-ticket/export">Excel用CSV</AdminPrimaryLink>
          </>
        }
      />

      <div className="flex flex-col gap-1 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-[11px] font-bold text-gray-400 sm:flex-row sm:items-center sm:justify-between sm:rounded-2xl sm:px-4 sm:text-xs">
        <span>最終取得: {fetchedAtLabel}</span>
        <span className={isCheckingNew ? "text-[#D4AF37]" : "text-gray-500"}>
          {isCheckingNew ? "新規申込を確認中..." : "新規申込は自動で差分確認"}
        </span>
      </div>

      {error ? (
        <div className="rounded-xl border border-[#FF007F]/35 bg-[#FF007F]/10 p-3 text-xs font-bold leading-5 text-[#ff8cc8] sm:text-sm">
          {error}
        </div>
      ) : null}

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-6 sm:gap-4">
        <AdminStatCard label="Entries" value={tickets.length} hint="申込件数" />
        <AdminStatCard label="People" value={stats.totalPeople} hint="参加予定人数" tone="success" />
        <AdminStatCard label="MEN / WOMEN" value={`${stats.menPeople}/${stats.womenPeople}`} hint="人数内訳" />
        <AdminStatCard label="VIP Interest" value={stats.vipNeeded} hint="VIP希望あり" tone="warning" />
        <AdminStatCard label="Expected Sales" value={`¥${stats.expectedRevenue.toLocaleString("ja-JP")}`} hint="割引後想定売上" tone="success" />
        <AdminStatCard label="Discount" value={`¥${stats.discountTotal.toLocaleString("ja-JP")}`} hint="割引総額" tone="warning" />
      </div>

      <div className="grid gap-2 sm:gap-4 lg:grid-cols-2">
        <AdminSurface className="bg-black/50 p-3 border-white/10 sm:p-6">
          <h2 className="text-sm font-black tracking-widest text-white sm:text-lg">流入経路</h2>
          <div className="mt-2 max-h-56 overflow-y-auto pr-1 [scrollbar-width:thin] sm:mt-3 sm:max-h-80">
            {Object.entries(stats.sourceCounts)
              .sort((a, b) => b[1] - a[1])
              .map(([source, count]) => (
                <div key={source} className="mb-1.5 flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2 last:mb-0 sm:mb-2">
                  <span className="min-w-0 truncate text-xs font-bold text-gray-300 sm:text-sm">{source}</span>
                  <span className="shrink-0 text-sm font-black text-[#D4AF37]">{count}</span>
                </div>
              ))}
          </div>
        </AdminSurface>

        <AdminSurface className="bg-black/50 p-3 border-white/10 sm:p-6">
          <h2 className="text-sm font-black tracking-widest text-white sm:text-lg">紹介者</h2>
          <div className="mt-2 max-h-56 overflow-y-auto pr-1 [scrollbar-width:thin] sm:mt-3 sm:max-h-80">
            {Object.keys(stats.referrerCounts).length === 0 ? (
              <p className="text-xs font-bold text-gray-500 sm:text-sm">紹介者の入力はまだありません。</p>
            ) : (
              Object.entries(stats.referrerCounts)
                .sort((a, b) => b[1] - a[1])
                .map(([referrer, count]) => (
                  <div key={referrer} className="mb-1.5 flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2 last:mb-0 sm:mb-2">
                    <span className="min-w-0 truncate text-xs font-bold text-gray-300 sm:text-sm">{referrer}</span>
                    <span className="shrink-0 text-sm font-black text-[#D4AF37]">{count}</span>
                  </div>
                ))
            )}
          </div>
        </AdminSurface>
      </div>

      <AdminSurface className="overflow-hidden bg-black/50 border-white/10">
        <div className="divide-y divide-white/10 md:hidden">
          {tickets.length === 0 ? (
            <div className="px-3 py-8 text-center text-xs font-bold tracking-widest text-gray-500">
              NO PRE TICKETS YET
            </div>
          ) : (
            <>
              {mobileTickets.map((ticket) => (
                <article key={ticket.id} className="p-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-black text-white">{ticket.name}</p>
                      <p className="mt-1 text-[11px] font-black text-[#D4AF37]">{ticket.receiptId || "-"}</p>
                      <p className="mt-1 truncate text-[11px] text-gray-400">{ticket.email}</p>
                      <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-gray-500">{ticket.createdAtLabel}</p>
                    </div>
                    <div className="shrink-0 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-right">
                      <p className="text-xl font-black leading-none text-white">{ticket.numberOfPeople ?? 1}</p>
                      <p className="mt-1 text-[9px] font-bold uppercase tracking-widest text-gray-500">people</p>
                    </div>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    <span className="rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-bold text-gray-300">{ticket.gender}</span>
                    <span className="rounded-full bg-[#D4AF37]/10 px-2.5 py-1 text-[10px] font-bold text-[#D4AF37]">{ticket.source}</span>
                    {ticket.vipTable?.startsWith("必要") ? (
                      <span className="rounded-full bg-[#FF007F]/10 px-2.5 py-1 text-[10px] font-bold text-[#FF5DAF]">VIP希望</span>
                    ) : null}
                  </div>
                </article>
              ))}
              {hasMoreMobileTickets ? (
                <div className="p-3">
                  <button
                    type="button"
                    onClick={() => setVisibleMobileCount((count) => count + 20)}
                    className="h-9 w-full rounded-full border border-white/20 bg-white/5 text-xs font-black tracking-widest text-gray-300 transition-colors hover:border-[#D4AF37] hover:text-white"
                  >
                    もっと見る（残り {tickets.length - visibleMobileCount} 件）
                  </button>
                </div>
              ) : null}
            </>
          )}
        </div>

        <div className="hidden max-h-[62vh] overflow-auto md:block">
          <table className="w-full text-left text-sm text-gray-300">
            <thead className="sticky top-0 z-10 border-b border-white/10 bg-[#151015] text-xs font-bold tracking-widest text-gray-400">
              <tr>
                <th className="px-6 py-4">DATE</th>
                <th className="px-6 py-4">RECEIPT ID</th>
                <th className="px-6 py-4">NAME</th>
                <th className="px-6 py-4">EMAIL</th>
                <th className="px-6 py-4">GENDER</th>
                <th className="px-6 py-4">PEOPLE</th>
                <th className="px-6 py-4">SOURCE</th>
                <th className="px-6 py-4">VIP</th>
                <th className="px-6 py-4">NOTE</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {tickets.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-6 py-12 text-center font-bold tracking-widest text-gray-500">
                    NO PRE TICKETS YET
                  </td>
                </tr>
              ) : (
                tickets.map((ticket) => (
                  <tr key={ticket.id} className="transition-colors hover:bg-white/5">
                    <td className="px-6 py-4">{ticket.createdAtLabel}</td>
                    <td className="px-6 py-4 font-black text-[#D4AF37]">{ticket.receiptId || "-"}</td>
                    <td className="px-6 py-4 font-bold text-white">{ticket.name}</td>
                    <td className="px-6 py-4">{ticket.email}</td>
                    <td className="px-6 py-4 font-bold">{ticket.gender}</td>
                    <td className="px-6 py-4 font-bold text-white">{ticket.numberOfPeople ?? 1}</td>
                    <td className="px-6 py-4">{ticket.source}{ticket.sourceOther ? ` / ${ticket.sourceOther}` : ""}</td>
                    <td className="px-6 py-4">{ticket.vipTable}</td>
                    <td className="max-w-xs px-6 py-4 text-gray-400">
                      <p className="line-clamp-2">{ticket.note || "-"}</p>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </AdminSurface>

      <div className="flex justify-end">
        <Link href="/pre-ticket" target="_blank" className="text-xs font-bold tracking-widest text-[#D4AF37] hover:text-white">
          公開フォームを確認する ↗
        </Link>
      </div>
    </div>
  );
}
