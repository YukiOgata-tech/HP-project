"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyIdToken, getCmsUser, hasSiteAccess } from "@client-sites/lib/cms";
import type { CmsUser } from "@client-sites/lib/cms/types";

const SITE_ID = process.env.SITE_ID!;
const SESSION_COOKIE = "__session";
const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export async function createSession(idToken: string): Promise<void> {
  const verified = await verifyIdToken(idToken);
  if (!verified) throw new Error("Invalid token");

  const user = await getCmsUser(verified.uid);
  if (!user) throw new Error("User not registered");
  if (!hasSiteAccess(user, SITE_ID)) throw new Error("Access denied");

  const jar = await cookies();
  jar.set(SESSION_COOKIE, idToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_MAX_AGE,
    path: "/",
  });
}

export async function deleteSession(): Promise<void> {
  const jar = await cookies();
  jar.delete(SESSION_COOKIE);
  redirect("/admin/login");
}

export async function getSessionUser(): Promise<CmsUser | null> {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value;
  if (!token) return null;

  const verified = await verifyIdToken(token);
  if (!verified) return null;

  return getCmsUser(verified.uid);
}
