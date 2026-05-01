"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { LockKeyhole, Mail, PanelTopOpen, ShieldCheck } from "lucide-react";
import { getClientAuth } from "@client-sites/lib/cms/client";
import { signInWithEmailAndPassword } from "firebase/auth";
import { createSession } from "../actions/session";

export default function AdminLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") ?? "/admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const auth = getClientAuth();
      const credential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const idToken = await credential.user.getIdToken();
      await createSession(idToken);
      router.push(redirect);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "ログインに失敗しました";
      setError(msg.includes("invalid") ? "メールアドレスまたはパスワードが正しくありません" : msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[linear-gradient(180deg,#f4ece5_0%,#efe7de_42%,#f7f3ef_100%)]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-10rem] top-[-7rem] h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle,rgba(171,128,95,0.2),transparent_70%)]" />
        <div className="absolute bottom-[-11rem] right-[-7rem] h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(circle,rgba(64,44,31,0.12),transparent_72%)]" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-6xl items-center px-4 py-10 md:px-6">
        <div className="grid w-full gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <section className="rounded-[32px] border border-white/60 bg-[linear-gradient(145deg,rgba(48,34,25,0.96),rgba(96,70,50,0.92))] p-8 text-white shadow-[0_35px_90px_-45px_rgba(45,34,28,0.8)] md:p-10">
            <div className="flex h-full flex-col justify-between gap-10">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-2 text-xs uppercase tracking-[0.28em] text-white/80">
                  <PanelTopOpen size={14} />
                  Admin Access
                </div>
                <div className="space-y-4">
                  <h1 className="font-serif text-4xl font-semibold leading-tight md:text-5xl">
                    BROLETTO の運用を、
                    <br />
                    静かに強く整える。
                  </h1>
                  <p className="max-w-xl text-sm leading-8 text-white/72 md:text-[15px]">
                    記事の作成、公開状況の確認、編集フローの整理まで。管理画面は日々の更新を速く、迷いなく進められるように設計しています。
                  </p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-[24px] border border-white/10 bg-white/8 p-5">
                  <ShieldCheck className="mb-3 text-[#f2d2b7]" size={18} />
                  <p className="text-sm font-semibold">Rolling Session</p>
                  <p className="mt-2 text-sm leading-7 text-white/68">
                    最終アクセスから 1 日の継続ログインで、作業の途中離脱を減らします。
                  </p>
                </div>
                <div className="rounded-[24px] border border-white/10 bg-white/8 p-5">
                  <LockKeyhole className="mb-3 text-[#f2d2b7]" size={18} />
                  <p className="text-sm font-semibold">Protected Editing</p>
                  <p className="mt-2 text-sm leading-7 text-white/68">
                    編集権限のあるユーザーだけが管理機能にアクセスできます。
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-[32px] border border-white/70 bg-white/90 p-7 shadow-[0_32px_80px_-46px_rgba(45,34,28,0.45)] md:p-9">
            <div className="space-y-6">
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#8c694d]">
                  Sign In
                </p>
                <div>
                  <h2 className="text-2xl font-semibold text-[#241a13]">管理画面ログイン</h2>
                  <p className="mt-2 text-sm leading-7 text-[#706055]">
                    登録済みの管理者アカウントでログインしてください。
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-[#493a31]">
                    メールアドレス
                  </label>
                  <div className="flex items-center gap-3 rounded-2xl border border-[#e6d7ca] bg-[#fcfaf8] px-4 py-3 focus-within:border-[#b99679] focus-within:bg-white">
                    <Mail size={16} className="text-[#9b8a7d]" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full bg-transparent text-sm text-[#241a13] outline-none placeholder:text-[#b1a296]"
                      placeholder="admin@example.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-[#493a31]">
                    パスワード
                  </label>
                  <div className="flex items-center gap-3 rounded-2xl border border-[#e6d7ca] bg-[#fcfaf8] px-4 py-3 focus-within:border-[#b99679] focus-within:bg-white">
                    <LockKeyhole size={16} className="text-[#9b8a7d]" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full bg-transparent text-sm text-[#241a13] outline-none placeholder:text-[#b1a296]"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                {error && (
                  <p className="rounded-2xl border border-[#f0c6c0] bg-[#fff3f1] px-4 py-3 text-sm text-[#a73d33]">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-full bg-[#2d221c] px-5 py-3 text-sm font-semibold text-white shadow-[0_20px_36px_-24px_rgba(45,34,28,0.82)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#1f1712] disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-55"
                >
                  {loading ? "ログイン中..." : "ログインして管理画面へ進む"}
                </button>
              </form>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
