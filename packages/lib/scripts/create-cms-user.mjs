/**
 * CMS 管理ユーザー作成スクリプト
 *
 * 使い方:
 *   pnpm create-cms-user
 *
 * Firebase Auth ユーザーの作成と Firestore users/{uid} の登録を同時に行います。
 * このファイルの下部にある「設定」セクションを編集してから実行してください。
 */

import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore, Timestamp } from "firebase-admin/firestore";

// ── Firebase 初期化（.env.local から自動読み込み） ──────────────────────────
const projectId = process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

if (!projectId || !clientEmail || !privateKey) {
  console.error("❌ Firebase Admin の環境変数が不足しています。");
  console.error(
    "   FIREBASE_PROJECT_ID / FIREBASE_CLIENT_EMAIL / FIREBASE_PRIVATE_KEY を確認してください。"
  );
  process.exit(1);
}

if (!getApps().length) {
  initializeApp({ credential: cert({ projectId, clientEmail, privateKey }) });
}

const auth = getAuth();
const db = getFirestore();

// ── 設定（ここを編集して実行してください） ───────────────────────────────────
const EMAIL = "admin@example.com"; // ← 変更
const PASSWORD = "ChangeMe123!"; // ← 変更（初回ログイン後に変更推奨）
const DISPLAY_NAME = "管理者"; // ← 変更
const ROLE = "siteAdmin"; // superAdmin / siteAdmin / editor / viewer
const SITE_IDS = ["hair-salon01"]; // アクセスを許可するサイト
// ────────────────────────────────────────────────────────────────────────────

try {
  // Firebase Auth にユーザーを作成
  const authUser = await auth.createUser({
    email: EMAIL,
    password: PASSWORD,
    displayName: DISPLAY_NAME,
    emailVerified: false,
  });

  // Firestore に users/{uid} を作成（Auth の UID と一致）
  await db
    .collection("users")
    .doc(authUser.uid)
    .set({
      email: EMAIL,
      displayName: DISPLAY_NAME,
      role: ROLE,
      siteIds: SITE_IDS,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });

  console.log("✅ ユーザーを作成しました");
  console.log(`   UID         : ${authUser.uid}`);
  console.log(`   Email       : ${EMAIL}`);
  console.log(`   DisplayName : ${DISPLAY_NAME}`);
  console.log(`   Role        : ${ROLE}`);
  console.log(`   SiteIDs     : ${SITE_IDS.join(", ")}`);
  console.log("");
  console.log("⚠  初回ログイン後にパスワードを変更してください。");
} catch (err) {
  if (err.code === "auth/email-already-exists") {
    console.error(`❌ このメールアドレスはすでに Auth に登録されています: ${EMAIL}`);
  } else {
    console.error("❌ エラーが発生しました:", err.message);
  }
  process.exit(1);
}
