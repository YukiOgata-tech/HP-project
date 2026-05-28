"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  createApplication,
  updateApplicationStatus,
  deleteApplication,
  uploadResumeToStorageAdmin,
} from "@client-sites/lib/cms";
import type { ApplicationStatus } from "@client-sites/lib/cms/types";

const SITE_ID = process.env.SITE_ID!;

type ActionResult = { ok: true } | { ok: false; error: string };

/* ── バリデーションユーティリティ ─────────────── */

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone: string): boolean {
  const cleaned = phone
    .replace(/[０-９]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xfee0))
    .replace(/[\-\s\(\)]/g, "");
  return /^0[0-9]{9,10}$/.test(cleaned);
}

/* ─────────────────────────────────────────────── */

export async function submitApplicationAction(formData: FormData): Promise<ActionResult> {
  try {
    /* ハニーポットチェック — ボットは全フィールドを埋める */
    const trap = (formData.get("_trap") as string | null) ?? "";
    if (trap.length > 0) {
      // ボットに対しては成功を装って何もしない
      return { ok: true };
    }

    const name         = (formData.get("name")         as string).trim();
    const phone        = (formData.get("phone")        as string).trim();
    const email        = (formData.get("email")        as string).trim();
    const position     = (formData.get("position")     as string).trim();
    const experience   = (formData.get("experience")   as string).trim();
    const message      = (formData.get("message")      as string).trim();
    const resumeFile   =  formData.get("resume")       as File | null;

    /* 必須チェック */
    if (!name || !phone || !email || !position) {
      return { ok: false, error: "必須項目を入力してください" };
    }

    /* メールアドレス形式チェック */
    if (!isValidEmail(email)) {
      return { ok: false, error: "正しいメールアドレスを入力してください（例: name@example.com）" };
    }

    /* 電話番号形式チェック */
    if (!isValidPhone(phone)) {
      return { ok: false, error: "正しい電話番号を入力してください（例: 090-0000-0000）" };
    }

    /* メッセージ長チェック（スパム対策） */
    if (message.length > 2000) {
      return { ok: false, error: "メッセージは2000文字以内で入力してください" };
    }

    let resumeUrl: string | null = null;
    let resumeFileName: string | null = null;

    if (resumeFile && resumeFile.size > 0) {
      const MAX_BYTES = 10 * 1024 * 1024; // 10 MB
      if (resumeFile.size > MAX_BYTES) {
        return { ok: false, error: "履歴書ファイルは10MB以内でお願いします" };
      }
      const result = await uploadResumeToStorageAdmin(resumeFile, SITE_ID);
      resumeUrl = result.url;
      resumeFileName = result.fileName;
    }

    await createApplication(SITE_ID, {
      name, phone, email, position, experience, message, resumeUrl, resumeFileName,
    });

    revalidatePath("/admin/applications");
    return { ok: true };
  } catch (e) {
    console.error("submitApplicationAction failed", e);
    return { ok: false, error: "送信に失敗しました。しばらくしてから再度お試しください。" };
  }
}

export async function updateApplicationStatusAction(
  id: string,
  status: ApplicationStatus
): Promise<ActionResult> {
  try {
    await updateApplicationStatus(SITE_ID, id, status);
    revalidatePath("/admin/applications");
    revalidatePath(`/admin/applications/${id}`);
    return { ok: true };
  } catch (e) {
    return { ok: false, error: (e as Error).message };
  }
}

export async function deleteApplicationAndRedirect(id: string): Promise<void> {
  await deleteApplication(SITE_ID, id);
  revalidatePath("/admin/applications");
  redirect("/admin/applications");
}
