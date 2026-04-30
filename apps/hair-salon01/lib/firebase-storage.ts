"use client";

import "./firebase-client"; // ensure app is initialized
import { getClientStorage } from "@client-sites/lib/cms/client";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export async function uploadImageToStorage(
  file: File,
  siteId: string
): Promise<string> {
  const storage = getClientStorage();
  const ext = file.name.split(".").pop();
  const filename = `${siteId}/images/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const storageRef = ref(storage, filename);
  await uploadBytes(storageRef, file, { contentType: file.type });
  return getDownloadURL(storageRef);
}
