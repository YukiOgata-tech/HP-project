/**
 * CMS ユーザー管理スクリプト
 *
 * 使い方（リポジトリルートで実行）:
 *   pnpm manage-cms-user create --email EMAIL --password PASS --name "表示名" --role ROLE --sites SITE1,SITE2
 *   pnpm manage-cms-user update --email EMAIL [--role ROLE] [--sites SITE1,SITE2] [--name NAME]
 *   pnpm manage-cms-user list
 *   pnpm manage-cms-user delete --email EMAIL
 *
 * ロール一覧:
 *   superAdmin  全サイト・全操作が可能（保守用）
 *   siteAdmin   指定サイトの記事作成・編集・削除が可能
 *   editor      指定サイトの記事作成・編集が可能（削除不可）
 *   viewer      指定サイトの下書き閲覧のみ
 */

import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore, Timestamp } from 'firebase-admin/firestore';

// ── Firebase 初期化（--env-file で自動ロード済み） ──────────────────────────
const projectId   = process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const privateKey  = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

if (!projectId || !clientEmail || !privateKey) {
  console.error('❌ Firebase Admin 環境変数が不足しています。');
  console.error('   FIREBASE_PROJECT_ID / FIREBASE_CLIENT_EMAIL / FIREBASE_PRIVATE_KEY を確認してください。');
  process.exit(1);
}

if (!getApps().length) {
  initializeApp({ credential: cert({ projectId, clientEmail, privateKey }) });
}

const auth = getAuth();
const db   = getFirestore();

// ── 引数パーサー ─────────────────────────────────────────────────────────────
function parseArgs(argv) {
  const [cmd, ...rest] = argv;
  const args = {};
  for (let i = 0; i < rest.length; i++) {
    if (rest[i].startsWith('--') && rest[i + 1] !== undefined) {
      args[rest[i].slice(2)] = rest[i + 1];
      i++;
    }
  }
  return { cmd, ...args };
}

const { cmd, email, password, name: displayName, role, sites } = parseArgs(process.argv.slice(2));

// ── バリデーション ────────────────────────────────────────────────────────────
const VALID_ROLES = ['superAdmin', 'siteAdmin', 'editor', 'viewer'];

function validateRole(r) {
  if (!VALID_ROLES.includes(r)) {
    console.error(`❌ 無効なロール: "${r}"\n   有効なロール: ${VALID_ROLES.join(' / ')}`);
    process.exit(1);
  }
}

// ── 操作：create ─────────────────────────────────────────────────────────────
async function createUser() {
  if (!email || !password || !role) {
    console.error('❌ --email --password --role は必須です。');
    console.error('   例: pnpm manage-cms-user create --email foo@bar.com --password P@ss1234 --role siteAdmin --sites hair-salon01');
    process.exit(1);
  }

  validateRole(role);
  const siteIds = role === 'superAdmin' ? [] : (sites?.split(',').map(s => s.trim()) ?? []);
  const name    = displayName ?? email.split('@')[0];

  // Firebase Auth にユーザーを作成
  let authUser;
  try {
    authUser = await auth.createUser({
      email,
      password,
      displayName: name,
      emailVerified: false,
    });
  } catch (err) {
    if (err.code === 'auth/email-already-exists') {
      console.error(`❌ このメールアドレスはすでに Auth に登録されています: ${email}`);
      console.error('   ロール・サイトのみ変更する場合は "update" コマンドを使用してください。');
    } else {
      console.error('❌ Auth ユーザー作成に失敗しました:', err.message);
    }
    process.exit(1);
  }

  // Firestore に users/{uid} を作成
  await db.collection('users').doc(authUser.uid).set({
    email,
    displayName: name,
    role,
    siteIds,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  });

  console.log('✅ ユーザーを作成しました');
  console.log(`   UID         : ${authUser.uid}`);
  console.log(`   Email       : ${email}`);
  console.log(`   DisplayName : ${name}`);
  console.log(`   Role        : ${role}`);
  console.log(`   SiteIDs     : ${siteIds.length ? siteIds.join(', ') : '（全サイト — superAdmin）'}`);
  console.log('');
  console.log('⚠  初回ログイン後にパスワードを変更してください。');
}

