import { getApps, initializeApp, type FirebaseOptions } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

export function initFirebaseClient(config: FirebaseOptions) {
  if (getApps().length > 0) return getApps()[0];
  return initializeApp(config);
}

export function getClientAuth() {
  return getAuth();
}

export function getClientStorage() {
  return getStorage();
}
