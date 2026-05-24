"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getAdminDb } from "@client-sites/lib/cms/firebase-admin";
import {
  createReceiptToken,
  generateReceiptId,
  getTicketCollection,
  hashKey,
  normalizeLookupValue,
} from "./receipt";

const SOURCE_OPTIONS = [
  "知人のクチコミ",
  "ラジオ",
  "イベントサイト（こくちーず、Peatix等）",
  "Facebook",
  "X（Twitter）",
  "Instagram",
  "チラシ",
  "クラウドファンディング",
  "飲食店に置いてあるフライヤー",
  "その他",
];

const VIP_OPTIONS = [
  "必要（前半 18:00〜21:00）",
  "必要（後半 21:30〜ラスト）",
  "不要",
  "その他",
];

const MIN_SUBMIT_MS = 2500;
const IP_LIMIT = { count: 5, windowMs: 60 * 60 * 1000 };
const EMAIL_LIMIT = { count: 3, windowMs: 24 * 60 * 60 * 1000 };
const LOOKUP_IP_LIMIT = { count: 20, windowMs: 60 * 60 * 1000 };

async function getRequestIp() {
  const headerStore = await headers();
  const forwardedFor = headerStore.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwardedFor || headerStore.get("x-real-ip") || "unknown";
}

async function checkAndRecordRateLimit(kind: "ip" | "email" | "lookup_ip", value: string, limit: { count: number; windowMs: number }) {
  const db = getAdminDb();
  const now = Date.now();
  const ref = db
    .collection("sites")
    .doc(process.env.SITE_ID!)
    .collection("preTicketRateLimits")
    .doc(`${kind}_${hashKey(value.toLowerCase())}`);

  const snapshot = await ref.get();
  const data = snapshot.exists ? snapshot.data() : null;
  const windowStart = Number(data?.windowStart ?? 0);
  const count = Number(data?.count ?? 0);
  const isSameWindow = now - windowStart < limit.windowMs;

  if (isSameWindow && count >= limit.count) {
    return false;
  }

  await ref.set(
    {
      kind,
      count: isSameWindow ? count + 1 : 1,
      windowStart: isSameWindow ? windowStart : now,
      updatedAt: new Date(),
    },
    { merge: true },
  );

  return true;
}

export async function submitPreTicket(formData: FormData) {
  const siteId = process.env.SITE_ID;
  if (!siteId) throw new Error("SITE_ID is not defined");

  const website = String(formData.get("website") || "").trim();
  const formStartedAt = Number(formData.get("formStartedAt") || 0);
  const elapsed = Date.now() - formStartedAt;

  if (website || !Number.isFinite(elapsed) || elapsed < MIN_SUBMIT_MS) {
    redirect("/pre-ticket?submitted=1");
  }

  const email = String(formData.get("email") || "").trim();
  const name = String(formData.get("name") || "").trim();
  const gender = String(formData.get("gender") || "").trim();
  const source = String(formData.get("source") || "").trim();
  const sourceOther = String(formData.get("sourceOther") || "").trim();
  const numberOfPeople = Number(formData.get("numberOfPeople") || 1);
  const referrer = String(formData.get("referrer") || "").trim();
  const vipTable = String(formData.get("vipTable") || "").trim();
  const note = String(formData.get("note") || "").trim();

  if (!email || !name || !["MEN", "WOMEN"].includes(gender)) {
    throw new Error("必須項目が不足しています。");
  }
  if (!SOURCE_OPTIONS.includes(source)) {
    throw new Error("イベントを知ったきっかけを選択してください。");
  }
  if (!VIP_OPTIONS.includes(vipTable)) {
    throw new Error("VIP TABLE CHARGE の希望を選択してください。");
  }

  const ip = await getRequestIp();
  const ipAllowed = await checkAndRecordRateLimit("ip", ip, IP_LIMIT);
  const emailAllowed = await checkAndRecordRateLimit("email", email, EMAIL_LIMIT);

  if (!ipAllowed || !emailAllowed) {
    redirect("/pre-ticket?error=rate-limit");
  }

  const people = Number.isFinite(numberOfPeople) && numberOfPeople > 0
    ? Math.min(Math.floor(numberOfPeople), 20)
    : 1;
  const receiptId = generateReceiptId();
  const receipt = createReceiptToken();
  const docRef = getTicketCollection().doc();

  await docRef.set({
      email,
      name,
      normalizedEmail: normalizeLookupValue(email),
      normalizedName: normalizeLookupValue(name),
      receiptId,
      receiptTokenHash: receipt.tokenHash,
      receiptTokenExpiresAt: receipt.expiresAt,
      gender,
      source,
      sourceOther,
      numberOfPeople: people,
      referrer,
      vipTable,
      note,
      discountAmount: 500,
      requestIpHash: hashKey(ip),
      status: "pending",
      createdAt: new Date(),
      updatedAt: new Date(),
  });

  redirect(`/pre-ticket/complete?token=${receipt.token}`);
}

export async function lookupPreTicket(formData: FormData) {
  const receiptId = String(formData.get("receiptId") || "").trim().toUpperCase();
  const email = String(formData.get("email") || "").trim();
  const name = String(formData.get("name") || "").trim();
  const website = String(formData.get("website") || "").trim();

  if (website) {
    redirect("/pre-ticket/lookup?error=not-found");
  }

  const ip = await getRequestIp();
  const ipAllowed = await checkAndRecordRateLimit("lookup_ip", ip, LOOKUP_IP_LIMIT);
  if (!ipAllowed) {
    redirect("/pre-ticket/lookup?error=rate-limit");
  }

  if (!receiptId || !email || !name) {
    redirect("/pre-ticket/lookup?error=missing");
  }

  const snapshot = await getTicketCollection()
    .where("receiptId", "==", receiptId)
    .limit(1)
    .get();

  if (snapshot.empty) {
    redirect("/pre-ticket/lookup?error=not-found");
  }

  const doc = snapshot.docs[0];
  const data = doc.data();
  const emailMatched = data.normalizedEmail === normalizeLookupValue(email);
  const nameMatched = data.normalizedName === normalizeLookupValue(name);

  if (!emailMatched || !nameMatched) {
    redirect("/pre-ticket/lookup?error=not-found");
  }

  const receipt = createReceiptToken();
  await doc.ref.update({
    receiptTokenHash: receipt.tokenHash,
    receiptTokenExpiresAt: receipt.expiresAt,
    updatedAt: new Date(),
  });

  redirect(`/pre-ticket/complete?token=${receipt.token}`);
}
