import { getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

function getFirebaseApp() {
  if (getApps().length > 0) return getApps()[0];
  return initializeApp({
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
  });
}

export function getClientAuth() {
  getFirebaseApp();
  return getAuth();
}

export function getClientStorage() {
  getFirebaseApp();
  return getStorage();
}

export async function uploadImageToStorage(
  file: File,
  siteId: string
): Promise<string> {
  const storage = getClientStorage();
  const ext = file.name.split(".").pop();
  const filename = `${siteId}/images/${Date.now()}-${Math.random()
    .toString(36)
    .slice(2)}.${ext}`;
  const storageRef = ref(storage, filename);
  await uploadBytes(storageRef, file, { contentType: file.type });
  return getDownloadURL(storageRef);
}
