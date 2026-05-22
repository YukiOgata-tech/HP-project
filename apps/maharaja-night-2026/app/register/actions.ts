"use server";

import { getAdminDb } from "@client-sites/lib/cms/firebase-admin";

export async function submitRegistration(formData: FormData) {
  const siteId = process.env.SITE_ID;
  if (!siteId) throw new Error("SITE_ID is not defined");

  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const type = formData.get("type") as string;

  if (!name || !email || !type) {
    throw new Error("Missing required fields");
  }

  const db = getAdminDb();
  await db.collection("sites").doc(siteId).collection("registrations").add({
    name,
    email,
    type,
    status: "pending",
    createdAt: new Date(),
  });

  return { success: true };
}
