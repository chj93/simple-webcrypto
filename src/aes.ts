import { getCrypto } from "../utils";

export async function aesEncrypt(
  message: string,
  key: Uint8Array
): Promise<{ iv: Uint8Array; encrypted: Uint8Array }> {
  const crypto = await getCrypto();
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encodedKey = await crypto.subtle.importKey(
    "raw",
    key,
    { name: "AES-GCM" },
    false,
    ["encrypt"]
  );
  const encrypted = await crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv: iv,
    },
    encodedKey,
    new TextEncoder().encode(message)
  );
  return {
    iv: iv,
    encrypted: new Uint8Array(encrypted),
  };
}

export async function aesDecrypt(
  encrypted: Uint8Array,
  key: Uint8Array,
  iv: Uint8Array
): Promise<string> {
  const encodedKey = await crypto.subtle.importKey(
    "raw",
    key,
    { name: "AES-GCM" },
    false,
    ["decrypt"]
  );
  const decrypted = await crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv: iv,
    },
    encodedKey,
    encrypted
  );
  return new TextDecoder().decode(decrypted);
}
