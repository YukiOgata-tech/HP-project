"use client";

import { useRef, useState } from "react";
import { Paperclip, X, AlertCircle } from "lucide-react";
import { submitApplicationAction } from "../../admin/applications/actions";

const POSITIONS = [
  "スタイリスト",
  "アシスタント",
  "ブランク（ブランクあり）",
  "パート・アルバイト",
  "インターン",
];

const EXPERIENCE_OPTIONS = [
  "未経験（学生・新卒）",
  "1年未満",
  "1〜3年",
  "3〜5年",
  "5〜10年",
  "10年以上",
];

const ACCEPT_TYPES = ".pdf,.doc,.docx,.jpg,.jpeg,.png";

/* ── バリデーション ─────────────────────────── */

type FieldErrors = Partial<Record<"name" | "phone" | "email" | "position", string>>;

function validateFields(data: {
  name: string; phone: string; email: string; position: string;
}): FieldErrors {
  const errors: FieldErrors = {};

  if (!data.name.trim())
    errors.name = "お名前を入力してください";

  if (!data.email.trim()) {
    errors.email = "メールアドレスを入力してください";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
    errors.email = "正しいメールアドレスを入力してください（例: name@example.com）";
  }

  if (!data.phone.trim()) {
    errors.phone = "電話番号を入力してください";
  } else {
    const cleaned = data.phone.replace(/[０-９]/g, (c) =>
      String.fromCharCode(c.charCodeAt(0) - 0xfee0)
    ).replace(/[\-\s\(\)]/g, "");
    if (!/^0[0-9]{9,10}$/.test(cleaned))
      errors.phone = "正しい電話番号を入力してください（例: 090-0000-0000）";
  }

  if (!data.position)
    errors.position = "希望職種を選択してください";

  return errors;
}

/* ── フォームコンポーネント ───────────────────── */

