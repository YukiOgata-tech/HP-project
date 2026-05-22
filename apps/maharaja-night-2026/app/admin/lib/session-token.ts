const SESSION_SECRET =
  process.env.ADMIN_SESSION_SECRET ?? process.env.FIREBASE_PRIVATE_KEY ?? "";

export const SESSION_COOKIE = "__session";
export const SESSION_MAX_AGE = 60 * 60 * 24; // 1 day

interface SessionPayload {
  uid: string;
  exp: number;
}

let signingKeyPromise: Promise<CryptoKey> | null = null;

function getSigningKey(): Promise<CryptoKey> {
  if (!SESSION_SECRET) {
    throw new Error("Session secret is not configured");
  }

  if (!signingKeyPromise) {
    signingKeyPromise = crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(SESSION_SECRET),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign", "verify"],
    );
  }

  return signingKeyPromise;
}

function encodeBase64Url(input: Uint8Array): string {
  return btoa(String.fromCharCode(...input))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function decodeBase64Url(input: string): Uint8Array {
  const normalized = input.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized.padEnd(normalized.length + ((4 - (normalized.length % 4)) % 4), "=");
  return Uint8Array.from(atob(padded), (char) => char.charCodeAt(0));
}

function toArrayBuffer(bytes: Uint8Array): ArrayBuffer {
  return bytes.buffer.slice(
    bytes.byteOffset,
    bytes.byteOffset + bytes.byteLength,
  ) as ArrayBuffer;
}

async function sign(value: string): Promise<string> {
  const key = await getSigningKey();
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(value));
  return encodeBase64Url(new Uint8Array(signature));
}

async function verify(value: string, signature: string): Promise<boolean> {
  const key = await getSigningKey();
  return crypto.subtle.verify(
    "HMAC",
    key,
    toArrayBuffer(decodeBase64Url(signature)),
    new TextEncoder().encode(value),
  );
}

export async function createSessionToken(uid: string): Promise<string> {
  const payload: SessionPayload = {
    uid,
    exp: Math.floor(Date.now() / 1000) + SESSION_MAX_AGE,
  };
  const encodedPayload = encodeBase64Url(
    new TextEncoder().encode(JSON.stringify(payload)),
  );
  const signature = await sign(encodedPayload);
  return `${encodedPayload}.${signature}`;
}

export async function verifySessionToken(token: string): Promise<SessionPayload | null> {
  const [encodedPayload, signature] = token.split(".");
  if (!encodedPayload || !signature) return null;

  const isValid = await verify(encodedPayload, signature);
  if (!isValid) return null;

  try {
    const payload = JSON.parse(
      new TextDecoder().decode(decodeBase64Url(encodedPayload)),
    ) as SessionPayload;
    if (!payload.uid || payload.exp <= Math.floor(Date.now() / 1000)) {
      return null;
    }
    return payload;
  } catch {
    return null;
  }
}
