"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyIdToken, getCmsUser, hasSiteAccess } from "@client-sites/lib/cms";
import type { CmsUser } from "@client-sites/lib/cms/types";
import {
  createSessionToken,
  SESSION_COOKIE,
  SESSION_MAX_AGE,
  verifySessionToken,
} from "../lib/session-token";

const SITE_ID = process.env.SITE_ID!;

export async function createSession(idToken: string): Promise<void> {
  const verified = await verifyIdToken(idToken);
  if (!verified) throw new Error("Invalid token");

  const user = await getCmsUser(verified.uid);
  if (!user) throw new Error("User not registered");
  if (!hasSiteAccess(user, SITE_ID)) throw new Error("Access denied");

  const jar = await cookies();
  const sessionToken = await createSessionToken(user.uid);
  jar.set(SESSION_COOKIE, sessionToken, {
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

  const verified = await verifySessionToken(token);
  if (!verified) return null;

  const user = await getCmsUser(verified.uid);
  if (!user) return null;
  if (!hasSiteAccess(user, SITE_ID)) return null;
  return user;
}
