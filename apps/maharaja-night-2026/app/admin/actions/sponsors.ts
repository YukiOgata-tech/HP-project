"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { canEdit } from "@client-sites/lib/cms";
import { getAdminDb } from "@client-sites/lib/cms/firebase-admin";
import { getSessionUser } from "./session";

const SITE_ID = process.env.SITE_ID!;

async function requireEditor() {
  const user = await getSessionUser();
  if (!user) throw new Error("Unauthorized");
  if (!canEdit(user, SITE_ID)) throw new Error("Access denied");
  return user;
}

function sponsorsCol() {
  return getAdminDb().collection("sites").doc(SITE_ID).collection("sponsors");
}

function readSponsorForm(formData: FormData) {
  return {
    name: String(formData.get("name") || "").trim(),
    logoUrl: String(formData.get("logoUrl") || "").trim(),
    websiteUrl: String(formData.get("websiteUrl") || "").trim(),
    tier: String(formData.get("tier") || "regular"),
    order: Number(formData.get("order") || 0),
    isActive: formData.get("isActive") === "on",
  };
}

export async function createSponsorAction(formData: FormData): Promise<void> {
  await requireEditor();
  const input = readSponsorForm(formData);
  if (!input.name) throw new Error("Sponsor name is required");

  await sponsorsCol().add({
    ...input,
    order: Number.isFinite(input.order) ? input.order : 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  revalidatePath("/");
  revalidatePath("/admin/sponsors");
  redirect("/admin/sponsors");
}

export async function updateSponsorAction(
  sponsorId: string,
  formData: FormData
): Promise<void> {
  await requireEditor();
  const input = readSponsorForm(formData);
  if (!input.name) throw new Error("Sponsor name is required");

  await sponsorsCol().doc(sponsorId).update({
    ...input,
    order: Number.isFinite(input.order) ? input.order : 0,
    updatedAt: new Date(),
  });

  revalidatePath("/");
  revalidatePath("/admin/sponsors");
  revalidatePath(`/admin/sponsors/${sponsorId}/edit`);
  redirect("/admin/sponsors");
}

export async function deleteSponsorAction(sponsorId: string): Promise<void> {
  await requireEditor();
  await sponsorsCol().doc(sponsorId).delete();
  revalidatePath("/");
  revalidatePath("/admin/sponsors");
  redirect("/admin/sponsors");
}
