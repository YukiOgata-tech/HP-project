import "server-only";
import { Timestamp } from "firebase-admin/firestore";
import { getAdminDb, getAdminStorage } from "./firebase-admin";
import type { Application, ApplicationCreateInput, ApplicationStatus } from "./types";

interface ApplicationDocument {
  siteId: string;
  name: string;
  phone: string;
  email: string;
  position: string;
  experience: string;
  message: string;
  resumeUrl: string | null;
  resumeFileName: string | null;
  status: ApplicationStatus;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

function serialize(id: string, siteId: string, doc: ApplicationDocument): Application {
  return {
    id,
    siteId,
    name: doc.name,
    phone: doc.phone,
    email: doc.email,
    position: doc.position,
    experience: doc.experience,
    message: doc.message,
    resumeUrl: doc.resumeUrl,
    resumeFileName: doc.resumeFileName,
    status: doc.status,
    createdAt: doc.createdAt.toDate().toISOString(),
    updatedAt: doc.updatedAt.toDate().toISOString(),
  };
}

function applicationsCol(siteId: string) {
  return getAdminDb().collection("sites").doc(siteId).collection("applications");
}

export async function uploadResumeToStorageAdmin(
  file: File,
  siteId: string
): Promise<{ url: string; fileName: string }> {
  const storage = getAdminStorage();
  const bucket = storage.bucket(process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET);
  const ext = file.name.split(".").pop() ?? "bin";
  const path = `${siteId}/resumes/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  const token = crypto.randomUUID();
  const fileRef = bucket.file(path);
  await fileRef.save(buffer, {
    metadata: {
      contentType: file.type,
      metadata: { firebaseStorageDownloadTokens: token },
    },
  });
  const url = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(path)}?alt=media&token=${token}`;
  return { url, fileName: file.name };
}

export async function createApplication(
  siteId: string,
  input: ApplicationCreateInput
): Promise<Application> {
  const now = Timestamp.now();
  const ref = applicationsCol(siteId).doc();
  const doc: ApplicationDocument = {
    siteId,
    ...input,
    status: "new",
    createdAt: now,
    updatedAt: now,
  };
  await ref.set(doc);
  return serialize(ref.id, siteId, doc);
}

export async function getApplication(
  siteId: string,
  id: string
): Promise<Application | null> {
  const snapshot = await applicationsCol(siteId).doc(id).get();
  if (!snapshot.exists) return null;
  return serialize(snapshot.id, siteId, snapshot.data() as ApplicationDocument);
}

export async function getAllApplications(siteId: string): Promise<Application[]> {
  const snapshot = await applicationsCol(siteId).orderBy("createdAt", "desc").get();
  return snapshot.docs.map((doc) =>
    serialize(doc.id, siteId, doc.data() as ApplicationDocument)
  );
}

export async function updateApplicationStatus(
  siteId: string,
  id: string,
  status: ApplicationStatus
): Promise<void> {
  await applicationsCol(siteId).doc(id).update({
    status,
    updatedAt: Timestamp.now(),
  });
}

export async function deleteApplication(siteId: string, id: string): Promise<void> {
  await applicationsCol(siteId).doc(id).delete();
}