// ── 操作：update ─────────────────────────────────────────────────────────────
async function updateUser() {
  if (!email) {
    console.error('❌ --email は必須です。');
    process.exit(1);
  }

  let authUser;
  try {
    authUser = await auth.getUserByEmail(email);
  } catch {
    console.error(`❌ Auth にユーザーが見つかりません: ${email}`);
    process.exit(1);
  }

  const docRef     = db.collection('users').doc(authUser.uid);
  const snapshot   = await docRef.get();

  if (!snapshot.exists) {
    console.error(`❌ Firestore にユーザードキュメントが見つかりません: ${authUser.uid}`);
    process.exit(1);
  }

  const updates = { updatedAt: Timestamp.now() };

  if (role) {
    validateRole(role);
    updates.role = role;
  }

  if (sites !== undefined) {
    updates.siteIds = sites.split(',').map(s => s.trim());
  }

  if (displayName) {
    updates.displayName = displayName;
    await auth.updateUser(authUser.uid, { displayName });
  }

  await docRef.update(updates);

  const updated = { ...snapshot.data(), ...updates };
  console.log('✅ ユーザーを更新しました');
  console.log(`   Email       : ${email}`);
  console.log(`   DisplayName : ${updated.displayName}`);
  console.log(`   Role        : ${updated.role}`);
  console.log(`   SiteIDs     : ${updated.siteIds?.length ? updated.siteIds.join(', ') : '（全サイト — superAdmin）'}`);
}

// ── 操作：list ───────────────────────────────────────────────────────────────
async function listUsers() {
  const snapshot = await db.collection('users').orderBy('createdAt', 'asc').get();

  if (snapshot.empty) {
    console.log('（ユーザーが登録されていません）');
    return;
  }

  console.log(`\n${'UID'.padEnd(30)} ${'Email'.padEnd(35)} ${'Role'.padEnd(12)} SiteIDs`);
  console.log('-'.repeat(110));

  for (const doc of snapshot.docs) {
    const d = doc.data();
    const siteStr = d.role === 'superAdmin' ? '（全サイト）' : (d.siteIds ?? []).join(', ');
    console.log(
      `${doc.id.padEnd(30)} ${(d.email ?? '').padEnd(35)} ${(d.role ?? '').padEnd(12)} ${siteStr}`
    );
  }
  console.log('');
}

// ── 操作：delete ─────────────────────────────────────────────────────────────
async function deleteUser() {
  if (!email) {
    console.error('❌ --email は必須です。');
    process.exit(1);
  }

  let authUser;
  try {
    authUser = await auth.getUserByEmail(email);
  } catch {
    console.error(`❌ Auth にユーザーが見つかりません: ${email}`);
    process.exit(1);
  }

  await auth.deleteUser(authUser.uid);
  await db.collection('users').doc(authUser.uid).delete();

  console.log(`✅ ユーザーを削除しました: ${email}`);
}

// ── 使い方表示 ────────────────────────────────────────────────────────────────
function showHelp() {
  console.log(`
CMS ユーザー管理スクリプト

使い方:
  pnpm manage-cms-user <command> [options]

コマンド:
  create  新規ユーザーを作成
  update  既存ユーザーのロール・サイト・名前を変更
  list    全ユーザーを一覧表示
  delete  ユーザーを削除（Auth + Firestore）

create オプション:
  --email     メールアドレス（必須）
  --password  初期パスワード（必須、8文字以上）
  --name      表示名（省略時はメールアドレスのローカル部）
  --role      ロール（必須）: superAdmin | siteAdmin | editor | viewer
  --sites     アクセス可能なサイトID（カンマ区切り。superAdminは省略可）

update オプション:
  --email     対象ユーザーのメールアドレス（必須）
  --role      新しいロール（省略時は変更しない）
  --sites     新しいサイトID（カンマ区切り。省略時は変更しない）
  --name      新しい表示名（省略時は変更しない）

例:
  pnpm manage-cms-user create --email owner@salon.com --password P@ss1234 --name "山田 花子" --role siteAdmin --sites hair-salon01
  pnpm manage-cms-user update --email owner@salon.com --sites hair-salon01,new-site-01
  pnpm manage-cms-user list
  pnpm manage-cms-user delete --email old@example.com
`);
}

// ── エントリーポイント ─────────────────────────────────────────────────────────
switch (cmd) {
  case 'create': await createUser(); break;
  case 'update': await updateUser(); break;
  case 'list':   await listUsers();  break;
  case 'delete': await deleteUser(); break;
  default:       showHelp();         break;
}