export function ApplicationForm() {
  const formRef    = useRef<HTMLFormElement>(null);
  const mountedAt  = useRef(Date.now());

  const [file, setFile]             = useState<File | null>(null);
  const [loading, setLoading]       = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [serverError, setServerError] = useState("");
  const [success, setSuccess]       = useState(false);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFile(e.target.files?.[0] ?? null);
  }

  function removeFile() {
    setFile(null);
    const input = formRef.current?.querySelector<HTMLInputElement>('input[name="resume"]');
    if (input) input.value = "";
  }

  function inputCls(field: keyof FieldErrors) {
    return [
      "w-full border bg-[var(--bg)] px-4 py-3 text-sm text-[var(--fg)] outline-none transition-colors",
      "placeholder:text-[var(--fg-subtle)]",
      fieldErrors[field]
        ? "border-red-400 focus:border-red-500"
        : "border-[var(--border)] focus:border-[var(--fg)]",
    ].join(" ");
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setServerError("");

    const form    = e.currentTarget;
    const getData = (name: string) => (form.elements.namedItem(name) as HTMLInputElement)?.value ?? "";

    /* クライアント側バリデーション */
    const errors = validateFields({
      name:     getData("name"),
      phone:    getData("phone"),
      email:    getData("email"),
      position: getData("position"),
    });
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      /* 最初のエラー項目へスクロール */
      const firstKey = Object.keys(errors)[0];
      const el = form.elements.namedItem(firstKey);
      if (el instanceof Element) {
        el.closest("div")?.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }
    setFieldErrors({});

    /* 速度チェック（3秒未満はボット疑い） */
    if (Date.now() - mountedAt.current < 3000) {
      setServerError("__speed__");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData(form);
      const result   = await submitApplicationAction(formData);
      if (result.ok) {
        setSuccess(true);
        formRef.current?.reset();
        setFile(null);
      } else {
        setServerError(result.error);
      }
    } catch {
      setServerError("__network__");
    } finally {
      setLoading(false);
    }
  }

  /* ── 送信完了 ── */
  if (success) {
    return (
      <div className="border border-[var(--border)] bg-[var(--card)] p-8 md:p-10">
        <p className="label-en text-[var(--fg-subtle)]">Thank you</p>
        <h3 className="mt-2 font-serif text-2xl font-bold text-[var(--fg)]">
          送信が完了しました
        </h3>
        <p className="mt-4 text-sm leading-7 text-[var(--fg-subtle)]">
          応募内容を受け付けました。内容を確認のうえ、担当者より2〜3営業日以内にご連絡いたします。
        </p>
        <p className="mt-2 text-xs text-[var(--fg-subtle)]">
          万が一、連絡がない場合はお電話（025-278-7274）でお問い合わせください。
        </p>
        <button
          onClick={() => { setSuccess(false); mountedAt.current = Date.now(); }}
          className="mt-6 text-xs font-bold uppercase tracking-widest text-[var(--fg-subtle)] underline transition-colors hover:text-[var(--fg)]"
        >
          別の内容で応募する
        </button>
      </div>
    );
  }

  /* ── フォーム ── */
  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-5" noValidate>

      {/* ハニーポット（ボット対策：人間には非表示） */}
      <input
        name="_trap"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", top: "-9999px", width: 0, height: 0, overflow: "hidden" }}
      />

      {/* 氏名 + 電話 */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label className="block text-xs font-bold uppercase tracking-widest text-[var(--fg-subtle)]">
            お名前 <span className="text-red-500">*</span>
          </label>
          <input name="name" type="text" required placeholder="山田 花子" className={inputCls("name")} />
          {fieldErrors.name && <FieldError msg={fieldErrors.name} />}
        </div>
        <div className="space-y-1.5">
          <label className="block text-xs font-bold uppercase tracking-widest text-[var(--fg-subtle)]">
            電話番号 <span className="text-red-500">*</span>
          </label>
          <input name="phone" type="tel" required placeholder="090-0000-0000" className={inputCls("phone")} />
          {fieldErrors.phone && <FieldError msg={fieldErrors.phone} />}
        </div>
      </div>

      {/* メール */}
      <div className="space-y-1.5">
        <label className="block text-xs font-bold uppercase tracking-widest text-[var(--fg-subtle)]">
          メールアドレス <span className="text-red-500">*</span>
        </label>
        <input name="email" type="email" required placeholder="hanako@example.com" className={inputCls("email")} />
        {fieldErrors.email && <FieldError msg={fieldErrors.email} />}
      </div>

      {/* 希望職種 + 経験 */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label className="block text-xs font-bold uppercase tracking-widest text-[var(--fg-subtle)]">
            希望職種 <span className="text-red-500">*</span>
          </label>
          <select
            name="position"
            required
            defaultValue=""
            className={inputCls("position")}
          >
            <option value="" disabled>選択してください</option>
            {POSITIONS.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
          {fieldErrors.position && <FieldError msg={fieldErrors.position} />}
        </div>
        <div className="space-y-1.5">
          <label className="block text-xs font-bold uppercase tracking-widest text-[var(--fg-subtle)]">
            経験年数
          </label>
          <select name="experience" defaultValue="" className="w-full border border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-sm text-[var(--fg)] outline-none transition-colors focus:border-[var(--fg)]">
            <option value="">選択してください（任意）</option>
            {EXPERIENCE_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        </div>
      </div>

      {/* メッセージ */}
      <div className="space-y-1.5">
        <label className="block text-xs font-bold uppercase tracking-widest text-[var(--fg-subtle)]">
          ひとこと・ご質問など
        </label>
        <textarea
          name="message"
          rows={6}
          placeholder="はじめまして。ご自身のこと、美容師を志したきっかけ、ブロレットへの興味など、どんなことでも気軽に書いてください。見学のご希望があればその旨もどうぞ。"
          className="w-full resize-none border border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-sm text-[var(--fg)] outline-none transition-colors placeholder:text-[var(--fg-subtle)] focus:border-[var(--fg)]"
        />
      </div>

      {/* 履歴書添付 */}
      <div className="space-y-1.5">
        <label className="block text-xs font-bold uppercase tracking-widest text-[var(--fg-subtle)]">
          履歴書（任意）
        </label>
        {file ? (
          <div className="flex items-center gap-3 border border-[var(--border)] bg-[var(--card-off)] px-4 py-3">
            <Paperclip size={14} className="shrink-0 text-[var(--fg-subtle)]" />
            <span className="min-w-0 flex-1 truncate text-sm text-[var(--fg)]">{file.name}</span>
            <button type="button" onClick={removeFile} className="shrink-0 text-[var(--fg-subtle)] transition-colors hover:text-[var(--fg)]" aria-label="ファイルを削除">
              <X size={14} />
            </button>
          </div>
        ) : (
          <label className="flex cursor-pointer items-center gap-3 border border-dashed border-[var(--border)] px-4 py-4 transition-colors hover:border-[var(--fg)]">
            <Paperclip size={14} className="shrink-0 text-[var(--fg-subtle)]" />
            <span className="text-sm text-[var(--fg-subtle)]">クリックしてファイルを選択（PDF・Word・画像、10MB以内）</span>
            <input name="resume" type="file" accept={ACCEPT_TYPES} onChange={handleFileChange} className="sr-only" />
          </label>
        )}
      </div>

      {/* サーバーエラー */}
      {serverError && <ServerErrorBox error={serverError} />}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[var(--cta)] px-5 py-4 text-xs font-bold uppercase tracking-widest text-[var(--cta-text)] transition-opacity hover:opacity-75 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {loading ? "送信中..." : "応募・見学を申し込む"}
      </button>

      <p className="text-xs leading-6 text-[var(--fg-subtle)]">
        ご入力いただいた情報は採用選考のみに使用します。まずは見学・お問い合わせだけでも歓迎です。
      </p>
    </form>
  );
}

/* ── サブコンポーネント ───────────────────────── */

function FieldError({ msg }: { msg: string }) {
  return (
    <p className="flex items-center gap-1.5 text-xs text-red-600">
      <AlertCircle size={11} className="shrink-0" />
      {msg}
    </p>
  );
}

function ServerErrorBox({ error }: { error: string }) {
  const isSpeed   = error === "__speed__";
  const isNetwork = error === "__network__";

  const title = isSpeed || isNetwork
    ? "送信できませんでした"
    : "入力内容をご確認ください";

  const body = isSpeed || isNetwork
    ? "一時的な問題が発生しました。ページを再読み込みしてから再度お試しください。"
    : error;

  const hint = isSpeed || isNetwork
    ? "解決しない場合はお電話（025-278-7274）またはInstagramのDMでご連絡ください。"
    : null;

  return (
    <div className="border border-red-200 bg-red-50 px-5 py-4 space-y-1">
      <p className="flex items-center gap-2 text-sm font-bold text-red-700">
        <AlertCircle size={14} className="shrink-0" />
        {title}
      </p>
      <p className="text-xs leading-6 text-red-600">{body}</p>
      {hint && <p className="text-xs text-red-400">{hint}</p>}
    </div>
  );
}
