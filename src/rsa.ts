import crypto from "crypto";

export async function generateRSAKeyPair(): Promise<CryptoKeyPair> {
  return await crypto.subtle.generateKey(
    {
      name: "RSA-OAEP",
      modulusLength: 2048,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: "SHA-256",
    },
    true,
    ["encrypt", "decrypt"]
  );
}

export async function rsaEncrypt(
  plainText: string,
  publicKey: Uint8Array
): Promise<Uint8Array> {
  const encodedPublicKey = await crypto.subtle.importKey(
    "spki",
    publicKey,
    { name: "RSA-OAEP", hash: "SHA-256" },
    false,
    ["encrypt"]
  );
  const encrypted = await crypto.subtle.encrypt(
    {
      name: "RSA-OAEP",
    },
    encodedPublicKey,
    new TextEncoder().encode(plainText)
  );
  return new Uint8Array(encrypted);
}

export async function rsaDecrypt(
  encrypted: Uint8Array,
  privateKey: Uint8Array
): Promise<string> {
  const encodedPrivateKey = await crypto.subtle.importKey(
    "pkcs8",
    privateKey,
    { name: "RSA-OAEP", hash: "SHA-256" },
    false,
    ["decrypt"]
  );
  const decrypted = await crypto.subtle.decrypt(
    {
      name: "RSA-OAEP",
    },
    encodedPrivateKey,
    encrypted
  );
  return new TextDecoder().decode(decrypted);
}
