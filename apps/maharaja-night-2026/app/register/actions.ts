"use server";

import { getAdminDb } from "@client-sites/lib/cms/firebase-admin";

export async function submitRegistration(formData: FormData) {
  const siteId = process.env.SITE_ID;
  if (!siteId) throw new Error("SITE_ID is not defined");

  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const type = formData.get("type") as string;
  const phone = (formData.get("phone") as string) || "";
  const numberOfPeople = Number(formData.get("numberOfPeople") || 1);
  const note = (formData.get("note") as string) || "";

  if (!name || !email || !type) {
    throw new Error("Missing required fields");
  }

  const db = getAdminDb();
  await db.collection("sites").doc(siteId).collection("registrations").add({
    name,
    email,
    phone,
    type,
    numberOfPeople: Number.isFinite(numberOfPeople) && numberOfPeople > 0 ? numberOfPeople : 1,
    note,
    status: "pending",
    createdAt: new Date(),
  });

  return { success: true };
}
