import crypto from "crypto";
import { getCrypto } from "../utils";

// 키 쌍(공개 키, 개인 키) 생성
export async function generateRSAKeyPair(): Promise<CryptoKeyPair> {
  const crypto = getCrypto();
  return await crypto.subtle.generateKey(
    {
      name: "RSA-OAEP",
      modulusLength: 2048,
      publicExponent: new Uint8Array([1, 0, 1]), // 공개 지수 (65537) = 소수 중 안전성과 성능의 균형을 잘 맞추는 값
      hash: "SHA-256",
    },
    true,
    ["encrypt", "decrypt"]
  );
}

export async function rsaEncrypt(
  message: string,
  publicKey: Uint8Array
): Promise<Uint8Array> {
  const encodedPublicKey = await crypto.subtle.importKey(
    "spki", // === Subject Public Key Info
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
    new TextEncoder().encode(message)
  );
  return new Uint8Array(encrypted);
}

export async function rsaDecrypt(
  encrypted: Uint8Array,
  privateKey: Uint8Array
): Promise<string> {
  const encodedPrivateKey = await crypto.subtle.importKey(
    "pkcs8", // === Public-Key Cryptography Standards
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
