"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { LockKeyhole, Mail, ShieldCheck } from "lucide-react";
import { getClientAuth } from "@client-sites/lib/cms/client";
import { signInWithEmailAndPassword } from "firebase/auth";
import { createSession } from "../actions/session";

export default function AdminLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") ?? "/admin";

  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const auth = getClientAuth();
      const credential = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await credential.user.getIdToken();
      await createSession(idToken);
      router.push(redirect);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "ログインに失敗しました";
      setError(
        msg.includes("invalid")
          ? "メールアドレスまたはパスワードが正しくありません"
          : msg
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-(--bg-off)">
      <div className="mx-auto flex min-h-screen max-w-6xl items-center px-4 py-10 md:px-6">
        <div className="grid w-full gap-px border border-(--border) lg:grid-cols-[1fr_1fr]">

          {/* 左: ブランドパネル */}
          <section className="bg-(--bg-dark) p-8 text-white md:p-12">
            <div className="flex h-full flex-col justify-between gap-12">

              <div className="space-y-1">
                <p className="font-serif text-lg font-bold tracking-[0.28em] uppercase text-white">
                  Broletto CMS
                </p>
                <p className="label-en text-white/40">Content Management</p>
              </div>

              <div className="space-y-5">
                <span className="section-rule section-rule--white block" />
                <h1 className="font-serif text-3xl font-bold leading-snug text-white md:text-4xl">
                  BROLETTO の運用を、<br />
                  静かに強く整える。
                </h1>
                <p className="max-w-sm text-sm leading-8 text-white/55">
                  記事の作成・公開管理・編集フローを一か所で。
                  日々の更新を速く、迷いなく進められる管理画面です。
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="border border-white/10 bg-white/5 p-5">
                  <ShieldCheck className="mb-3 text-white/40" size={16} />
                  <p className="text-sm font-bold text-white">Rolling Session</p>
                  <p className="mt-2 text-xs leading-6 text-white/45">
                    最終アクセスから1日の継続ログインで作業を継続できます。
                  </p>
                </div>
                <div className="border border-white/10 bg-white/5 p-5">
                  <LockKeyhole className="mb-3 text-white/40" size={16} />
                  <p className="text-sm font-bold text-white">Protected Editing</p>
                  <p className="mt-2 text-xs leading-6 text-white/45">
                    編集権限のあるユーザーのみ管理機能にアクセスできます。
                  </p>
                </div>
              </div>

            </div>
          </section>

          {/* 右: ログインフォーム */}
          <section className="bg-(--bg) p-8 md:p-12">
            <div className="mx-auto max-w-sm space-y-8">

              <div className="space-y-2">
                <span className="section-rule block" />
                <p className="label-en text-(--fg-subtle)">Sign In</p>
                <h2 className="font-serif text-2xl font-bold text-(--fg)">
                  管理画面ログイン
                </h2>
                <p className="text-sm leading-7 text-(--fg-subtle)">
                  登録済みの管理者アカウントでログインしてください。
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">

                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-widest text-(--fg-subtle)">
                    メールアドレス
                  </label>
                  <div className="flex items-center gap-3 border border-(--border) bg-(--bg) px-4 py-3 focus-within:border-(--fg)">
                    <Mail size={14} className="shrink-0 text-(--fg-subtle)" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full bg-transparent text-sm text-(--fg) outline-none placeholder:text-(--fg-subtle)"
                      placeholder="admin@example.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-widest text-(--fg-subtle)">
                    パスワード
                  </label>
                  <div className="flex items-center gap-3 border border-(--border) bg-(--bg) px-4 py-3 focus-within:border-(--fg)">
                    <LockKeyhole size={14} className="shrink-0 text-(--fg-subtle)" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full bg-transparent text-sm text-(--fg) outline-none placeholder:text-(--fg-subtle)"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                {error && (
                  <p className="border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-700">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-(--cta) px-5 py-3.5 text-xs font-bold uppercase tracking-widest text-(--cta-text) transition-opacity hover:opacity-75 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {loading ? "ログイン中..." : "ログインして管理画面へ"}
                </button>

              </form>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
