"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff, LockKeyhole, Mail, ShieldCheck } from "lucide-react";
import { getClientAuth } from "@client-sites/lib/cms/client";
import { signInWithEmailAndPassword } from "firebase/auth";
import { createSession } from "../actions/session";

export default function AdminLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") ?? "/admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
      if (msg.includes("network-request-failed")) {
        setError(
          "Firebase Authへの通信に失敗しました。ネットワーク、VPN、広告ブロック、Firebase APIキー制限、Auth設定を確認してください。",
        );
      } else {
        setError(msg.includes("invalid") ? "メールアドレスまたはパスワードが正しくありません" : msg);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050505] text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-10rem] top-[-7rem] h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.1),transparent_70%)]" />
        <div className="absolute bottom-[-11rem] right-[-7rem] h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(circle,rgba(255,0,127,0.1),transparent_72%)]" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-5xl items-center px-4 py-10 md:px-6">
        <div className="grid w-full gap-12 lg:grid-cols-[1fr_1fr]">
          <section className="flex flex-col justify-center gap-10">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-white/5 px-4 py-2 text-xs font-bold tracking-widest text-[#D4AF37]">
                <ShieldCheck size={14} />
                ADMIN ACCESS
              </div>
              <div className="space-y-4">
                <h1 className="text-4xl font-black leading-tight md:text-6xl text-gradient-gold">
                  MAHARAJA
                  <br />
                  NIGHT 2026
                </h1>
                <p className="max-w-xl text-sm leading-8 text-gray-400 font-bold tracking-widest">
                  INTEGRATED EVENT MANAGEMENT CONSOLE.
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-[0_0_50px_rgba(212,175,55,0.05)] md:p-12">
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-white tracking-widest mb-2">LOGIN</h2>
                <p className="text-sm text-gray-400">
                  Please sign in to access the management console.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-xs font-bold tracking-widest text-gray-400">
                    EMAIL
                  </label>
                  <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/50 px-4 py-3 focus-within:border-[#D4AF37] transition-colors">
                    <Mail size={16} className="text-[#D4AF37]" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full bg-transparent text-sm text-white outline-none placeholder:text-gray-600"
                      placeholder="admin@make-it-tech.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-bold tracking-widest text-gray-400">
                    PASSWORD
                  </label>
                  <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/50 px-4 py-3 focus-within:border-[#D4AF37] transition-colors">
                    <LockKeyhole size={16} className="text-[#D4AF37]" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full bg-transparent text-sm text-white outline-none placeholder:text-gray-600"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((current) => !current)}
                      aria-label={showPassword ? "パスワードを非表示" : "パスワードを表示"}
                      className="grid size-8 shrink-0 place-items-center rounded-lg text-gray-400 transition-colors hover:bg-white/10 hover:text-[#F9E596]"
                    >
                      {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                    </button>
                  </div>
                </div>

                {error && (
                  <p className="rounded-xl border border-[#FF007F]/30 bg-[#FF007F]/10 px-4 py-3 text-sm text-[#FF007F] font-bold">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F9E596] px-5 py-4 text-sm font-black tracking-widest text-black transition-all hover:scale-[1.02] disabled:scale-100 disabled:opacity-50"
                >
                  {loading ? "AUTHENTICATING..." : "SIGN IN"}
                </button>
              </form>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
