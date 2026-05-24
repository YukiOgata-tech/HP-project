import "server-only";

import crypto from "node:crypto";
import { getAdminDb } from "@client-sites/lib/cms/firebase-admin";

const SITE_ID = process.env.SITE_ID!;
const RECEIPT_TOKEN_MS = 30 * 60 * 1000;

export interface ReceiptTicket {
  id: string;
  receiptId?: string;
  email?: string;
  name?: string;
  gender?: string;
  numberOfPeople?: number;
  createdAt?: {
    toDate?: () => Date;
  };
  receiptTokenExpiresAt?: {
    toDate?: () => Date;
  };
}

export function hashKey(value: string) {
  return crypto.createHash("sha256").update(value).digest("hex");
}

export function normalizeLookupValue(value: string) {
  return value.trim().replace(/\s+/g, " ").toLowerCase();
}

export function generateReceiptId() {
  return `MN2026-${crypto.randomBytes(4).toString("hex").toUpperCase()}`;
}

export function createReceiptToken() {
  const token = crypto.randomBytes(24).toString("base64url");
  return {
    token,
    tokenHash: hashKey(token),
    expiresAt: new Date(Date.now() + RECEIPT_TOKEN_MS),
  };
}

export function getTicketCollection() {
  return getAdminDb().collection("sites").doc(SITE_ID).collection("preTickets");
}

export async function getReceiptTicketByToken(token: string): Promise<ReceiptTicket | null> {
  if (!token) return null;

  const snapshot = await getTicketCollection()
    .where("receiptTokenHash", "==", hashKey(token))
    .limit(1)
    .get();

  if (snapshot.empty) return null;

  const doc = snapshot.docs[0];
  const data = doc.data() as ReceiptTicket;
  const expiresAt = data.receiptTokenExpiresAt?.toDate?.();

  if (!expiresAt || expiresAt.getTime() < Date.now()) {
    return null;
  }

  return {
    ...data,
    id: doc.id,
  };
}
