import crypto from "crypto";

export async function sha256(plainText: string): Promise<Uint8Array> {
  const hashBuffer = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(plainText)
  );
  return new Uint8Array(hashBuffer);
}

export function md5(plainText: string): string {
  return crypto.createHash("md5").update(plainText).digest("hex");
}
