import "server-only";
import { Timestamp } from "firebase-admin/firestore";
import { getAdminDb, getAdminAuth } from "./firebase-admin";
import type { CmsUser, Role } from "./types";

interface UserDocument {
  email: string;
  displayName: string;
  role: Role;
  siteIds: string[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

function serializeUser(uid: string, doc: UserDocument): CmsUser {
  return {
    uid,
    email: doc.email,
    displayName: doc.displayName,
    role: doc.role,
    siteIds: doc.siteIds,
    createdAt: doc.createdAt.toDate().toISOString(),
    updatedAt: doc.updatedAt.toDate().toISOString(),
  };
}

export async function verifyIdToken(
  token: string
): Promise<{ uid: string } | null> {
  try {
    const decoded = await getAdminAuth().verifyIdToken(token);
    return { uid: decoded.uid };
  } catch {
    return null;
  }
}

export async function getCmsUser(uid: string): Promise<CmsUser | null> {
  const snapshot = await getAdminDb().collection("users").doc(uid).get();
  if (!snapshot.exists) return null;
  return serializeUser(uid, snapshot.data() as UserDocument);
}

export function hasSiteAccess(user: CmsUser, siteId: string): boolean {
  if (user.role === "superAdmin") return true;
  return user.siteIds.includes(siteId);
}

export function canEdit(user: CmsUser, siteId: string): boolean {
  if (user.role === "viewer") return false;
  return hasSiteAccess(user, siteId);
}

export function isSuperAdmin(user: CmsUser): boolean {
  return user.role === "superAdmin";
}

export async function requireSiteAccess(
  uid: string,
  siteId: string
): Promise<CmsUser> {
  const user = await getCmsUser(uid);
  if (!user) throw new Error("User not found");
  if (!hasSiteAccess(user, siteId)) throw new Error("Access denied");
  return user;
}
